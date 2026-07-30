import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './features/auth/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rendering Login page at root URL */}
        <Route path="/" element={<Login />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
