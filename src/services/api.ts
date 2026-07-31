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
    // Fetch fake post -> courses, and a fake user 
    const [postsRes, userRes] = await Promise.all([
      fetch('https://dummyjson.com/posts?limit=6'),
      fetch('https://dummyjson.com/users/1')
    ]);

    const postsData = await postsRes.json();
    const userData = await userRes.json();

    // Map the DummyJSON posts into course blueprint
    const courses: Course[] = postsData.posts.map((post: any, index: number) => ({
      id: post.id,
      // Shorten dummy title to 3 words so it fits in the cards
      title: post.title.split(' ').slice(0, 3).join(' '), 
      iconColor: courseColors[index % courseColors.length],
    }));

    return {
      courses,
      stats: {
        // attendance and gpa based on random user data fields
        attendanceRate: Math.min(100, Math.floor(userData.weight)), 
        gpa: Number((userData.height / 50).toFixed(1)) 
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