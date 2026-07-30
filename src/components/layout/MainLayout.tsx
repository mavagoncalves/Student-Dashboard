import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Footer from './Footer';

export default function MainLayout() {
  return (
    <div className="flex min-h-screen bg-[#FCFBF3] text-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col justify-between">
        <main className="p-16">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}