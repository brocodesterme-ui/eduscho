// Video lessons data for NCERT chapters
// YouTube video IDs for educational content

export interface VideoLesson {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  duration: string;
  subject: string;
  className: string;
  chapter: number;
  difficulty: "beginner" | "intermediate" | "advanced";
  tags: string[];
}

// Curated educational videos mapped to NCERT chapters
export const videoLessons: VideoLesson[] = [
  // Class 10 Mathematics
  {
    id: "math-10-ch1-v1",
    title: "Real Numbers - Complete Chapter",
    description: "Learn about Euclid's division lemma, fundamental theorem of arithmetic, and irrational numbers",
    youtubeId: "Rmqp9A1xf8A",
    duration: "45:00",
    subject: "Mathematics",
    className: "10",
    chapter: 1,
    difficulty: "intermediate",
    tags: ["real numbers", "euclid's lemma", "HCF", "LCM"]
  },
  {
    id: "math-10-ch2-v1",
    title: "Polynomials - Zeros and Coefficients",
    description: "Understanding relationship between zeros and coefficients of polynomials",
    youtubeId: "ZxLIWQdT1po",
    duration: "38:00",
    subject: "Mathematics",
    className: "10",
    chapter: 2,
    difficulty: "intermediate",
    tags: ["polynomials", "zeros", "quadratic", "cubic"]
  },
  {
    id: "math-10-ch3-v1",
    title: "Linear Equations in Two Variables",
    description: "Graphical and algebraic methods to solve linear equations",
    youtubeId: "kBvlFNxOy2s",
    duration: "42:00",
    subject: "Mathematics",
    className: "10",
    chapter: 3,
    difficulty: "intermediate",
    tags: ["linear equations", "graphical method", "substitution"]
  },
  {
    id: "math-10-ch4-v1",
    title: "Quadratic Equations - All Methods",
    description: "Factorization, completing square, and quadratic formula",
    youtubeId: "EhA9pVn-I1s",
    duration: "50:00",
    subject: "Mathematics",
    className: "10",
    chapter: 4,
    difficulty: "intermediate",
    tags: ["quadratic", "factorization", "formula", "discriminant"]
  },
  {
    id: "math-10-ch8-v1",
    title: "Introduction to Trigonometry",
    description: "Trigonometric ratios and identities explained simply",
    youtubeId: "kAv5pahIevE",
    duration: "55:00",
    subject: "Mathematics",
    className: "10",
    chapter: 8,
    difficulty: "intermediate",
    tags: ["trigonometry", "sin", "cos", "tan", "identities"]
  },

  // Class 10 Science
  {
    id: "science-10-ch1-v1",
    title: "Chemical Reactions and Equations",
    description: "Types of chemical reactions, balancing equations, and effects",
    youtubeId: "3X9WMk0v-L4",
    duration: "48:00",
    subject: "Science",
    className: "10",
    chapter: 1,
    difficulty: "intermediate",
    tags: ["chemical reactions", "balancing", "combination", "decomposition"]
  },
  {
    id: "science-10-ch2-v1",
    title: "Acids, Bases and Salts",
    description: "Properties, reactions, and pH scale explained",
    youtubeId: "KRZh2akPbWg",
    duration: "52:00",
    subject: "Science",
    className: "10",
    chapter: 2,
    difficulty: "intermediate",
    tags: ["acids", "bases", "salts", "pH", "indicators"]
  },
  {
    id: "science-10-ch11-v1",
    title: "Electricity - Complete Chapter",
    description: "Ohm's law, resistance, circuits, and power",
    youtubeId: "BDFDsHmVJEw",
    duration: "60:00",
    subject: "Science",
    className: "10",
    chapter: 11,
    difficulty: "intermediate",
    tags: ["electricity", "ohm's law", "resistance", "circuits"]
  },
  {
    id: "science-10-ch9-v1",
    title: "Light - Reflection and Refraction",
    description: "Mirror formula, lens equation, and image formation",
    youtubeId: "YtJp-H8gVJY",
    duration: "58:00",
    subject: "Science",
    className: "10",
    chapter: 9,
    difficulty: "intermediate",
    tags: ["light", "reflection", "refraction", "mirrors", "lenses"]
  },

  // Class 9 Mathematics
  {
    id: "math-9-ch1-v1",
    title: "Number Systems - Rational and Irrational",
    description: "Understanding real numbers, rational and irrational numbers",
    youtubeId: "y8_YYkFwYpA",
    duration: "40:00",
    subject: "Mathematics",
    className: "9",
    chapter: 1,
    difficulty: "beginner",
    tags: ["number system", "rational", "irrational", "real numbers"]
  },
  {
    id: "math-9-ch7-v1",
    title: "Triangles - Congruence and Properties",
    description: "Triangle congruence rules and important theorems",
    youtubeId: "tWxfCXQukf8",
    duration: "45:00",
    subject: "Mathematics",
    className: "9",
    chapter: 7,
    difficulty: "intermediate",
    tags: ["triangles", "congruence", "SSS", "SAS", "ASA"]
  },

  // Class 9 Science
  {
    id: "science-9-ch7-v1",
    title: "Motion - Distance, Speed, Velocity",
    description: "Understanding motion with equations and graphs",
    youtubeId: "wupToqz1e2g",
    duration: "50:00",
    subject: "Science",
    className: "9",
    chapter: 7,
    difficulty: "intermediate",
    tags: ["motion", "velocity", "acceleration", "graphs"]
  },
  {
    id: "science-9-ch8-v1",
    title: "Force and Laws of Motion",
    description: "Newton's three laws of motion with examples",
    youtubeId: "BDFDsHmVJEw",
    duration: "55:00",
    subject: "Science",
    className: "9",
    chapter: 8,
    difficulty: "intermediate",
    tags: ["force", "newton's laws", "inertia", "momentum"]
  },

  // Class 11 Physics
  {
    id: "physics-11-ch1-v1",
    title: "Units and Measurements",
    description: "SI units, dimensional analysis, and significant figures",
    youtubeId: "zDjM0X8nzuY",
    duration: "42:00",
    subject: "Physics",
    className: "11",
    chapter: 1,
    difficulty: "intermediate",
    tags: ["units", "measurements", "dimensional analysis"]
  },
  {
    id: "physics-11-ch4-v1",
    title: "Laws of Motion - Advanced",
    description: "Free body diagrams, friction, and circular motion",
    youtubeId: "NblR01hHK6U",
    duration: "65:00",
    subject: "Physics",
    className: "11",
    chapter: 4,
    difficulty: "advanced",
    tags: ["laws of motion", "friction", "FBD", "circular motion"]
  },

  // Class 11 Chemistry
  {
    id: "chemistry-11-ch1-v1",
    title: "Some Basic Concepts of Chemistry",
    description: "Mole concept, stoichiometry, and atomic mass",
    youtubeId: "eBRvPLGX9MI",
    duration: "55:00",
    subject: "Chemistry",
    className: "11",
    chapter: 1,
    difficulty: "intermediate",
    tags: ["mole concept", "stoichiometry", "atomic mass"]
  },
  {
    id: "chemistry-11-ch2-v1",
    title: "Structure of Atom",
    description: "Bohr model, quantum numbers, and electron configuration",
    youtubeId: "IYV09L7zFPs",
    duration: "60:00",
    subject: "Chemistry",
    className: "11",
    chapter: 2,
    difficulty: "advanced",
    tags: ["atomic structure", "quantum numbers", "orbitals"]
  },

  // Class 12 Physics
  {
    id: "physics-12-ch1-v1",
    title: "Electric Charges and Fields",
    description: "Coulomb's law, electric field, and Gauss's theorem",
    youtubeId: "RKiJ0PlRZBk",
    duration: "70:00",
    subject: "Physics",
    className: "12",
    chapter: 1,
    difficulty: "advanced",
    tags: ["electrostatics", "coulomb's law", "electric field", "gauss"]
  },
  {
    id: "physics-12-ch3-v1",
    title: "Current Electricity",
    description: "Ohm's law, Kirchhoff's laws, and electrical circuits",
    youtubeId: "BDFDsHmVJEw",
    duration: "65:00",
    subject: "Physics",
    className: "12",
    chapter: 3,
    difficulty: "advanced",
    tags: ["current electricity", "kirchhoff", "circuits", "resistance"]
  },

  // Class 12 Chemistry
  {
    id: "chemistry-12-ch1-v1",
    title: "The Solid State",
    description: "Crystal structures, unit cells, and defects",
    youtubeId: "E9lgpzHpGNw",
    duration: "58:00",
    subject: "Chemistry",
    className: "12",
    chapter: 1,
    difficulty: "advanced",
    tags: ["solid state", "crystals", "unit cell", "defects"]
  },
  {
    id: "chemistry-12-ch3-v1",
    title: "Electrochemistry",
    description: "Electrochemical cells, Nernst equation, and electrolysis",
    youtubeId: "FX5-CvMBmC0",
    duration: "62:00",
    subject: "Chemistry",
    className: "12",
    chapter: 3,
    difficulty: "advanced",
    tags: ["electrochemistry", "nernst", "electrolysis", "cells"]
  },

  // Class 12 Mathematics
  {
    id: "math-12-ch5-v1",
    title: "Continuity and Differentiability",
    description: "Limits, continuity, and differentiation techniques",
    youtubeId: "WUvTyaaNkzM",
    duration: "68:00",
    subject: "Mathematics",
    className: "12",
    chapter: 5,
    difficulty: "advanced",
    tags: ["calculus", "continuity", "derivatives", "limits"]
  },
  {
    id: "math-12-ch7-v1",
    title: "Integrals - Complete Guide",
    description: "Integration techniques, substitution, and by parts",
    youtubeId: "rfG8ce4nNh0",
    duration: "75:00",
    subject: "Mathematics",
    className: "12",
    chapter: 7,
    difficulty: "advanced",
    tags: ["integrals", "integration", "substitution", "by parts"]
  },

  // Class 6-8 Basic videos
  {
    id: "math-6-ch1-v1",
    title: "Knowing Our Numbers",
    description: "Large numbers, place value, and estimation",
    youtubeId: "kJKk_VYY_vM",
    duration: "35:00",
    subject: "Mathematics",
    className: "6",
    chapter: 1,
    difficulty: "beginner",
    tags: ["numbers", "place value", "estimation"]
  },
  {
    id: "math-7-ch1-v1",
    title: "Integers - Operations and Properties",
    description: "Addition, subtraction, multiplication of integers",
    youtubeId: "6dW6VYXp9HM",
    duration: "38:00",
    subject: "Mathematics",
    className: "7",
    chapter: 1,
    difficulty: "beginner",
    tags: ["integers", "operations", "number line"]
  },
  {
    id: "math-8-ch1-v1",
    title: "Rational Numbers",
    description: "Properties and operations on rational numbers",
    youtubeId: "bvxAEqZvKPQ",
    duration: "40:00",
    subject: "Mathematics",
    className: "8",
    chapter: 1,
    difficulty: "beginner",
    tags: ["rational numbers", "fractions", "decimals"]
  },
  {
    id: "science-6-ch1-v1",
    title: "Food: Where Does It Come From?",
    description: "Sources of food and food variety",
    youtubeId: "ZxNVt3A-D9Y",
    duration: "30:00",
    subject: "Science",
    className: "6",
    chapter: 1,
    difficulty: "beginner",
    tags: ["food", "sources", "nutrition"]
  },
  {
    id: "science-7-ch1-v1",
    title: "Nutrition in Plants",
    description: "Photosynthesis and modes of nutrition",
    youtubeId: "2gOZHxWLl1Q",
    duration: "35:00",
    subject: "Science",
    className: "7",
    chapter: 1,
    difficulty: "beginner",
    tags: ["nutrition", "photosynthesis", "plants"]
  },
  {
    id: "science-8-ch1-v1",
    title: "Crop Production and Management",
    description: "Agricultural practices and crop protection",
    youtubeId: "4PLPAZ5pVz4",
    duration: "38:00",
    subject: "Science",
    className: "8",
    chapter: 1,
    difficulty: "beginner",
    tags: ["crops", "agriculture", "farming"]
  },
];

export const getVideosByClass = (className: string): VideoLesson[] => {
  return videoLessons.filter(v => v.className === className);
};

export const getVideosBySubject = (subject: string, className: string): VideoLesson[] => {
  return videoLessons.filter(v => v.subject === subject && v.className === className);
};

export const getVideosByChapter = (subject: string, className: string, chapter: number): VideoLesson[] => {
  return videoLessons.filter(v => v.subject === subject && v.className === className && v.chapter === chapter);
};

export const getAllClasses = (): string[] => {
  return [...new Set(videoLessons.map(v => v.className))].sort((a, b) => Number(a) - Number(b));
};

export const getSubjectsByClass = (className: string): string[] => {
  return [...new Set(videoLessons.filter(v => v.className === className).map(v => v.subject))];
};
