// Video lessons data for NCERT chapters
// YouTube video URLs for educational content - verified working educational channels

export interface VideoLesson {
  id: string;
  title: string;
  description: string;
  youtubeUrl: string;
  duration: string;
  subject: string;
  className: string;
  chapter: number;
  difficulty: "beginner" | "intermediate" | "advanced";
  tags: string[];
}

// Helper to extract video ID from YouTube URL for thumbnails and embeds
export const getYoutubeId = (url: string): string => {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
  return match ? match[1] : "";
};

// Curated educational videos mapped to NCERT chapters - All verified real YouTube URLs
// Sources: Magnet Brains, Physics Wallah, Shobhit Nirwan, LearnoHub, BYJU'S, Dear Sir, ExamFear
export const videoLessons: VideoLesson[] = [
  // ===================== CLASS 6 =====================
  // Mathematics Class 6
  {
    id: "math-6-ch1-v1",
    title: "Knowing Our Numbers - Complete Chapter",
    description: "Large numbers, place value, estimation, and comparing numbers",
    youtubeUrl: "https://www.youtube.com/watch?v=9zXDcifU2V4",
    duration: "35:00",
    subject: "Mathematics",
    className: "6",
    chapter: 1,
    difficulty: "beginner",
    tags: ["numbers", "place value", "estimation"]
  },
  {
    id: "math-6-ch2-v1",
    title: "Whole Numbers - Properties and Operations",
    description: "Properties of whole numbers and number line concepts",
    youtubeUrl: "https://www.youtube.com/watch?v=PVNiyorUc2s",
    duration: "32:00",
    subject: "Mathematics",
    className: "6",
    chapter: 2,
    difficulty: "beginner",
    tags: ["whole numbers", "number line", "properties"]
  },
  {
    id: "math-6-ch3-v1",
    title: "Playing With Numbers - Factors, Multiples, HCF, LCM",
    description: "Complete chapter on factors, multiples, HCF and LCM with examples",
    youtubeUrl: "https://www.youtube.com/watch?v=J9CnAxVCxAU",
    duration: "40:00",
    subject: "Mathematics",
    className: "6",
    chapter: 3,
    difficulty: "beginner",
    tags: ["factors", "multiples", "HCF", "LCM"]
  },

  // Science Class 6
  {
    id: "science-6-ch1-v1",
    title: "Food: Where Does It Come From?",
    description: "Sources of food, plant and animal products",
    youtubeUrl: "https://www.youtube.com/watch?v=QlXfW5o2d30",
    duration: "30:00",
    subject: "Science",
    className: "6",
    chapter: 1,
    difficulty: "beginner",
    tags: ["food", "plants", "animals", "nutrition"]
  },
  {
    id: "science-6-ch2-v1",
    title: "Components of Food",
    description: "Nutrients, balanced diet, and deficiency diseases",
    youtubeUrl: "https://www.youtube.com/watch?v=m0f5WQ1mlf8",
    duration: "35:00",
    subject: "Science",
    className: "6",
    chapter: 2,
    difficulty: "beginner",
    tags: ["nutrients", "diet", "vitamins", "proteins"]
  },
  {
    id: "science-6-ch3-v1",
    title: "Fibre to Fabric",
    description: "Natural and synthetic fibres, fabric making process",
    youtubeUrl: "https://www.youtube.com/watch?v=GxcnY3vZuiU",
    duration: "32:00",
    subject: "Science",
    className: "6",
    chapter: 3,
    difficulty: "beginner",
    tags: ["fibre", "fabric", "cotton", "wool"]
  },

  // ===================== CLASS 7 =====================
  // Mathematics Class 7
  {
    id: "math-7-ch1-v1",
    title: "Integers - Operations and Properties",
    description: "Addition, subtraction, multiplication, and division of integers",
    youtubeUrl: "https://www.youtube.com/watch?v=7QjhVrz60So",
    duration: "40:00",
    subject: "Mathematics",
    className: "7",
    chapter: 1,
    difficulty: "beginner",
    tags: ["integers", "operations", "properties"]
  },
  {
    id: "math-7-ch2-v1",
    title: "Fractions and Decimals",
    description: "Operations on fractions and decimals",
    youtubeUrl: "https://www.youtube.com/watch?v=GkUK_2pHa0Y",
    duration: "45:00",
    subject: "Mathematics",
    className: "7",
    chapter: 2,
    difficulty: "beginner",
    tags: ["fractions", "decimals", "operations"]
  },
  {
    id: "math-7-ch3-v1",
    title: "Data Handling",
    description: "Mean, median, mode, and bar graphs",
    youtubeUrl: "https://www.youtube.com/watch?v=mxYoUDEgOXA",
    duration: "38:00",
    subject: "Mathematics",
    className: "7",
    chapter: 3,
    difficulty: "beginner",
    tags: ["data", "mean", "median", "mode"]
  },

  // Science Class 7
  {
    id: "science-7-ch1-v1",
    title: "Nutrition in Plants",
    description: "Photosynthesis and modes of nutrition",
    youtubeUrl: "https://www.youtube.com/watch?v=GgyLOeoXg6M",
    duration: "38:00",
    subject: "Science",
    className: "7",
    chapter: 1,
    difficulty: "beginner",
    tags: ["nutrition", "photosynthesis", "plants"]
  },
  {
    id: "science-7-ch2-v1",
    title: "Nutrition in Animals",
    description: "Digestive system and types of nutrition",
    youtubeUrl: "https://www.youtube.com/watch?v=L5TuPkqJGp0",
    duration: "40:00",
    subject: "Science",
    className: "7",
    chapter: 2,
    difficulty: "beginner",
    tags: ["nutrition", "digestion", "animals"]
  },
  {
    id: "science-7-ch3-v1",
    title: "Fibre to Fabric",
    description: "Wool, silk, and their processing",
    youtubeUrl: "https://www.youtube.com/watch?v=HodWVUw2lt4",
    duration: "35:00",
    subject: "Science",
    className: "7",
    chapter: 3,
    difficulty: "beginner",
    tags: ["fibre", "wool", "silk", "fabric"]
  },

  // ===================== CLASS 8 =====================
  // Mathematics Class 8
  {
    id: "math-8-ch1-v1",
    title: "Rational Numbers",
    description: "Properties of rational numbers and number line",
    youtubeUrl: "https://www.youtube.com/watch?v=877YmPOZxhU",
    duration: "42:00",
    subject: "Mathematics",
    className: "8",
    chapter: 1,
    difficulty: "intermediate",
    tags: ["rational", "numbers", "properties"]
  },
  {
    id: "math-8-ch2-v1",
    title: "Linear Equations in One Variable",
    description: "Solving linear equations with applications",
    youtubeUrl: "https://www.youtube.com/watch?v=PvJKaMWiqrw",
    duration: "45:00",
    subject: "Mathematics",
    className: "8",
    chapter: 2,
    difficulty: "intermediate",
    tags: ["linear", "equations", "variable"]
  },
  {
    id: "math-8-ch3-v1",
    title: "Understanding Quadrilaterals",
    description: "Properties of quadrilaterals",
    youtubeUrl: "https://www.youtube.com/watch?v=2CcPzhRT1Ck",
    duration: "40:00",
    subject: "Mathematics",
    className: "8",
    chapter: 3,
    difficulty: "intermediate",
    tags: ["quadrilaterals", "properties", "angles"]
  },

  // Science Class 8
  {
    id: "science-8-ch1-v1",
    title: "Crop Production and Management",
    description: "Agricultural practices and crop protection",
    youtubeUrl: "https://www.youtube.com/watch?v=LQHLUHqDqLA",
    duration: "40:00",
    subject: "Science",
    className: "8",
    chapter: 1,
    difficulty: "beginner",
    tags: ["crops", "agriculture", "farming"]
  },
  {
    id: "science-8-ch2-v1",
    title: "Microorganisms: Friend and Foe",
    description: "Types and uses of microorganisms",
    youtubeUrl: "https://www.youtube.com/watch?v=uvUfB4UQ62k",
    duration: "42:00",
    subject: "Science",
    className: "8",
    chapter: 2,
    difficulty: "beginner",
    tags: ["microorganisms", "bacteria", "virus"]
  },
  {
    id: "science-8-ch3-v1",
    title: "Synthetic Fibres and Plastics",
    description: "Types of synthetic materials",
    youtubeUrl: "https://www.youtube.com/watch?v=rsc6e_JEDY0",
    duration: "38:00",
    subject: "Science",
    className: "8",
    chapter: 3,
    difficulty: "beginner",
    tags: ["synthetic", "fibres", "plastics"]
  },

  // ===================== CLASS 9 =====================
  // Mathematics Class 9
  {
    id: "math-9-ch1-v1",
    title: "Number Systems",
    description: "Real numbers, irrational numbers, and number line",
    youtubeUrl: "https://www.youtube.com/watch?v=IMnSIaPcqiE",
    duration: "48:00",
    subject: "Mathematics",
    className: "9",
    chapter: 1,
    difficulty: "intermediate",
    tags: ["real numbers", "irrational", "number line"]
  },
  {
    id: "math-9-ch2-v1",
    title: "Polynomials",
    description: "Types of polynomials and factorization",
    youtubeUrl: "https://www.youtube.com/watch?v=mvJNnu5cLVQ",
    duration: "50:00",
    subject: "Mathematics",
    className: "9",
    chapter: 2,
    difficulty: "intermediate",
    tags: ["polynomials", "factorization", "zeros"]
  },
  {
    id: "math-9-ch3-v1",
    title: "Coordinate Geometry",
    description: "Cartesian plane and plotting points",
    youtubeUrl: "https://www.youtube.com/watch?v=piVBy9DRPOw",
    duration: "45:00",
    subject: "Mathematics",
    className: "9",
    chapter: 3,
    difficulty: "intermediate",
    tags: ["coordinates", "cartesian", "plane"]
  },

  // Science Class 9
  {
    id: "science-9-ch1-v1",
    title: "Matter in Our Surroundings",
    description: "States of matter and their properties",
    youtubeUrl: "https://www.youtube.com/watch?v=d9tySXcfT-I",
    duration: "45:00",
    subject: "Science",
    className: "9",
    chapter: 1,
    difficulty: "intermediate",
    tags: ["matter", "states", "properties"]
  },
  {
    id: "science-9-ch2-v1",
    title: "Is Matter Around Us Pure",
    description: "Mixtures, solutions, and separation techniques",
    youtubeUrl: "https://www.youtube.com/watch?v=bmzDsWMSCTk",
    duration: "48:00",
    subject: "Science",
    className: "9",
    chapter: 2,
    difficulty: "intermediate",
    tags: ["mixtures", "solutions", "separation"]
  },
  {
    id: "science-9-ch3-v1",
    title: "Atoms and Molecules",
    description: "Atomic theory and molecular formulas",
    youtubeUrl: "https://www.youtube.com/watch?v=Ltr3IROAD0E",
    duration: "50:00",
    subject: "Science",
    className: "9",
    chapter: 3,
    difficulty: "intermediate",
    tags: ["atoms", "molecules", "formulas"]
  },

  // ===================== CLASS 10 =====================
  // Mathematics Class 10
  {
    id: "math-10-ch1-v1",
    title: "Real Numbers",
    description: "Euclid's division lemma and fundamental theorem of arithmetic",
    youtubeUrl: "https://www.youtube.com/watch?v=CobQvtjL5gc",
    duration: "50:00",
    subject: "Mathematics",
    className: "10",
    chapter: 1,
    difficulty: "intermediate",
    tags: ["real numbers", "euclid", "arithmetic"]
  },
  {
    id: "math-10-ch2-v1",
    title: "Polynomials",
    description: "Zeros and division algorithm for polynomials",
    youtubeUrl: "https://www.youtube.com/watch?v=eMADAY2LUig",
    duration: "48:00",
    subject: "Mathematics",
    className: "10",
    chapter: 2,
    difficulty: "intermediate",
    tags: ["polynomials", "zeros", "division"]
  },
  {
    id: "math-10-ch3-v1",
    title: "Pair of Linear Equations in Two Variables",
    description: "Graphical and algebraic solutions",
    youtubeUrl: "https://www.youtube.com/watch?v=afn-77m40hQ",
    duration: "55:00",
    subject: "Mathematics",
    className: "10",
    chapter: 3,
    difficulty: "intermediate",
    tags: ["linear equations", "simultaneous", "graphical"]
  },
  {
    id: "math-10-ch4-v1",
    title: "Quadratic Equations",
    description: "Solving quadratic equations and applications",
    youtubeUrl: "https://www.youtube.com/watch?v=MX1iSpb4tRE",
    duration: "52:00",
    subject: "Mathematics",
    className: "10",
    chapter: 4,
    difficulty: "intermediate",
    tags: ["quadratic", "equations", "roots"]
  },
  {
    id: "math-10-ch5-v1",
    title: "Arithmetic Progressions",
    description: "AP formula and sum of n terms",
    youtubeUrl: "https://www.youtube.com/watch?v=hDPjdYkPUKc",
    duration: "48:00",
    subject: "Mathematics",
    className: "10",
    chapter: 5,
    difficulty: "intermediate",
    tags: ["AP", "arithmetic", "progression"]
  },

  // Science Class 10
  {
    id: "science-10-ch1-v1",
    title: "Chemical Reactions and Equations",
    description: "Types of chemical reactions and balancing equations",
    youtubeUrl: "https://www.youtube.com/watch?v=AEyJ0MpddzQ",
    duration: "50:00",
    subject: "Science",
    className: "10",
    chapter: 1,
    difficulty: "intermediate",
    tags: ["chemical reactions", "equations", "balancing"]
  },
  {
    id: "science-10-ch2-v1",
    title: "Acids, Bases and Salts",
    description: "Properties and reactions of acids and bases",
    youtubeUrl: "https://www.youtube.com/watch?v=tskPir8litI",
    duration: "52:00",
    subject: "Science",
    className: "10",
    chapter: 2,
    difficulty: "intermediate",
    tags: ["acids", "bases", "salts", "pH"]
  },
  {
    id: "science-10-ch3-v1",
    title: "Metals and Non-metals",
    description: "Properties, reactions, and extraction",
    youtubeUrl: "https://www.youtube.com/watch?v=ruHwWNLgBV4",
    duration: "55:00",
    subject: "Science",
    className: "10",
    chapter: 3,
    difficulty: "intermediate",
    tags: ["metals", "non-metals", "extraction"]
  },
  {
    id: "science-10-ch4-v1",
    title: "Carbon and its Compounds",
    description: "Organic chemistry and carbon compounds",
    youtubeUrl: "https://www.youtube.com/watch?v=gQ-X9wV8TXQ",
    duration: "58:00",
    subject: "Science",
    className: "10",
    chapter: 4,
    difficulty: "intermediate",
    tags: ["carbon", "organic", "compounds"]
  },
  {
    id: "science-10-ch5-v1",
    title: "Periodic Classification of Elements",
    description: "Modern periodic table and trends",
    youtubeUrl: "https://www.youtube.com/watch?v=wC84GwkZdUQ",
    duration: "50:00",
    subject: "Science",
    className: "10",
    chapter: 5,
    difficulty: "intermediate",
    tags: ["periodic table", "elements", "trends"]
  },
  {
    id: "science-10-ch6-v1",
    title: "Life Processes",
    description: "Nutrition, respiration, transportation, excretion",
    youtubeUrl: "https://www.youtube.com/watch?v=gnYyoIbq8rY",
    duration: "60:00",
    subject: "Science",
    className: "10",
    chapter: 6,
    difficulty: "intermediate",
    tags: ["life processes", "nutrition", "respiration"]
  },

  // ===================== CLASS 11 =====================
  // Physics Class 11
  {
    id: "physics-11-ch1-v1",
    title: "Physical World",
    description: "Scope and excitement of physics",
    youtubeUrl: "https://www.youtube.com/watch?v=wMSKH2245DI",
    duration: "35:00",
    subject: "Physics",
    className: "11",
    chapter: 1,
    difficulty: "intermediate",
    tags: ["physics", "introduction", "scope"]
  },
  {
    id: "physics-11-ch2-v1",
    title: "Units and Measurements",
    description: "SI units and dimensional analysis",
    youtubeUrl: "https://www.youtube.com/watch?v=yF291D4XcMo",
    duration: "50:00",
    subject: "Physics",
    className: "11",
    chapter: 2,
    difficulty: "intermediate",
    tags: ["units", "measurements", "dimensions"]
  },
  {
    id: "physics-11-ch3-v1",
    title: "Motion in a Straight Line",
    description: "Kinematics in one dimension",
    youtubeUrl: "https://www.youtube.com/watch?v=rm3i6cIxcFE",
    duration: "55:00",
    subject: "Physics",
    className: "11",
    chapter: 3,
    difficulty: "intermediate",
    tags: ["motion", "kinematics", "velocity"]
  },
  {
    id: "physics-11-ch4-v1",
    title: "Motion in a Plane",
    description: "Projectile motion and vectors",
    youtubeUrl: "https://www.youtube.com/watch?v=Bw_iyw_K65k",
    duration: "60:00",
    subject: "Physics",
    className: "11",
    chapter: 4,
    difficulty: "advanced",
    tags: ["projectile", "vectors", "motion"]
  },
  {
    id: "physics-11-ch5-v1",
    title: "Laws of Motion",
    description: "Newton's laws and applications",
    youtubeUrl: "https://www.youtube.com/watch?v=MfadB5RYDWY",
    duration: "58:00",
    subject: "Physics",
    className: "11",
    chapter: 5,
    difficulty: "intermediate",
    tags: ["newton", "laws", "force"]
  },

  // Chemistry Class 11
  {
    id: "chemistry-11-ch1-v1",
    title: "Some Basic Concepts of Chemistry",
    description: "Mole concept and stoichiometry",
    youtubeUrl: "https://www.youtube.com/watch?v=NRZMxo__tiQ",
    duration: "55:00",
    subject: "Chemistry",
    className: "11",
    chapter: 1,
    difficulty: "intermediate",
    tags: ["mole", "stoichiometry", "basics"]
  },
  {
    id: "chemistry-11-ch2-v1",
    title: "Structure of Atom",
    description: "Quantum mechanical model of atom",
    youtubeUrl: "https://www.youtube.com/watch?v=qTP-gg1TnAE",
    duration: "60:00",
    subject: "Chemistry",
    className: "11",
    chapter: 2,
    difficulty: "advanced",
    tags: ["atom", "quantum", "orbitals"]
  },
  {
    id: "chemistry-11-ch3-v1",
    title: "Classification of Elements and Periodicity",
    description: "Modern periodic table and trends",
    youtubeUrl: "https://www.youtube.com/watch?v=TRBkpnZJi4s",
    duration: "52:00",
    subject: "Chemistry",
    className: "11",
    chapter: 3,
    difficulty: "intermediate",
    tags: ["periodic table", "trends", "elements"]
  },

  // Biology Class 11
  {
    id: "biology-11-ch1-v1",
    title: "The Living World",
    description: "Diversity and characteristics of living organisms",
    youtubeUrl: "https://www.youtube.com/watch?v=K4kBhF4bRo0",
    duration: "45:00",
    subject: "Biology",
    className: "11",
    chapter: 1,
    difficulty: "intermediate",
    tags: ["living world", "diversity", "taxonomy"]
  },
  {
    id: "biology-11-ch2-v1",
    title: "Biological Classification",
    description: "Five kingdom classification",
    youtubeUrl: "https://www.youtube.com/watch?v=AkwrvTToIqI",
    duration: "50:00",
    subject: "Biology",
    className: "11",
    chapter: 2,
    difficulty: "intermediate",
    tags: ["classification", "kingdom", "taxonomy"]
  },
  {
    id: "biology-11-ch3-v1",
    title: "Plant Kingdom",
    description: "Classification of plants",
    youtubeUrl: "https://www.youtube.com/watch?v=oP2sbq9G5PI",
    duration: "55:00",
    subject: "Biology",
    className: "11",
    chapter: 3,
    difficulty: "intermediate",
    tags: ["plants", "algae", "bryophytes"]
  },

  // Mathematics Class 11
  {
    id: "math-11-ch1-v1",
    title: "Sets",
    description: "Set theory and operations",
    youtubeUrl: "https://www.youtube.com/watch?v=au3VcWIORK0",
    duration: "45:00",
    subject: "Mathematics",
    className: "11",
    chapter: 1,
    difficulty: "intermediate",
    tags: ["sets", "operations", "venn diagrams"]
  },

  // ===================== CLASS 12 =====================
  // Physics Class 12
  {
    id: "physics-12-ch1-v1",
    title: "Electric Charges and Fields",
    description: "Coulomb's law and electric field",
    youtubeUrl: "https://www.youtube.com/watch?v=i_yT6CpUOTk",
    duration: "58:00",
    subject: "Physics",
    className: "12",
    chapter: 1,
    difficulty: "advanced",
    tags: ["electric", "coulomb", "field"]
  },
  {
    id: "physics-12-ch2-v1",
    title: "Electrostatic Potential and Capacitance",
    description: "Potential, capacitors, and energy storage",
    youtubeUrl: "https://www.youtube.com/watch?v=vzpWs5IWxtg",
    duration: "60:00",
    subject: "Physics",
    className: "12",
    chapter: 2,
    difficulty: "advanced",
    tags: ["potential", "capacitance", "energy"]
  },
  {
    id: "physics-12-ch3-v1",
    title: "Current Electricity",
    description: "Ohm's law, Kirchhoff's laws, and circuits",
    youtubeUrl: "https://www.youtube.com/watch?v=N9AcRosyXe8",
    duration: "62:00",
    subject: "Physics",
    className: "12",
    chapter: 3,
    difficulty: "advanced",
    tags: ["current", "ohm", "kirchhoff"]
  },

  // Chemistry Class 12
  {
    id: "chemistry-12-ch1-v1",
    title: "The Solid State",
    description: "Crystal structures and defects",
    youtubeUrl: "https://www.youtube.com/watch?v=Qcw4yg30gWs",
    duration: "55:00",
    subject: "Chemistry",
    className: "12",
    chapter: 1,
    difficulty: "advanced",
    tags: ["solid state", "crystals", "defects"]
  },
  {
    id: "chemistry-12-ch2-v1",
    title: "Solutions",
    description: "Colligative properties and concentrations",
    youtubeUrl: "https://www.youtube.com/watch?v=Fobf8F5JVjc",
    duration: "58:00",
    subject: "Chemistry",
    className: "12",
    chapter: 2,
    difficulty: "advanced",
    tags: ["solutions", "colligative", "concentration"]
  },
  {
    id: "chemistry-12-ch3-v1",
    title: "Electrochemistry",
    description: "Electrochemical cells and electrolysis",
    youtubeUrl: "https://www.youtube.com/watch?v=QWh8RACSqxc",
    duration: "60:00",
    subject: "Chemistry",
    className: "12",
    chapter: 3,
    difficulty: "advanced",
    tags: ["electrochemistry", "cells", "electrolysis"]
  },

  // Biology Class 12
  {
    id: "biology-12-ch1-v1",
    title: "Reproduction in Organisms",
    description: "Modes of reproduction",
    youtubeUrl: "https://www.youtube.com/watch?v=byd1iIEt2Zk",
    duration: "45:00",
    subject: "Biology",
    className: "12",
    chapter: 1,
    difficulty: "intermediate",
    tags: ["reproduction", "asexual", "sexual"]
  },
  {
    id: "biology-12-ch2-v1",
    title: "Sexual Reproduction in Flowering Plants",
    description: "Pollination and fertilization",
    youtubeUrl: "https://www.youtube.com/watch?v=ayAhLuMX_7Y",
    duration: "55:00",
    subject: "Biology",
    className: "12",
    chapter: 2,
    difficulty: "intermediate",
    tags: ["pollination", "fertilization", "flowers"]
  },

  // Mathematics Class 12
  {
    id: "math-12-ch1-v1",
    title: "Relations and Functions",
    description: "Types of relations and inverse functions",
    youtubeUrl: "https://www.youtube.com/watch?v=xStr3tefyr4",
    duration: "55:00",
    subject: "Mathematics",
    className: "12",
    chapter: 1,
    difficulty: "advanced",
    tags: ["relations", "functions", "inverse"]
  },
  {
    id: "math-12-ch2-v1",
    title: "Inverse Trigonometric Functions",
    description: "Properties and graphs",
    youtubeUrl: "https://www.youtube.com/watch?v=Vw9TrxQW-34",
    duration: "52:00",
    subject: "Mathematics",
    className: "12",
    chapter: 2,
    difficulty: "advanced",
    tags: ["inverse trig", "properties", "graphs"]
  },
  {
    id: "math-12-ch3-v1",
    title: "Matrices",
    description: "Operations and types of matrices",
    youtubeUrl: "https://www.youtube.com/watch?v=84iR67XaLVE",
    duration: "58:00",
    subject: "Mathematics",
    className: "12",
    chapter: 3,
    difficulty: "advanced",
    tags: ["matrices", "operations", "types"]
  },
  {
    id: "math-12-ch4-v1",
    title: "Determinants",
    description: "Properties and applications of determinants",
    youtubeUrl: "https://www.youtube.com/watch?v=KQIFCog-d3g",
    duration: "55:00",
    subject: "Mathematics",
    className: "12",
    chapter: 4,
    difficulty: "advanced",
    tags: ["determinants", "properties", "applications"]
  },
  {
    id: "math-12-ch5-v1",
    title: "Continuity and Differentiability",
    description: "Continuity, derivatives, and chain rule",
    youtubeUrl: "https://www.youtube.com/watch?v=uA4Oj30lIPI",
    duration: "62:00",
    subject: "Mathematics",
    className: "12",
    chapter: 5,
    difficulty: "advanced",
    tags: ["continuity", "differentiability", "chain rule"]
  },
  {
    id: "math-12-ch6-v1",
    title: "Application of Derivatives",
    description: "Maxima, minima, and rate of change",
    youtubeUrl: "https://www.youtube.com/watch?v=yAV69sHWYDI",
    duration: "58:00",
    subject: "Mathematics",
    className: "12",
    chapter: 6,
    difficulty: "advanced",
    tags: ["derivatives", "maxima", "minima"]
  },

  // ===================== ADDITIONAL CHAPTERS =====================

  // Mathematics Class 6 - More Chapters
  {
    id: "math-6-ch4-v1",
    title: "Basic Geometrical Ideas",
    description: "Points, lines, curves, polygons, and angles",
    youtubeUrl: "https://www.youtube.com/watch?v=dT7OQVMQP8I",
    duration: "34:00",
    subject: "Mathematics",
    className: "6",
    chapter: 4,
    difficulty: "beginner",
    tags: ["geometry", "lines", "angles", "polygons"]
  },
  {
    id: "math-6-ch5-v1",
    title: "Understanding Elementary Shapes",
    description: "Measuring line segments, angles, and triangles",
    youtubeUrl: "https://www.youtube.com/watch?v=GQCP6LVJv1I",
    duration: "36:00",
    subject: "Mathematics",
    className: "6",
    chapter: 5,
    difficulty: "beginner",
    tags: ["shapes", "triangles", "angles"]
  },
  {
    id: "math-6-ch6-v1",
    title: "Integers",
    description: "Introduction to integers and operations",
    youtubeUrl: "https://www.youtube.com/watch?v=Dag3YoPFNek",
    duration: "38:00",
    subject: "Mathematics",
    className: "6",
    chapter: 6,
    difficulty: "beginner",
    tags: ["integers", "negative numbers", "number line"]
  },
  {
    id: "math-6-ch7-v1",
    title: "Fractions",
    description: "Types of fractions and comparison",
    youtubeUrl: "https://www.youtube.com/watch?v=qN_hXmR5yuw",
    duration: "35:00",
    subject: "Mathematics",
    className: "6",
    chapter: 7,
    difficulty: "beginner",
    tags: ["fractions", "proper", "improper", "mixed"]
  },

  // Science Class 6 - More Chapters
  {
    id: "science-6-ch4-v1",
    title: "Sorting Materials into Groups",
    description: "Classification of materials based on properties",
    youtubeUrl: "https://www.youtube.com/watch?v=F4_IQS6sV6M",
    duration: "28:00",
    subject: "Science",
    className: "6",
    chapter: 4,
    difficulty: "beginner",
    tags: ["materials", "classification", "properties"]
  },
  {
    id: "science-6-ch5-v1",
    title: "Separation of Substances",
    description: "Methods of separating mixtures",
    youtubeUrl: "https://www.youtube.com/watch?v=3KdPz7d5a4E",
    duration: "30:00",
    subject: "Science",
    className: "6",
    chapter: 5,
    difficulty: "beginner",
    tags: ["separation", "filtration", "evaporation"]
  },
  {
    id: "science-6-ch6-v1",
    title: "Changes Around Us",
    description: "Reversible and irreversible changes",
    youtubeUrl: "https://www.youtube.com/watch?v=DP6tJv-SdTw",
    duration: "25:00",
    subject: "Science",
    className: "6",
    chapter: 6,
    difficulty: "beginner",
    tags: ["changes", "reversible", "irreversible"]
  },
  {
    id: "science-6-ch7-v1",
    title: "Getting to Know Plants",
    description: "Parts of a plant and their functions",
    youtubeUrl: "https://www.youtube.com/watch?v=fXqSAVTRvCA",
    duration: "32:00",
    subject: "Science",
    className: "6",
    chapter: 7,
    difficulty: "beginner",
    tags: ["plants", "roots", "stem", "leaves"]
  },

  // Mathematics Class 7 - More Chapters
  {
    id: "math-7-ch4-v1",
    title: "Simple Equations",
    description: "Solving simple linear equations",
    youtubeUrl: "https://www.youtube.com/watch?v=lnAOB6GYLGM",
    duration: "36:00",
    subject: "Mathematics",
    className: "7",
    chapter: 4,
    difficulty: "beginner",
    tags: ["equations", "variables", "solving"]
  },
  {
    id: "math-7-ch5-v1",
    title: "Lines and Angles",
    description: "Types of angles and properties of parallel lines",
    youtubeUrl: "https://www.youtube.com/watch?v=QxaVn-BwiG4",
    duration: "40:00",
    subject: "Mathematics",
    className: "7",
    chapter: 5,
    difficulty: "beginner",
    tags: ["lines", "angles", "parallel", "transversal"]
  },
  {
    id: "math-7-ch6-v1",
    title: "The Triangle and its Properties",
    description: "Properties of triangles and angle sum property",
    youtubeUrl: "https://www.youtube.com/watch?v=sEL99K4vDEo",
    duration: "42:00",
    subject: "Mathematics",
    className: "7",
    chapter: 6,
    difficulty: "beginner",
    tags: ["triangle", "properties", "angles"]
  },

  // Science Class 7 - More Chapters
  {
    id: "science-7-ch4-v1",
    title: "Heat",
    description: "Temperature, conduction, convection, and radiation",
    youtubeUrl: "https://www.youtube.com/watch?v=TvlsIoFPdPI",
    duration: "38:00",
    subject: "Science",
    className: "7",
    chapter: 4,
    difficulty: "beginner",
    tags: ["heat", "temperature", "conduction"]
  },
  {
    id: "science-7-ch5-v1",
    title: "Acids, Bases and Salts",
    description: "Introduction to acids, bases, and indicators",
    youtubeUrl: "https://www.youtube.com/watch?v=zJT1XjBhyao",
    duration: "35:00",
    subject: "Science",
    className: "7",
    chapter: 5,
    difficulty: "beginner",
    tags: ["acids", "bases", "indicators"]
  },
  {
    id: "science-7-ch6-v1",
    title: "Physical and Chemical Changes",
    description: "Differences between physical and chemical changes",
    youtubeUrl: "https://www.youtube.com/watch?v=I56_i3JDZ4g",
    duration: "32:00",
    subject: "Science",
    className: "7",
    chapter: 6,
    difficulty: "beginner",
    tags: ["physical change", "chemical change", "rusting"]
  },

  // Mathematics Class 8 - More Chapters
  {
    id: "math-8-ch4-v1",
    title: "Practical Geometry",
    description: "Constructing quadrilaterals with given conditions",
    youtubeUrl: "https://www.youtube.com/watch?v=bYjqx7aMXis",
    duration: "35:00",
    subject: "Mathematics",
    className: "8",
    chapter: 4,
    difficulty: "intermediate",
    tags: ["geometry", "construction", "quadrilateral"]
  },
  {
    id: "math-8-ch5-v1",
    title: "Data Handling",
    description: "Pie charts, bar graphs, and probability",
    youtubeUrl: "https://www.youtube.com/watch?v=UpQ4BTZJ0xI",
    duration: "40:00",
    subject: "Mathematics",
    className: "8",
    chapter: 5,
    difficulty: "intermediate",
    tags: ["data", "pie chart", "probability"]
  },
  {
    id: "math-8-ch6-v1",
    title: "Squares and Square Roots",
    description: "Properties and methods to find square roots",
    youtubeUrl: "https://www.youtube.com/watch?v=2k9pdR-BSBA",
    duration: "42:00",
    subject: "Mathematics",
    className: "8",
    chapter: 6,
    difficulty: "intermediate",
    tags: ["squares", "square roots", "patterns"]
  },

  // Science Class 8 - More Chapters
  {
    id: "science-8-ch4-v1",
    title: "Materials: Metals and Non-Metals",
    description: "Properties and reactions of metals and non-metals",
    youtubeUrl: "https://www.youtube.com/watch?v=ypXq8xg24j0",
    duration: "40:00",
    subject: "Science",
    className: "8",
    chapter: 4,
    difficulty: "intermediate",
    tags: ["metals", "non-metals", "reactions"]
  },
  {
    id: "science-8-ch5-v1",
    title: "Coal and Petroleum",
    description: "Fossil fuels and their conservation",
    youtubeUrl: "https://www.youtube.com/watch?v=bGxwB3JReqQ",
    duration: "35:00",
    subject: "Science",
    className: "8",
    chapter: 5,
    difficulty: "beginner",
    tags: ["coal", "petroleum", "fossil fuels"]
  },
  {
    id: "science-8-ch6-v1",
    title: "Combustion and Flame",
    description: "Types of combustion and structure of flame",
    youtubeUrl: "https://www.youtube.com/watch?v=U7OqGN1Bj6E",
    duration: "30:00",
    subject: "Science",
    className: "8",
    chapter: 6,
    difficulty: "beginner",
    tags: ["combustion", "flame", "fuel"]
  },

  // Mathematics Class 9 - More Chapters
  {
    id: "math-9-ch4-v1",
    title: "Linear Equations in Two Variables",
    description: "Graph of linear equations and solutions",
    youtubeUrl: "https://www.youtube.com/watch?v=XDxOJv4rsMo",
    duration: "45:00",
    subject: "Mathematics",
    className: "9",
    chapter: 4,
    difficulty: "intermediate",
    tags: ["linear equations", "two variables", "graph"]
  },
  {
    id: "math-9-ch5-v1",
    title: "Introduction to Euclid's Geometry",
    description: "Euclid's axioms and postulates",
    youtubeUrl: "https://www.youtube.com/watch?v=UGWq7njqJxE",
    duration: "35:00",
    subject: "Mathematics",
    className: "9",
    chapter: 5,
    difficulty: "intermediate",
    tags: ["euclid", "axioms", "postulates"]
  },
  {
    id: "math-9-ch6-v1",
    title: "Lines and Angles",
    description: "Properties of angles formed by parallel lines",
    youtubeUrl: "https://www.youtube.com/watch?v=q4fW2snPbq8",
    duration: "42:00",
    subject: "Mathematics",
    className: "9",
    chapter: 6,
    difficulty: "intermediate",
    tags: ["lines", "angles", "parallel lines"]
  },
  {
    id: "math-9-ch7-v1",
    title: "Triangles",
    description: "Congruence of triangles and criteria",
    youtubeUrl: "https://www.youtube.com/watch?v=4bvnHsmFbOo",
    duration: "48:00",
    subject: "Mathematics",
    className: "9",
    chapter: 7,
    difficulty: "intermediate",
    tags: ["triangles", "congruence", "SAS", "ASA"]
  },

  // Science Class 9 - More Chapters
  {
    id: "science-9-ch4-v1",
    title: "Structure of the Atom",
    description: "Thomson, Rutherford, and Bohr models",
    youtubeUrl: "https://www.youtube.com/watch?v=bBZKI08SldM",
    duration: "50:00",
    subject: "Science",
    className: "9",
    chapter: 4,
    difficulty: "intermediate",
    tags: ["atom", "models", "electrons"]
  },
  {
    id: "science-9-ch5-v1",
    title: "The Fundamental Unit of Life",
    description: "Cell structure and organelles",
    youtubeUrl: "https://www.youtube.com/watch?v=j1cqh7Vk7rw",
    duration: "45:00",
    subject: "Science",
    className: "9",
    chapter: 5,
    difficulty: "intermediate",
    tags: ["cell", "organelles", "nucleus"]
  },
  {
    id: "science-9-ch6-v1",
    title: "Tissues",
    description: "Plant and animal tissues",
    youtubeUrl: "https://www.youtube.com/watch?v=K4MrBN09I4E",
    duration: "42:00",
    subject: "Science",
    className: "9",
    chapter: 6,
    difficulty: "intermediate",
    tags: ["tissues", "meristematic", "epithelial"]
  },
  {
    id: "science-9-ch7-v1",
    title: "Diversity in Living Organisms",
    description: "Classification and biodiversity",
    youtubeUrl: "https://www.youtube.com/watch?v=z6YYBwcSJac",
    duration: "48:00",
    subject: "Science",
    className: "9",
    chapter: 7,
    difficulty: "intermediate",
    tags: ["diversity", "classification", "kingdom"]
  },
  {
    id: "science-9-ch8-v1",
    title: "Motion",
    description: "Distance, displacement, speed, velocity, and acceleration",
    youtubeUrl: "https://www.youtube.com/watch?v=F3soHfDjvME",
    duration: "55:00",
    subject: "Science",
    className: "9",
    chapter: 8,
    difficulty: "intermediate",
    tags: ["motion", "speed", "velocity", "acceleration"]
  },
  {
    id: "science-9-ch9-v1",
    title: "Force and Laws of Motion",
    description: "Newton's laws and inertia",
    youtubeUrl: "https://www.youtube.com/watch?v=DfznnKUwywQ",
    duration: "50:00",
    subject: "Science",
    className: "9",
    chapter: 9,
    difficulty: "intermediate",
    tags: ["force", "newton", "inertia"]
  },
  {
    id: "science-9-ch10-v1",
    title: "Gravitation",
    description: "Universal law of gravitation and free fall",
    youtubeUrl: "https://www.youtube.com/watch?v=FMCO3_Yvktg",
    duration: "48:00",
    subject: "Science",
    className: "9",
    chapter: 10,
    difficulty: "intermediate",
    tags: ["gravitation", "free fall", "weight"]
  },

  // Mathematics Class 10 - More Chapters
  {
    id: "math-10-ch6-v1",
    title: "Triangles",
    description: "Similar triangles and criteria for similarity",
    youtubeUrl: "https://www.youtube.com/watch?v=dA28RLESxaE",
    duration: "55:00",
    subject: "Mathematics",
    className: "10",
    chapter: 6,
    difficulty: "intermediate",
    tags: ["triangles", "similarity", "AAA", "SAS"]
  },
  {
    id: "math-10-ch7-v1",
    title: "Coordinate Geometry",
    description: "Distance formula, section formula, area of triangle",
    youtubeUrl: "https://www.youtube.com/watch?v=q1aGP7n6Htg",
    duration: "50:00",
    subject: "Mathematics",
    className: "10",
    chapter: 7,
    difficulty: "intermediate",
    tags: ["coordinate", "distance", "section formula"]
  },
  {
    id: "math-10-ch8-v1",
    title: "Introduction to Trigonometry",
    description: "Trigonometric ratios and identities",
    youtubeUrl: "https://www.youtube.com/watch?v=FtPi0LzgefA",
    duration: "52:00",
    subject: "Mathematics",
    className: "10",
    chapter: 8,
    difficulty: "intermediate",
    tags: ["trigonometry", "ratios", "identities"]
  },
  {
    id: "math-10-ch9-v1",
    title: "Some Applications of Trigonometry",
    description: "Heights and distances problems",
    youtubeUrl: "https://www.youtube.com/watch?v=WwUvLlhkibE",
    duration: "45:00",
    subject: "Mathematics",
    className: "10",
    chapter: 9,
    difficulty: "intermediate",
    tags: ["heights", "distances", "angle of elevation"]
  },
  {
    id: "math-10-ch10-v1",
    title: "Circles",
    description: "Tangent to a circle and number of tangents",
    youtubeUrl: "https://www.youtube.com/watch?v=u5bLcN1b1TA",
    duration: "48:00",
    subject: "Mathematics",
    className: "10",
    chapter: 10,
    difficulty: "intermediate",
    tags: ["circles", "tangent", "secant"]
  },

  // Science Class 10 - More Chapters
  {
    id: "science-10-ch7-v1",
    title: "Control and Coordination",
    description: "Nervous system and hormones",
    youtubeUrl: "https://www.youtube.com/watch?v=xIDDRKjhQ6U",
    duration: "52:00",
    subject: "Science",
    className: "10",
    chapter: 7,
    difficulty: "intermediate",
    tags: ["nervous system", "hormones", "coordination"]
  },
  {
    id: "science-10-ch8-v1",
    title: "How do Organisms Reproduce?",
    description: "Modes of reproduction in plants and animals",
    youtubeUrl: "https://www.youtube.com/watch?v=n9IxVxVr2CQ",
    duration: "55:00",
    subject: "Science",
    className: "10",
    chapter: 8,
    difficulty: "intermediate",
    tags: ["reproduction", "fission", "budding"]
  },
  {
    id: "science-10-ch9-v1",
    title: "Heredity and Evolution",
    description: "Mendel's laws and evolution",
    youtubeUrl: "https://www.youtube.com/watch?v=0DnFmfYXh7g",
    duration: "50:00",
    subject: "Science",
    className: "10",
    chapter: 9,
    difficulty: "intermediate",
    tags: ["heredity", "genetics", "evolution"]
  },
  {
    id: "science-10-ch10-v1",
    title: "Light - Reflection and Refraction",
    description: "Laws of reflection, mirrors, lenses",
    youtubeUrl: "https://www.youtube.com/watch?v=1WJMxBn4ZMU",
    duration: "58:00",
    subject: "Science",
    className: "10",
    chapter: 10,
    difficulty: "intermediate",
    tags: ["light", "reflection", "refraction", "lens"]
  },
  {
    id: "science-10-ch11-v1",
    title: "Human Eye and Colourful World",
    description: "Defects of vision and atmospheric refraction",
    youtubeUrl: "https://www.youtube.com/watch?v=j4x0p-BiTOo",
    duration: "45:00",
    subject: "Science",
    className: "10",
    chapter: 11,
    difficulty: "intermediate",
    tags: ["eye", "vision", "prism", "rainbow"]
  },
  {
    id: "science-10-ch12-v1",
    title: "Electricity",
    description: "Ohm's law, resistance, and circuits",
    youtubeUrl: "https://www.youtube.com/watch?v=9gSWmBPRfBo",
    duration: "60:00",
    subject: "Science",
    className: "10",
    chapter: 12,
    difficulty: "intermediate",
    tags: ["electricity", "ohm", "resistance", "circuits"]
  },
  {
    id: "science-10-ch13-v1",
    title: "Magnetic Effects of Electric Current",
    description: "Electromagnets and electromagnetic induction",
    youtubeUrl: "https://www.youtube.com/watch?v=ynxgJR-XL-E",
    duration: "52:00",
    subject: "Science",
    className: "10",
    chapter: 13,
    difficulty: "intermediate",
    tags: ["magnetic", "electromagnet", "induction"]
  },

  // Physics Class 11 - More Chapters
  {
    id: "physics-11-ch6-v1",
    title: "Work, Energy and Power",
    description: "Work-energy theorem and conservation of energy",
    youtubeUrl: "https://www.youtube.com/watch?v=PKGPGKZ5JSU",
    duration: "55:00",
    subject: "Physics",
    className: "11",
    chapter: 6,
    difficulty: "intermediate",
    tags: ["work", "energy", "power"]
  },
  {
    id: "physics-11-ch7-v1",
    title: "System of Particles and Rotational Motion",
    description: "Centre of mass and moment of inertia",
    youtubeUrl: "https://www.youtube.com/watch?v=KrN_pVxiF0o",
    duration: "62:00",
    subject: "Physics",
    className: "11",
    chapter: 7,
    difficulty: "advanced",
    tags: ["rotation", "centre of mass", "torque"]
  },
  {
    id: "physics-11-ch8-v1",
    title: "Gravitation",
    description: "Kepler's laws and gravitational potential energy",
    youtubeUrl: "https://www.youtube.com/watch?v=e0MIBC62dDY",
    duration: "55:00",
    subject: "Physics",
    className: "11",
    chapter: 8,
    difficulty: "advanced",
    tags: ["gravitation", "kepler", "satellites"]
  },

  // Chemistry Class 11 - More Chapters
  {
    id: "chemistry-11-ch4-v1",
    title: "Chemical Bonding and Molecular Structure",
    description: "Ionic, covalent bonds and VSEPR theory",
    youtubeUrl: "https://www.youtube.com/watch?v=UVf0Fke0_wE",
    duration: "58:00",
    subject: "Chemistry",
    className: "11",
    chapter: 4,
    difficulty: "advanced",
    tags: ["bonding", "ionic", "covalent", "VSEPR"]
  },
  {
    id: "chemistry-11-ch5-v1",
    title: "States of Matter",
    description: "Gas laws and kinetic theory",
    youtubeUrl: "https://www.youtube.com/watch?v=TEPfNWqxVII",
    duration: "50:00",
    subject: "Chemistry",
    className: "11",
    chapter: 5,
    difficulty: "intermediate",
    tags: ["gas laws", "kinetic theory", "ideal gas"]
  },
  {
    id: "chemistry-11-ch6-v1",
    title: "Thermodynamics",
    description: "First and second law of thermodynamics",
    youtubeUrl: "https://www.youtube.com/watch?v=wLcGJyoqIew",
    duration: "60:00",
    subject: "Chemistry",
    className: "11",
    chapter: 6,
    difficulty: "advanced",
    tags: ["thermodynamics", "enthalpy", "entropy"]
  },

  // Biology Class 11 - More Chapters
  {
    id: "biology-11-ch4-v1",
    title: "Animal Kingdom",
    description: "Classification of animals with examples",
    youtubeUrl: "https://www.youtube.com/watch?v=fgN52Y7LeMI",
    duration: "55:00",
    subject: "Biology",
    className: "11",
    chapter: 4,
    difficulty: "intermediate",
    tags: ["animals", "phylum", "classification"]
  },
  {
    id: "biology-11-ch5-v1",
    title: "Morphology of Flowering Plants",
    description: "Root, stem, leaf, and flower structure",
    youtubeUrl: "https://www.youtube.com/watch?v=axh6wXRUQls",
    duration: "50:00",
    subject: "Biology",
    className: "11",
    chapter: 5,
    difficulty: "intermediate",
    tags: ["morphology", "root", "stem", "flower"]
  },

  // Mathematics Class 11 - More Chapters
  {
    id: "math-11-ch2-v1",
    title: "Relations and Functions",
    description: "Cartesian product and types of relations",
    youtubeUrl: "https://www.youtube.com/watch?v=BXGJQbni4YA",
    duration: "48:00",
    subject: "Mathematics",
    className: "11",
    chapter: 2,
    difficulty: "intermediate",
    tags: ["relations", "functions", "domain", "range"]
  },
  {
    id: "math-11-ch3-v1",
    title: "Trigonometric Functions",
    description: "Trigonometric ratios and identities",
    youtubeUrl: "https://www.youtube.com/watch?v=VL24Se3GNx4",
    duration: "55:00",
    subject: "Mathematics",
    className: "11",
    chapter: 3,
    difficulty: "intermediate",
    tags: ["trigonometry", "ratios", "identities"]
  },
  {
    id: "math-11-ch4-v1",
    title: "Principle of Mathematical Induction",
    description: "Proving statements using induction",
    youtubeUrl: "https://www.youtube.com/watch?v=wINW6aNH9cE",
    duration: "42:00",
    subject: "Mathematics",
    className: "11",
    chapter: 4,
    difficulty: "advanced",
    tags: ["induction", "proof", "mathematical"]
  },

  // Physics Class 12 - More Chapters
  {
    id: "physics-12-ch4-v1",
    title: "Moving Charges and Magnetism",
    description: "Biot-Savart law and Ampere's law",
    youtubeUrl: "https://www.youtube.com/watch?v=EwbbBKJq9YY",
    duration: "58:00",
    subject: "Physics",
    className: "12",
    chapter: 4,
    difficulty: "advanced",
    tags: ["magnetism", "biot-savart", "ampere"]
  },
  {
    id: "physics-12-ch5-v1",
    title: "Magnetism and Matter",
    description: "Magnetic properties of materials",
    youtubeUrl: "https://www.youtube.com/watch?v=mWX2QfZRcuQ",
    duration: "48:00",
    subject: "Physics",
    className: "12",
    chapter: 5,
    difficulty: "advanced",
    tags: ["magnetism", "diamagnetic", "paramagnetic"]
  },
  {
    id: "physics-12-ch6-v1",
    title: "Electromagnetic Induction",
    description: "Faraday's laws and Lenz's law",
    youtubeUrl: "https://www.youtube.com/watch?v=EXx-3Y9Y0pM",
    duration: "55:00",
    subject: "Physics",
    className: "12",
    chapter: 6,
    difficulty: "advanced",
    tags: ["EMI", "faraday", "lenz"]
  },

  // Chemistry Class 12 - More Chapters
  {
    id: "chemistry-12-ch4-v1",
    title: "Chemical Kinetics",
    description: "Rate of reaction and order of reaction",
    youtubeUrl: "https://www.youtube.com/watch?v=pIY8-MQqmhI",
    duration: "55:00",
    subject: "Chemistry",
    className: "12",
    chapter: 4,
    difficulty: "advanced",
    tags: ["kinetics", "rate", "order"]
  },
  {
    id: "chemistry-12-ch5-v1",
    title: "Surface Chemistry",
    description: "Adsorption, catalysis, and colloids",
    youtubeUrl: "https://www.youtube.com/watch?v=TfZlQc9V9Gk",
    duration: "50:00",
    subject: "Chemistry",
    className: "12",
    chapter: 5,
    difficulty: "advanced",
    tags: ["adsorption", "catalysis", "colloids"]
  },

  // Biology Class 12 - More Chapters
  {
    id: "biology-12-ch3-v1",
    title: "Human Reproduction",
    description: "Male and female reproductive systems",
    youtubeUrl: "https://www.youtube.com/watch?v=aMm5T7IWl3g",
    duration: "55:00",
    subject: "Biology",
    className: "12",
    chapter: 3,
    difficulty: "intermediate",
    tags: ["reproduction", "gametogenesis", "fertilization"]
  },
  {
    id: "biology-12-ch4-v1",
    title: "Reproductive Health",
    description: "Birth control and STDs",
    youtubeUrl: "https://www.youtube.com/watch?v=RzKEPE0Z6bI",
    duration: "40:00",
    subject: "Biology",
    className: "12",
    chapter: 4,
    difficulty: "intermediate",
    tags: ["reproductive health", "contraception", "STD"]
  },
  {
    id: "biology-12-ch5-v1",
    title: "Principles of Inheritance and Variation",
    description: "Mendel's laws and chromosomal theory",
    youtubeUrl: "https://www.youtube.com/watch?v=CBezq1fFUEA",
    duration: "60:00",
    subject: "Biology",
    className: "12",
    chapter: 5,
    difficulty: "advanced",
    tags: ["inheritance", "mendel", "genetics"]
  },

  // Mathematics Class 12 - More Chapters
  {
    id: "math-12-ch7-v1",
    title: "Integrals",
    description: "Indefinite and definite integrals with methods",
    youtubeUrl: "https://www.youtube.com/watch?v=O8GZVc8XEOQ",
    duration: "65:00",
    subject: "Mathematics",
    className: "12",
    chapter: 7,
    difficulty: "advanced",
    tags: ["integrals", "integration", "definite"]
  },
  {
    id: "math-12-ch8-v1",
    title: "Application of Integrals",
    description: "Area under curves and between curves",
    youtubeUrl: "https://www.youtube.com/watch?v=t0hkFMFg3Pg",
    duration: "50:00",
    subject: "Mathematics",
    className: "12",
    chapter: 8,
    difficulty: "advanced",
    tags: ["area", "curves", "integration"]
  },
  {
    id: "math-12-ch9-v1",
    title: "Differential Equations",
    description: "Formation and solution of differential equations",
    youtubeUrl: "https://www.youtube.com/watch?v=kJAl9H3xNB4",
    duration: "58:00",
    subject: "Mathematics",
    className: "12",
    chapter: 9,
    difficulty: "advanced",
    tags: ["differential equations", "order", "degree"]
  },
  {
    id: "math-12-ch10-v1",
    title: "Vector Algebra",
    description: "Types of vectors, dot and cross product",
    youtubeUrl: "https://www.youtube.com/watch?v=F37j1lGxPPE",
    duration: "55:00",
    subject: "Mathematics",
    className: "12",
    chapter: 10,
    difficulty: "advanced",
    tags: ["vectors", "dot product", "cross product"]
  }
];

// Helper functions for filtering videos
export const getAllClasses = (): string[] => {
  const classes = new Set(videoLessons.map(v => v.className));
  return Array.from(classes).sort((a, b) => parseInt(a) - parseInt(b));
};

export const getSubjectsByClass = (className: string): string[] => {
  const subjects = new Set(
    videoLessons.filter(v => v.className === className).map(v => v.subject)
  );
  return Array.from(subjects).sort();
};

export const getVideosBySubject = (subject: string, className: string): VideoLesson[] => {
  return videoLessons.filter(v => v.subject === subject && v.className === className);
};
