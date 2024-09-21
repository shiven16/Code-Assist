import './App.css';
import CodeAssist from './components/pages/code-assist';
import About from './components/pages/about';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './components/pages/signIn';
import SignUp from './components/pages/signUp';
import { ThemeProvider, useTheme } from './components/context/ThemeContext';
import AuthGuard from './firebase/authGuard';
import { AuthProvider } from './firebase/authContext';

function ThemedApp() {
  const {theme} = useTheme();

  return (
    <div className='themedapp'>
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

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <ThemedApp />
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
