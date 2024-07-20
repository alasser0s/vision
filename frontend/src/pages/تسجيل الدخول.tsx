import React, { useState, ChangeEvent, FormEvent } from 'react';
import frame87 from '../assets/visionlogo.png';
import Navbar from '../components/Navbar';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { Loader2 } from 'lucide-react';

interface Link {
  name: string;
  url: string;
  className: string;
  dropdown?: Link[];
}

interface FormData {
  username?: string;
  email?: string;
  password?: string;
}

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({});
  const [messageError, setMessageError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const links: Link[] = [
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setMessageError("All fields are required");
    }
    try {
      setLoading(true);
      setMessageError(null);
      const res = await fetch('http://localhost:5000/api/auth/signup', { // Ensure to use the full URL
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (!res.ok) {
        setMessageError(data.message || "Signup failed");
      } else {
        navigate('/signin'); // Use the navigate function properly
      }
    } catch (error) {
      setMessageError((error as Error).message);
    } finally {
      setLoading(false); // Ensure loading state is reset
    }
  };

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
          <form onSubmit={handleSubmit} className='grid w-full max-w-sm items-center gap-1.5'>
            <div className=''>
              <Label htmlFor="username" className='text-white'>username</Label>
              <Input type="text" placeholder='username' id='username' className='' onChange={handleChange} />
            </div>
            <div className=''>
              <Label htmlFor="email" className='text-white'>email</Label>
              <Input type="text" placeholder='email' id='email' className='' onChange={handleChange} />
            </div>
            <div className=''>
              <Label htmlFor="password" className='text-white'>password</Label>
              <Input type="text" placeholder='password' id='password' className='' onChange={handleChange} />
            </div>
            <div className='gap-5 flex flex-col text-sm mt-5'>
              <Button variant={'ghost'} type="submit" className='py-3 px-40 rounded-[10px] text-white outline-white' disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <span>loading . . .</span>
                  </>
                ) : (
                  "signup"
                )}
              </Button>
            </div>
          </form>
          <div className='flex'>
            <span className='text-white'>have an account?</span>
            <a href="/Signin" className='text-purple-300'>sign in</a>
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

export default SignUp;
