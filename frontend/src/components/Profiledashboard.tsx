import React, { ReactEventHandler, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Label } from '@radix-ui/react-label';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '@/firebase';
import { Terminal } from "lucide-react"
 
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
const Profiledashboard: React.FC = () => {
  const { currentUser } = useSelector((state: any) => state.user);
  const [image, setImage] = useState<File | null>(null);
  const [imageURL, setImageURL] = useState<String>('');
  const fileref = useRef<HTMLInputElement>(null);
  const [imageUpload, setImageUpload] = useState<number | string | null>(null);
  const [imageUploadError, setImageUploadError] = useState<String | null>(null);

  console.log(imageUpload, imageUploadError);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImageURL(URL.createObjectURL(file));
    }
  };

  const imgupload = async () => {
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
          setImageUploadError('your file must be less than 2MB');
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setImageURL(downloadURL);
        }
      );
    }
  };

  useEffect(() => {
    if (image) {
      imgupload();
    }
  }, [image]);

  return (
    <div className='mx-auto w-full p-3 max-w-lg'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
      <form className='flex flex-col'>
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
        {imageUploadError && (
           <Alert>
           <Terminal className="h-4 w-4" />
           <AlertTitle>Heads up!</AlertTitle>
           <AlertDescription>
{imageUploadError}           </AlertDescription>
         </Alert>
        )}
        {image && <span>{image.name}</span>}
        {imageUploadError && <span>{imageUploadError}</span>}
        {imageUpload !== null && <span>{`Upload progress: ${imageUpload}%`}</span>}

        <Label>{currentUser?.email}</Label>
        <Label>{currentUser?.username}</Label>
      </form>
    </div>
  );
};

export default Profiledashboard;
