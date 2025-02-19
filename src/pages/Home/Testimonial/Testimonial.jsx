import { FaQuoteLeft } from "react-icons/fa";
import user1 from "../../../assets/testi_avatar01.png";
import user2 from "../../../assets/testi_avatar02.png";
import backgroundPattern from "../../../assets/patternImg.png";

const Testimonial = () => {
  return (
    <section
      className="py-16 px-4 md:px-8"
      style={{
        backgroundImage: `url(${backgroundPattern})`,
        backgroundRepeat: "repeat",
      }}
    >
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-semibold text-darkGreen">
          Our Happy Customer
        </h2>
        <p className="text-lg text-gray-600 mt-2">
          Pet adoption is not just about finding a pet, it&apos;s about giving
          them a forever home. With each adoption, we change lives, one paw at a
          time. Join us in providing loving homes for dogs and cats in need.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Testimonial Card 1 */}
        <div className="bg-white p-6 rounded-lg shadow-lg h-96 flex flex-col justify-between">
          <div className="flex justify-center mb-4">
            <img
              src={user1}
              alt="Customer 1"
              className="w-24 h-24 rounded-full"
            />
          </div>
          <div className="text-center flex-grow">
            <FaQuoteLeft className="text-xl text-darkGreen mx-auto mb-4" />
            <p className="text-lg text-gray-700 italic mb-4">
              &quot;Adopting a pet has been one of the most rewarding
              experiences of my life. Thanks to this service, I found my perfect
              companion and gave them the loving home they deserved.&quot;
            </p>
          </div>
        </div>

        {/* Testimonial Card 2 */}
        <div className="bg-white p-6 rounded-lg shadow-lg h-96 flex flex-col justify-between">
          <div className="flex justify-center mb-4">
            <img
              src={user2}
              alt="Customer 2"
              className="w-24 h-24 rounded-full"
            />
          </div>
          <div className="text-center flex-grow">
            <FaQuoteLeft className="text-xl text-darkGreen mx-auto mb-4" />
            <p className="text-lg text-gray-700 italic mb-4">
              &quot;Our adopted dog has become a true part of our family.
              Knowing that we gave a dog a new life made the decision to adopt
              easy. It’s a life-changing experience!&quot;
            </p>
          </div>
        </div>

        {/* Testimonial Card 3 */}
        <div className="bg-white p-6 rounded-lg shadow-lg h-96 flex flex-col justify-between">
          <div className="flex justify-center mb-4">
            <img
              src={user1}
              alt="Customer 3"
              className="w-24 h-24 rounded-full"
            />
          </div>
          <div className="text-center flex-grow">
            <FaQuoteLeft className="text-xl text-darkGreen mx-auto mb-4" />
            <p className="text-lg text-gray-700 italic mb-4">
              &quot;Adopting a pet from a shelter is an incredibly fulfilling
              experience. They give you so much love in return, and knowing
              you’re helping a pet find a forever home is priceless.&quot;
            </p>
          </div>
        </div>

        {/* Testimonial Card 4 */}
        <div className="bg-white p-6 rounded-lg shadow-lg h-96 flex flex-col justify-between">
          <div className="flex justify-center mb-4">
            <img
              src={user2}
              alt="Customer 2"
              className="w-24 h-24 rounded-full"
            />
          </div>
          <div className="text-center flex-grow">
            <FaQuoteLeft className="text-xl text-darkGreen mx-auto mb-4" />
            <p className="text-lg text-gray-700 italic mb-4">
              &quot;Our adopted dog has become a true part of our family.
              Knowing that we gave a dog a new life made the decision to adopt
              easy. It’s a life-changing experience!&quot;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
