import * as Yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
// @mui
import { TemplateTextField } from 'src/components/form';
import { TemplateForm } from 'src/components/form/TemplateForm';
import {
  TemplateFormActions,
  TemplateFormSubmitButton,
} from 'src/components/form/TemplateFormActions';
import { Box, Container, Typography } from '@mui/material';

export type ContactFormType = {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
};

const ContactFormSchema: Yup.ObjectSchema<ContactFormType> = Yup.object().shape({
  firstName: Yup.string().required('Nombre es requerido'),
  lastName: Yup.string().required('Apellido es requerido'),
  email: Yup.string().required('Email es requerido').email().email('Debe ser un email válido'),
  message: Yup.string()
    .required('Es necesario escribir su consulta')
    .min(5, 'La consulta es muy corta'),
});

const defaultValues = {
  firstName: '',
  lastName: '',
  email: '',
  message: '',
};

type Props = {
  onSubmit: (value: ContactFormType) => void;
  isSubmitting?: boolean;
};

export default function ContactForm({ onSubmit, isSubmitting }: Props) {
  const hf = useForm<ContactFormType>({
    resolver: yupResolver(ContactFormSchema),
    defaultValues,
    mode: 'onChange',
  });
  const handleSubmit = async (values: ContactFormType) => {
    try {
      await onSubmit(values);
      hf.reset();
    } catch (error) {
      console.error('Error en el formulario:', error);
    }
  };

  return (
    <Box sx={{ py: 4, mt: 6, mb: 6 }}>
      <Container maxWidth="md">
        <Typography variant="h5" sx={{ textAlign: 'center', mb: 3 }}>
          Envíanos tu consulta
        </Typography>
        <TemplateForm hf={hf} onSubmit={handleSubmit}>
          <Controller
            name="firstName"
            control={hf.control}
            render={(field) => <TemplateTextField {...field} label="Nombre" placeholder="Carlos" />}
          />

          <Controller
            name="lastName"
            control={hf.control}
            render={(field) => (
              <TemplateTextField {...field} label="Apellido" placeholder="Pérez" />
            )}
          />

          <Controller
            name="email"
            control={hf.control}
            render={(field) => (
              <TemplateTextField {...field} label="Email" placeholder="correo@ejemplo.com" />
            )}
          />

          <Controller
            name="message"
            control={hf.control}
            render={(field) => (
              <TemplateTextField
                {...field}
                label="Consulta"
                placeholder="Escribe tu consulta..."
                multiline
                rows={4}
              />
            )}
          />

          <TemplateFormActions>
            <TemplateFormSubmitButton>Enviar</TemplateFormSubmitButton>
          </TemplateFormActions>
        </TemplateForm>
      </Container>
    </Box>
  );
}
