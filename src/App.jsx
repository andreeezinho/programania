import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./hooks/PrivateRoute";
import LoginRoute from "./hooks/LoginRoute";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";

export default function App() {
  return(
    <>
      <Router>
        <Routes>

          <Route path="/login" element={<LoginRoute />}>
            <Route index element={<Login />} />
          </Route>

          {/* ROTAS PUBLICAS */} 
          {/* <Route path="/recuperar-senha" element={<RecoveryPassword />} /> */}

          <Route path="/" element={<PrivateRoute />}>
            <Route index element={<Home />} />
          </Route>

        </Routes>
      </Router>
    </>
  );
}
