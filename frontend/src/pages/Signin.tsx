import frame87 from '../assets/visionlogo.png';
import Navbar from '../components/Navbar';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { Loader2 } from 'lucide-react';
import { signInstart, signInSuccess, signInErorr } from '@/redux/user/userslice';
import { useDispatch, useSelector } from 'react-redux';

const Signin = () => {
  const [formData, setFormData] = useState({});
  const { loading, error: messageError } = useSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      dispatch(signInErorr("All fields are required"));
      return;
    }
    try {
      dispatch(signInstart());
      const res = await fetch('http://localhost:5000/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(signInErorr(data.message));
      } else {
        dispatch(signInSuccess(data));
        navigate('/');
      }
    } catch (error) {
      dispatch(signInErorr(error.message));
    }
  };

  return (
    <>
      <Navbar links={links} logoUrl={frame87} />
      <div className='bg-[#161616] flex items-center justify-center min-h-screen relative'>
        <div className='flex-col flex'>
          <a href="/">
            <img src={frame87} alt="Vision Logo" />
          </a>
          <p className='text-[30px] text-[#5E3FC6]'>
            سجل الان وانضم لتكتسب معرفة وتنضم لمجتممعنا!
          </p>
        </div>
        <div className='mr-32'>
          <form onSubmit={handleSubmit} className='grid w-full max-w-sm items-center gap-1.5'>
            <div>
              <Label htmlFor="email" className='text-white'>Email</Label>
              <Input type="text" placeholder='Email' id='email' className='' onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="password" className='text-white'>Password</Label>
              <Input type="password" placeholder='************' id='password' className='' onChange={handleChange} />
            </div>
            <div className='gap-5 flex flex-col text-sm mt-5'>
              <Button variant={'ghost'} type="submit" className='py-3 px-40 rounded-[10px] text-white outline-white' disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <span>Loading . . .</span>
                  </>
                ) : (
                  "Sign in"
                )}
              </Button>
            </div>
          </form>
          <div className='flex'>
            <span className='text-white'>Don't have an account?</span>
            <a href="/Signin" className='text-purple-300'>Sign up</a>
          </div>
          {messageError && (
            <div className="">
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{messageError}</AlertDescription>
              </Alert>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Signin;
