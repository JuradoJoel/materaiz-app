import { httpClient } from 'src/utils/httpClient';
import { useMutation } from '@tanstack/react-query';
import { ContactFormType } from 'src/components/contact-form/ContactForm';

export class ContactRepository {
  keys = {
    create: () => ['contact-messages', 'create'],
  };

  create = async (values: ContactFormType) => {
    const { data } = await httpClient.post('app/contact-messages', values);
    return data;
  };
}

const repo = new ContactRepository();

export const useContactMutation = () =>
  useMutation({
    mutationKey: repo.keys.create(),
    mutationFn: repo.create,
    onSuccess: () => ({
      message: 'Consulta enviada con éxito',
      variant: 'success' as const,
    }),
    onError: (error: any) => ({
      message: error.response?.data?.error || 'Error al enviar la consulta',
      variant: 'error' as const,
    }),
  });
