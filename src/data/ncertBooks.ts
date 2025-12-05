// NCERT Official Book Links - These link to the official NCERT textbooks
// Source: https://ncert.nic.in/textbook.php

export interface NCERTChapter {
  number: number;
  title: string;
  url: string;
}

export interface NCERTBook {
  id: string;
  className: string;
  subject: string;
  chapters: NCERTChapter[];
}

const NCERT_BASE_URL = "https://ncert.nic.in/textbook.php?";

export const ncertBooks: NCERTBook[] = [
  // ==================== CLASS 6 ====================
  // Class 6 Mathematics
  {
    id: "math-6",
    className: "6",
    subject: "Mathematics",
    chapters: [
      { number: 1, title: "Knowing Our Numbers", url: `${NCERT_BASE_URL}femh1=1-1` },
      { number: 2, title: "Whole Numbers", url: `${NCERT_BASE_URL}femh1=2-2` },
      { number: 3, title: "Playing with Numbers", url: `${NCERT_BASE_URL}femh1=3-3` },
      { number: 4, title: "Basic Geometrical Ideas", url: `${NCERT_BASE_URL}femh1=4-4` },
      { number: 5, title: "Understanding Elementary Shapes", url: `${NCERT_BASE_URL}femh1=5-5` },
      { number: 6, title: "Integers", url: `${NCERT_BASE_URL}femh1=6-6` },
      { number: 7, title: "Fractions", url: `${NCERT_BASE_URL}femh1=7-7` },
      { number: 8, title: "Decimals", url: `${NCERT_BASE_URL}femh1=8-8` },
      { number: 9, title: "Data Handling", url: `${NCERT_BASE_URL}femh1=9-9` },
      { number: 10, title: "Mensuration", url: `${NCERT_BASE_URL}femh1=10-10` },
      { number: 11, title: "Algebra", url: `${NCERT_BASE_URL}femh1=11-11` },
      { number: 12, title: "Ratio and Proportion", url: `${NCERT_BASE_URL}femh1=12-12` },
      { number: 13, title: "Symmetry", url: `${NCERT_BASE_URL}femh1=13-13` },
      { number: 14, title: "Practical Geometry", url: `${NCERT_BASE_URL}femh1=14-14` },
    ],
  },
  // Class 6 Science
  {
    id: "science-6",
    className: "6",
    subject: "Science",
    chapters: [
      { number: 1, title: "Food: Where Does It Come From?", url: `${NCERT_BASE_URL}fesc1=1-1` },
      { number: 2, title: "Components of Food", url: `${NCERT_BASE_URL}fesc1=2-2` },
      { number: 3, title: "Fibre to Fabric", url: `${NCERT_BASE_URL}fesc1=3-3` },
      { number: 4, title: "Sorting Materials into Groups", url: `${NCERT_BASE_URL}fesc1=4-4` },
      { number: 5, title: "Separation of Substances", url: `${NCERT_BASE_URL}fesc1=5-5` },
      { number: 6, title: "Changes Around Us", url: `${NCERT_BASE_URL}fesc1=6-6` },
      { number: 7, title: "Getting to Know Plants", url: `${NCERT_BASE_URL}fesc1=7-7` },
      { number: 8, title: "Body Movements", url: `${NCERT_BASE_URL}fesc1=8-8` },
      { number: 9, title: "The Living Organisms", url: `${NCERT_BASE_URL}fesc1=9-9` },
      { number: 10, title: "Motion and Measurement", url: `${NCERT_BASE_URL}fesc1=10-10` },
      { number: 11, title: "Light, Shadows and Reflections", url: `${NCERT_BASE_URL}fesc1=11-11` },
      { number: 12, title: "Electricity and Circuits", url: `${NCERT_BASE_URL}fesc1=12-12` },
      { number: 13, title: "Fun with Magnets", url: `${NCERT_BASE_URL}fesc1=13-13` },
      { number: 14, title: "Water", url: `${NCERT_BASE_URL}fesc1=14-14` },
      { number: 15, title: "Air Around Us", url: `${NCERT_BASE_URL}fesc1=15-15` },
      { number: 16, title: "Garbage In, Garbage Out", url: `${NCERT_BASE_URL}fesc1=16-16` },
    ],
  },
  // Class 6 Social Science - History
  {
    id: "history-6",
    className: "6",
    subject: "History",
    chapters: [
      { number: 1, title: "What, Where, How and When?", url: `${NCERT_BASE_URL}fess1=1-1` },
      { number: 2, title: "From Hunting-Gathering to Growing Food", url: `${NCERT_BASE_URL}fess1=2-2` },
      { number: 3, title: "In the Earliest Cities", url: `${NCERT_BASE_URL}fess1=3-3` },
      { number: 4, title: "What Books and Burials Tell Us", url: `${NCERT_BASE_URL}fess1=4-4` },
      { number: 5, title: "Kingdoms, Kings and Early Republic", url: `${NCERT_BASE_URL}fess1=5-5` },
      { number: 6, title: "New Questions and Ideas", url: `${NCERT_BASE_URL}fess1=6-6` },
      { number: 7, title: "Ashoka, The Emperor", url: `${NCERT_BASE_URL}fess1=7-7` },
      { number: 8, title: "Vital Villages, Thriving Towns", url: `${NCERT_BASE_URL}fess1=8-8` },
    ],
  },
  // Class 6 English
  {
    id: "english-6",
    className: "6",
    subject: "English",
    chapters: [
      { number: 1, title: "Who Did Patrick's Homework?", url: `${NCERT_BASE_URL}fehl1=1-1` },
      { number: 2, title: "How the Dog Found Himself a New Master", url: `${NCERT_BASE_URL}fehl1=2-2` },
      { number: 3, title: "Taro's Reward", url: `${NCERT_BASE_URL}fehl1=3-3` },
      { number: 4, title: "An Indian-American Woman in Space", url: `${NCERT_BASE_URL}fehl1=4-4` },
      { number: 5, title: "A Different Kind of School", url: `${NCERT_BASE_URL}fehl1=5-5` },
      { number: 6, title: "Who I Am", url: `${NCERT_BASE_URL}fehl1=6-6` },
      { number: 7, title: "Fair Play", url: `${NCERT_BASE_URL}fehl1=7-7` },
      { number: 8, title: "A Game of Chance", url: `${NCERT_BASE_URL}fehl1=8-8` },
    ],
  },

  // ==================== CLASS 7 ====================
  // Class 7 Mathematics
  {
    id: "math-7",
    className: "7",
    subject: "Mathematics",
    chapters: [
      { number: 1, title: "Integers", url: `${NCERT_BASE_URL}gemh1=1-1` },
      { number: 2, title: "Fractions and Decimals", url: `${NCERT_BASE_URL}gemh1=2-2` },
      { number: 3, title: "Data Handling", url: `${NCERT_BASE_URL}gemh1=3-3` },
      { number: 4, title: "Simple Equations", url: `${NCERT_BASE_URL}gemh1=4-4` },
      { number: 5, title: "Lines and Angles", url: `${NCERT_BASE_URL}gemh1=5-5` },
      { number: 6, title: "The Triangle and its Properties", url: `${NCERT_BASE_URL}gemh1=6-6` },
      { number: 7, title: "Congruence of Triangles", url: `${NCERT_BASE_URL}gemh1=7-7` },
      { number: 8, title: "Comparing Quantities", url: `${NCERT_BASE_URL}gemh1=8-8` },
      { number: 9, title: "Rational Numbers", url: `${NCERT_BASE_URL}gemh1=9-9` },
      { number: 10, title: "Practical Geometry", url: `${NCERT_BASE_URL}gemh1=10-10` },
      { number: 11, title: "Perimeter and Area", url: `${NCERT_BASE_URL}gemh1=11-11` },
      { number: 12, title: "Algebraic Expressions", url: `${NCERT_BASE_URL}gemh1=12-12` },
      { number: 13, title: "Exponents and Powers", url: `${NCERT_BASE_URL}gemh1=13-13` },
      { number: 14, title: "Symmetry", url: `${NCERT_BASE_URL}gemh1=14-14` },
      { number: 15, title: "Visualising Solid Shapes", url: `${NCERT_BASE_URL}gemh1=15-15` },
    ],
  },
  // Class 7 Science
  {
    id: "science-7",
    className: "7",
    subject: "Science",
    chapters: [
      { number: 1, title: "Nutrition in Plants", url: `${NCERT_BASE_URL}gesc1=1-1` },
      { number: 2, title: "Nutrition in Animals", url: `${NCERT_BASE_URL}gesc1=2-2` },
      { number: 3, title: "Fibre to Fabric", url: `${NCERT_BASE_URL}gesc1=3-3` },
      { number: 4, title: "Heat", url: `${NCERT_BASE_URL}gesc1=4-4` },
      { number: 5, title: "Acids, Bases and Salts", url: `${NCERT_BASE_URL}gesc1=5-5` },
      { number: 6, title: "Physical and Chemical Changes", url: `${NCERT_BASE_URL}gesc1=6-6` },
      { number: 7, title: "Weather, Climate and Adaptations", url: `${NCERT_BASE_URL}gesc1=7-7` },
      { number: 8, title: "Winds, Storms and Cyclones", url: `${NCERT_BASE_URL}gesc1=8-8` },
      { number: 9, title: "Soil", url: `${NCERT_BASE_URL}gesc1=9-9` },
      { number: 10, title: "Respiration in Organisms", url: `${NCERT_BASE_URL}gesc1=10-10` },
      { number: 11, title: "Transportation in Animals and Plants", url: `${NCERT_BASE_URL}gesc1=11-11` },
      { number: 12, title: "Reproduction in Plants", url: `${NCERT_BASE_URL}gesc1=12-12` },
      { number: 13, title: "Motion and Time", url: `${NCERT_BASE_URL}gesc1=13-13` },
      { number: 14, title: "Electric Current and Its Effects", url: `${NCERT_BASE_URL}gesc1=14-14` },
      { number: 15, title: "Light", url: `${NCERT_BASE_URL}gesc1=15-15` },
      { number: 16, title: "Water: A Precious Resource", url: `${NCERT_BASE_URL}gesc1=16-16` },
      { number: 17, title: "Forests: Our Lifeline", url: `${NCERT_BASE_URL}gesc1=17-17` },
      { number: 18, title: "Wastewater Story", url: `${NCERT_BASE_URL}gesc1=18-18` },
    ],
  },
  // Class 7 English
  {
    id: "english-7",
    className: "7",
    subject: "English",
    chapters: [
      { number: 1, title: "Three Questions", url: `${NCERT_BASE_URL}gehl1=1-1` },
      { number: 2, title: "A Gift of Chappals", url: `${NCERT_BASE_URL}gehl1=2-2` },
      { number: 3, title: "Gopal and the Hilsa Fish", url: `${NCERT_BASE_URL}gehl1=3-3` },
      { number: 4, title: "The Ashes That Made Trees Bloom", url: `${NCERT_BASE_URL}gehl1=4-4` },
      { number: 5, title: "Quality", url: `${NCERT_BASE_URL}gehl1=5-5` },
      { number: 6, title: "Expert Detectives", url: `${NCERT_BASE_URL}gehl1=6-6` },
      { number: 7, title: "The Invention of Vita-Wonk", url: `${NCERT_BASE_URL}gehl1=7-7` },
      { number: 8, title: "Fire: Friend and Foe", url: `${NCERT_BASE_URL}gehl1=8-8` },
    ],
  },

  // ==================== CLASS 8 ====================
  // Class 8 Mathematics
  {
    id: "math-8",
    className: "8",
    subject: "Mathematics",
    chapters: [
      { number: 1, title: "Rational Numbers", url: `${NCERT_BASE_URL}hemh1=1-1` },
      { number: 2, title: "Linear Equations in One Variable", url: `${NCERT_BASE_URL}hemh1=2-2` },
      { number: 3, title: "Understanding Quadrilaterals", url: `${NCERT_BASE_URL}hemh1=3-3` },
      { number: 4, title: "Practical Geometry", url: `${NCERT_BASE_URL}hemh1=4-4` },
      { number: 5, title: "Data Handling", url: `${NCERT_BASE_URL}hemh1=5-5` },
      { number: 6, title: "Squares and Square Roots", url: `${NCERT_BASE_URL}hemh1=6-6` },
      { number: 7, title: "Cubes and Cube Roots", url: `${NCERT_BASE_URL}hemh1=7-7` },
      { number: 8, title: "Comparing Quantities", url: `${NCERT_BASE_URL}hemh1=8-8` },
      { number: 9, title: "Algebraic Expressions and Identities", url: `${NCERT_BASE_URL}hemh1=9-9` },
      { number: 10, title: "Visualising Solid Shapes", url: `${NCERT_BASE_URL}hemh1=10-10` },
      { number: 11, title: "Mensuration", url: `${NCERT_BASE_URL}hemh1=11-11` },
      { number: 12, title: "Exponents and Powers", url: `${NCERT_BASE_URL}hemh1=12-12` },
      { number: 13, title: "Direct and Inverse Proportions", url: `${NCERT_BASE_URL}hemh1=13-13` },
      { number: 14, title: "Factorisation", url: `${NCERT_BASE_URL}hemh1=14-14` },
      { number: 15, title: "Introduction to Graphs", url: `${NCERT_BASE_URL}hemh1=15-15` },
      { number: 16, title: "Playing with Numbers", url: `${NCERT_BASE_URL}hemh1=16-16` },
    ],
  },
  // Class 8 Science
  {
    id: "science-8",
    className: "8",
    subject: "Science",
    chapters: [
      { number: 1, title: "Crop Production and Management", url: `${NCERT_BASE_URL}hesc1=1-1` },
      { number: 2, title: "Microorganisms: Friend and Foe", url: `${NCERT_BASE_URL}hesc1=2-2` },
      { number: 3, title: "Synthetic Fibres and Plastics", url: `${NCERT_BASE_URL}hesc1=3-3` },
      { number: 4, title: "Materials: Metals and Non-Metals", url: `${NCERT_BASE_URL}hesc1=4-4` },
      { number: 5, title: "Coal and Petroleum", url: `${NCERT_BASE_URL}hesc1=5-5` },
      { number: 6, title: "Combustion and Flame", url: `${NCERT_BASE_URL}hesc1=6-6` },
      { number: 7, title: "Conservation of Plants and Animals", url: `${NCERT_BASE_URL}hesc1=7-7` },
      { number: 8, title: "Cell - Structure and Functions", url: `${NCERT_BASE_URL}hesc1=8-8` },
      { number: 9, title: "Reproduction in Animals", url: `${NCERT_BASE_URL}hesc1=9-9` },
      { number: 10, title: "Reaching the Age of Adolescence", url: `${NCERT_BASE_URL}hesc1=10-10` },
      { number: 11, title: "Force and Pressure", url: `${NCERT_BASE_URL}hesc1=11-11` },
      { number: 12, title: "Friction", url: `${NCERT_BASE_URL}hesc1=12-12` },
      { number: 13, title: "Sound", url: `${NCERT_BASE_URL}hesc1=13-13` },
      { number: 14, title: "Chemical Effects of Electric Current", url: `${NCERT_BASE_URL}hesc1=14-14` },
      { number: 15, title: "Some Natural Phenomena", url: `${NCERT_BASE_URL}hesc1=15-15` },
      { number: 16, title: "Light", url: `${NCERT_BASE_URL}hesc1=16-16` },
      { number: 17, title: "Stars and the Solar System", url: `${NCERT_BASE_URL}hesc1=17-17` },
      { number: 18, title: "Pollution of Air and Water", url: `${NCERT_BASE_URL}hesc1=18-18` },
    ],
  },
  // Class 8 English
  {
    id: "english-8",
    className: "8",
    subject: "English",
    chapters: [
      { number: 1, title: "The Best Christmas Present", url: `${NCERT_BASE_URL}hehl1=1-1` },
      { number: 2, title: "The Tsunami", url: `${NCERT_BASE_URL}hehl1=2-2` },
      { number: 3, title: "Glimpses of the Past", url: `${NCERT_BASE_URL}hehl1=3-3` },
      { number: 4, title: "Bepin Choudhury's Lapse of Memory", url: `${NCERT_BASE_URL}hehl1=4-4` },
      { number: 5, title: "The Summit Within", url: `${NCERT_BASE_URL}hehl1=5-5` },
      { number: 6, title: "This is Jody's Fawn", url: `${NCERT_BASE_URL}hehl1=6-6` },
      { number: 7, title: "A Visit to Cambridge", url: `${NCERT_BASE_URL}hehl1=7-7` },
      { number: 8, title: "A Short Monsoon Diary", url: `${NCERT_BASE_URL}hehl1=8-8` },
    ],
  },

  // ==================== CLASS 9 ====================
  // Class 9 Mathematics
  {
    id: "math-9",
    className: "9",
    subject: "Mathematics",
    chapters: [
      { number: 1, title: "Number Systems", url: `${NCERT_BASE_URL}iemh1=1-1` },
      { number: 2, title: "Polynomials", url: `${NCERT_BASE_URL}iemh1=2-2` },
      { number: 3, title: "Coordinate Geometry", url: `${NCERT_BASE_URL}iemh1=3-3` },
      { number: 4, title: "Linear Equations in Two Variables", url: `${NCERT_BASE_URL}iemh1=4-4` },
      { number: 5, title: "Introduction to Euclid's Geometry", url: `${NCERT_BASE_URL}iemh1=5-5` },
      { number: 6, title: "Lines and Angles", url: `${NCERT_BASE_URL}iemh1=6-6` },
      { number: 7, title: "Triangles", url: `${NCERT_BASE_URL}iemh1=7-7` },
      { number: 8, title: "Quadrilaterals", url: `${NCERT_BASE_URL}iemh1=8-8` },
      { number: 9, title: "Circles", url: `${NCERT_BASE_URL}iemh1=9-9` },
      { number: 10, title: "Heron's Formula", url: `${NCERT_BASE_URL}iemh1=10-10` },
      { number: 11, title: "Surface Areas and Volumes", url: `${NCERT_BASE_URL}iemh1=11-11` },
      { number: 12, title: "Statistics", url: `${NCERT_BASE_URL}iemh1=12-12` },
    ],
  },
  // Class 9 Science
  {
    id: "science-9",
    className: "9",
    subject: "Science",
    chapters: [
      { number: 1, title: "Matter in Our Surroundings", url: `${NCERT_BASE_URL}iesc1=1-1` },
      { number: 2, title: "Is Matter Around Us Pure", url: `${NCERT_BASE_URL}iesc1=2-2` },
      { number: 3, title: "Atoms and Molecules", url: `${NCERT_BASE_URL}iesc1=3-3` },
      { number: 4, title: "Structure of the Atom", url: `${NCERT_BASE_URL}iesc1=4-4` },
      { number: 5, title: "The Fundamental Unit of Life", url: `${NCERT_BASE_URL}iesc1=5-5` },
      { number: 6, title: "Tissues", url: `${NCERT_BASE_URL}iesc1=6-6` },
      { number: 7, title: "Motion", url: `${NCERT_BASE_URL}iesc1=7-7` },
      { number: 8, title: "Force and Laws of Motion", url: `${NCERT_BASE_URL}iesc1=8-8` },
      { number: 9, title: "Gravitation", url: `${NCERT_BASE_URL}iesc1=9-9` },
      { number: 10, title: "Work and Energy", url: `${NCERT_BASE_URL}iesc1=10-10` },
      { number: 11, title: "Sound", url: `${NCERT_BASE_URL}iesc1=11-11` },
      { number: 12, title: "Improvement in Food Resources", url: `${NCERT_BASE_URL}iesc1=12-12` },
    ],
  },
  // Class 9 English
  {
    id: "english-9",
    className: "9",
    subject: "English",
    chapters: [
      { number: 1, title: "The Fun They Had", url: `${NCERT_BASE_URL}iehl1=1-1` },
      { number: 2, title: "The Sound of Music", url: `${NCERT_BASE_URL}iehl1=2-2` },
      { number: 3, title: "The Little Girl", url: `${NCERT_BASE_URL}iehl1=3-3` },
      { number: 4, title: "A Truly Beautiful Mind", url: `${NCERT_BASE_URL}iehl1=4-4` },
      { number: 5, title: "The Snake and the Mirror", url: `${NCERT_BASE_URL}iehl1=5-5` },
      { number: 6, title: "My Childhood", url: `${NCERT_BASE_URL}iehl1=6-6` },
      { number: 7, title: "Packing", url: `${NCERT_BASE_URL}iehl1=7-7` },
      { number: 8, title: "Reach for the Top", url: `${NCERT_BASE_URL}iehl1=8-8` },
      { number: 9, title: "The Bond of Love", url: `${NCERT_BASE_URL}iehl1=9-9` },
      { number: 10, title: "Kathmandu", url: `${NCERT_BASE_URL}iehl1=10-10` },
      { number: 11, title: "If I Were You", url: `${NCERT_BASE_URL}iehl1=11-11` },
    ],
  },
  // Class 9 Social Science - History
  {
    id: "history-9",
    className: "9",
    subject: "History",
    chapters: [
      { number: 1, title: "The French Revolution", url: `${NCERT_BASE_URL}iess1=1-1` },
      { number: 2, title: "Socialism in Europe and Russian Revolution", url: `${NCERT_BASE_URL}iess1=2-2` },
      { number: 3, title: "Nazism and the Rise of Hitler", url: `${NCERT_BASE_URL}iess1=3-3` },
      { number: 4, title: "Forest Society and Colonialism", url: `${NCERT_BASE_URL}iess1=4-4` },
      { number: 5, title: "Pastoralists in the Modern World", url: `${NCERT_BASE_URL}iess1=5-5` },
    ],
  },

  // ==================== CLASS 10 ====================
  // Class 10 Mathematics
  {
    id: "math-10",
    className: "10",
    subject: "Mathematics",
    chapters: [
      { number: 1, title: "Real Numbers", url: `${NCERT_BASE_URL}jemh1=1-1` },
      { number: 2, title: "Polynomials", url: `${NCERT_BASE_URL}jemh1=2-2` },
      { number: 3, title: "Pair of Linear Equations", url: `${NCERT_BASE_URL}jemh1=3-3` },
      { number: 4, title: "Quadratic Equations", url: `${NCERT_BASE_URL}jemh1=4-4` },
      { number: 5, title: "Arithmetic Progressions", url: `${NCERT_BASE_URL}jemh1=5-5` },
      { number: 6, title: "Triangles", url: `${NCERT_BASE_URL}jemh1=6-6` },
      { number: 7, title: "Coordinate Geometry", url: `${NCERT_BASE_URL}jemh1=7-7` },
      { number: 8, title: "Introduction to Trigonometry", url: `${NCERT_BASE_URL}jemh1=8-8` },
      { number: 9, title: "Applications of Trigonometry", url: `${NCERT_BASE_URL}jemh1=9-9` },
      { number: 10, title: "Circles", url: `${NCERT_BASE_URL}jemh1=10-10` },
      { number: 11, title: "Areas Related to Circles", url: `${NCERT_BASE_URL}jemh1=11-11` },
      { number: 12, title: "Surface Areas and Volumes", url: `${NCERT_BASE_URL}jemh1=12-12` },
      { number: 13, title: "Statistics", url: `${NCERT_BASE_URL}jemh1=13-13` },
      { number: 14, title: "Probability", url: `${NCERT_BASE_URL}jemh1=14-14` },
    ],
  },
  // Class 10 Science
  {
    id: "science-10",
    className: "10",
    subject: "Science",
    chapters: [
      { number: 1, title: "Chemical Reactions and Equations", url: `${NCERT_BASE_URL}jesc1=1-1` },
      { number: 2, title: "Acids, Bases and Salts", url: `${NCERT_BASE_URL}jesc1=2-2` },
      { number: 3, title: "Metals and Non-metals", url: `${NCERT_BASE_URL}jesc1=3-3` },
      { number: 4, title: "Carbon and its Compounds", url: `${NCERT_BASE_URL}jesc1=4-4` },
      { number: 5, title: "Life Processes", url: `${NCERT_BASE_URL}jesc1=5-5` },
      { number: 6, title: "Control and Coordination", url: `${NCERT_BASE_URL}jesc1=6-6` },
      { number: 7, title: "How do Organisms Reproduce", url: `${NCERT_BASE_URL}jesc1=7-7` },
      { number: 8, title: "Heredity", url: `${NCERT_BASE_URL}jesc1=8-8` },
      { number: 9, title: "Light - Reflection and Refraction", url: `${NCERT_BASE_URL}jesc1=9-9` },
      { number: 10, title: "Human Eye and Colourful World", url: `${NCERT_BASE_URL}jesc1=10-10` },
      { number: 11, title: "Electricity", url: `${NCERT_BASE_URL}jesc1=11-11` },
      { number: 12, title: "Magnetic Effects of Electric Current", url: `${NCERT_BASE_URL}jesc1=12-12` },
      { number: 13, title: "Our Environment", url: `${NCERT_BASE_URL}jesc1=13-13` },
    ],
  },
  // Class 10 English
  {
    id: "english-10",
    className: "10",
    subject: "English",
    chapters: [
      { number: 1, title: "A Letter to God", url: `${NCERT_BASE_URL}jefl1=1-1` },
      { number: 2, title: "Nelson Mandela: Long Walk to Freedom", url: `${NCERT_BASE_URL}jefl1=2-2` },
      { number: 3, title: "Two Stories about Flying", url: `${NCERT_BASE_URL}jefl1=3-3` },
      { number: 4, title: "From the Diary of Anne Frank", url: `${NCERT_BASE_URL}jefl1=4-4` },
      { number: 5, title: "The Hundred Dresses - I", url: `${NCERT_BASE_URL}jefl1=5-5` },
      { number: 6, title: "The Hundred Dresses - II", url: `${NCERT_BASE_URL}jefl1=6-6` },
      { number: 7, title: "Glimpses of India", url: `${NCERT_BASE_URL}jefl1=7-7` },
      { number: 8, title: "Mijbil the Otter", url: `${NCERT_BASE_URL}jefl1=8-8` },
      { number: 9, title: "Madam Rides the Bus", url: `${NCERT_BASE_URL}jefl1=9-9` },
      { number: 10, title: "The Sermon at Benares", url: `${NCERT_BASE_URL}jefl1=10-10` },
      { number: 11, title: "The Proposal", url: `${NCERT_BASE_URL}jefl1=11-11` },
    ],
  },
  // Class 10 Social Science - History
  {
    id: "history-10",
    className: "10",
    subject: "History",
    chapters: [
      { number: 1, title: "The Rise of Nationalism in Europe", url: `${NCERT_BASE_URL}jess1=1-1` },
      { number: 2, title: "Nationalism in India", url: `${NCERT_BASE_URL}jess1=2-2` },
      { number: 3, title: "The Making of a Global World", url: `${NCERT_BASE_URL}jess1=3-3` },
      { number: 4, title: "The Age of Industrialisation", url: `${NCERT_BASE_URL}jess1=4-4` },
      { number: 5, title: "Print Culture and the Modern World", url: `${NCERT_BASE_URL}jess1=5-5` },
    ],
  },

  // ==================== CLASS 11 ====================
  // Class 11 Physics
  {
    id: "physics-11",
    className: "11",
    subject: "Physics",
    chapters: [
      { number: 1, title: "Units and Measurements", url: `${NCERT_BASE_URL}keph1=1-1` },
      { number: 2, title: "Motion in a Straight Line", url: `${NCERT_BASE_URL}keph1=2-2` },
      { number: 3, title: "Motion in a Plane", url: `${NCERT_BASE_URL}keph1=3-3` },
      { number: 4, title: "Laws of Motion", url: `${NCERT_BASE_URL}keph1=4-4` },
      { number: 5, title: "Work, Energy and Power", url: `${NCERT_BASE_URL}keph1=5-5` },
      { number: 6, title: "System of Particles", url: `${NCERT_BASE_URL}keph1=6-6` },
      { number: 7, title: "Gravitation", url: `${NCERT_BASE_URL}keph1=7-7` },
      { number: 8, title: "Mechanical Properties of Solids", url: `${NCERT_BASE_URL}keph1=8-8` },
      { number: 9, title: "Mechanical Properties of Fluids", url: `${NCERT_BASE_URL}keph1=9-9` },
      { number: 10, title: "Thermal Properties of Matter", url: `${NCERT_BASE_URL}keph1=10-10` },
      { number: 11, title: "Thermodynamics", url: `${NCERT_BASE_URL}keph1=11-11` },
      { number: 12, title: "Kinetic Theory", url: `${NCERT_BASE_URL}keph1=12-12` },
      { number: 13, title: "Oscillations", url: `${NCERT_BASE_URL}keph1=13-13` },
      { number: 14, title: "Waves", url: `${NCERT_BASE_URL}keph1=14-14` },
    ],
  },
  // Class 11 Chemistry
  {
    id: "chemistry-11",
    className: "11",
    subject: "Chemistry",
    chapters: [
      { number: 1, title: "Some Basic Concepts of Chemistry", url: `${NCERT_BASE_URL}kech1=1-1` },
      { number: 2, title: "Structure of Atom", url: `${NCERT_BASE_URL}kech1=2-2` },
      { number: 3, title: "Classification of Elements", url: `${NCERT_BASE_URL}kech1=3-3` },
      { number: 4, title: "Chemical Bonding", url: `${NCERT_BASE_URL}kech1=4-4` },
      { number: 5, title: "Thermodynamics", url: `${NCERT_BASE_URL}kech1=5-5` },
      { number: 6, title: "Equilibrium", url: `${NCERT_BASE_URL}kech1=6-6` },
      { number: 7, title: "Redox Reactions", url: `${NCERT_BASE_URL}kech1=7-7` },
      { number: 8, title: "Organic Chemistry", url: `${NCERT_BASE_URL}kech1=8-8` },
      { number: 9, title: "Hydrocarbons", url: `${NCERT_BASE_URL}kech1=9-9` },
      { number: 10, title: "s-Block Elements", url: `${NCERT_BASE_URL}kech1=10-10` },
      { number: 11, title: "p-Block Elements", url: `${NCERT_BASE_URL}kech1=11-11` },
      { number: 12, title: "Environmental Chemistry", url: `${NCERT_BASE_URL}kech1=12-12` },
    ],
  },
  // Class 11 Biology
  {
    id: "biology-11",
    className: "11",
    subject: "Biology",
    chapters: [
      { number: 1, title: "The Living World", url: `${NCERT_BASE_URL}kebo1=1-1` },
      { number: 2, title: "Biological Classification", url: `${NCERT_BASE_URL}kebo1=2-2` },
      { number: 3, title: "Plant Kingdom", url: `${NCERT_BASE_URL}kebo1=3-3` },
      { number: 4, title: "Animal Kingdom", url: `${NCERT_BASE_URL}kebo1=4-4` },
      { number: 5, title: "Morphology of Flowering Plants", url: `${NCERT_BASE_URL}kebo1=5-5` },
      { number: 6, title: "Anatomy of Flowering Plants", url: `${NCERT_BASE_URL}kebo1=6-6` },
      { number: 7, title: "Structural Organisation in Animals", url: `${NCERT_BASE_URL}kebo1=7-7` },
      { number: 8, title: "Cell: The Unit of Life", url: `${NCERT_BASE_URL}kebo1=8-8` },
      { number: 9, title: "Biomolecules", url: `${NCERT_BASE_URL}kebo1=9-9` },
      { number: 10, title: "Cell Cycle and Cell Division", url: `${NCERT_BASE_URL}kebo1=10-10` },
      { number: 11, title: "Transport in Plants", url: `${NCERT_BASE_URL}kebo1=11-11` },
      { number: 12, title: "Mineral Nutrition", url: `${NCERT_BASE_URL}kebo1=12-12` },
      { number: 13, title: "Photosynthesis in Higher Plants", url: `${NCERT_BASE_URL}kebo1=13-13` },
      { number: 14, title: "Respiration in Plants", url: `${NCERT_BASE_URL}kebo1=14-14` },
      { number: 15, title: "Plant Growth and Development", url: `${NCERT_BASE_URL}kebo1=15-15` },
      { number: 16, title: "Digestion and Absorption", url: `${NCERT_BASE_URL}kebo1=16-16` },
      { number: 17, title: "Breathing and Exchange of Gases", url: `${NCERT_BASE_URL}kebo1=17-17` },
      { number: 18, title: "Body Fluids and Circulation", url: `${NCERT_BASE_URL}kebo1=18-18` },
      { number: 19, title: "Excretory Products and their Elimination", url: `${NCERT_BASE_URL}kebo1=19-19` },
      { number: 20, title: "Locomotion and Movement", url: `${NCERT_BASE_URL}kebo1=20-20` },
      { number: 21, title: "Neural Control and Coordination", url: `${NCERT_BASE_URL}kebo1=21-21` },
      { number: 22, title: "Chemical Coordination and Integration", url: `${NCERT_BASE_URL}kebo1=22-22` },
    ],
  },
  // Class 11 Mathematics
  {
    id: "math-11",
    className: "11",
    subject: "Mathematics",
    chapters: [
      { number: 1, title: "Sets", url: `${NCERT_BASE_URL}kemh1=1-1` },
      { number: 2, title: "Relations and Functions", url: `${NCERT_BASE_URL}kemh1=2-2` },
      { number: 3, title: "Trigonometric Functions", url: `${NCERT_BASE_URL}kemh1=3-3` },
      { number: 4, title: "Complex Numbers", url: `${NCERT_BASE_URL}kemh1=4-4` },
      { number: 5, title: "Linear Inequalities", url: `${NCERT_BASE_URL}kemh1=5-5` },
      { number: 6, title: "Permutations and Combinations", url: `${NCERT_BASE_URL}kemh1=6-6` },
      { number: 7, title: "Binomial Theorem", url: `${NCERT_BASE_URL}kemh1=7-7` },
      { number: 8, title: "Sequences and Series", url: `${NCERT_BASE_URL}kemh1=8-8` },
      { number: 9, title: "Straight Lines", url: `${NCERT_BASE_URL}kemh1=9-9` },
      { number: 10, title: "Conic Sections", url: `${NCERT_BASE_URL}kemh1=10-10` },
      { number: 11, title: "Introduction to Three Dimensional Geometry", url: `${NCERT_BASE_URL}kemh1=11-11` },
      { number: 12, title: "Limits and Derivatives", url: `${NCERT_BASE_URL}kemh1=12-12` },
      { number: 13, title: "Statistics", url: `${NCERT_BASE_URL}kemh1=13-13` },
      { number: 14, title: "Probability", url: `${NCERT_BASE_URL}kemh1=14-14` },
    ],
  },
  // Class 11 English
  {
    id: "english-11",
    className: "11",
    subject: "English",
    chapters: [
      { number: 1, title: "The Portrait of a Lady", url: `${NCERT_BASE_URL}kehb1=1-1` },
      { number: 2, title: "We're Not Afraid to Die", url: `${NCERT_BASE_URL}kehb1=2-2` },
      { number: 3, title: "Discovering Tut", url: `${NCERT_BASE_URL}kehb1=3-3` },
      { number: 4, title: "Landscape of the Soul", url: `${NCERT_BASE_URL}kehb1=4-4` },
      { number: 5, title: "The Ailing Planet", url: `${NCERT_BASE_URL}kehb1=5-5` },
      { number: 6, title: "The Browning Version", url: `${NCERT_BASE_URL}kehb1=6-6` },
      { number: 7, title: "The Adventure", url: `${NCERT_BASE_URL}kehb1=7-7` },
      { number: 8, title: "Silk Road", url: `${NCERT_BASE_URL}kehb1=8-8` },
    ],
  },

  // ==================== CLASS 12 ====================
  // Class 12 Physics
  {
    id: "physics-12",
    className: "12",
    subject: "Physics",
    chapters: [
      { number: 1, title: "Electric Charges and Fields", url: `${NCERT_BASE_URL}leph1=1-1` },
      { number: 2, title: "Electrostatic Potential", url: `${NCERT_BASE_URL}leph1=2-2` },
      { number: 3, title: "Current Electricity", url: `${NCERT_BASE_URL}leph1=3-3` },
      { number: 4, title: "Moving Charges and Magnetism", url: `${NCERT_BASE_URL}leph1=4-4` },
      { number: 5, title: "Magnetism and Matter", url: `${NCERT_BASE_URL}leph1=5-5` },
      { number: 6, title: "Electromagnetic Induction", url: `${NCERT_BASE_URL}leph1=6-6` },
      { number: 7, title: "Alternating Current", url: `${NCERT_BASE_URL}leph1=7-7` },
      { number: 8, title: "Electromagnetic Waves", url: `${NCERT_BASE_URL}leph1=8-8` },
      { number: 9, title: "Ray Optics", url: `${NCERT_BASE_URL}leph1=9-9` },
      { number: 10, title: "Wave Optics", url: `${NCERT_BASE_URL}leph1=10-10` },
      { number: 11, title: "Dual Nature of Radiation", url: `${NCERT_BASE_URL}leph1=11-11` },
      { number: 12, title: "Atoms", url: `${NCERT_BASE_URL}leph1=12-12` },
      { number: 13, title: "Nuclei", url: `${NCERT_BASE_URL}leph1=13-13` },
      { number: 14, title: "Semiconductor Electronics", url: `${NCERT_BASE_URL}leph1=14-14` },
    ],
  },
  // Class 12 Chemistry
  {
    id: "chemistry-12",
    className: "12",
    subject: "Chemistry",
    chapters: [
      { number: 1, title: "The Solid State", url: `${NCERT_BASE_URL}lech1=1-1` },
      { number: 2, title: "Solutions", url: `${NCERT_BASE_URL}lech1=2-2` },
      { number: 3, title: "Electrochemistry", url: `${NCERT_BASE_URL}lech1=3-3` },
      { number: 4, title: "Chemical Kinetics", url: `${NCERT_BASE_URL}lech1=4-4` },
      { number: 5, title: "Surface Chemistry", url: `${NCERT_BASE_URL}lech1=5-5` },
      { number: 6, title: "p-Block Elements", url: `${NCERT_BASE_URL}lech1=6-6` },
      { number: 7, title: "d and f Block Elements", url: `${NCERT_BASE_URL}lech1=7-7` },
      { number: 8, title: "Coordination Compounds", url: `${NCERT_BASE_URL}lech1=8-8` },
      { number: 9, title: "Haloalkanes and Haloarenes", url: `${NCERT_BASE_URL}lech1=9-9` },
      { number: 10, title: "Alcohols, Phenols and Ethers", url: `${NCERT_BASE_URL}lech1=10-10` },
      { number: 11, title: "Aldehydes, Ketones and Carboxylic Acids", url: `${NCERT_BASE_URL}lech1=11-11` },
      { number: 12, title: "Amines", url: `${NCERT_BASE_URL}lech1=12-12` },
      { number: 13, title: "Biomolecules", url: `${NCERT_BASE_URL}lech1=13-13` },
      { number: 14, title: "Polymers", url: `${NCERT_BASE_URL}lech1=14-14` },
      { number: 15, title: "Chemistry in Everyday Life", url: `${NCERT_BASE_URL}lech1=15-15` },
    ],
  },
  // Class 12 Biology
  {
    id: "biology-12",
    className: "12",
    subject: "Biology",
    chapters: [
      { number: 1, title: "Reproduction in Organisms", url: `${NCERT_BASE_URL}lebo1=1-1` },
      { number: 2, title: "Sexual Reproduction in Flowering Plants", url: `${NCERT_BASE_URL}lebo1=2-2` },
      { number: 3, title: "Human Reproduction", url: `${NCERT_BASE_URL}lebo1=3-3` },
      { number: 4, title: "Reproductive Health", url: `${NCERT_BASE_URL}lebo1=4-4` },
      { number: 5, title: "Principles of Inheritance and Variation", url: `${NCERT_BASE_URL}lebo1=5-5` },
      { number: 6, title: "Molecular Basis of Inheritance", url: `${NCERT_BASE_URL}lebo1=6-6` },
      { number: 7, title: "Evolution", url: `${NCERT_BASE_URL}lebo1=7-7` },
      { number: 8, title: "Human Health and Disease", url: `${NCERT_BASE_URL}lebo1=8-8` },
      { number: 9, title: "Strategies for Enhancement in Food Production", url: `${NCERT_BASE_URL}lebo1=9-9` },
      { number: 10, title: "Microbes in Human Welfare", url: `${NCERT_BASE_URL}lebo1=10-10` },
      { number: 11, title: "Biotechnology: Principles and Processes", url: `${NCERT_BASE_URL}lebo1=11-11` },
      { number: 12, title: "Biotechnology and its Applications", url: `${NCERT_BASE_URL}lebo1=12-12` },
      { number: 13, title: "Organisms and Populations", url: `${NCERT_BASE_URL}lebo1=13-13` },
      { number: 14, title: "Ecosystem", url: `${NCERT_BASE_URL}lebo1=14-14` },
      { number: 15, title: "Biodiversity and Conservation", url: `${NCERT_BASE_URL}lebo1=15-15` },
      { number: 16, title: "Environmental Issues", url: `${NCERT_BASE_URL}lebo1=16-16` },
    ],
  },
  // Class 12 Mathematics
  {
    id: "math-12",
    className: "12",
    subject: "Mathematics",
    chapters: [
      { number: 1, title: "Relations and Functions", url: `${NCERT_BASE_URL}lemh1=1-1` },
      { number: 2, title: "Inverse Trigonometric Functions", url: `${NCERT_BASE_URL}lemh1=2-2` },
      { number: 3, title: "Matrices", url: `${NCERT_BASE_URL}lemh1=3-3` },
      { number: 4, title: "Determinants", url: `${NCERT_BASE_URL}lemh1=4-4` },
      { number: 5, title: "Continuity and Differentiability", url: `${NCERT_BASE_URL}lemh1=5-5` },
      { number: 6, title: "Application of Derivatives", url: `${NCERT_BASE_URL}lemh1=6-6` },
      { number: 7, title: "Integrals", url: `${NCERT_BASE_URL}lemh1=7-7` },
      { number: 8, title: "Application of Integrals", url: `${NCERT_BASE_URL}lemh1=8-8` },
      { number: 9, title: "Differential Equations", url: `${NCERT_BASE_URL}lemh1=9-9` },
      { number: 10, title: "Vector Algebra", url: `${NCERT_BASE_URL}lemh1=10-10` },
      { number: 11, title: "Three Dimensional Geometry", url: `${NCERT_BASE_URL}lemh1=11-11` },
      { number: 12, title: "Linear Programming", url: `${NCERT_BASE_URL}lemh1=12-12` },
      { number: 13, title: "Probability", url: `${NCERT_BASE_URL}lemh1=13-13` },
    ],
  },
  // Class 12 English
  {
    id: "english-12",
    className: "12",
    subject: "English",
    chapters: [
      { number: 1, title: "The Last Lesson", url: `${NCERT_BASE_URL}lefl1=1-1` },
      { number: 2, title: "Lost Spring", url: `${NCERT_BASE_URL}lefl1=2-2` },
      { number: 3, title: "Deep Water", url: `${NCERT_BASE_URL}lefl1=3-3` },
      { number: 4, title: "The Rattrap", url: `${NCERT_BASE_URL}lefl1=4-4` },
      { number: 5, title: "Indigo", url: `${NCERT_BASE_URL}lefl1=5-5` },
      { number: 6, title: "Poets and Pancakes", url: `${NCERT_BASE_URL}lefl1=6-6` },
      { number: 7, title: "The Interview", url: `${NCERT_BASE_URL}lefl1=7-7` },
      { number: 8, title: "Going Places", url: `${NCERT_BASE_URL}lefl1=8-8` },
    ],
  },
];

// Group books by class
export const getBooksByClass = () => {
  const grouped: Record<string, NCERTBook[]> = {};
  ncertBooks.forEach((book) => {
    if (!grouped[book.className]) {
      grouped[book.className] = [];
    }
    grouped[book.className].push(book);
  });
  return grouped;
};
