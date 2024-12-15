import Postsdashboard from '@/components/Postsdashboard'
import Profiledashboard from '@/components/Profiledashboard'
import Sidedashboard from '@/components/Sidedashboard'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const Dashboard: React.FC = () => {
  const location = useLocation()
  const [tab, settab] = useState('')

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const tabParam = urlParams.get('tab')
    if (tabParam) {
      settab(tabParam)
    } else {
      settab('profile') // Default to 'profile' if no tab is specified
    }
  }, [location.search])

  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className='w-full md:w-1/4'>
        <Sidedashboard />
      </div>
      <div className='w-full md:w-3/4 flex justify-center items-center'>
        {tab === 'profile' && <Profiledashboard />}
        {tab === 'logout' && <div>Posts Page Content</div>}
        {tab === 'posts' &&<Postsdashboard/> }
      </div>
    </div>
  )
}

export default Dashboard
