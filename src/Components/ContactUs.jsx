const ContactUs = () => {   
    return (
      <section className="bg-primary/10 py-12 px-2 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl  lg:text-2xl  xl:text-3xl font-cinzel font-semibold text-center  mb-6">
            Contact with us
          </h2>
        <p className="text-center text-gray-600 mb-12 max-w-xl mx-auto">
            Have questions or need assistance? We're here to help! <span className="hidden sm:inline">Reach out to us
            using the form below, and we'll get back to you as soon as possible.</span>
          </p>
  
          <div className="grid grid-cols-1 md:grid-cols-2 ">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="text-gray-800 text-2xl">
                  <i className="fas fa-phone"></i>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">Phone</h4>
                  <p className="text-gray-600">+1 234 567 890</p>
                </div>
              </div>
  
              <div className="flex items-center space-x-4">
                <div className="text-gray-800 text-2xl">
                  <i className="fas fa-envelope"></i>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">Email</h4>
                  <p className="text-gray-600">support@kinghotel.com</p>
                </div>
              </div>
  
              <div className="flex items-center space-x-4">
                <div className="text-gray-800 text-2xl">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">Address</h4>
                  <p className="text-gray-600">123 Hotel Lane, Matrix City</p>
                </div>
              </div>
            </div>
  
            {/* Contact Form */}
            <form onSubmit={ e => e.preventDefault()} className="bg-white p-8 shadow-md rounded-md space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  placeholder="Your Name"
                />
              </div>
  
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  placeholder="Your Email"
                />
              </div>
  
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  rows="4"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  placeholder="Your Message"
                ></textarea>
              </div>
  
              <button
                
                className="w-full bg-secondary/70 text-white py-2 px-4 rounded-md hover:bg-secondary"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    );
  };
  
  export default ContactUs;