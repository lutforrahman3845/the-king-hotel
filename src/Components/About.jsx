import about1 from "../assets/about2.jpg";
import about2 from "../assets/about1.jpg";
const About = () => {
  return (
    <section className="py-8 md:py-14 lg:py-16 xl:py-20 px-2 overflow-x-hidden">
      <h1 className="text-xl  lg:text-2xl  xl:text-3xl text-center font-cinzel font-semibold">
        About us
      </h1>
      <div className="container mx-auto mt-6  md:mt-10">
        <div className="sm:mx-4 flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/2 relative">
            <div>
              <img className="rounded-sm w-11/12" src={about1} alt="" />
              <img
                className="absolute -bottom-4 right-0 lg:-bottom-10 w-1/2 rounded-sm aspect-square"
                src={about2}
                alt=""
              />
            </div>
          </div>
          <div className=" w-full md:w-1/2">
            <h4 className="text-primary font-medium lg:mb-4 mb-3">
              Welcome To King Hotel
            </h4>
            <h1 className="text-2xl sm:text-3xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold lg:mb-8 mb-2">
              Your Comfort, Our Commitment
            </h1>
            <p className="text-gray-600 font-normal">
              At Hotel Haven, we prioritize your comfort above all else. From
              luxurious accommodations to personalized services, every detail is
              crafted with care to ensure your stay is nothing short of
              extraordinary
              <span className="hidden sm:inline md:hidden xl:inline">
                Our commitment to excellence means providing you with a seamless
                experience, where relaxation and satisfaction come together to
                create lasting memories. Your comfort is our promise.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
