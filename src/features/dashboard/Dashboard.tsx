import { useState, useEffect } from 'react';
import { GraduationCap} from 'lucide-react';
import { fetchDashboardData, type DashboardData } from '../../services/api';
import Statistics from '../../components/ui/StatsCard';

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
          Welcome back, Maria!
        </h1>
        <button className="bg-[#D6DBDF] px-6 py-3 rounded-xl font-bold text-gray-800 hover:bg-gray-400 transition-colors w-full sm:w-auto">
          NEW COURSE
        </button>
      </div>

      {/* COURSES*/}
      <section>
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 md:mb-8">Your Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          
          {data.courses.map((course) => (
            <div key={course.id} className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center justify-center space-y-4 md:space-y-6">
              <div className={`${course.iconColor} w-20 h-20 md:w-28 md:h-28 rounded-full flex items-center justify-center shadow-inner`}>
                <GraduationCap className="w-10 h-10 md:w-14 md:h-14 text-white" />
              </div>
              <button className="bg-[#D6DBDF] px-4 md:px-6 py-2 rounded-lg font-semibold text-gray-800 hover:bg-gray-400 transition-colors text-sm w-full md:w-auto truncate max-w-full">
                {course.title}
              </button>
            </div>
          ))}
          
        </div>
      </section>

      {/* STATS COMPONENT */}
      <Statistics attendanceRate={data.stats.attendanceRate} gpa={data.stats.gpa} />
    </div>
  );
}