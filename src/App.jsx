import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Cases from './pages/Cases';
import NewCase from './pages/NewCase';
import CaseDetail from './pages/CaseDetail';
import AssignTask from './pages/AssignTask';
import VerifierWorkspace from './pages/VerifierWorkspace';
import ReviewTask from './pages/ReviewTask';
import Report from './pages/Report';
import MyTasks from './pages/MyTasks';

function Protected({ children, blockedFor = [] }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (blockedFor.includes(user.role)) return <Navigate to="/" replace />;
  return <Layout>{children}</Layout>;
}

function Home() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (user.role === 'verifier') return <Navigate to="/my-tasks" replace />;
  return <Layout><Dashboard /></Layout>;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/cases" element={<Protected blockedFor={['verifier']}><Cases /></Protected>} />
          <Route path="/cases/new" element={<Protected blockedFor={['verifier']}><NewCase /></Protected>} />
          <Route path="/cases/:id" element={<Protected blockedFor={['verifier']}><CaseDetail /></Protected>} />
          <Route path="/cases/:id/report" element={<Protected blockedFor={['verifier']}><Report /></Protected>} />
          <Route path="/tasks/:taskId/assign" element={<Protected><AssignTask /></Protected>} />
          <Route path="/tasks/:taskId/verify" element={<Protected><VerifierWorkspace /></Protected>} />
          <Route path="/tasks/:taskId/review" element={<Protected><ReviewTask /></Protected>} />
          <Route path="/my-tasks" element={<Protected><MyTasks /></Protected>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}