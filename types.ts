export interface SubjectScore {
  subject: string;
  score: number;
}

export interface ComputedSubject extends SubjectScore {
  grade: string;
  gradeValue: number; // 1-9 for calculation
  remark: string;
  facilitator: string;
  zScore: number;
}

export interface StudentData {
  id: number;
  name: string;
  scores: Record<string, number>; // Key is subject name
}

export interface ProcessedStudent {
  id: number;
  name: string;
  subjects: ComputedSubject[];
  totalScore: number;
  bestSixAggregate: number; // Lower is better
  bestCoreSubjects: ComputedSubject[];
  bestElectiveSubjects: ComputedSubject[];
  overallRemark: string;
  category: string;
  rank: number;
}

export interface ClassStatistics {
  subjectMeans: Record<string, number>;
  subjectStdDevs: Record<string, number>;
}

export interface GlobalSettings {
  schoolName: string;
  examTitle: string;
  termInfo: string;
  academicYear: string;
  nextTermBegin: string;
  attendanceTotal: string;
  startDate: string;
  endDate: string;
  headTeacherName: string;
  reportDate: string;
  schoolContact: string;
  schoolEmail: string;
}