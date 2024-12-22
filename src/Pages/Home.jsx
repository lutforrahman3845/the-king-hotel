import About from "../Components/About";
import Bannar from "../Components/Bannar";
import ContactUs from "../Components/ContactUs";
import FeaturedRooms from "../Components/FeaturedRooms";
import OurLocation from "../Components/OurLocation";

const Home = () => {
    return (
        <div>
            <Bannar></Bannar>
            <About></About>
            <FeaturedRooms></FeaturedRooms>
            <OurLocation></OurLocation>
            <ContactUs></ContactUs>
        </div>
    );
};

export default Home;