import './App.css';
import { useEffect } from 'react';
import CodeAssist from './components/pages/code-assist';
import About from './components/pages/about';
import { Route, Routes } from 'react-router-dom';
import SignIn from './components/pages/signIn';
import SignUp from './components/pages/signUp';
import { useTheme } from './components/context/ThemeContext';
import AuthGuard from './firebase/authGuard';

function App() {
  const { theme } = useTheme();

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
        <div className="themedapp">
          <Routes>
            <Route path="/" element={<About />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/main"
              element={
                <AuthGuard>
                  <CodeAssist />
                </AuthGuard>
              }
            />
          </Routes>
        </div>
  );
}

export default App;
