import React from 'react'
import { ComboboxDemo } from './ui/category'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Button } from './ui/button'
import Something from './draftjs/StateEditor/Editor'
import 'katex/dist/katex.min.css';
const Createpost: React.FC = () => {
 
    return (
        <div className='flex flex-col p-3 max-w-3xl mx-auto mt-28'>
            <h1 className='text-center text-white text-3xl font-semibold  '>create post</h1>    
<form className='flex flex-col gap-5'>
    <div className='flex flex-col justify-between gap-4 sm:flex-row'>
        <Input type='text' placeholder='Title' required id='title'/>
        <div className='flex-1'>
        <ComboboxDemo/>

        </div>

    </div>
    <div className="flex border-purple-600 border-4 border-dotted w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="picture">Picture</Label>
      <Input id="picture" type="file" />
      <Button variant={'secondary'}>Upload Image</Button>
    </div>
<Something />   </form>
 </div>
)
}

export default Createpost
