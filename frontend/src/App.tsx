
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import ProtectedRoutes from "./Context/prodected";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route path="/app/*" element={<ProtectedRoutes />}>
            <Route path="home" element={<Home />} />
          </Route>
        
        </Routes>
      </BrowserRouter>
  );
}

export default App;
