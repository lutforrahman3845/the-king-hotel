import About from "../Components/About";
import Bannar from "../Components/Bannar";
import ContactUs from "../Components/ContactUs";
import OurLocation from "../Components/OurLocation";

const Home = () => {
    return (
        <div>
            <Bannar></Bannar>
            <About></About>
            <ContactUs></ContactUs>
            <OurLocation></OurLocation>
        </div>
    );
};

export default Home;