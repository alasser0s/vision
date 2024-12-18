import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import frame78 from '../assets/visionlogo.png';
import Footer from './Footer';

const Layouts = () => {
  const links = [
    {
      name: "الرئيسية",
      url: "/",
      className: ""
    },
    {
      name: "من نحن",
      url: "/من-نحن",
      className: ""
    },
    {
      name: "السوق",
      url: "/المتجر",
      className: ""
    },
    {
      name: "الاخبار",
      url: "/العناصر",
      className: ""
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar links={links} logoUrl={frame78} />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layouts;
