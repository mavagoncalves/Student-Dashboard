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
    <aside className="w-72 bg-[#A8C9D8] flex flex-col justify-between min-h-screen p-10 border-r border-gray-300">
      <div className="space-y-12">
        {/* BRAND*/}
        <Link to="/dashboard" className="inline-block">
          <h1 className="text-3xl font-extrabold text-blue-900 border-b-4 border-blue-900 leading-tight">
            MPCircle.
          </h1>
        </Link>

        {/* PROFILE AVATAR*/}
        <div className="w-32 h-44 rounded-[40px] border-4 border-gray-200 overflow-hidden shadow-inner">
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="Profile Avatar"
            className="w-full h-full object-cover"
          />
        </div>

        {/* NAVIGATION */}
        <nav className="space-y-2 pt-10">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl text-lg font-semibold transition-colors ${
                  isActive
                    ? 'bg-blue-100 text-blue-900'
                    : 'text-gray-800 hover:bg-white/20 hover:text-gray-950'
                }`}
              >
                <Icon size={24} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* SIGN OUT */}
      <div className="border-t border-gray-200 pt-6">
        <Link
          to="/"
          className="flex items-center gap-3.5 px-4 py-3 rounded-2xl text-lg font-semibold text-gray-800 hover:bg-red-100 hover:text-red-700 transition-colors"
        >
          <LogOut size={24} />
          Sign Out
        </Link>
      </div>
    </aside>
  );
}