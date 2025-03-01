import { useState } from "react";
import backgroundImg from "../../../assets/newsletter.jpg";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    // Handle email subscription logic here
    console.log(`Subscribed with: ${email}`);
    // Clear the input field after subscription
    setEmail("");
  };

  return (
    <section
      className="bg-cover bg-center py-24 px-4 md:px-8 relative"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      <div className="relative z-10  text-white">
        <h2 className="text-3xl font-semibold mb-4">
          Subscribe to our newsletter
        </h2>
        <p className="text-lg mb-6">
          We send e-mails once a month, we never send Spam!
        </p>

        <div className="flex justify-start items-center">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="px-4 py-2 w-64 text-gray-700 rounded-l-md focus:outline-none border-2 border-pink-100 focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSubscribe}
            className="px-6 py-2.5 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
