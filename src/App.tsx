import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { auth, onAuthStateChanged } from './firebase';
import { setUser } from './redux/user/authSlice';
import Home from "./pages/الرئيسية";
import Desc from "./pages/من نحن";
import Store from "./pages/المتجر";
import Articale from "./pages/المدونة";
import Articales from "./pages/المدونات";
import Dashboard from "./pages/dashboard";
import SignUp from "./pages/تسجيل الدخول";
import SignIn from './components/SignIn';
import Privateroutes from "./components/Privateroutes";
import Layouts from "./components/Layouts";
import PostPage from "./pages/PostPage";
import ProductPage from "./pages/ProductPage";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch(setUser(user));
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Layouts />}>
        <Route index element={<Home />} />
        <Route path="/من-نحن" element={<Desc />} />
        <Route path="/المتجر" element={<Store />} />
        <Route path="/المدونة" element={<Articale />} />
        <Route path="/العناصر" element={<Articales />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<Privateroutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/post/:postSlug" element={<PostPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Route>
    </Routes>
  );
}

export default App;
