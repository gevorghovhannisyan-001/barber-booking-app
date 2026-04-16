import { Link } from 'react-router';
import { Navbar, About, Footer, 
Hero, Reviews, Services } from '../components';

const Home = () => {
  return (
    <div className="">
        <Navbar />
        <Hero />
        <About />
        <Services />
        <Reviews />
        <Footer />
        {/* <Link to="/booking" 
        className="bg-[#333] text-white uppercase 
        px-6 py-2 rounded-md cursor-pointer hover:bg-[#555]"
        >
          Book an appointment
        </Link> */}
    </div>
  )
}

export default Home;