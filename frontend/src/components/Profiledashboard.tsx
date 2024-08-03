import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '@/firebase';
import { Loader2, Terminal } from "lucide-react";
import { Input } from './ui/input';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from './ui/button';
import { updateFailure, updateSuccess, updateStart } from '@/redux/user/userslice';
import { Label } from './ui/label';
const Profiledashboard: React.FC = () => {
  const { currentUser } = useSelector((state: any) => state.user);
  const [image, setImage] = useState<File | null>(null);
  const [imageURL, setImageURL] = useState<string>('');
  const fileref = useRef<HTMLInputElement>(null);
  const [imageUpload, setImageUpload] = useState<number | string | null>(null);
  const [imageUploadError, setImageUploadError] = useState<string | null>(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [updateError , setupdateError] = useState<string>()
  const [updatesuccessed , setupdatesuccessed] = useState<string>()
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
console.log(formData);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.keys(formData).length === 0) {
           setupdateError('nothing has entered');

      return;
    }
    try {
      
      dispatch(updateStart());
      const res = await fetch(`http://localhost:5000/api/user/update/${currentUser._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: 'include', // Ensure cookies are sent with the request

      });
      
      
      console.log(res)
      const data = await res.json();
      console.log(data);
      
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setupdateError(data.message)
      } else {
        dispatch(updateSuccess(data));
        setupdatesuccessed("updated user successfully")
      }
    } catch (error : any) {
      dispatch(updateFailure(error.message));
      setupdateError(error.message)
    }
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImageURL(URL.createObjectURL(file));
    }
  };

  const imgUpload = async () => {
    if (image) {
      const storage = getStorage(app);
      const filename = new Date().getTime() + image.name;
      const storageRef = ref(storage, filename);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUpload(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError(error.message);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setImageURL(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
        }
      );
    }
  };

  useEffect(() => {
    if (image) {
      imgUpload();
    }
  }, [image]);
console.log(onsubmit)
  return (
    <div className='mx-auto w-full p-3 max-w-lg'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
      <form className='flex flex-col' onSubmit={handleSubmit}>
        <input 
          type="file" 
          accept='image/*' 
          onChange={handleImage} 
          ref={fileref} 
          className='hidden' 
        />
        <div 
          className='w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full' 
          onClick={() => fileref.current?.click()}
        >
          <img 
            src={imageURL || currentUser?.PhotoUrl} 
            alt="Profile" 
            className='rounded-full w-full h-full object-cover border-9 border-[lightgray]' 
          />
        </div>
        <div className='flex flex-col '>
          {imageUploadError && (
            <Alert>
              <Terminal className="h-4 w-4" />
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription>{imageUploadError}</AlertDescription>
            </Alert>
          )}
          {image && <span>{image.name}</span>}
          {imageUploadError && <span>{imageUploadError}</span>}
          {imageUpload !== null && <span>{`Upload progress: ${imageUpload}%`}</span>}
         </div>
          <div>
              <Label htmlFor="email" className='text-white'>Email</Label>
              <Input type="text" placeholder={currentUser.email} id='email' className='' onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="username" className='text-white'>Username</Label>
              <Input type="text" placeholder={currentUser.username} id='username' className='' onChange={handleChange} />
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
                  "update"
                )}
              </Button>
              {updatesuccessed && (
          <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
{updatesuccessed}          </AlertDescription>
        </Alert>
              )}
              {updateError && (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{updateError}</AlertDescription>
              </Alert>
              )}
        </div>
      </form>
    </div>
  );
};

export default Profiledashboard;
