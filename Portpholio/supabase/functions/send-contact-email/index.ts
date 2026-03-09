 import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

export const config = {
  verify_jwt: false,
};

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const isValidEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

serve(async (req) => {
  // 🔹 CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  // 🔹 Allow only POST
  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }

  // 🔹 Parse JSON safely
  let payload: ContactPayload;
  try {
    payload = await req.json();
  } catch {
    return new Response(
      JSON.stringify({ error: "Invalid JSON payload" }),
      {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }

  const name = payload.name?.trim();
  const email = payload.email?.trim();
  const subject = payload.subject?.trim();
  const message = payload.message?.trim();

  // 🔹 Validate fields
  if (!name || !email || !subject || !message) {
    return new Response(
      JSON.stringify({ error: "All fields are required" }),
      {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }

  if (!isValidEmail(email)) {
    return new Response(
      JSON.stringify({ error: "Invalid email address" }),
      {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }

  // 🔹 ENV variables (CORRECT names)
  const resendApiKey = Deno.env.get("RESEND_API_KEY");
  const fromEmail =
    Deno.env.get("CONTACT_FROM_EMAIL") ??
    Deno.env.get("RESEND_FROM_EMAIL") ??
    "onboarding@resend.dev";
  const toEmail = Deno.env.get("CONTACT_TO_EMAIL");

  if (!resendApiKey) {
    console.error("❌ Missing RESEND_API_KEY");
    return new Response(
      JSON.stringify({ error: "Email service is not configured (missing RESEND_API_KEY)" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }

  if (!toEmail) {
    console.error("❌ Missing CONTACT_TO_EMAIL");
    return new Response(
      JSON.stringify({ error: "Recipient email is not configured (missing CONTACT_TO_EMAIL)" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }

  // 🔹 Email body
  const emailText = `
New portfolio contact message

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
`;

  // 🔹 Send email via Resend
  try {
    const resendResponse = await fetch(
      "https://api.resend.com/emails",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [toEmail],
          subject: `Portfolio contact: ${subject}`,
          reply_to: email,
          text: emailText,
        }),
      }
    );

    if (!resendResponse.ok) {
      const errorText = await resendResponse.text();
      console.error("❌ Resend API error:", errorText);

      let resendMessage = "Failed to send email";
      try {
        const parsed = JSON.parse(errorText);
        resendMessage =
          parsed?.message ?? parsed?.error?.message ?? parsed?.error ?? resendMessage;
      } catch {
        // ignore parsing errors and keep fallback message
      }

      return new Response(
        JSON.stringify({ error: resendMessage }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const data = await resendResponse.json();

    return new Response(
      JSON.stringify({ success: true, data }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("❌ Unexpected error:", err);

    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
