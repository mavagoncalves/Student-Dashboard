// Blueprints
export interface Course {
  id: number;
  title: string;
  iconColor: string;
}

export interface StudentStats {
  attendanceRate: number;
  gpa: number;
}

export interface DashboardData {
  courses: Course[];
  stats: StudentStats;
}

// Helper array for cycling colors on course cards
const courseColors = ['bg-[#B3E2AF]', 'bg-blue-300', 'bg-gray-300', 'bg-gray-300', 'bg-pink-200', 'bg-purple-200'];

// Fetching
export const fetchDashboardData = async (): Promise<DashboardData> => {
  try {
    // Fetch fake users
    const res = await fetch('https://dummyjson.com/users?limit=6');
    const data = await res.json();

    const courses: Course[] = data.users.map((user: any, index: number) => ({
      id: user.id,
      title: user.company.department, 
      iconColor: courseColors[index % courseColors.length],
    }));

    return {
      courses,
      stats: {
        // attendance and gpa based on random user data fields
        attendanceRate: Math.min(100, Math.floor(data.users[0].weight)), 
        gpa: Number((data.users[0].height / 50).toFixed(1)) 
      }
    };
  } catch (error) {
    console.error("Failed to fetch dashboard data:", error);
    // Fallback data just in case the API goes down
    return {
      courses: [],
      stats: { attendanceRate: 0, gpa: 0 }
    };
  }
};