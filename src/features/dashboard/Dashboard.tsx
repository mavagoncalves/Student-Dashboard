import { GraduationCap, Zap, Star } from 'lucide-react';

export default function Dashboard() {
  // Hardcoded for now will come from fake api later
  const courses = [
    { id: 1, name: 'Algorithms', iconColor: 'bg-[#B3E2AF]' },
    { id: 2, name: 'Data Structures', iconColor: 'bg-blue-300' },
  ];

  return (
    <div className="space-y-12">
      {/* PAGE HEADER + NEW COURSE BUTTON */}
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-extrabold text-gray-900">
          Welcome back, Maria!
        </h1>
        <button className="bg-[#D6DBDF] px-8 py-3 rounded-xl font-bold text-gray-800 hover:bg-gray-400 transition-colors">
          NEW COURSE
        </button>
      </div>

      {/* COURSES GRID */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-8">Your Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {courses.map((course) => (
            <div key={course.id} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center justify-center space-y-6">
              <div className={`${course.iconColor} w-28 h-28 rounded-full flex items-center justify-center shadow-inner`}>
                <GraduationCap className="w-14 h-14 text-white" />
              </div>
              <button className="bg-[#D6DBDF] px-6 py-2 rounded-lg font-semibold text-gray-800 hover:bg-gray-400 transition-colors text-sm">
                {course.name}
              </button>
            </div>
          ))}

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center justify-center space-y-6">
            <div className="bg-blue-300 w-28 h-28 rounded-[25px] flex items-center justify-center shadow-inner">
              <Zap className="w-14 h-14 text-white" />
            </div>
            <p className="font-semibold text-gray-800">Statistics</p>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-8">
        {/* ATTENDANCE RATE CARD */}
        <div className="bg-[#D6DBDF] p-15 rounded-[40px] flex items-center gap-8 shadow-sm">
          <span className="text-[90px] font-extrabold leading-none text-gray-90 tracking-tighter">
            95%
          </span>
          <span className="text-2xl font-medium text-gray-800 leading-tight">
            Attendance <br /> Rate
          </span>
        </div>

        {/* GPA CARD */}
        <div className="bg-white p-12 rounded-[40px] flex items-center gap-8 shadow-sm border border-gray-100">
          <Star className="text-yellow-500 w-24 h-24" />
          <div>
            <span className="text-6xl font-extrabold text-gray-900">3.8 GPA</span>
            <p className="text-gray-600 mt-2">Overall Student Performance</p>
          </div>
        </div>
      </section>
    </div>
  );
}