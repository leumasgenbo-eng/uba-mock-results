import { StudentData } from './types';

export const SUBJECT_LIST = [
  "English Language",
  "Mathematics",
  "Science",
  "Social Studies",
  "Career Technology",
  "Creative Arts and Designing",
  "Ghana Language (Twi)",
  "Religious and Moral Education",
  "Computing",
  "French"
];

export const CORE_SUBJECTS = ["Mathematics", "English Language", "Social Studies", "Science"];
// Remaining are treated as Electives for the purpose of "Best 2 Electives" calculation

export const FACILITATORS: Record<string, string> = {
  "Science": "SIR JOSHUA",
  "Computing": "SIR ISAAC",
  "Mathematics": "SIR SAMMY",
  "Religious and Moral Education": "MADAM JANE",
  "Creative Arts and Designing": "MADAM NORTEY",
  "French": "SIR CHARLES",
  "Social Studies": "SIR ASHMIE",
  "English Language": "MADAM NANCY",
  "Ghana Language (Twi)": "MADAM RITA",
  "Career Technology": "SIR JOSHUA" // Assigned same as Science for placeholder, adjust if needed
};

// Raw data parsed from the user prompt
export const RAW_STUDENTS: StudentData[] = [
  { id: 1, name: "MASOUD HARUNA", scores: { "English Language": 73, "Mathematics": 70, "Science": 84, "Social Studies": 86, "Career Technology": 84, "Creative Arts and Designing": 80, "Ghana Language (Twi)": 72, "Religious and Moral Education": 100, "Computing": 71, "French": 88 } },
  { id: 2, name: "OFFEI OSEI EDMUND", scores: { "English Language": 76, "Mathematics": 69, "Science": 79, "Social Studies": 84, "Career Technology": 76, "Creative Arts and Designing": 81, "Ghana Language (Twi)": 90, "Religious and Moral Education": 97, "Computing": 73, "French": 71 } },
  { id: 3, name: "FRIMPONG CHARLES", scores: { "English Language": 71, "Mathematics": 75, "Science": 81, "Social Studies": 90, "Career Technology": 81, "Creative Arts and Designing": 82, "Ghana Language (Twi)": 85, "Religious and Moral Education": 91, "Computing": 72, "French": 65 } },
  { id: 4, name: "ADDY GODWILL", scores: { "English Language": 64, "Mathematics": 63, "Science": 89, "Social Studies": 85, "Career Technology": 80, "Creative Arts and Designing": 82, "Ghana Language (Twi)": 69, "Religious and Moral Education": 88, "Computing": 67, "French": 64 } },
  { id: 5, name: "SEDOFIA HEPHZIBA", scores: { "English Language": 68, "Mathematics": 63, "Science": 66, "Social Studies": 84, "Career Technology": 91, "Creative Arts and Designing": 77, "Ghana Language (Twi)": 68, "Religious and Moral Education": 98, "Computing": 61, "French": 79 } },
  { id: 6, name: "HAMMOND EMMANUELLA", scores: { "English Language": 65, "Mathematics": 60, "Science": 69, "Social Studies": 84, "Career Technology": 84, "Creative Arts and Designing": 83, "Ghana Language (Twi)": 81, "Religious and Moral Education": 96, "Computing": 63, "French": 60 } },
  { id: 7, name: "AGYEMANG DANIEL", scores: { "English Language": 56, "Mathematics": 66, "Science": 72, "Social Studies": 91, "Career Technology": 88, "Creative Arts and Designing": 72, "Ghana Language (Twi)": 71, "Religious and Moral Education": 93, "Computing": 65, "French": 69 } },
  { id: 8, name: "ADAMS LATIFA", scores: { "English Language": 61, "Mathematics": 55, "Science": 73, "Social Studies": 70, "Career Technology": 91, "Creative Arts and Designing": 79, "Ghana Language (Twi)": 78, "Religious and Moral Education": 99, "Computing": 64, "French": 69 } },
  { id: 9, name: "NAZAR REGINA", scores: { "English Language": 63, "Mathematics": 47, "Science": 66, "Social Studies": 84, "Career Technology": 82, "Creative Arts and Designing": 78, "Ghana Language (Twi)": 83, "Religious and Moral Education": 92, "Computing": 56, "French": 58 } },
  { id: 10, name: "EUGEINA MILLS", scores: { "English Language": 67, "Mathematics": 54, "Science": 64, "Social Studies": 82, "Career Technology": 84, "Creative Arts and Designing": 72, "Ghana Language (Twi)": 70, "Religious and Moral Education": 96, "Computing": 56, "French": 65 } },
  { id: 11, name: "BENTIL BAABA", scores: { "English Language": 64, "Mathematics": 53, "Science": 64, "Social Studies": 80, "Career Technology": 90, "Creative Arts and Designing": 74, "Ghana Language (Twi)": 69, "Religious and Moral Education": 94, "Computing": 53, "French": 64 } },
  { id: 12, name: "KPEKPO COMFORT", scores: { "English Language": 64, "Mathematics": 54, "Science": 68, "Social Studies": 73, "Career Technology": 80, "Creative Arts and Designing": 71, "Ghana Language (Twi)": 75, "Religious and Moral Education": 96, "Computing": 62, "French": 64 } },
  { id: 13, name: "KANZONI GRACIOUS", scores: { "English Language": 55, "Mathematics": 56, "Science": 72, "Social Studies": 78, "Career Technology": 84, "Creative Arts and Designing": 76, "Ghana Language (Twi)": 57, "Religious and Moral Education": 90, "Computing": 60, "French": 58 } },
  { id: 14, name: "CUDJOE FLORENCE", scores: { "English Language": 68, "Mathematics": 35, "Science": 75, "Social Studies": 65, "Career Technology": 90, "Creative Arts and Designing": 71, "Ghana Language (Twi)": 80, "Religious and Moral Education": 92, "Computing": 60, "French": 63 } },
  { id: 15, name: "ANIAPAM MARNAL", scores: { "English Language": 67, "Mathematics": 42, "Science": 52, "Social Studies": 73, "Career Technology": 91, "Creative Arts and Designing": 72, "Ghana Language (Twi)": 58, "Religious and Moral Education": 95, "Computing": 57, "French": 58 } },
  { id: 16, name: "BINMEY JOSEPHINE", scores: { "English Language": 58, "Mathematics": 46, "Science": 61, "Social Studies": 77, "Career Technology": 85, "Creative Arts and Designing": 76, "Ghana Language (Twi)": 77, "Religious and Moral Education": 90, "Computing": 57, "French": 66 } },
  { id: 17, name: "SHAIBU FARIDA", scores: { "English Language": 61, "Mathematics": 49, "Science": 62, "Social Studies": 71, "Career Technology": 74, "Creative Arts and Designing": 71, "Ghana Language (Twi)": 68, "Religious and Moral Education": 92, "Computing": 57, "French": 68 } },
  { id: 18, name: "OWUSU ISAAC", scores: { "English Language": 51, "Mathematics": 33, "Science": 49, "Social Studies": 73, "Career Technology": 81, "Creative Arts and Designing": 64, "Ghana Language (Twi)": 77, "Religious and Moral Education": 86, "Computing": 50, "French": 62 } },
  { id: 19, name: "ANANE FELICITY", scores: { "English Language": 45, "Mathematics": 48, "Science": 45, "Social Studies": 62, "Career Technology": 81, "Creative Arts and Designing": 70, "Ghana Language (Twi)": 73, "Religious and Moral Education": 91, "Computing": 54, "French": 58 } },
  { id: 20, name: "ANDANI SULLEYMAN", scores: { "English Language": 51, "Mathematics": 25, "Science": 33, "Social Studies": 64, "Career Technology": 82, "Creative Arts and Designing": 68, "Ghana Language (Twi)": 63, "Religious and Moral Education": 87, "Computing": 52, "French": 75 } },
  { id: 21, name: "ANIAPAM ALHAJI", scores: { "English Language": 47, "Mathematics": 42, "Science": 49, "Social Studies": 60, "Career Technology": 84, "Creative Arts and Designing": 47, "Ghana Language (Twi)": 54, "Religious and Moral Education": 94, "Computing": 50, "French": 43 } },
  { id: 22, name: "YELEBI ALI FAWAZ", scores: { "English Language": 39, "Mathematics": 41, "Science": 52, "Social Studies": 54, "Career Technology": 78, "Creative Arts and Designing": 64, "Ghana Language (Twi)": 62, "Religious and Moral Education": 94, "Computing": 44, "French": 60 } },
  { id: 23, name: "YAKUBU NAAHIMA", scores: { "English Language": 40, "Mathematics": 23, "Science": 41, "Social Studies": 51, "Career Technology": 73, "Creative Arts and Designing": 76, "Ghana Language (Twi)": 76, "Religious and Moral Education": 88, "Computing": 40, "French": 70 } },
  { id: 24, name: "KISSI OSEI KELVIN", scores: { "English Language": 48, "Mathematics": 26, "Science": 45, "Social Studies": 56, "Career Technology": 67, "Creative Arts and Designing": 64, "Ghana Language (Twi)": 68, "Religious and Moral Education": 90, "Computing": 54, "French": 52 } },
  { id: 25, name: "YAJUBU NIHAAD", scores: { "English Language": 44, "Mathematics": 25, "Science": 42, "Social Studies": 59, "Career Technology": 66, "Creative Arts and Designing": 59, "Ghana Language (Twi)": 76, "Religious and Moral Education": 93, "Computing": 40, "French": 68 } },
  { id: 26, name: "BOTCHWAY KATURAH", scores: { "English Language": 37, "Mathematics": 26, "Science": 50, "Social Studies": 53, "Career Technology": 72, "Creative Arts and Designing": 67, "Ghana Language (Twi)": 59, "Religious and Moral Education": 82, "Computing": 35, "French": 63 } }
];