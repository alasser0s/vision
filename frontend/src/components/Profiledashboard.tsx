import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '@/firebase';
import { Loader2, Terminal } from "lucide-react";
import { Input } from './ui/input';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from './ui/button';
import { updateFailure, updateSuccess, updateStart, deleteSuccess, deleteError, signOutSuccess } from '@/redux/user/userslice';
import { Label } from './ui/label';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Link, useNavigate } from 'react-router-dom';

const Profiledashboard: React.FC = () => {
  const { currentUser } = useSelector((state: any) => state.user);
  const [image, setImage] = useState<File | null>(null);
  const [imageURL, setImageURL] = useState<string>('');
  const fileref = useRef<HTMLInputElement>(null);
  const [imageUpload, setImageUpload] = useState<number | string | null>(null);
  const [imageUploadError, setImageUploadError] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [updateError, setupdateError] = useState<string>();
  const [updatesuccessed, setupdatesuccessed] = useState<string>();
  const dispatch = useDispatch();
  const [signOutLoading, setSignOutLoading] = useState(false);
 const navigate = useNavigate()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handlesignout = async () => {
    setSignOutLoading(true);
    try {
      const signOutResponse = await fetch('/api/user/signout', {
        method: 'POST',
        credentials: 'include',
      });
      const signOutResult = await signOutResponse.json();
      if (signOutResponse.ok) {
        dispatch(signOutSuccess());
        navigate('/');
      } else {
        console.error(signOutResult.message);
      }
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setSignOutLoading(false);
    }
  }
  const handlDelete = async () => {
    try {
      setLoading(true);
      const deleteAcc = await fetch(`http://localhost:5000/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
        credentials: 'include',

      });
      const result = await deleteAcc.json();
      if (!deleteAcc.ok) {
        dispatch(deleteError(result.message));

      } else {
        dispatch(deleteSuccess(result));
        navigate('/')
      }
    } catch (error: any) {
      dispatch(deleteError(error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.keys(formData).length === 0) {
      setupdateError('Nothing has entered');
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`http://localhost:5000/api/user/update/${currentUser._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: 'include',
      });

      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setupdateError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setupdatesuccessed("Updated user successfully");
      }
    } catch (error: any) {
      dispatch(updateFailure(error.message));
      setupdateError(error.message);
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
          <Button variant={'secondary'} type="submit" className='py-3 px-40 rounded-[10px] text-white outline-white'>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <span>Loading . . .</span>
              </>
            ) : (
              "Update"
            )}
          </Button>
          {currentUser.IsAdmin&&(
            <Link to={'/create-post'}>
            <Button variant={'ghost'}>
            Create Post
            </Button>
            </Link>
          )}
          <AlertDialog>
            <AlertDialogTrigger className='w-full'><Button variant={'destructive'}>delete</Button></AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your account
                  and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handlDelete}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      <span>Deleting...</span>
                    </>
                  ) : (
                    "Continue"
                  )}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <AlertDialog>
            <AlertDialogTrigger >signout</AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                 this act will let you sign out the account
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handlesignout}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      <span>signing out. . .</span>
                    </>
                  ) : (
                    "yes sign me out"
                  )}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          {updatesuccessed && (
            <Alert>
              <Terminal className="h-4 w-4" />
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription>
                {updatesuccessed}
              </AlertDescription>
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
