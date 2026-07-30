import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <div className="flex h-screen items-center justify-center bg-gray-50">
            <h1 className="text-3xl font-bold text-blue-600">App is working!</h1>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App
