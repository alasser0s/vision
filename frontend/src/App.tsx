import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/الرئيسية";
import Desc from "./pages/من نحن";
import Store from "./pages/المتجر";
import Articale from "./pages/المدونة";
import Articales from "./pages/المدونات";
import Dashboard from "./pages/dashboard";
import SignUp from "./pages/تسجيل الدخول";
import Signin from "./pages/Signin";
import Privateroutes from "./components/Privateroutes";
import Layouts from "./components/Layouts";
import Createpost from "./pages/Createpost";
import UpdatePost from "./pages/UpdatePost";
import PostPage from "./pages/PostPage";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Layouts>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/من نحن" element={<Desc />} />
          <Route path="/المتجر" element={<Store />} />
          <Route path="/المدونة" element={<Articale />} />
          <Route path="/العناصر" element={<Articales />} />
          <Route path="/تسجيل الدخول" element={<SignUp />} />
          <Route element={<Privateroutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route element={<Privateroutes />}>
            <Route path="/create-post" element={<Createpost />} />
            <Route path="/update-post/:postId" element={<UpdatePost />} />
          </Route>
          <Route path="/signin" element={<Signin />} />
          <Route path="/post/:postSlug" element={<PostPage />} />
        </Routes>
      </Layouts>
    </BrowserRouter>
  );
};

export default App;
