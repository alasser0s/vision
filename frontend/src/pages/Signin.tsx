import frame87 from '../assets/visionlogo.png';
import Navbar from '../components/Navbar';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useState, ChangeEvent, FormEvent } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { Loader2 } from 'lucide-react';
import { signInstart, signInSuccess, signInErorr } from '@/redux/user/userslice';
import { useDispatch, useSelector } from 'react-redux';
import OAuth from '@/components/OAuth';

interface FormData {
  email?: string;
  password?: string;
}

const Signin = () => {
  const [formData, setFormData] = useState<FormData>({});
  const { loading, error: messageError } = useSelector((state: any) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();



  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");

    if (!formData.email || !formData.password) {
      console.log("All fields are required");
      dispatch(signInErorr("All fields are required"));
      return;
    }

    try {
      console.log("Dispatching signInstart");
      dispatch(signInstart());

      const res = await fetch('http://localhost:5000/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      console.log("Response received", data);

      if (res.ok) {
        console.log("worked", data.message);
        dispatch(signInSuccess(data));
        navigate('/')
      } 
    } catch (error) {
      console.log("Error during sign-in:", error.message);
      dispatch(signInErorr(error.message));
    }
  };

  return (
    <>
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
              <Button variant={'ghost'} type="submit" className='py-3 px-40 rounded-[10px] text-white outline-white'>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <span>Loading . . .</span>
                  </>
                ) : (
                  "Sign in"
                )}
              </Button>
              <OAuth />
            </div>
          </form>
          <div className='flex'>
            <span className='text-white'>Don't have an account?</span>
            <a href="/تسجيل الدخول" className='text-purple-300'>Sign up</a>
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
