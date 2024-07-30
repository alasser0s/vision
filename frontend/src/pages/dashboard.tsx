import Profiledashboard from '@/components/Profiledashboard'
import Sidedashboard from '@/components/Sidedashboard'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const Dashboard: React.FC = () => {
  const location = useLocation()
  const [tab , settab] = useState('')
  useEffect(()=>{
    const urlpramats = new URLSearchParams(location.search)
    const tabFormul = urlpramats.get('tab')
    console.log(tabFormul);
    
  }
,
[location.search])
  return (
    <div>
      <div >
<Profiledashboard/>
      </div>
      <div className='min-h-screen flex flex-col'>
        <Sidedashboard/>
      </div>
    </div>
  )
}

export default Dashboard
