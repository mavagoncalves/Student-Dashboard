import { Star, TrendingUp, CalendarDays } from 'lucide-react';

interface StatsProps {
  attendanceRate: number;
  gpa: number;
}

export default function Statistics({ attendanceRate, gpa }: StatsProps) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 pt-4 md:pt-8">
      {/* ATTENDANCE RATE CARD */}
      <div className="bg-[#D6DBDF] p-6 md:p-8 rounded-3xl md:rounded-[40px] flex flex-col justify-between gap-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white p-3 rounded-full shadow-sm">
              <CalendarDays className="text-gray-700 w-6 h-6 md:w-8 md:h-8" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-800">Attendance Rate</h3>
          </div>
          {/* BADGE*/}
          <div className="flex items-center gap-1 text-green-800 bg-green-200/60 px-3 py-1 rounded-full text-sm font-bold">
            <TrendingUp size={16} />
            <span>+2%</span>
          </div>
        </div>
        
        <div>
          <div className="flex items-end gap-3 mb-4">
            <span className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
              {attendanceRate}%
            </span>
            <span className="text-gray-700 font-semibold mb-1 md:mb-2 text-sm md:text-base">
              Present this semester
            </span>
          </div>
          
          {/* ATTENDANCE TRACKER */}
          <div className="w-full bg-gray-300 rounded-full h-3 md:h-4 overflow-hidden shadow-inner">
            <div 
              className="bg-gray-700 h-3 md:h-4 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${attendanceRate}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* GPA CARD */}
      <div className="bg-white p-6 md:p-8 rounded-3xl md:rounded-[40px] flex flex-col justify-between gap-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-yellow-50 p-3 rounded-full shadow-sm">
              <Star className="text-yellow-500 w-6 h-6 md:w-8 md:h-8" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-800">Current GPA</h3>
          </div>
          {/* STATUS BADGE */}
          <div className="flex items-center gap-1 text-blue-800 bg-blue-100 px-3 py-1 rounded-full text-sm font-bold">
            <TrendingUp size={16} />
            <span>Top 10%</span>
          </div>
        </div>

        <div>
          <div className="flex items-end gap-3 mb-2">
            <span className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
              {gpa}
            </span>
            <span className="text-gray-500 font-medium mb-1 md:mb-2 text-sm md:text-base">
              Overall Performance
            </span>
          </div>
          <p className="text-gray-500 text-sm md:text-base font-medium">
            Excellent academic standing across all registered courses. Keep up the great work!
          </p>
        </div>
      </div>
    </section>
  );
}