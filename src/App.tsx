import React from 'react';
import './App.css';
import CodeAssist from './components/pages/code-assist';
import About from './components/pages/about';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/main" element={<CodeAssist />} />
          <Route path="/" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
