import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, BookOpen, FileCheck, LogOut } from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Courses', path: '/courses', icon: BookOpen },
    { name: 'Assignments', path: '/assignments', icon: FileCheck },
  ];

  return (
    // Added 'h-auto' here for mobile so it doesn't take over the screen
    <aside className="w-full md:w-72 bg-[#A8C9D8] flex flex-row md:flex-col justify-between items-center md:items-stretch h-auto md:min-h-screen p-4 md:p-10 border-b md:border-b-0 md:border-r border-gray-300 sticky top-0 z-50">
      
      {/* BRAND */}
      <div className="flex flex-col items-center md:items-start gap-4 md:gap-12">
        <Link to="/dashboard" className="inline-block">
          <h1 className="text-2xl md:text-3xl font-extrabold text-blue-900 md:border-b-4 md:border-blue-900 leading-tight">
            LearnGround
          </h1>
        </Link>

        {/* PROFILE PICTURE */}
        <div className="ml-4 hidden md:block w-40 h-40 rounded-[80px] border-4 border-gray-200 overflow-hidden shadow-inner">
          <img
            src="https://randomuser.me/api/portraits/women/63.jpg"
            alt="Profile Avatar"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* NAVIGATION */}
      <nav className="flex flex-row md:flex-col gap-2 md:space-y-2 flex-1 md:flex-none justify-center md:justify-start px-2 md:px-0 md:pt-10 overflow-x-auto no-scrollbar">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              title={item.name} 
              className={`flex items-center justify-center md:justify-start gap-0 md:gap-4 p-3 md:px-4 md:py-3.5 rounded-xl md:rounded-2xl text-lg font-semibold transition-colors shrink-0 ${
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

      {/* SIGN OUT BUTTON */}
      <div className="md:border-t md:border-gray-200 md:pt-6">
        <Link
          to="/"
          title="Sign Out"
          className="flex items-center justify-center md:justify-start gap-0 md:gap-3.5 p-3 md:px-4 md:py-3 rounded-xl md:rounded-2xl text-lg font-semibold text-gray-800 hover:bg-red-100 hover:text-red-700 transition-colors shrink-0"
        >
          <LogOut size={24} />
          <span className="hidden md:inline-block">Sign Out</span>
        </Link>
      </div>
      
    </aside>
  );
}