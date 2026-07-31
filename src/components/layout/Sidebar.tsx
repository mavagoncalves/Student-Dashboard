import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, BookOpen, FileCheck, LogOut } from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Courses', path: '/courses', icon: BookOpen },
    { name: 'Assignments', path: '/assignments', icon: FileCheck },
  ];

  return (
    <aside className=" sticky top-0 z-50 w-full md:w-72 shrink-0 bg-[#A8C9D8] flex flex-row md:flex-col justify-between items-center md:items-stretch h-auto md:h-screen p-4 md:p-8 border-b md:border-b-0 md:border-r border-gray-300 md:sticky top-0 z-50">
      
      {/* TOP GROUP: Brand, Profile, and Nav */}
      <div className="flex flex-row md:flex-col items-center md:items-stretch gap-4 md:gap-8 flex-1 min-w-0">
        
        {/* BRAND */}
        <div className="flex-shrink-0 flex justify-center md:justify-start">
          <Link to="/dashboard" className="inline-block">
            <h1 className="text-xl md:text-3xl font-extrabold text-blue-900 md:border-b-4 md:border-blue-900 leading-tight">
              LearnGround
            </h1>
          </Link>
        </div>

        {/* PROFILE PICTURE & NAME */}
        <div className="hidden md:flex flex-col items-center gap-3">
          <div className="w-32 h-32 rounded-full border-4 border-gray-200 overflow-hidden shadow-inner">
            <img
              src="https://randomuser.me/api/portraits/women/63.jpg"
              alt="Profile Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-xl font-bold text-gray-900 text-center">Maria</h2>
        </div>

        {/* NAVIGATION */}
        <nav className="flex flex-row md:flex-col gap-2 flex-1 md:flex-none justify-start overflow-x-auto no-scrollbar w-full">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                title={item.name} 
                className={`flex items-center justify-center md:justify-start gap-0 md:gap-4 p-2.5 md:px-4 md:py-3.5 rounded-xl md:rounded-2xl text-lg font-semibold transition-colors shrink-0 ${
                  isActive
                    ? 'bg-blue-100 text-blue-900'
                    : 'text-gray-800 hover:bg-white/20 hover:text-gray-950'
                }`}
              >
                <Icon size={24} />
                <span className="hidden md:inline-block">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* SIGN OUT BUTTON */}
      <div className="ml-2 md:ml-0 md:mt-auto md:border-t md:border-gray-200 md:pt-6 flex-shrink-0">
        <button
          onClick={() => {
            localStorage.removeItem('learnGround_auth');
            navigate('/', { replace: true });
          }}
          title="Sign Out"
          className="w-full flex items-center justify-center md:justify-start gap-0 md:gap-3.5 p-2.5 md:px-4 md:py-3 rounded-xl md:rounded-2xl text-lg font-semibold text-gray-800 hover:bg-red-100 hover:text-red-700 transition-colors shrink-0"
        >
          <LogOut size={24} />
          <span className="hidden md:inline-block">Sign Out</span>
        </button>
      </div>
      
    </aside>
  );
}