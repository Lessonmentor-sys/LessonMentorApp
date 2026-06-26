import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS"
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return Response.json({ error: "Method not allowed" }, { status: 405, headers: corsHeaders });
  }

  const payload = await req.json();

  return Response.json({
    status: "stub",
    message: "Lesson generation function is deployed. Connect OpenAI and the protected template library next.",
    received: {
      grade: payload.grade,
      subject: payload.subject,
      systems: payload.selected_systems,
      supportCount: payload.selected_supports?.length || 0
    }
  }, { headers: corsHeaders });
});
