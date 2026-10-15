import { describe, it, expect } from 'vitest';
import { contactSchema } from '@/lib/contact-schema';
const input={name:'Test visitor',email:'test@example.com',company:'Test company',service:'Web Development',message:'A new website project.',website:''};
describe('Contact enquiry validation',()=>{
 it('accepts an offered service',()=>expect(contactSchema.safeParse(input).success).toBe(true));
 it('rejects services outside the offered list',()=>expect(contactSchema.safeParse({...input,service:'IT hardware repair'}).success).toBe(false));
 it('rejects invalid email addresses',()=>expect(contactSchema.safeParse({...input,email:'invalid'}).success).toBe(false));
 it('rejects filled spam trap fields',()=>expect(contactSchema.safeParse({...input,website:'spam.example'}).success).toBe(false));
});
