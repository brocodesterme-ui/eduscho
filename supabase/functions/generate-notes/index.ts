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

    console.log(`Generating text notes for ${topic} - ${subject} Class ${className}`);

    const prompt = `You are an expert NCERT teacher for Class ${className} ${subject}. Generate comprehensive, well-structured study notes on the topic: "${topic}".

Return the notes as a JSON array of pages. Each page should have:
- "title": the page/section heading
- "content": an array of content blocks

Each content block is an object with:
- "type": one of "heading", "paragraph", "bullets", "formula", "definition", "tip", "example"
- "text": the text content (for heading, paragraph, formula, definition, tip, example)
- "items": array of strings (only for bullets type)
- "term": the term being defined (only for definition type)
- "label": a short label like "Remember", "Pro Tip", "Important" (only for tip type)

Create 4-6 pages covering the topic thoroughly. Include:
- Key concepts and explanations
- Important formulas (if applicable)
- Definitions of key terms
- Examples with solutions
- Memory tips and mnemonics
- Summary/key takeaways

IMPORTANT: Return ONLY valid JSON, no markdown fences. The response must be a JSON array of page objects.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: "You are a study notes generator. Always respond with valid JSON only. No markdown, no code fences, no explanation outside the JSON.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
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

    const data = await response.json();
    let content = data.choices?.[0]?.message?.content || "";
    
    // Clean up potential markdown fences
    content = content.replace(/```json\s*/g, "").replace(/```\s*/g, "").trim();
    
    let pages;
    try {
      pages = JSON.parse(content);
    } catch (e) {
      console.error("Failed to parse AI response:", content);
      throw new Error("Failed to parse generated notes");
    }

    if (!Array.isArray(pages) || pages.length === 0) {
      throw new Error("Invalid notes format received");
    }

    console.log(`Generated ${pages.length} pages for ${topic}`);

    return new Response(
      JSON.stringify({ pages, topic, subject, className }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    console.error("Error in generate-notes:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Failed to generate notes" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
