import React, { useState, useMemo, useEffect } from 'react';
import { calculateClassStatistics, processStudentData } from './utils';
import { GlobalSettings } from './types';
import MasterSheet from './components/MasterSheet';
import ReportCard from './components/ReportCard';

const DEFAULT_SETTINGS: GlobalSettings = {
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
  schoolContact: "+233 24 000 0000",
  schoolEmail: "info@unitedbaylor.edu.gh"
};

const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<'master' | 'reports'>('master');
  
  const [settings, setSettings] = useState<GlobalSettings>(() => {
    const saved = localStorage.getItem('uba_app_settings');
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });

  const [zoomLevel, setZoomLevel] = useState(1.0);

  const handleSettingChange = (key: keyof GlobalSettings, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    localStorage.setItem('uba_app_settings', JSON.stringify(settings));
    alert("Changes saved successfully!");
  };

  const adjustZoom = (delta: number) => {
    setZoomLevel(prev => {
      const next = prev + delta;
      return Math.max(0.5, Math.min(2.0, parseFloat(next.toFixed(1))));
    });
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
    <div className="min-h-screen bg-gray-100 font-sans flex flex-col">
      {/* Navigation / Toolbar */}
      <div className="no-print bg-blue-900 text-white p-4 sticky top-0 z-50 shadow-md flex justify-between items-center flex-wrap gap-2">
        <div className="flex items-center gap-4">
           <h1 className="font-bold text-xl hidden lg:block">UBA Report System</h1>
           <div className="flex bg-blue-800 rounded p-1 text-sm md:text-base">
             <button 
               onClick={() => setViewMode('master')}
               className={`px-3 py-1 md:px-4 rounded transition ${viewMode === 'master' ? 'bg-white text-blue-900 font-bold' : 'text-blue-200 hover:text-white'}`}
             >
               Master Board
             </button>
             <button 
               onClick={() => setViewMode('reports')}
               className={`px-3 py-1 md:px-4 rounded transition ${viewMode === 'reports' ? 'bg-white text-blue-900 font-bold' : 'text-blue-200 hover:text-white'}`}
             >
               Individual Reports
             </button>
           </div>
           
           {/* Zoom Controls */}
           <div className="flex items-center bg-blue-800 rounded p-1 text-sm border border-blue-700">
             <span className="text-xs text-blue-300 px-2 uppercase font-bold hidden sm:inline">Zoom:</span>
             <button onClick={() => adjustZoom(-0.1)} className="px-3 text-blue-200 hover:text-white font-bold text-lg leading-none" title="Zoom Out">-</button>
             <span className="w-12 text-center text-white font-mono">{Math.round(zoomLevel * 100)}%</span>
             <button onClick={() => adjustZoom(0.1)} className="px-3 text-blue-200 hover:text-white font-bold text-lg leading-none" title="Zoom In">+</button>
             <button onClick={() => setZoomLevel(1.0)} className="px-2 text-blue-300 hover:text-white text-xs border-l border-blue-600 ml-1" title="Reset Zoom">R</button>
           </div>
        </div>

        <div className="flex gap-2 md:gap-4">
           <button
             onClick={handleSave}
             className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-blue-900 px-3 py-2 rounded font-bold shadow transition text-sm md:text-base"
             title="Save current settings to browser storage"
           >
             <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
             <span className="hidden md:inline">Save</span>
           </button>
           <button 
             onClick={handlePrint}
             className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-3 py-2 rounded font-bold shadow transition text-sm md:text-base"
           >
             <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
             <span className="hidden md:inline">Print / PDF</span>
             <span className="md:hidden">Print</span>
           </button>
        </div>
      </div>

      {/* Main Content with Zoom */}
      <div className="flex-1 overflow-auto bg-gray-100 relative">
        <div 
            style={{ 
                transform: `scale(${zoomLevel})`, 
                transformOrigin: 'top center',
            }}
            className="p-4 md:p-8 transition-transform duration-200 ease-linear origin-top"
        >
            {viewMode === 'master' ? (
            <MasterSheet 
                students={processedStudents} 
                stats={stats} 
                settings={settings}
                onSettingChange={handleSettingChange}
            />
            ) : (
            <div className="flex flex-col gap-8 print:gap-0 items-center">
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
    </div>
  );
};

export default App;