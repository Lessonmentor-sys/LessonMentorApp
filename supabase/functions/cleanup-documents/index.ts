import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  if (req.method !== "POST") {
    return Response.json({ error: "Method not allowed" }, { status: 405 });
  }

  const url = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!url || !serviceRoleKey) {
    return Response.json({ error: "Missing Supabase service configuration" }, { status: 500 });
  }

  const supabase = createClient(url, serviceRoleKey);
  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from("lesson_submissions")
    .update({ document_status: "expired", document_url: null })
    .lt("expires_at", now)
    .eq("document_status", "available")
    .select("id");

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ expired: data?.length || 0 });
});
