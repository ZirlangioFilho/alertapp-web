import "./index.css";
import AppRouter from "./page/router";
import { AuthProvider } from "./context/AuthContext";

export const App = () => {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
};

export default App;