const FQquestion = () => {
  return (
    <div className="pb-8 md:pb-14 lg:pb-16  px-5 overflow-x-hidden">
      <h1 className="text-xl  lg:text-2xl  xl:text-3xl  font-cinzel font-semibold">
        FAQs for The King Hotel , Matrix
      </h1>
      <div className="join join-vertical w-full lg:w-3/5 mt-6">
        <div className="collapse collapse-arrow join-item border-base-300 border">
          <input type="radio" name="my-accordion-4" />
          <div className="collapse-title text-lg font-medium">
            Does The King Hotel have a pool?
          </div>
          <div className="collapse-content">
            <p>Yes, The King Hotel has an outdoor pool.</p>
          </div>
        </div>
        <div className="collapse collapse-arrow join-item border-base-300 border">
          <input type="radio" name="my-accordion-4" />
          <div className="collapse-title text-lg font-medium">
            How much is parking at The King Hotel?
          </div>
          <div className="collapse-content">
            <p>
              Complimentary parking is available at The King Hotel for hotel
              guests.
            </p>
          </div>
        </div>
        <div className="collapse collapse-arrow join-item border-base-300 border">
          <input type="radio" name="my-accordion-4" />
          <div className="collapse-title text-lg font-medium">
            Can I cancel my booking at The King Hotel for a full refund?
          </div>
          <div className="collapse-content">
            <p>
              Always check the hotel's cancellation policy before booking a
              rate. Room cancellation is subject to rate booked at time of
              reservation and cancellation policy varies by rate.
            </p>
          </div>
        </div>
        <div className="collapse collapse-arrow join-item border-base-300 border">
          <input type="radio" name="my-accordion-4" />
          <div className="collapse-title text-lg font-medium">
            Is there free breakfast at The King Hotel?
          </div>
          <div className="collapse-content">
            <p>
              Yes, The king hotel do offer complimentary breakfast.
            </p>
          </div>
        </div>
        <div className="collapse collapse-arrow join-item border-base-300 border">
          <input type="radio" name="my-accordion-4" />
          <div className="collapse-title text-lg font-medium">
           What are the check-in and check-out times at The King Hotel?
          </div>
          <div className="collapse-content">
            <p>
            Check-in at InterContinental Dhaka is from 3:00 PM, and check-out time is 12:00 PM. Contact the hotel directly for options available for early check-in or late check-out.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FQquestion;
