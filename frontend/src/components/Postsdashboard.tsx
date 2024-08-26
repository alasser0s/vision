import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
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
const PostsDashboard: React.FC = () => {
    const { currentUser } = useSelector((state: any) => state.user);
    const [postUser, setPostUser] = useState<any[]>([]);
    const [showmore,setshowmore] = useState(false)
    const [postIdToDelete, setPostIdToDelete] = useState<string>('');

    console.log(postUser);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch(`/api/post/getpost?userId=${currentUser._id}`);
                const data = await res.json();
                console.log('Fetched data:', data);
                if (res.ok) {
                    setPostUser(data.posts);

                    if(data.posts.length < 9){
return setshowmore(false)
                    }
                }
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        if (currentUser.IsAdmin) {
            fetchPosts();
        }
    }, [currentUser._id]);
const hangleshowmore = async () =>{
    const startIndex = postUser.length
    try {
            const res = await fetch(`/api/post/getpost?userId=${currentUser._id}&startIndex=${startIndex}`)
const data=await res.json()
if(res.ok){
    setPostUser((prev)=>[...prev, ...data.posts])
    if(data.posts.length < 9){
        setshowmore(false)
    }
} 
    } catch (error:any) {
        console.log(error.message);
        
    }
}
const handlDelete = async() => {
    try {
        const res = await fetch(
          `/api/post/deletepost/${postIdToDelete}/${currentUser._id}`,
          {
            method: 'DELETE',
          }
        );
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
        } else {
          setPostUser((prev) =>
            prev.filter((post) => post._id !== postIdToDelete)
          );
        }
      } catch (error : any) {
        console.log(error.message);
      }
}
    return (
        <div className="container mx-auto p-4">
            {currentUser.IsAdmin && postUser.length > 0 ? (
                <>
                    <Table className="w-full max-w-[100%] mx-auto border border-gray-700">
                        <TableCaption className="text-center text-lg font-semibold">
                            A list of your recent invoices.
                        </TableCaption>
                        <TableHeader className="bg-gray-800 text-white text-2xl">
                            <TableRow>
                                <TableHead className="p-3 w-[120px]">Date</TableHead>
                                <TableHead className="p-3">POST IMAGE</TableHead>
                                <TableHead className="p-3">POST TITLE</TableHead>
                                <TableHead className="p-3">CATEGORY</TableHead>
                                <TableHead className="p-3 text-right">DELETE</TableHead>
                                <TableHead className="p-3 text-right">EDIT</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className='text-2xl text-gray-500 hover:text-black'>
                            {postUser.map((post) => (
                                <TableRow key={post._id} className="">
                                    <TableCell className="p-3 font-medium text-center">
                                        {new Date(post.updatedAt).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="p-3">
                                        <Link to={`/post/${post.slug}`}>
                                            <img
                                                src={post.images}
                                                alt={post.title}
                                                className="w-20 h-10 object-cover rounded"
                                            />
                                        </Link>
                                    </TableCell>
                                    <TableCell className="p-3">
                                        <Link to={`/post/${post.slug}`}>
                                            {post.title}
                                        </Link>
                                    </TableCell>
                                    <TableCell className="p-3 text-center">
                                        {post.category}
                                    </TableCell>
                                    <TableCell className="p-3 text-right">
                                         <AlertDialog>
            <AlertDialogTrigger><span className="font-medium text-red-700 cursor-pointer" >delete</span></AlertDialogTrigger>
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
                  continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
                                    </TableCell>
                                    <TableCell className="p-3 text-right">
                                        <Link className="text-purple-800" to={`/update-post/${post._id}`}>
                                            <span>Edit</span>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>   
                    
                    {showmore&&(
                        <Button variant={'outline'} onClick={hangleshowmore}>SHOW more</Button>
                )}
                </>
            ) : (
                <></>
            )}
        </div>
    );
};

export default PostsDashboard;
