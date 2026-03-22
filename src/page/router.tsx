import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { Home } from "./Home";
import Login from "./Login";
import Report from "./Report";
import { useAuth } from "../context/AuthContext";

function LoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#eef1f6] text-[#64748b]">
      Carregando...
    </div>
  );
}

/** Sessão Firebase + papel policial (igual validação do login). */
function ProtectedRoute({ children }: { children: ReactNode }) {
  const { loading, isPolice } = useAuth();

  if (loading) return <LoadingScreen />;
  if (!isPolice) return <Navigate to="/login" replace />;

  return <>{children}</>;
}

/** Tela de login: se já estiver logado como policial, vai para a home. */
function LoginRoute() {
  const { loading, isPolice } = useAuth();

  if (loading) return <LoadingScreen />;
  if (isPolice) return <Navigate to="/home" replace />;

  return <Login />;
}

export default function AppRouter() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/login" element={<LoginRoute />} />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/report"
          element={
            <ProtectedRoute>
              <Report />
            </ProtectedRoute>
          }
        />

        <Route path="/" element={<Navigate to="/home" replace />} />

        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </Router>
  );
}
