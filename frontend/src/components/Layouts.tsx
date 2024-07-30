import React from 'react';
import Navbar from './Navbar';
import frame78 from '../assets/visionlogo.png';
import Footer from './Footer';
interface LayoutsProps {
  children: React.ReactNode;
}

const Layouts: React.FC<LayoutsProps> = ({ children }) => {
  const links = [
    {
      name: 'الرئيسية',
      url: '/',
      className: ''
    },
    {
      name: 'من نحن',
      url: '/',
      className: ''
    },
    {
      name: 'السوق',
      url: '/',
      className: ''
    },
    {
      name: 'الاجهزه',
      url: '/',
      className: '',
      dropdown: [
        {
          name: 'Web Development',
          url: '/services/web-development',
          className: ''
        },
        {
          name: 'SEO Optimization',
          url: '/services/seo-optimization',
          className: ''
        }
      ]
    }
  ];

  return (
    <div className="bg-[#161616] flex flex-col">
      <Navbar links={links} logoUrl={frame78} />
      <main className="flex-grow ">{children}</main>
      <Footer /> {/* Ensure Footer is included */}
    </div>
  );
};

export default Layouts;
