import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      return new Response(
        JSON.stringify({ error: "Missing RESEND_API_KEY" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const resend = new Resend(resendApiKey);
    const fromEmail = Deno.env.get("RESEND_FROM_EMAIL");
    const toEmail = Deno.env.get("CONTACT_TO_EMAIL") ?? "chandankumar700785@gmail.com";

    if (!fromEmail) {
      return new Response(
        JSON.stringify({
          error: "Missing RESEND_FROM_EMAIL. Set a verified sender address in Supabase secrets.",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    let payload: ContactEmailRequest;
    try {
      payload = await req.json();
    } catch {
      return new Response(
        JSON.stringify({ error: "Invalid JSON body" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const { name, email, subject, message } = payload;

    if (!name || !email || !subject || !message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.log("Received contact form submission:", { name, email, subject });

    // Send email to you
    const emailResponse = await resend.emails.send({
      from: `Portfolio Contact <${fromEmail}>`,
      to: [toEmail],
      subject: `Portfolio Contact: ${subject}`,
      text: `New Contact Form Submission\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <hr />
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
      reply_to: email,
    });

    if ((emailResponse as any)?.error) {
      console.error("Resend error:", (emailResponse as any).error);
      return new Response(
        JSON.stringify({ error: (emailResponse as any).error?.message ?? "Email send failed" }),
        {
          status: 502,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    if (!(emailResponse as any)?.data?.id) {
      console.error("Unexpected Resend response:", emailResponse);
      return new Response(
        JSON.stringify({ error: "Unexpected email provider response" }),
        {
          status: 502,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
