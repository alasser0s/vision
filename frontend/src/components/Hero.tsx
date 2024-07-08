import '../App.css'
import caffe from '../assets/Desktop - 2.png'; // Corrected the import for the image
import cafe from '../assets/Untitled.png'
import frame87 from "../assets/Frame87.png"
import Slideshow from './Slideshow';
import Main from './Main';
import Cards from './Cards';
import CardSlider from './CardSlider';
const slides = [
  {image:frame87, content:'هووك المدونة', alt:'', paragraph:'وصف المدونة' , url:''},
  {image:cafe, content:'هووك المدونة2', alt:'', paragraph:'' , url:''},
  {image:caffe, content:'هووك المدونة5', alt:'', paragraph:'' , url:''},

]
const col =
[
  {img:frame87, content:'هووك المدونة', alt:'', paragraph:'وصف المدونة' , url:''},
  {img:cafe, content:'هووك المدونة2', alt:'', paragraph:'' , url:''},
  {img:caffe, content:'هووك المدونة5', alt:'', paragraph:'' , url:''},
  {img:caffe, content:'هووك المدونة5', alt:'', paragraph:'' , url:''},
  {img:caffe, content:'هووك المدونة5', alt:'', paragraph:'' , url:''},

  {img:caffe, content:'هووك المدونة5', alt:'', paragraph:'' , url:''},

  

]
const hcol = [
  {img:frame87, content:'هووك المدونة', alt:'', paragraph:'وصف المدونة' , url:''},
  {img:cafe, content:'هووك المدونة2', alt:'', paragraph:'' , url:''},
  {img:caffe, content:'هووك المدونة5', alt:'', paragraph:'' , url:''},
  {img:caffe, content:'هووك المدونة5', alt:'', paragraph:'' , url:''},
  {img:caffe, content:'هووك المدونة5', alt:'', paragraph:'' , url:''},

  {img:caffe, content:'هووك المدونة5', alt:'', paragraph:'' , url:''},

]
const cards = [
  {
    title: 'العنوان',
    image: caffe,
    price: '500$',
    rating: 5,
  },
  {
    title: 'العنوان',
    image: caffe,
    price: '500$',
    rating: 5,
  },
  {
    title: 'العنوان',
    image: caffe,
    price: '500$',
    rating: 5,
  },
  {
    title: 'العنوان',
    image: caffe,
    price: '500$',
    rating: 5,
  },
  {
    title: 'العنوان',
    image: caffe,
    price: '500$',
    rating: 5,
  }
];

const Hero = () => { 
   

  return (
    <>
      <section>
        <div>
        <Slideshow slides={slides}/>
        </div>   <div className=' min-h-scree0n flex justify-center items-center'>
                       <Main col={col} hcol={hcol}/>

        </div>
<div className='bg-[#0F0F0F]'>
  <CardSlider cards={cards}/>
</div>
      </section>
    </>
  )

}

export default Hero
