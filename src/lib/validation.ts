import { z } from 'zod';

export const contactFormSchema = z.object({
  firstName: z.string().min(2, { message: 'First name must be at least 2 characters.' }),
  lastName: z.string().min(2, { message: 'Last name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
  inquiryType: z.string().min(1, { message: 'Please select an inquiry type.' }),
  message: z.string().optional(),
  privacyAccepted: z.boolean().refine(val => val === true, {
    message: 'You must accept the privacy policy.',
  }),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
