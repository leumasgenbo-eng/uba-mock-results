import { RAW_STUDENTS, SUBJECT_LIST, CORE_SUBJECTS, FACILITATORS } from './constants';
import { ClassStatistics, ProcessedStudent, ComputedSubject } from './types';

export const calculateMean = (values: number[]): number => {
  if (values.length === 0) return 0;
  return values.reduce((a, b) => a + b, 0) / values.length;
};

export const calculateStdDev = (values: number[], mean: number): number => {
  if (values.length === 0) return 0;
  const squareDiffs = values.map(value => Math.pow(value - mean, 2));
  return Math.sqrt(squareDiffs.reduce((a, b) => a + b, 0) / values.length);
};

export const getGradeFromZScore = (score: number, mean: number, stdDev: number): { grade: string, value: number, remark: string } => {
  // Prevent division by zero if stdDev is 0
  if (stdDev === 0) return { grade: 'C4', value: 4, remark: 'Credit' };

  // NRT Logic: Z = (Score - Mean) / StdDev
  // But prompt gives logic: Score >= Mean + 1.645σ
  // This is equivalent to Z >= 1.645

  const diff = score - mean;
  
  if (diff >= 1.645 * stdDev) return { grade: 'A1', value: 1, remark: 'Excellent' };
  if (diff >= 1.036 * stdDev) return { grade: 'B2', value: 2, remark: 'Very Good' };
  if (diff >= 0.524 * stdDev) return { grade: 'B3', value: 3, remark: 'Good' };
  if (diff >= 0) return { grade: 'C4', value: 4, remark: 'Credit' };
  if (diff >= -0.524 * stdDev) return { grade: 'C5', value: 5, remark: 'Credit' };
  if (diff >= -1.036 * stdDev) return { grade: 'C6', value: 6, remark: 'Credit' };
  if (diff >= -1.645 * stdDev) return { grade: 'D7', value: 7, remark: 'Pass' };
  if (diff >= -2.326 * stdDev) return { grade: 'E8', value: 8, remark: 'Pass' };
  return { grade: 'F9', value: 9, remark: 'Fail' };
};

export const calculateClassStatistics = (): ClassStatistics => {
  const subjectMeans: Record<string, number> = {};
  const subjectStdDevs: Record<string, number> = {};

  SUBJECT_LIST.forEach(subject => {
    const scores = RAW_STUDENTS.map(s => s.scores[subject] || 0);
    const mean = calculateMean(scores);
    const stdDev = calculateStdDev(scores, mean);
    subjectMeans[subject] = mean;
    subjectStdDevs[subject] = stdDev;
  });

  return { subjectMeans, subjectStdDevs };
};

export const processStudentData = (stats: ClassStatistics): ProcessedStudent[] => {
  const processed = RAW_STUDENTS.map(student => {
    let totalScore = 0;
    const computedSubjects: ComputedSubject[] = [];

    // 1. Calculate Grades for all subjects
    SUBJECT_LIST.forEach(subject => {
      const score = student.scores[subject] || 0;
      totalScore += score;
      const mean = stats.subjectMeans[subject];
      const stdDev = stats.subjectStdDevs[subject];
      
      const { grade, value, remark } = getGradeFromZScore(score, mean, stdDev);
      
      computedSubjects.push({
        subject,
        score,
        grade,
        gradeValue: value,
        remark,
        facilitator: FACILITATORS[subject] || 'TBA',
        zScore: stdDev === 0 ? 0 : (score - mean) / stdDev
      });
    });

    // 2. Separate Core and Electives
    const cores = computedSubjects.filter(s => CORE_SUBJECTS.includes(s.subject));
    const electives = computedSubjects.filter(s => !CORE_SUBJECTS.includes(s.subject));

    // 3. Sort by Grade Value (Ascending is better: 1 is best) then by Score (Descending is better)
    const sortFn = (a: ComputedSubject, b: ComputedSubject) => {
      if (a.gradeValue !== b.gradeValue) return a.gradeValue - b.gradeValue;
      return b.score - a.score;
    };

    cores.sort(sortFn);
    electives.sort(sortFn);

    const best4Cores = cores.slice(0, 4);
    const best2Electives = electives.slice(0, 2);

    const bestSixAggregate = 
      best4Cores.reduce((sum, s) => sum + s.gradeValue, 0) +
      best2Electives.reduce((sum, s) => sum + s.gradeValue, 0);

    // 4. Determine Category
    let category = "Average";
    if (bestSixAggregate <= 10) category = "Distinction";
    else if (bestSixAggregate <= 20) category = "Merit";
    else if (bestSixAggregate <= 36) category = "Pass";
    else category = "Fail";

    // 5. Weakness Analysis
    // Identify subjects with grades 7, 8, 9 (D7, E8, F9)
    const weakSubjects = computedSubjects.filter(s => s.gradeValue >= 7);
    const sortedByScoreAsc = [...computedSubjects].sort((a, b) => a.score - b.score);
    
    let weaknessAnalysis = "";
    if (weakSubjects.length > 0) {
      const names = weakSubjects.map(s => s.subject).join(", ");
      weaknessAnalysis = `Critical weaknesses observed in: ${names}. These subjects significantly impacted the aggregate. Immediate remedial attention is required to improve understanding in these areas.`;
    } else {
      // If no critical failures, identify the lowest 2 performing subjects
      const lowest = sortedByScoreAsc.slice(0, 2).map(s => s.subject).join(" and ");
      weaknessAnalysis = `While performance is generally positive, relatively lower scores were recorded in ${lowest}. Strengthening these areas could improve the overall standing further.`;
    }

    // 6. Generate Overall Remark
    // Combine Aggregate summary with Weakness Analysis
    const overallRemark = `Student achieved an aggregate of ${bestSixAggregate} (${category}). ${weaknessAnalysis}`;

    return {
      id: student.id,
      name: student.name,
      subjects: computedSubjects,
      totalScore,
      bestSixAggregate,
      bestCoreSubjects: best4Cores,
      bestElectiveSubjects: best2Electives,
      overallRemark,
      weaknessAnalysis,
      category,
      rank: 0 // Will set later
    };
  });

  // Sort by Total Score (Descending) for Ranking as per prompt "Arrange the list based on score order"
  processed.sort((a, b) => b.totalScore - a.totalScore);

  // Assign Ranks
  processed.forEach((p, index) => {
    p.rank = index + 1;
  });

  return processed;
};