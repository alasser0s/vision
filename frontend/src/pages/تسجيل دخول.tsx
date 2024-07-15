import frame87 from '../assets/Frame87.png'
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import Navbar from '../components/Navbar'
import '../App.css'
import React from 'react'
const SignUp = () => {
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

  return (
    <div className='bg-[#161616]'>
      <Navbar links={links} logoUrl={frame87} />

      <div className="flex flex-col items-center justify-center min-h-screen relative ">
        <a href="/">
          <img src={frame87} alt="" />
        </a>
        <p className='text-[40px] text-[#5E3FC6]'>
          سجل الان وانضم لتكتسب معرفة وتنضم لمجتممعنا!
        </p>
      </div>
      <div className=''>
        <form >
<Label>

</Label>
        </form>
      </div>

    </div>
  )
}

export default SignUp
