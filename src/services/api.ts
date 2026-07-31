
// SHARED BLUEPRINTS & DATA
export interface CourseDetail {
  id: number;
  title: string;
  lecturer: string;
  progress: number;
  status: 'Not Started' | 'In Progress' | 'Completed';
  iconColor: string;
  iconName: string;
}

export interface StudentStats {
  attendanceRate: number;
  gpa: number;
}

export interface DashboardData {
  courses: CourseDetail[]; // Dashboard now uses the full CourseDetail
  stats: StudentStats;
}

const courseColors = [
  'bg-[#B3E2AF]', 
  'bg-blue-300', 
  'bg-gray-300', 
  'bg-pink-200', 
  'bg-purple-200'
];

const availableIcons = [
  'BookOpen', 'Monitor', 'Database', 'Cpu', 'Layout', 
  'Globe', 'Briefcase', 'PenTool', 'LineChart', 'Microscope'
];

// Helper to ensure colors and icons match perfectly across all pages
const formatCourse = (user: any, index: number): CourseDetail => {
  const progressVal = Math.min(100, Math.floor(user.weight)); 
  
  let currentStatus: 'Not Started' | 'In Progress' | 'Completed' = 'In Progress';
  if (progressVal === 0) currentStatus = 'Not Started';
  if (progressVal >= 90) currentStatus = 'Completed';

  return {
    id: user.id,
    title: user.company.department,
    lecturer: `${user.firstName} ${user.lastName}`,
    progress: progressVal,
    status: currentStatus,
    iconColor: courseColors[index % courseColors.length],
    iconName: availableIcons[index % availableIcons.length], 
  };
};


// DASHBOARD FETCH
export const fetchDashboardData = async (): Promise<DashboardData> => {
  try {
    // Limit to 4 to act as "pinned" dashboard courses
    const res = await fetch('https://dummyjson.com/users?limit=4');
    const data = await res.json();

    return {
      courses: data.users.map(formatCourse),
      stats: {
        attendanceRate: Math.min(100, Math.floor(data.users[0].weight)), 
        gpa: Number((data.users[0].height / 50).toFixed(1)) 
      }
    };
  } catch (error) {
    console.error("Failed to fetch dashboard data:", error);
    return {
      courses: [],
      stats: { attendanceRate: 0, gpa: 0 }
    };
  }
};


// COURSES PAGE FETCH
export const fetchCoursesList = async (): Promise<CourseDetail[]> => {
  try {
    const res = await fetch('https://dummyjson.com/users?limit=12');
    const data = await res.json();
    return data.users.map(formatCourse);
  } catch (error) {
    console.error("Failed to fetch courses:", error);
    return [];
  }
};