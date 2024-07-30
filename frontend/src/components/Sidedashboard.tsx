import React from 'react'
import { useLocation } from 'react-router-dom'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const Sidedashboard:React.FC = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [tab , settab] = useState('')
    useEffect(()=>{
      const urlpramats = new URLSearchParams(location.search)
      const tabFormul = urlpramats.get('tab')
      console.log(tabFormul);
      if (settab){
        settab(tab)
      }
    }

  ,
  [location.search])
  const handleCLick = (tabname:string) =>{
    navigate(`?tab=${tabname}`)
    settab = tabname
  }
  return (
    <div>
        <div className="flex mt-20 px-5 w-full">
    <ul className="menu bg-gray-900 opacity-75 text-white min-h-screen w-52 px-10 p-4">
      {/* Sidebar content here */}
      <li className={tab === "profile" ? 'text-black' : ''}
      ><a onClick={()=>handleCLick("profile")}>profile</a></li>
      <li className={tab === "logout" ? 'bg-black' : ''}><a onClick={()=>handleCLick("logout")}>Sidebar Item 2</a></li>
            <li className={tab === "profile" ? 'bg-black' : ''}><a onClick={()=>handleCLick("profile")}>Sidebar Item 2</a></li>
      <li className={tab === "profile" ? 'bg-black' : ''}><a onClick={()=>handleCLick("profile")}>Sidebar Item 2</a></li>
      <li className={tab === "profile" ? 'bg-black' : ''}><a onClick={()=>handleCLick("profile")}>Sidebar Item 2</a></li>
      <li className={tab === "profile" ? 'bg-black' : ''}><a onClick={()=>handleCLick("profile")}>Sidebar Item 2</a></li>
      <li><a>Sidebar Item 2</a></li>

    </ul>
  </div>
    </div>
  )
}

export default Sidedashboard
