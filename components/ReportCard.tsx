import React from 'react';
import { ProcessedStudent, GlobalSettings, ClassStatistics } from '../types';
import EditableField from './EditableField';

interface ReportCardProps {
  student: ProcessedStudent;
  stats: ClassStatistics;
  settings: GlobalSettings;
  onSettingChange: (key: keyof GlobalSettings, value: string) => void;
  classAverageAggregate: number;
}

const ReportCard: React.FC<ReportCardProps> = ({ student, stats, settings, onSettingChange, classAverageAggregate }) => {
  // Sort subjects by score descending for the main table as requested ("Arrange in order the best performing subject")
  const sortedSubjects = [...student.subjects].sort((a, b) => b.score - a.score);

  return (
    <div className="bg-white p-8 max-w-[210mm] mx-auto min-h-[297mm] border border-gray-200 shadow-sm print:shadow-none print:border-none page-break relative">
       {/* Header */}
       <div className="text-center border-b-4 border-double border-blue-900 pb-4 mb-4">
          <h1 className="text-3xl font-extrabold text-blue-900 tracking-wider uppercase">
            <EditableField value={settings.schoolName} onChange={(v) => onSettingChange('schoolName', v)} className="text-center font-extrabold" />
          </h1>
          <h2 className="text-xl font-bold text-red-700 uppercase mt-1">
            <EditableField value={settings.examTitle} onChange={(v) => onSettingChange('examTitle', v)} className="text-center" />
          </h2>
          <div className="flex justify-center gap-4 text-sm mt-2 font-semibold text-gray-700">
             <span>{settings.termInfo}</span>
             <span>|</span>
             <span>Academic Year: {settings.academicYear}</span>
          </div>
       </div>

       {/* Particulars */}
       <div className="grid grid-cols-2 gap-6 mb-6 border border-gray-800 p-4 rounded bg-blue-50">
          <div className="space-y-2">
            <div className="flex">
               <span className="font-bold w-28">Name:</span>
               <span className="flex-1 border-b border-dotted border-gray-600 uppercase font-semibold">{student.name}</span>
            </div>
            <div className="flex">
               <span className="font-bold w-28">ID No:</span>
               <span className="flex-1 border-b border-dotted border-gray-600 font-mono">{student.id.toString().padStart(4, '0')}</span>
            </div>
            <div className="flex">
               <span className="font-bold w-28">Attendance:</span>
               <div className="flex-1 flex gap-2">
                 <EditableField value="0" onChange={() => {}} className="w-12 text-center border-b border-gray-600" />
                 <span> out of </span>
                 <EditableField value={settings.attendanceTotal} onChange={(v) => onSettingChange('attendanceTotal', v)} className="w-12 text-center" />
               </div>
            </div>
             <div className="flex">
               <span className="font-bold w-28">Class:</span>
               <span className="flex-1 font-bold">Basic Nine (9)</span>
            </div>
          </div>
          <div className="space-y-2">
             <div className="flex">
               <span className="font-bold w-36">Exam Start Date:</span>
               <EditableField value={settings.startDate} onChange={(v) => onSettingChange('startDate', v)} className="flex-1 border-b border-dotted border-gray-600" />
            </div>
            <div className="flex">
               <span className="font-bold w-36">Exam End Date:</span>
               <EditableField value={settings.endDate} onChange={(v) => onSettingChange('endDate', v)} className="flex-1 border-b border-dotted border-gray-600" />
            </div>
            <div className="flex">
               <span className="font-bold w-36">Agg. (Best 6):</span>
               <span className="flex-1 font-bold text-lg text-red-800">{student.bestSixAggregate}</span>
            </div>
            <div className="flex items-center">
               <span className="font-bold w-36">Category:</span>
               <span className={`font-bold px-3 py-0.5 rounded text-white text-sm ${student.category === 'Distinction' ? 'bg-green-600' : student.category === 'Merit' ? 'bg-blue-600' : student.category === 'Pass' ? 'bg-yellow-500' : 'bg-red-500'}`}>
                 {student.category}
               </span>
            </div>
          </div>
       </div>

       {/* Note to Parents */}
       <div className="mb-4 text-xs italic text-gray-600 bg-yellow-50 p-2 border border-yellow-200">
         <strong>Note:</strong> This mock is part of the preparation series for the BECE 2025/2026. Comments are based on the BECE 2024/2025 exam report standards.
       </div>

       {/* Main Table */}
       <table className="w-full text-sm border-collapse border border-gray-800 mb-6">
          <thead>
            <tr className="bg-gray-200 text-gray-800 uppercase text-xs">
               <th className="border border-gray-600 p-2 text-left">Subject</th>
               <th className="border border-gray-600 p-2 w-16">Mock Series</th>
               <th className="border border-gray-600 p-2 w-16">Total Score</th>
               <th className="border border-gray-600 p-2 w-16 bg-gray-100">Class Avg</th>
               <th className="border border-gray-600 p-2 w-16">(Stanine) Grade</th>
               <th className="border border-gray-600 p-2">Remark</th>
               <th className="border border-gray-600 p-2 w-32">Facilitator</th>
            </tr>
          </thead>
          <tbody>
             {sortedSubjects.map(sub => (
               <tr key={sub.subject} className="even:bg-gray-50">
                 <td className="border border-gray-600 p-2 font-medium">{sub.subject}</td>
                 <td className="border border-gray-600 p-2 text-center">2</td>
                 <td className="border border-gray-600 p-2 text-center font-bold">{sub.score}</td>
                 <td className="border border-gray-600 p-2 text-center text-gray-500 bg-gray-50">
                    {stats.subjectMeans[sub.subject] ? stats.subjectMeans[sub.subject].toFixed(1) : '-'}
                 </td>
                 <td className={`border border-gray-600 p-2 text-center font-bold ${sub.grade === 'A1' ? 'text-green-700' : sub.grade === 'F9' ? 'text-red-700' : ''}`}>
                    {sub.grade}
                 </td>
                 <td className="border border-gray-600 p-2 text-xs italic">
                    <EditableField value={sub.remark} onChange={() => {}} />
                 </td>
                 <td className="border border-gray-600 p-2 text-[10px] uppercase text-gray-500">{sub.facilitator}</td>
               </tr>
             ))}
          </tbody>
       </table>

       {/* Summary Section */}
       <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="border border-gray-400 p-3 rounded">
            <h3 className="font-bold underline text-blue-900 mb-2 text-sm">BEST CORE SUBJECTS</h3>
            <ul className="text-sm list-disc pl-4">
               {student.bestCoreSubjects.map(s => (
                 <li key={s.subject}>
                   <span className="font-semibold">{s.subject}:</span> {s.score} ({s.grade})
                 </li>
               ))}
            </ul>
          </div>
          <div className="border border-gray-400 p-3 rounded">
            <h3 className="font-bold underline text-blue-900 mb-2 text-sm">BEST ELECTIVE SUBJECTS</h3>
            <ul className="text-sm list-disc pl-4">
               {student.bestElectiveSubjects.map(s => (
                 <li key={s.subject}>
                   <span className="font-semibold">{s.subject}:</span> {s.score} ({s.grade})
                 </li>
               ))}
            </ul>
          </div>
       </div>

       {/* Remarks Section */}
       <div className="space-y-4 mb-8">
          <div className="border border-gray-600 p-3 relative">
             <span className="absolute -top-3 left-4 bg-white px-2 font-bold text-sm text-gray-700">PERFORMANCE REMARKS</span>
             <EditableField 
                multiline 
                value={student.overallRemark} 
                onChange={() => {}} 
                className="w-full text-sm mt-1 min-h-[3rem]" 
             />
          </div>

          <div className="border border-gray-600 p-3 relative">
             <span className="absolute -top-3 left-4 bg-white px-2 font-bold text-sm text-gray-700">RECOMMENDATION & TARGET</span>
             <EditableField 
                multiline 
                value="Continue to solve more past questions. Target Grade: Distinction." 
                onChange={() => {}} 
                className="w-full text-sm mt-1 min-h-[3rem]" 
             />
          </div>
       </div>

       {/* Signatures */}
       <div className="mt-auto pt-6 border-t-2 border-dashed border-gray-300">
          <div className="grid grid-cols-2 gap-8 items-end">
             <div>
                <p className="text-xs font-bold mb-4">Date Prepared:</p>
                <EditableField value={settings.reportDate} onChange={(v) => onSettingChange('reportDate', v)} />
             </div>
             <div className="text-right">
                <p className="text-xs font-bold mb-8">Headteacher Authorization:</p>
                <div className="flex flex-col items-end">
                  <div className="w-48 border-b border-black mb-1"></div>
                  <EditableField value={settings.headTeacherName} onChange={(v) => onSettingChange('headTeacherName', v)} className="text-right font-bold uppercase w-full" />
                  <span className="text-[10px] text-gray-500">Signature & Stamp</span>
                </div>
             </div>
          </div>
          <div className="mt-4 flex justify-between text-[10px] text-gray-400">
            <span>Next Term Begins: <EditableField value={settings.nextTermBegin} onChange={(v) => onSettingChange('nextTermBegin', v)} className="w-32" /></span>
            <span>Generated by UBA Report System</span>
          </div>
       </div>
    </div>
  );
};

export default ReportCard;