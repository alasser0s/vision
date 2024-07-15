import frame87 from '../assets/Frame87.png'
import Navbar from '../components/Navbar'
import '../App.css'
import { useState } from 'react'
const SignUp = () => {
  const [formData , SetformData] = useState({})
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
        },
      ],
    },
  ]
const handlechange = (e) =>{
SetformData({...formData,[e.target.id]:e.target.value})

}
console.log(formData);
const handlesubmit = async (e) =>{
  e.preventDefault()
  try{
      const res = await fetch('api/auth/signup',{
    method: 'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify(FormData)
});
const data = await res.json()
  }catch (error){

  }

  

}

  return (
    <>
      <Navbar links={links} logoUrl={frame87} />
      <div className='bg-[#161616] flex items-center justify-center min-h-screen relative'>

        <div className='flex-col flex'>
          <a href="/">
            <img src={frame87} alt="" />
          </a>
          <p className='text-[30px] text-[#5E3FC6]'>
            سجل الان وانضم لتكتسب معرفة وتنضم لمجتممعنا!
          </p>
        </div>
        <div className='mr-32'>
          <form onSubmit={handlesubmit} >
            <div className='flex flex-col gap-2'>
              <label htmlFor="username" className='text-[25px]'>username</label>
              <input type="text" placeholder='username' id='username' className='px-32 py-2 rounded-[10px] bg-slate-950 text-white 'onChange={handlechange} />
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor="email" className='text-[25px]'>email</label>
              <input type="text" placeholder='email' id='email' className='px-32 py-2 rounded-[10px] bg-slate-950 text-white 'onChange={handlechange} />
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor="password" className='text-[25px]'>password</label>
              <input type="text" placeholder='password' id='password' className='px-32 py-2 rounded-[10px] bg-slate-950 text-white 'onChange={handlechange} />
            </div>
            <button className='p-10'>
              submit
            </button>
            
            <span>
              have an account?</span>
            <a href="/sign-in">sign in</a>

          </form>
        </div>

      </div>
    </>
  )
}

export default SignUp
