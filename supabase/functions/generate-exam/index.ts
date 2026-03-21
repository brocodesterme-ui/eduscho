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
    const { examType, subject, classLevel, numQuestions } = await req.json();

    if (!examType || !subject || !classLevel) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const count = numQuestions || 15;

    const examConfigs: Record<string, { marks: number; negative: number; time: number }> = {
      "CBSE Board": { marks: 1, negative: 0, time: 60 },
      "JEE Mains": { marks: 4, negative: 1, time: 180 },
      "JEE Advanced": { marks: 4, negative: 2, time: 180 },
      "NEET": { marks: 4, negative: 1, time: 200 },
      "ICSE Board": { marks: 1, negative: 0, time: 60 },
      "Olympiad": { marks: 5, negative: 1, time: 120 },
    };

    const config = examConfigs[examType] || { marks: 4, negative: 1, time: 120 };

    const prompt = `You are an expert exam paper setter for ${examType} exams in India.

Generate exactly ${count} multiple-choice questions for Class ${classLevel} ${subject}.

Requirements:
- Questions should match the difficulty and style of actual ${examType} exams
- Mix easy (30%), medium (40%), and hard (30%) questions
- Each question must have exactly 4 options labeled A, B, C, D
- Include the topic/chapter each question is from
- Provide a brief explanation for the correct answer
- Do NOT use LaTeX, backslashes, or special math formatting - use plain text for formulas (e.g., "x^2 + 2x + 1" not "x²")

Return ONLY valid JSON array. No markdown fences. Each object must have:
- "question_number": number starting from 1
- "question_text": the question string
- "options": {"A": "...", "B": "...", "C": "...", "D": "..."}
- "correct_answer": one of "A", "B", "C", "D"
- "explanation": brief explanation
- "topic": the chapter/topic name
- "difficulty": "easy", "medium", or "hard"`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        max_tokens: 16000,
        messages: [
          { role: "system", content: "You generate exam questions. Respond with valid JSON only. No markdown, no code fences. Keep explanations under 50 words each." },
          { role: "user", content: prompt },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required. Please add credits." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
      throw new Error("Failed to generate exam");
    }

    const data = await response.json();
    let content = data.choices?.[0]?.message?.content || "";
    content = content.replace(/```json\s*/g, "").replace(/```\s*/g, "").trim();

    // Try to extract a valid JSON array even if truncated
    let questions;
    try {
      questions = JSON.parse(content);
    } catch {
      // Attempt to salvage truncated JSON by finding the last complete object
      const lastCompleteObj = content.lastIndexOf("}");
      if (lastCompleteObj !== -1) {
        const trimmed = content.substring(0, lastCompleteObj + 1) + "]";
        try {
          questions = JSON.parse(trimmed);
        } catch {
          console.error("Parse failed even after trimming:", content.substring(0, 500));
          throw new Error("Failed to parse exam questions. Please try again.");
        }
      } else {
        console.error("Parse failed:", content.substring(0, 500));
        throw new Error("Failed to parse exam questions. Please try again.");
      }
    }

    if (!Array.isArray(questions) || questions.length === 0) {
      throw new Error("No questions generated");
    }

    // Add marks info
    questions = questions.map((q: any, i: number) => ({
      ...q,
      question_number: i + 1,
      marks: config.marks,
      negative_marks: config.negative,
    }));

    return new Response(
      JSON.stringify({
        questions,
        examType,
        subject,
        classLevel,
        timeLimit: config.time * count,
        totalMarks: config.marks * questions.length,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    console.error("Error in generate-exam:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Failed to generate exam" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
