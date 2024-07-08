import Hero from '../components/Hero'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import frame87 from '../assets/Frame87.png'
import '../App.css'
const Home = () => {
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
            }
          ]
    
        }
    
      ];
  return (
    <div>
          <div className='bg-[#161616]'>
      <Navbar links={links} logoUrl={frame87} />
      <Hero />
      <div className='bg-[#4A53D1]'>
              <Footer/>

      </div>
    </div>
    </div>
  )
}

export default Home
