CREATE TABLE public.contact_submissions (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 created_at timestamptz NOT NULL DEFAULT now(),
 name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 100),
 email text NOT NULL CHECK (char_length(email) <= 255),
 company text NOT NULL DEFAULT '' CHECK (char_length(company) <= 150),
 service text NOT NULL CHECK (char_length(service) <= 100),
 message text NOT NULL CHECK (char_length(message) BETWEEN 10 AND 3000)
);
GRANT ALL ON public.contact_submissions TO service_role;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
CREATE INDEX contact_submissions_email_created_idx ON public.contact_submissions (email, created_at DESC);
CREATE FUNCTION public.submit_contact(p_name text, p_email text, p_company text, p_service text, p_message text) RETURNS uuid LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE submission_id uuid;
BEGIN
 PERFORM pg_advisory_xact_lock(hashtextextended(lower(p_email), 0));
 IF EXISTS (SELECT 1 FROM public.contact_submissions WHERE lower(email) = lower(p_email) AND created_at > now() - interval '1 minute') THEN
 RAISE EXCEPTION 'Please wait a minute before sending another enquiry.';
 END IF;
 INSERT INTO public.contact_submissions (name,email,company,service,message) VALUES (p_name,lower(p_email),p_company,p_service,p_message) RETURNING id INTO submission_id;
 RETURN submission_id;
END;
$$;
REVOKE ALL ON FUNCTION public.submit_contact(text,text,text,text,text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.submit_contact(text,text,text,text,text) TO service_role;