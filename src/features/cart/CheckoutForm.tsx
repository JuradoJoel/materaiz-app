import { Button } from '@mui/material';
import { CartItem } from 'src/models/Product';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TemplateForm } from 'src/components/form/TemplateForm';
import { TemplateTextField } from 'src/components/form/TemplateTextField';
import { TemplateNumberField } from 'src/components/form/TemplateNumberField';
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
});

export type CheckoutFormValues = Yup.InferType<typeof CheckoutSchema>;

export type CheckoutFormProps = {
  cart: CartItem[];
  totalAmount: number;
  onSuccess: (response: CheckoutResponse) => void;
  onCancel: () => void;
};

export const CheckoutForm = ({ cart, totalAmount, onSuccess, onCancel }: CheckoutFormProps) => {
  const hf = useForm<CheckoutFormValues>({
    resolver: yupResolver(CheckoutSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
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
      },
      total_amount: totalAmount,
      items: cart.map((item) => ({
        product_id: item.product.id,
        product_name: item.product.name,
        quantity: item.quantity,
        unit_price: item.product.original_price,
        subtotal: item.product.original_price * item.quantity,
      })),
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
            placeholder="juan@example.com"
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

      <TemplateFormActions>
        <Button onClick={onCancel} variant="outlined" color="inherit">
          Cancelar
        </Button>
        <TemplateFormSubmitButton>Confirmar Compra</TemplateFormSubmitButton>
      </TemplateFormActions>
    </TemplateForm>
  );
};
