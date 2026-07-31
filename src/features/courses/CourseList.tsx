import { useState, useEffect } from 'react';
import { BookOpen, Monitor, Database, Cpu, Layout, Globe, Briefcase, PenTool, LineChart, Microscope } from 'lucide-react';
import { fetchCoursesList, type CourseDetail } from '../../services/api';

const IconMap: Record<string, any> = {
  BookOpen, Monitor, Database, Cpu, Layout, Globe, Briefcase, PenTool, LineChart, Microscope
};

export default function Courses() {
  const [courses, setCourses] = useState<CourseDetail[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Track which course is currently expanded
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    const loadCourses = async () => {
      const data = await fetchCoursesList();
      setCourses(data);
      setIsLoading(false);
    };

    loadCourses();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-xl font-bold text-gray-800 animate-pulse">Loading courses...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900">All Courses</h1>
      
        {/*Grid setup: 2 columns on mobile, 3 on tablet, 4 on desktop. When a card expands, it takes up 2 columns.*/}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {courses.map((course) => {
          const isExpanded = expandedId === course.id;
          
          const IconComponent = IconMap[course.iconName] || BookOpen;
          
          return (
            <div 
              key={course.id} 
              onClick={() => setExpandedId(isExpanded ? null : course.id)}
              className={`bg-white rounded-3xl shadow-sm border border-gray-100 cursor-pointer overflow-hidden transition-all duration-300 ease-in-out hover:shadow-md ${
                isExpanded 
                  ? 'col-span-2 row-span-1 flex flex-row p-6 items-center' 
                  : 'col-span-1 aspect-square flex flex-col p-4 md:p-6 items-center justify-center space-y-4'
              }`}
            >
              {/* Icon / Avatar - Adapts shape when expanded */}
              <div className={`${course.iconColor} transition-all duration-300 flex items-center justify-center shadow-inner flex-shrink-0 ${
                isExpanded 
                  ? 'w-16 h-16 rounded-2xl' 
                  : 'w-16 h-16 md:w-20 md:h-20 rounded-full'
              }`}>
                <IconComponent className={`${isExpanded ? 'w-8 h-8' : 'w-8 h-8 md:w-10 md:h-10'} text-white`} />
              </div>

              {/* Dynamic Content */}
              {isExpanded ? (
                // EXPANDED VIEW: Details
                <div className="ml-5 flex-1 flex flex-col justify-center min-w-0 animate-in fade-in duration-300">
                  <h3 className="font-bold text-gray-900 text-lg truncate">{course.title}</h3>
                  <p className="text-sm text-gray-500 truncate mb-3">Prof. {course.lecturer}</p>

                  <div className="w-full bg-gray-100 rounded-full h-2 mb-2 overflow-hidden">
                    <div 
                      className="bg-gray-800 h-2 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs font-bold text-gray-900">{course.progress}%</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${
                      course.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      course.status === 'Not Started' ? 'bg-gray-100 text-gray-600' :
                      'bg-blue-50 text-blue-700'
                    }`}>
                      {course.status}
                    </span>
                  </div>
                </div>
              ) : (
                // COLLAPSED VIEW
                <button className="bg-[#D6DBDF] px-3 md:px-4 py-1.5 md:py-2 rounded-lg font-semibold text-gray-800 text-xs md:text-sm w-full truncate pointer-events-none">
                  {course.title}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}