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

  const generateShareText = () => {
    const header = `${settings.schoolName}\n${settings.examTitle}\nTerm: ${settings.termInfo} | Year: ${settings.academicYear}`;
    const studentInfo = `Name: ${student.name}\nID: ${student.id}\nClass: Basic Nine (9)`;
    
    const subjects = sortedSubjects.map(s => 
      `${s.subject}: ${s.score} (${s.grade})`
    ).join('\n');

    const summary = `Aggregate (Best 6): ${student.bestSixAggregate}\nCategory: ${student.category}\nRemark: ${student.overallRemark}`;

    return `${header}\n\n${studentInfo}\n\nSUBJECT RESULTS:\n${subjects}\n\nSUMMARY:\n${summary}`;
  };

  const handleWhatsAppShare = () => {
    const text = generateShareText();
    // WhatsApp formatting: *bold*
    const formattedText = text
      .replace(settings.schoolName, `*${settings.schoolName}*`)
      .replace('SUBJECT RESULTS:', '*SUBJECT RESULTS:*')
      .replace('SUMMARY:', '*SUMMARY:*');
      
    const url = `https://wa.me/?text=${encodeURIComponent(formattedText)}`;
    window.open(url, '_blank');
  };

  const handleEmailShare = () => {
    const text = generateShareText();
    const subject = `Report Card Results - ${student.name}`;
    const url = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
    window.open(url, '_blank'); // Using window.open prevents navigating away in some browsers, or triggers default mail client
  };

  return (
    <div className="bg-white p-8 max-w-[210mm] mx-auto min-h-[297mm] border border-gray-200 shadow-sm print:shadow-none print:border-none page-break relative group">
       {/* Share Buttons - Visible on hover/screen, hidden on print */}
       <div className="absolute top-2 right-2 flex gap-2 no-print opacity-50 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={handleWhatsAppShare}
            className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full shadow-lg"
            title="Share via WhatsApp"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
          </button>
          <button 
            onClick={handleEmailShare}
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-lg"
            title="Share via Email"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
          </button>
       </div>

       {/* Header */}
       <div className="text-center border-b-4 border-double border-blue-900 pb-4 mb-4">
          <h1 className="text-3xl font-extrabold text-blue-900 tracking-wider uppercase">
            <EditableField value={settings.schoolName} onChange={(v) => onSettingChange('schoolName', v)} className="text-center font-extrabold" />
          </h1>
          <div className="flex justify-center gap-4 text-xs font-semibold text-gray-800 mb-1">
            <div className="flex gap-1">
               <span>Tel:</span>
               <EditableField value={settings.schoolContact} onChange={(v) => onSettingChange('schoolContact', v)} placeholder="000-000-0000" />
            </div>
            <span>|</span>
            <div className="flex gap-1">
               <span>Email:</span>
               <EditableField value={settings.schoolEmail} onChange={(v) => onSettingChange('schoolEmail', v)} placeholder="school@email.com" />
            </div>
          </div>
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