import React from "react";
import CountUp from "react-countup";

const HappyCoustomer = () => {
  return (
    <div className=" py-8 md:py-10">
      <div className="container mx-auto ">
        <h1 className="text-xl  lg:text-2xl  xl:text-3xl text-center font-cinzel font-semibold">
          Happy Coustomers
        </h1>
        <p className="text-center text-gray-600  max-w-4xl mx-auto">
          Our satisfied guests are a testament to our exceptional service and
          hospitality. With countless positive reviews and glowing testimonials
        </p>
        <div className="mx-8">
          <div
            data-aos="fade-up"
            className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto border py-4 rounded-lg shadow-lg"
          >
            <div className="text-center">
              <p className="text-lg text-primary font-semibold">
                <CountUp end={18000} duration={3} enableScrollSpy></CountUp>+
              </p>
              <h3 className="text-xl font-semibold">Happy Customers</h3>
            </div>
            <div className="text-center">
              <p className="text-lg text-primary font-semibold">
                <CountUp end={99} duration={3} enableScrollSpy></CountUp>+
              </p>
              <h3 className="text-xl font-semibold"> Positive Review</h3>
            </div>
            <div className="text-center">
              <p className="text-lg text-primary font-semibold">
                <CountUp end={26} duration={3} enableScrollSpy></CountUp>+
              </p>
              <h3 className="text-xl font-semibold"> Year of Experiences </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HappyCoustomer;
