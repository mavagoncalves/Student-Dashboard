import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Footer from './Footer';

export default function MainLayout() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#FCFBF3] text-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col justify-between w-full overflow-hidden">
        {/* smaller padding for mobile screens */}
        <main className="p-4 sm:p-8 md:p-16">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}