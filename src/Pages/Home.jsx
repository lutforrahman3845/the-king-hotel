import About from "../Components/About";
import Bannar from "../Components/Bannar";
import ContactUs from "../Components/ContactUs";
import FeaturedRooms from "../Components/FeaturedRooms";
import FQquestion from "../Components/FQquestion";
import HappyCoustomer from "../Components/HappyCoustomer";
import OurLocation from "../Components/OurLocation";
import Reviews from "../Components/Reviews";

const Home = () => {
    
  return (
    <div>
      <Bannar></Bannar>
      <About></About>
      <HappyCoustomer></HappyCoustomer>
      <FeaturedRooms></FeaturedRooms>
      <Reviews></Reviews>
      <OurLocation></OurLocation>
      <ContactUs></ContactUs>
      <FQquestion></FQquestion>
      
    </div>
  );
};

export default Home;
