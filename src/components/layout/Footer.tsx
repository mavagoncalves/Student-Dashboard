export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-4 px-8 text-center text-xs text-gray-500">
      <p>© {new Date().getFullYear()} Student Portal. All rights reserved.</p>
    </footer>
  );
}