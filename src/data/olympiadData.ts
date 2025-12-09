// Olympiad Preparation Data for various competitions

export interface OlympiadTopic {
  id: string;
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
}

export interface OlympiadExam {
  id: string;
  name: string;
  fullName: string;
  organizer: string;
  description: string;
  icon: string;
  color: string;
  eligibleClasses: string[];
  topics: OlympiadTopic[];
  examPattern: {
    duration: string;
    totalQuestions: number;
    marksPerQuestion: number;
    negativeMarking: boolean;
    sections: string[];
  };
  importantDates: {
    registration: string;
    level1: string;
    level2: string;
  };
  resources: string[];
}

export const olympiadExams: OlympiadExam[] = [
  {
    id: "imo",
    name: "IMO",
    fullName: "International Mathematics Olympiad",
    organizer: "Science Olympiad Foundation (SOF)",
    description: "IMO is a prestigious mathematics competition that tests logical reasoning, analytical thinking, and mathematical aptitude across various topics.",
    icon: "Calculator",
    color: "blue",
    eligibleClasses: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    topics: [
      { id: "imo-1", title: "Number System", description: "Properties of integers, divisibility, prime numbers, LCM, HCF", difficulty: "easy" },
      { id: "imo-2", title: "Algebra", description: "Equations, inequalities, polynomials, sequences", difficulty: "medium" },
      { id: "imo-3", title: "Geometry", description: "Triangles, circles, quadrilaterals, coordinate geometry", difficulty: "medium" },
      { id: "imo-4", title: "Mensuration", description: "Areas, volumes, surface areas of 2D and 3D shapes", difficulty: "easy" },
      { id: "imo-5", title: "Data Handling", description: "Statistics, probability, graphs, charts", difficulty: "easy" },
      { id: "imo-6", title: "Logical Reasoning", description: "Pattern recognition, series, analogies", difficulty: "medium" },
      { id: "imo-7", title: "Number Theory", description: "Modular arithmetic, Fermat's theorem, Chinese remainder theorem", difficulty: "hard" },
      { id: "imo-8", title: "Combinatorics", description: "Permutations, combinations, counting principles", difficulty: "hard" },
      { id: "imo-9", title: "Calculus Basics", description: "Limits, derivatives, basic integration (Class 11-12)", difficulty: "hard" },
      { id: "imo-10", title: "Mathematical Olympiad Problems", description: "Previous year IMO problems and solutions", difficulty: "hard" },
    ],
    examPattern: {
      duration: "60 minutes",
      totalQuestions: 50,
      marksPerQuestion: 1,
      negativeMarking: false,
      sections: ["Logical Reasoning", "Mathematical Reasoning", "Everyday Mathematics", "Achievers Section"],
    },
    importantDates: {
      registration: "July - September",
      level1: "October - November",
      level2: "December",
    },
    resources: [
      "NCERT Mathematics textbooks",
      "Previous year IMO papers",
      "R.D. Sharma for competitive math",
      "MTG IMO workbooks",
    ],
  },
  {
    id: "nso",
    name: "NSO",
    fullName: "National Science Olympiad",
    organizer: "Science Olympiad Foundation (SOF)",
    description: "NSO tests scientific knowledge, reasoning ability, and understanding of scientific concepts across Physics, Chemistry, and Biology.",
    icon: "Atom",
    color: "green",
    eligibleClasses: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    topics: [
      { id: "nso-1", title: "Physics - Mechanics", description: "Motion, force, energy, work, power", difficulty: "medium" },
      { id: "nso-2", title: "Physics - Electricity & Magnetism", description: "Circuits, electromagnetic induction, magnetism", difficulty: "medium" },
      { id: "nso-3", title: "Physics - Optics & Waves", description: "Light, sound, wave properties", difficulty: "medium" },
      { id: "nso-4", title: "Chemistry - Physical Chemistry", description: "Atomic structure, periodic table, chemical bonding", difficulty: "medium" },
      { id: "nso-5", title: "Chemistry - Organic Chemistry", description: "Hydrocarbons, functional groups, reactions", difficulty: "hard" },
      { id: "nso-6", title: "Chemistry - Inorganic Chemistry", description: "Elements, compounds, reactions, acids and bases", difficulty: "medium" },
      { id: "nso-7", title: "Biology - Cell Biology", description: "Cell structure, cell division, genetics", difficulty: "medium" },
      { id: "nso-8", title: "Biology - Human Physiology", description: "Organ systems, health and diseases", difficulty: "easy" },
      { id: "nso-9", title: "Biology - Ecology", description: "Ecosystems, environment, biodiversity", difficulty: "easy" },
      { id: "nso-10", title: "Scientific Reasoning", description: "Logical analysis, scientific method, experiments", difficulty: "medium" },
    ],
    examPattern: {
      duration: "60 minutes",
      totalQuestions: 50,
      marksPerQuestion: 1,
      negativeMarking: false,
      sections: ["Science", "Achievers Section", "Logical Reasoning"],
    },
    importantDates: {
      registration: "July - September",
      level1: "November - December",
      level2: "February",
    },
    resources: [
      "NCERT Science textbooks",
      "Previous year NSO papers",
      "MTG NSO workbooks",
      "Lakhmir Singh Science books",
    ],
  },
  {
    id: "ios",
    name: "IOS",
    fullName: "International Olympiad of Science",
    organizer: "Silverzone Foundation",
    description: "IOS evaluates students' scientific knowledge and analytical skills through challenging questions on physics, chemistry, biology, and general science.",
    icon: "Microscope",
    color: "purple",
    eligibleClasses: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    topics: [
      { id: "ios-1", title: "Physics Fundamentals", description: "Basic physics concepts, laws, and applications", difficulty: "easy" },
      { id: "ios-2", title: "Advanced Physics", description: "Thermodynamics, modern physics, advanced mechanics", difficulty: "hard" },
      { id: "ios-3", title: "Chemistry Fundamentals", description: "Chemical reactions, periodic table, bonding", difficulty: "easy" },
      { id: "ios-4", title: "Advanced Chemistry", description: "Organic reactions, electrochemistry, coordination compounds", difficulty: "hard" },
      { id: "ios-5", title: "Biology Fundamentals", description: "Living organisms, life processes, classification", difficulty: "easy" },
      { id: "ios-6", title: "Advanced Biology", description: "Genetics, evolution, biotechnology", difficulty: "hard" },
      { id: "ios-7", title: "Environmental Science", description: "Pollution, conservation, sustainable development", difficulty: "medium" },
      { id: "ios-8", title: "Space Science", description: "Solar system, stars, universe, space exploration", difficulty: "medium" },
      { id: "ios-9", title: "Current Science Affairs", description: "Recent discoveries, inventions, scientific news", difficulty: "medium" },
      { id: "ios-10", title: "Critical Thinking in Science", description: "Problem-solving, hypothesis testing, analysis", difficulty: "hard" },
    ],
    examPattern: {
      duration: "60 minutes",
      totalQuestions: 50,
      marksPerQuestion: 1,
      negativeMarking: false,
      sections: ["Science", "Reasoning & Aptitude", "Scholar's Zone"],
    },
    importantDates: {
      registration: "June - August",
      level1: "August - October",
      level2: "December - January",
    },
    resources: [
      "NCERT Science textbooks",
      "Previous year IOS papers",
      "Silverzone IOS workbooks",
      "Science encyclopedias",
    ],
  },
  {
    id: "iom",
    name: "IOM",
    fullName: "International Olympiad of Mathematics",
    organizer: "Silverzone Foundation",
    description: "IOM challenges students with mathematical problems that test computational skills, logical reasoning, and problem-solving abilities.",
    icon: "Pi",
    color: "orange",
    eligibleClasses: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    topics: [
      { id: "iom-1", title: "Arithmetic", description: "Number operations, fractions, decimals, percentages", difficulty: "easy" },
      { id: "iom-2", title: "Algebra Basics", description: "Variables, expressions, simple equations", difficulty: "easy" },
      { id: "iom-3", title: "Advanced Algebra", description: "Quadratics, polynomials, inequalities", difficulty: "medium" },
      { id: "iom-4", title: "Geometry Basics", description: "Shapes, angles, perimeter, area", difficulty: "easy" },
      { id: "iom-5", title: "Advanced Geometry", description: "Theorems, proofs, coordinate geometry", difficulty: "hard" },
      { id: "iom-6", title: "Trigonometry", description: "Ratios, identities, applications", difficulty: "medium" },
      { id: "iom-7", title: "Statistics & Probability", description: "Data analysis, mean, median, mode, probability", difficulty: "medium" },
      { id: "iom-8", title: "Number Theory", description: "Primes, factors, divisibility rules", difficulty: "hard" },
      { id: "iom-9", title: "Mathematical Reasoning", description: "Patterns, sequences, logical deductions", difficulty: "medium" },
      { id: "iom-10", title: "Word Problems", description: "Real-life applications, problem interpretation", difficulty: "medium" },
    ],
    examPattern: {
      duration: "60 minutes",
      totalQuestions: 50,
      marksPerQuestion: 1,
      negativeMarking: false,
      sections: ["Mathematics", "Reasoning & Aptitude", "Scholar's Zone"],
    },
    importantDates: {
      registration: "June - August",
      level1: "August - October",
      level2: "December - January",
    },
    resources: [
      "NCERT Mathematics textbooks",
      "Previous year IOM papers",
      "Silverzone IOM workbooks",
      "RS Aggarwal Mathematics",
    ],
  },
  {
    id: "ieo",
    name: "IEO",
    fullName: "International English Olympiad",
    organizer: "Science Olympiad Foundation (SOF)",
    description: "IEO tests English language proficiency including grammar, vocabulary, reading comprehension, and written expression.",
    icon: "BookOpen",
    color: "indigo",
    eligibleClasses: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    topics: [
      { id: "ieo-1", title: "Grammar & Usage", description: "Parts of speech, tenses, sentence structure", difficulty: "easy" },
      { id: "ieo-2", title: "Vocabulary Building", description: "Synonyms, antonyms, word meanings, idioms", difficulty: "medium" },
      { id: "ieo-3", title: "Reading Comprehension", description: "Passage analysis, inference, main ideas", difficulty: "medium" },
      { id: "ieo-4", title: "Writing Skills", description: "Essay structure, coherence, expression", difficulty: "hard" },
      { id: "ieo-5", title: "Spoken English", description: "Pronunciation, conversation, public speaking", difficulty: "medium" },
    ],
    examPattern: {
      duration: "60 minutes",
      totalQuestions: 50,
      marksPerQuestion: 1,
      negativeMarking: false,
      sections: ["Word & Structure Knowledge", "Reading", "Spoken & Written Expression", "Achievers Section"],
    },
    importantDates: {
      registration: "July - September",
      level1: "October - November",
      level2: "January - February",
    },
    resources: [
      "NCERT English textbooks",
      "Previous year IEO papers",
      "Wren & Martin Grammar",
      "Word Power Made Easy",
    ],
  },
  {
    id: "igeo",
    name: "iGeo",
    fullName: "International Geography Olympiad",
    organizer: "International Geographical Union",
    description: "iGeo tests knowledge of physical and human geography, map skills, and environmental awareness.",
    icon: "Globe",
    color: "teal",
    eligibleClasses: ["9", "10", "11", "12"],
    topics: [
      { id: "igeo-1", title: "Physical Geography", description: "Landforms, climate, natural disasters", difficulty: "medium" },
      { id: "igeo-2", title: "Human Geography", description: "Population, urbanization, migration", difficulty: "medium" },
      { id: "igeo-3", title: "Cartography", description: "Map reading, GIS, remote sensing", difficulty: "hard" },
      { id: "igeo-4", title: "Environmental Geography", description: "Ecosystems, conservation, sustainability", difficulty: "medium" },
      { id: "igeo-5", title: "Economic Geography", description: "Resources, industries, trade", difficulty: "medium" },
    ],
    examPattern: {
      duration: "120 minutes",
      totalQuestions: 40,
      marksPerQuestion: 2,
      negativeMarking: false,
      sections: ["Written Response", "Multimedia Test", "Fieldwork"],
    },
    importantDates: {
      registration: "January - March",
      level1: "April - May",
      level2: "July - August",
    },
    resources: [
      "NCERT Geography textbooks",
      "Oxford Atlas",
      "Previous iGeo papers",
      "National Geographic resources",
    ],
  },
  {
    id: "iho",
    name: "IHO",
    fullName: "International History Olympiad",
    organizer: "International Academic Competitions",
    description: "IHO tests knowledge of world history, historical analysis, and understanding of historical events and their impact.",
    icon: "Landmark",
    color: "amber",
    eligibleClasses: ["6", "7", "8", "9", "10", "11", "12"],
    topics: [
      { id: "iho-1", title: "Ancient Civilizations", description: "Mesopotamia, Egypt, Indus Valley, Greece, Rome", difficulty: "medium" },
      { id: "iho-2", title: "Medieval History", description: "Middle Ages, Islamic Golden Age, Feudalism", difficulty: "medium" },
      { id: "iho-3", title: "Modern History", description: "Industrial Revolution, Colonialism, World Wars", difficulty: "hard" },
      { id: "iho-4", title: "Indian History", description: "Ancient to Modern India, Freedom Struggle", difficulty: "medium" },
      { id: "iho-5", title: "Contemporary History", description: "Cold War, Globalization, 21st Century", difficulty: "medium" },
    ],
    examPattern: {
      duration: "90 minutes",
      totalQuestions: 60,
      marksPerQuestion: 1,
      negativeMarking: false,
      sections: ["Multiple Choice", "Document Analysis", "Essay"],
    },
    importantDates: {
      registration: "March - May",
      level1: "June - July",
      level2: "August",
    },
    resources: [
      "NCERT History textbooks",
      "Previous IHO papers",
      "A History of the Modern World",
      "Historical documentaries",
    ],
  },
  {
    id: "eco",
    name: "ECO",
    fullName: "Economics Olympiad",
    organizer: "International Economics Olympiad",
    description: "ECO tests understanding of microeconomics, macroeconomics, and economic reasoning skills.",
    icon: "TrendingUp",
    color: "emerald",
    eligibleClasses: ["9", "10", "11", "12"],
    topics: [
      { id: "eco-1", title: "Microeconomics", description: "Supply, demand, market structures, consumer behavior", difficulty: "medium" },
      { id: "eco-2", title: "Macroeconomics", description: "GDP, inflation, unemployment, monetary policy", difficulty: "hard" },
      { id: "eco-3", title: "International Economics", description: "Trade, exchange rates, globalization", difficulty: "hard" },
      { id: "eco-4", title: "Financial Economics", description: "Banking, investments, stock markets", difficulty: "medium" },
      { id: "eco-5", title: "Economic Reasoning", description: "Game theory, decision making, analysis", difficulty: "hard" },
    ],
    examPattern: {
      duration: "120 minutes",
      totalQuestions: 40,
      marksPerQuestion: 2,
      negativeMarking: false,
      sections: ["Economics", "Financial Literacy", "Business Case Study"],
    },
    importantDates: {
      registration: "October - December",
      level1: "January - February",
      level2: "March - April",
    },
    resources: [
      "NCERT Economics textbooks",
      "Microeconomics by Mankiw",
      "The Economist magazine",
      "Previous ECO papers",
    ],
  },
];

export const getOlympiadById = (id: string): OlympiadExam | undefined => {
  return olympiadExams.find((exam) => exam.id === id);
};

export const getOlympiadsByClass = (className: string): OlympiadExam[] => {
  return olympiadExams.filter((exam) => exam.eligibleClasses.includes(className));
};
