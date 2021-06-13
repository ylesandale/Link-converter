import { BrowserRouter as Router } from "react-router-dom";

import { useAuth } from "./hooks/auth";
import { useRoutes } from "./routes";
import { AuthContext } from "./context/authContext";
import { NavBar } from "./components/NavBar";
import { Loader } from "./components/Loader";

import "materialize-css";

const App = () => {
  const { token, userId, login, logout, ready } = useAuth();
  const isAuth = !!token;
  const routes = useRoutes(isAuth);

  if (!ready) {
    <Loader />;
  }

  return (
    <AuthContext.Provider value={{ token, userId, login, logout, isAuth }}>
      <Router>
        {isAuth && <NavBar />}
        <div className="container">{routes}</div>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
