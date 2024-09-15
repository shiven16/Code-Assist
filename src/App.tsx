import React from 'react';
import './App.css';
import CodeAssist from './components/pages/code-assist';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<CodeAssist />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
