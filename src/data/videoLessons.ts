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
