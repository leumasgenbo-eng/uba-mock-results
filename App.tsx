import React, { useState, useMemo } from 'react';
import { calculateClassStatistics, processStudentData } from './utils';
import { GlobalSettings } from './types';
import MasterSheet from './components/MasterSheet';
import ReportCard from './components/ReportCard';

const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<'master' | 'reports'>('master');
  
  const [settings, setSettings] = useState<GlobalSettings>({
    schoolName: "UNITED BAYLOR ACADEMY",
    examTitle: "2ND MOCK 2025 BROAD SHEET EXAMINATION",
    termInfo: "TERM 2",
    academicYear: "2024/2025",
    nextTermBegin: "TBA",
    attendanceTotal: "60",
    startDate: "10-02-2025",
    endDate: "15-02-2025",
    headTeacherName: "HEADMASTER NAME",
    reportDate: new Date().toLocaleDateString(),
  });

  const handleSettingChange = (key: keyof GlobalSettings, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  // Calculate stats and process data
  const { stats, processedStudents, classAvgAggregate } = useMemo(() => {
    const s = calculateClassStatistics();
    const students = processStudentData(s);
    
    const avgAgg = students.reduce((sum, st) => sum + st.bestSixAggregate, 0) / students.length;

    return { 
      stats: s, 
      processedStudents: students,
      classAvgAggregate: avgAgg
    };
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Navigation / Toolbar */}
      <div className="no-print bg-blue-900 text-white p-4 sticky top-0 z-50 shadow-md flex justify-between items-center">
        <div className="flex items-center gap-4">
           <h1 className="font-bold text-xl">UBA Report System</h1>
           <div className="flex bg-blue-800 rounded p-1">
             <button 
               onClick={() => setViewMode('master')}
               className={`px-4 py-1 rounded transition ${viewMode === 'master' ? 'bg-white text-blue-900 font-bold' : 'text-blue-200 hover:text-white'}`}
             >
               Master Board
             </button>
             <button 
               onClick={() => setViewMode('reports')}
               className={`px-4 py-1 rounded transition ${viewMode === 'reports' ? 'bg-white text-blue-900 font-bold' : 'text-blue-200 hover:text-white'}`}
             >
               Individual Reports
             </button>
           </div>
        </div>
        <div className="flex gap-4">
           <button 
             onClick={handlePrint}
             className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded font-bold shadow transition"
           >
             <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
             Print / Download PDF
           </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 md:p-8">
        {viewMode === 'master' ? (
          <MasterSheet 
            students={processedStudents} 
            stats={stats} 
            settings={settings}
            onSettingChange={handleSettingChange}
          />
        ) : (
          <div className="flex flex-col gap-8 print:gap-0">
            {processedStudents.map((student) => (
              <ReportCard 
                key={student.id} 
                student={student} 
                stats={stats}
                settings={settings}
                onSettingChange={handleSettingChange}
                classAverageAggregate={classAvgAggregate}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;