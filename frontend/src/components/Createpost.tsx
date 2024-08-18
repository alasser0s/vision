import React, { useEffect, useState } from 'react';
import { ComboboxDemo } from './ui/category';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import SlateEditor from './draftjs/StateEditor/Editor';
import 'katex/dist/katex.min.css';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '@/firebase';

const Createpost: React.FC = () => {
    const [file, setfile] = useState<File | null>(null);
    const [imageURL, setImageURL] = useState<string>('');
    const [formData, setFormData] = useState<any>({});
    const [publishError, setPublishError] = useState<string | null>(null);
    const [imageUpload, setImageUpload] = useState<number | string | null>(null);
    const [imageUploadError, setImageUploadError] = useState<string | null>(null);

    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setfile(file);
            setImageURL(URL.createObjectURL(file));
        }
    };

    const imgUpload = async () => {
        if (file) {
            const storage = getStorage(app);
            const filename = new Date().getTime() + file.name;
            const storageRef = ref(storage, filename);
            const uploadTask = uploadBytesResumable(storageRef, file);

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
                    setFormData({ ...formData, image: downloadURL });
                }
            );
        }
    };

    useEffect(() => {
        if (file) {
            imgUpload();
        }
    }, [file]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const serializedContent = JSON.stringify(formData.content);
        const postData = {
            ...formData,
            content: serializedContent, // Convert content to a JSON string
        };
        try {
            const res = await fetch('/api/post/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(postData),
            });
            const data = await res.json();
            if (!res.ok) {
                setPublishError(data.message);
            } else {
                setPublishError(null);
            }
        } catch (error: any) {
            setPublishError(error.message);
        }
    };

    return (
        <div className='flex flex-col p-3 max-w-3xl mx-auto mt-28'>
            <h1 className='text-center text-white text-3xl font-semibold'>Create Post</h1>
            <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
                <div className='flex flex-col justify-between gap-4 sm:flex-row'>
                    <Input type='text' placeholder='Title' required id='title' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, title: e.target.value })} />
                    <div className='flex-1'>
                        <ComboboxDemo onChange={(value) => setFormData({ ...formData, category: value })} />
                    </div>
                </div>
                <div className="flex border-purple-600 border-4 border-dotted w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="picture">Picture</Label>
                    <Input id="picture" type="file" onChange={handleImage} />
                    <Button variant={'secondary'} type="button" onClick={imgUpload}>Upload Image</Button>
                </div>
                <Input type='text' placeholder='price' className='w-20' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, price: e.target.value })} />
                {formData.image && (
                    <div>
                        <img src={formData.image} alt="upload" className='w-full h-72 object-cover' />
                    </div>
                )}
                {imageUpload !== null && <p>Upload Progress: {imageUpload}%</p>}
                {imageUploadError && <p className="text-red-500">Error: {imageUploadError}</p>}
                <SlateEditor onChange={(value) => setFormData({ ...formData, content: value })} />
                {publishError && <p className="text-red-500">Error: {publishError}</p>}
                <Button variant={'secondary'} className='w-full'>Publish</Button>
            </form>
        </div>
    );
};

export default Createpost;
