import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/الرئيسية";
import Desc from "./pages/من نحن";
import Store from "./pages/المتجر";
import Articale from "./pages/المدونة";
import Articales from "./pages/المدونات";
import Dashboard from "./pages/dashboard";
import SignUp from "./pages/تسجيل الدخول";
import Signin from "./pages/Signin";

const App: React.FC = () => {
  return (
          <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/من نحن" element={<Desc />} />
        <Route path="/المتجر" element={<Store />} />
        <Route path="/المدونة" element={<Articale />} />
        <Route path="/العناصر" element={<Articales />} />
        <Route path="/تسجيل الدخول" element={<SignUp />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/signin" element={<Signin/>} />

      </Routes>
    </BrowserRouter>

  );
};

export default App;
