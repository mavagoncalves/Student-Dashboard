import { useState, useEffect } from 'react';
import { BookOpen, Monitor, Database, Cpu, Layout, Globe, Briefcase, PenTool, LineChart, Microscope } from 'lucide-react';
import { fetchDashboardData, type DashboardData, type Assignment } from '../../services/api';
import Statistics from '../../components/ui/StatsCard';

const IconMap: Record<string, any> = {
  BookOpen, Monitor, Database, Cpu, Layout, 
  Globe, Briefcase, PenTool, LineChart, Microscope
};

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const userName = localStorage.getItem('learnGround_userName') || 'Student';

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchDashboardData();
        setData(result);
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  if (isLoading || !data) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-xl font-bold text-gray-800 animate-pulse">Loading dashboard data...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8 md:space-y-12">
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900">
          Welcome back, {userName}!
        </h1>
      </div>

      {/* COURSES*/}
      <section>
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 md:mb-8">Pinned Courses</h2>
        
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6">
          
          {data.courses.map((course) => {
            const IconComponent = IconMap[course.iconName] || BookOpen;
            
            return (
              <div key={course.id} className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center justify-center space-y-4 md:space-y-6">
                <div className={`${course.iconColor} w-16 h-16 md:w-24 md:h-24 rounded-full flex items-center justify-center shadow-inner`}>
                  <IconComponent className="w-8 h-8 md:w-12 md:h-12 text-white" />
                </div>
                <button className="bg-[#D6DBDF] px-3 md:px-6 py-1.5 md:py-2 rounded-lg font-semibold text-gray-800 hover:bg-gray-400 transition-colors text-xs md:text-sm w-full truncate pointer-events-none">
                  {course.title}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* STATS COMPONENT */}
      <Statistics attendanceRate={data.stats.attendanceRate} gpa={data.stats.gpa} />

      {/* ASSIGNMENTS DUE THIS WEEK WIDGET */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-extrabold text-gray-900">Assignments Due This Week</h3>
            <span className="text-xs font-bold bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full">
              To Do & In Progress
            </span>
          </div>

          {(() => {
            // Pull assignments from localStorage (fallback to empty array if none exist yet)
            const savedData = localStorage.getItem('learnGround_assignments');
            const assignments: Assignment[] = savedData ? JSON.parse(savedData) : [];
            
            // Filter for tasks that are NOT completed
            const pendingAssignments = assignments.filter(
              (task) => task.status === 'To Do' || task.status === 'In Progress'
            );

            if (pendingAssignments.length === 0) {
              return (
                <p className="text-sm font-medium text-gray-400 py-4 text-center">
                  All caught up! No pending assignments.
                </p>
              );
            }

            return (
              <div className="space-y-3">
                {pendingAssignments.map((task) => (
                  <div 
                    key={task.id}
                    className="flex items-center justify-between p-4 rounded-2xl bg-gray-50/60 border border-gray-100 transition-all hover:bg-gray-50"
                  >
                    <div className="space-y-1 min-w-0 pr-4">
                      <h4 className="font-bold text-gray-800 text-sm truncate">{task.title}</h4>
                      <p className="text-xs font-medium text-gray-400 truncate">{task.course}</p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-xs font-bold text-gray-500 bg-white px-3 py-1.5 rounded-xl border border-gray-100 shadow-xs">
                        {task.dueDate}
                      </span>
                      <span className={`px-2.5 py-1 rounded-xl text-[10px] font-extrabold uppercase tracking-wide ${
                        task.status === 'In Progress' ? 'bg-blue-100 text-blue-700' : 'bg-gray-200 text-gray-700'
                      }`}>
                        {task.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            );
          })()}
        </div>
    </div>
  );
}