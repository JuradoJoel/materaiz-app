import { Alert, Button } from '@mui/material';
import { CartItem } from 'src/models/Product';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TemplateForm } from 'src/components/form/TemplateForm';
import { TemplateTextField } from 'src/components/form/TemplateTextField';
import { TemplateNumberField } from 'src/components/form/TemplateNumberField';
import { getBombillaPrice, getBombillaLabel } from 'src/constants/bombillas';
import {
  TemplateFormActions,
  TemplateFormSubmitButton,
} from 'src/components/form/TemplateFormActions';
import * as Yup from 'yup';
import { CheckoutPayload, CheckoutResponse, useCreateOrderMutation } from 'src/api/OrderRepository';

export const CheckoutSchema = Yup.object().shape({
  first_name: Yup.string().required('El nombre es obligatorio'),
  last_name: Yup.string().required('El apellido es obligatorio'),
  email: Yup.string().email('Email inválido').required('El email es obligatorio'),
  phone: Yup.string()
    .required('El teléfono es obligatorio')
    .matches(/^[0-9+\-\s()]+$/, 'Solo números, espacios, + y guiones')
    .min(10, 'Mínimo 10 caracteres'),
  delivery_method: Yup.string()
    .oneOf(['freight', 'delivery'] as const)
    .required('Debe seleccionar un método de entrega'),
  address: Yup.string().when('delivery_method', {
    is: 'delivery',
    then: (schema) => schema.required('La dirección es obligatoria para envío a domicilio'),
    otherwise: (schema) => schema.optional().default(''),
  }),
});
export type CheckoutFormValues = Yup.InferType<typeof CheckoutSchema>;

export type CheckoutFormProps = {
  cart: CartItem[];
  totalAmount: number;
  shippingCost: number;
  isHomeDelivery: boolean;
  onSuccess: (response: CheckoutResponse) => void;
  onCancel: () => void;
  onResetCheckout: () => void;
};

export const CheckoutForm = ({
  cart,
  totalAmount,
  shippingCost,
  isHomeDelivery,
  onSuccess,
  onCancel,
}: CheckoutFormProps) => {
  const hf = useForm<CheckoutFormValues>({
    resolver: yupResolver(CheckoutSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      address: '',
      delivery_method: isHomeDelivery ? 'delivery' : 'freight',
    },
  });

  const { control, formState } = hf;
  const createOrderMutation = useCreateOrderMutation();

  const onSubmit = async (data: CheckoutFormValues) => {
    const payload: CheckoutPayload = {
      customer: {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone: data.phone,
        address: data.address?.trim() || null,
      },
      total_amount: totalAmount,
      shipping_cost: shippingCost,
      is_home_delivery: data.delivery_method === 'delivery',
      items: cart.map((item) => {
        const basePrice = item.product.discount_price ?? item.product.original_price;
        const bombillaPrice = getBombillaPrice(item.addonBombilla ?? null);
        const unitPrice = basePrice + bombillaPrice;
        const subtotal = unitPrice * item.quantity;

        return {
          product_id: item.product.id,
          product_name: item.product.name,
          quantity: item.quantity,
          unit_price: unitPrice,
          subtotal: subtotal,
          addon_bombilla: item.addonBombilla || null,
          addon_bombilla_label: item.addonBombilla ? getBombillaLabel(item.addonBombilla) : null,
          addon_bombilla_price: bombillaPrice,
        };
      }),
    };

    try {
      const result = await createOrderMutation.mutateAsync(payload);
      onSuccess(result);
    } catch (error: any) {
      console.error('Error al crear orden:', error);
      alert(error?.response?.data?.message || 'Error al procesar la compra');
    }
  };

  return (
    <TemplateForm hf={hf} onSubmit={onSubmit}>
      <Controller
        name="first_name"
        control={control}
        render={({ field, fieldState }) => (
          <TemplateTextField
            field={field}
            fieldState={fieldState}
            formState={formState}
            label="Nombre"
            placeholder="Juan"
          />
        )}
      />

      <Controller
        name="last_name"
        control={control}
        render={({ field, fieldState }) => (
          <TemplateTextField
            field={field}
            fieldState={fieldState}
            formState={formState}
            label="Apellido"
            placeholder="Pérez"
          />
        )}
      />

      <Controller
        name="email"
        control={control}
        render={({ field, fieldState }) => (
          <TemplateTextField
            field={field}
            fieldState={fieldState}
            formState={formState}
            label="Email"
            placeholder="correo@ejemplo.com"
          />
        )}
      />

      <Controller
        name="phone"
        control={control}
        render={({ field, fieldState }) => (
          <TemplateNumberField
            field={field}
            fieldState={fieldState}
            formState={formState}
            label="Teléfono"
            placeholder="11 1234-5678"
          />
        )}
      />
      <Controller
        name="address"
        control={control}
        render={({ field, fieldState }) => (
          <TemplateTextField
            field={{
              ...field,
              value: field.value ?? '',
              onChange: (e) => field.onChange(e.target.value),
            }}
            fieldState={fieldState}
            formState={formState}
            label="Dirección de envío"
            placeholder="Av. Corrientes 1234, Piso 5, Dto A"
            multiline
          />
        )}
      />
      {!isHomeDelivery && (
        <Alert severity="info" sx={{ mt: 2 }}>
          El costo del flete se coordinará posteriormente con el vendedor.
        </Alert>
      )}
      <TemplateFormActions>
        <Button onClick={onCancel} variant="outlined" color="inherit">
          Cancelar
        </Button>
        <TemplateFormSubmitButton>Confirmar Compra</TemplateFormSubmitButton>
      </TemplateFormActions>
    </TemplateForm>
  );
};
