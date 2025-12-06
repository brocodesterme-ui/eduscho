import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { subject, className, topic } = await req.json();

    if (!subject || !className || !topic) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: subject, className, topic" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are an expert NCERT teacher creating comprehensive study notes for Class ${className} ${subject}.
Generate detailed, well-structured notes for the topic: "${topic}".

Structure your notes with:
1. **Introduction** - Brief overview of the topic
2. **Key Concepts** - Main ideas with clear explanations
3. **Important Definitions** - All relevant terms defined
4. **Formulas/Rules** (if applicable) - With explanations
5. **Examples** - Worked examples where relevant
6. **Diagrams Description** - Text descriptions of important diagrams
7. **Important Points to Remember** - Key takeaways
8. **Common Mistakes to Avoid** - Typical errors students make
9. **NCERT Questions Preview** - Types of questions asked

Use markdown formatting with headers, bullet points, and bold text for emphasis.
Make notes comprehensive but student-friendly for Class ${className} level.
Include mnemonics and memory tips where helpful.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Create comprehensive study notes for ${subject} Class ${className} on the topic: ${topic}` },
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required. Please add credits to your workspace." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("Failed to generate notes");
    }

    console.log(`Streaming notes for ${topic} - ${subject} Class ${className}`);

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error: unknown) {
    console.error("Error in generate-notes:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Failed to generate notes" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
