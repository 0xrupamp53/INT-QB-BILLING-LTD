import { createServerFn } from '@tanstack/react-start';
import { contactSchema } from './contact-schema';

export const submitContact = createServerFn({ method: 'POST' })
  .inputValidator(input => contactSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
    const { data: id, error } = await supabaseAdmin.rpc('submit_contact', {
      p_name: data.name, p_email: data.email, p_company: data.company,
      p_service: data.service, p_message: data.message,
    });
    if (error) throw new Error(error.message.includes('wait a minute') ? 'Please wait a minute before sending another enquiry.' : 'Your enquiry could not be saved. Please try again.');
    return { id };
  });
