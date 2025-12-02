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
    const { teacherType, subject, difficulty, numberOfQuestions } = await req.json();
    console.log("Generating quiz for:", { teacherType, subject, difficulty, numberOfQuestions });

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const difficultyDescriptions: Record<string, string> = {
      easy: "basic level, suitable for beginners, testing fundamental concepts",
      medium: "intermediate level, suitable for students preparing for regional olympiads",
      hard: "advanced level, similar to national/international olympiad problems",
    };

    const subjectPrompts: Record<string, string> = {
      "math-olympiad": `You are creating Math Olympiad questions covering: number theory, combinatorics, algebra, geometry. 
        Include problems involving divisibility, prime numbers, counting principles, polynomials, inequalities, and Euclidean geometry.`,
      "physics-olympiad": `You are creating Physics Olympiad questions covering: mechanics, thermodynamics, electromagnetism, optics, modern physics.
        Include problems requiring deep understanding of physical principles and mathematical problem-solving.`,
      "chemistry-olympiad": `You are creating Chemistry Olympiad questions covering: organic chemistry, inorganic chemistry, physical chemistry.
        Include problems on reaction mechanisms, stoichiometry, thermodynamics, and chemical equilibrium.`,
      "biology-olympiad": `You are creating Biology Olympiad questions covering: cell biology, genetics, evolution, physiology, ecology.
        Include problems requiring understanding of molecular mechanisms and biological systems.`,
      "astronomy-olympiad": `You are creating Astronomy Olympiad questions covering: celestial mechanics, stellar physics, cosmology.
        Include problems involving orbital calculations, stellar evolution, and observational astronomy.`,
      "informatics-olympiad": `You are creating Informatics Olympiad questions covering: algorithms, data structures, complexity analysis.
        Include problems on graph theory, dynamic programming, and algorithmic thinking.`,
    };

    const systemPrompt = `${subjectPrompts[teacherType] || subjectPrompts["math-olympiad"]}

Generate exactly ${numberOfQuestions} ${difficultyDescriptions[difficulty] || difficultyDescriptions.medium} questions.

IMPORTANT: Return a valid JSON array with exactly this structure for each question:
{
  "question_number": 1,
  "question_text": "The question text here",
  "question_type": "multiple_choice",
  "options": ["A) Option 1", "B) Option 2", "C) Option 3", "D) Option 4"],
  "correct_answer": "A",
  "explanation": "Detailed explanation of why this is correct"
}

Rules:
- Each question must have exactly 4 options labeled A, B, C, D
- correct_answer must be just the letter (A, B, C, or D)
- Make questions challenging but fair
- Provide clear, educational explanations
- Return ONLY the JSON array, no other text`;

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
          { role: "user", content: `Generate ${numberOfQuestions} ${difficulty} ${subject} olympiad questions. Return only the JSON array.` },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limits exceeded, please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required, please add funds to your Lovable AI workspace." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";
    
    // Parse the JSON from the response
    let questions;
    try {
      // Try to extract JSON array from the response
      const jsonMatch = content.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        questions = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("No JSON array found in response");
      }
    } catch (parseError) {
      console.error("Failed to parse questions:", parseError, "Content:", content);
      throw new Error("Failed to parse generated questions");
    }

    console.log("Generated questions:", questions.length);

    return new Response(
      JSON.stringify({ questions }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Quiz generation error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
