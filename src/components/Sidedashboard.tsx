import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

const Sidedashboard: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [tab, settab] = useState('');
  const { currentUser } = useSelector((state: any) => state.user);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabParam = urlParams.get('tab');
    if (tabParam) {
      settab(tabParam);
    } else {
      settab('profile');
    }
  }, [location.search]);

  const handleClick = (tabname: string) => {
    navigate(`?tab=${tabname}`);
  };

  return (
    <div className="bg-gray-900 opacity-75 text-white h-screen mt-24 w-52 p-4 z-10 ">
      <ul className="menu">
        <li className={tab === 'profile' ? 'text-black cursor-pointer' : 'cursor-pointer'}>
          <a onClick={() => handleClick('profile')}>Profile</a>
        </li>
        <li className={tab === 'logout' ? 'bg-black cursor-pointer' : 'cursor-pointer'}>
          <a onClick={() => handleClick('logout')}>Logout</a>
        </li>
        {currentUser && currentUser.IsAdmin && (
          <li className={tab === 'posts' ? 'bg-black cursor-pointer' : 'cursor-pointer'}>
            <a onClick={() => handleClick('posts')}>Posts</a>
          </li>
        )}
        <li>
          <a>Sidebar Item 4</a>
        </li>
      </ul>
    </div>
  );
};

export default Sidedashboard;
