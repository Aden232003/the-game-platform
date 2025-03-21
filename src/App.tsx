import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import DailyGameLab from './pages/DailyGameLab';
import PrivateRoute from './components/PrivateRoute';
import Achievements from './pages/Achievements';
import LearningPaths from './pages/LearningPaths';
import Social from './pages/Social';
import Arena from './pages/Arena';
import Vault from './pages/Vault';
import Infield from './pages/Infield';
import PrepMode from './pages/PrepMode';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/daily-lab"
              element={
                <PrivateRoute>
                  <DailyGameLab />
                </PrivateRoute>
              }
            />
            <Route
              path="/prep-mode"
              element={
                <PrivateRoute>
                  <PrepMode />
                </PrivateRoute>
              }
            />
            <Route
              path="/infield"
              element={
                <PrivateRoute>
                  <Infield />
                </PrivateRoute>
              }
            />
            <Route
              path="/vault"
              element={
                <PrivateRoute>
                  <Vault />
                </PrivateRoute>
              }
            />
            <Route
              path="/arena"
              element={
                <PrivateRoute>
                  <Arena />
                </PrivateRoute>
              }
            />
            <Route
              path="/social"
              element={
                <PrivateRoute>
                  <Social />
                </PrivateRoute>
              }
            />
            <Route
              path="/achievements"
              element={
                <PrivateRoute>
                  <Achievements />
                </PrivateRoute>
              }
            />
            <Route
              path="/learning-paths"
              element={
                <PrivateRoute>
                  <LearningPaths />
                </PrivateRoute>
              }
            />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;