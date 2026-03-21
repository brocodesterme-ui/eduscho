// Comprehensive bad words filter for content moderation
// This list covers common abusive, harmful, and inappropriate words
const BAD_WORDS = [
  // English profanity & slurs (common ones)
  "fuck", "shit", "damn", "ass", "bitch", "bastard", "dick", "cock", "pussy",
  "cunt", "whore", "slut", "nigger", "nigga", "faggot", "retard", "retarded",
  "motherfucker", "asshole", "bullshit", "crap", "piss", "wanker", "twat",
  "douche", "douchebag", "jackass", "dumbass", "dipshit", "shithead",
  // Threats & harmful
  "kill yourself", "kys", "die", "suicide", "murder", "rape", "molest",
  "stfu", "gtfo",
  // Hindi/Hinglish abusive words
  "madarchod", "behenchod", "chutiya", "bhenchod", "bhosdike", "bsdk",
  "mc", "bc", "gandu", "lodu", "lund", "randi", "harami", "kamina",
  "chutiye", "gaandu", "lavde", "jhatu", "tatti", "saala", "sala",
  // Leetspeak / evasion patterns
  "f*ck", "f**k", "sh*t", "s**t", "b*tch", "a**hole", "d*ck",
  "fuk", "fuq", "fck", "sht", "btch", "azz",
];

// Build regex patterns for each word (word boundary matching)
const patterns = BAD_WORDS.map(word => {
  // Escape special regex characters
  const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  // For multi-word phrases, don't use word boundaries
  if (word.includes(' ')) {
    return new RegExp(escaped, 'i');
  }
  return new RegExp(`\\b${escaped}\\b`, 'i');
});

export function containsBadWords(text: string): boolean {
  const normalized = text
    .replace(/[0@]/g, 'o')
    .replace(/1|!/g, 'i')
    .replace(/3/g, 'e')
    .replace(/\$/g, 's')
    .replace(/5/g, 's')
    .replace(/\s+/g, ' ');

  return patterns.some(pattern => pattern.test(text) || pattern.test(normalized));
}

export function censorText(text: string): string {
  let censored = text;
  BAD_WORDS.forEach(word => {
    const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = word.includes(' ')
      ? new RegExp(escaped, 'gi')
      : new RegExp(`\\b${escaped}\\b`, 'gi');
    censored = censored.replace(regex, match => '*'.repeat(match.length));
  });
  return censored;
}

export const MODERATION_WARNING = "⚠️ Your message contains inappropriate language. Please keep the conversation respectful and friendly.";
