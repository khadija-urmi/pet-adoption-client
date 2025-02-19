import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import logoImg from "../../assets/logo2.png";

const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-700 py-10">
      <div className="mx-auto w-full max-w-screen-xl p-4 lg:py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          <div className="flex flex-col items-center sm:items-start">
            <a href="/" className="flex items-center mb-6">
              <img src={logoImg} alt="WoofWow Logo" className="h-10 mr-3" />
              <span className="text-2xl font-semibold text-gray-800 dark:text-white">
                WoofWow
              </span>
            </a>
            <p className="text-gray-500 dark:text-gray-400 text-center sm:text-left">
              We are dedicated to connecting loving families with pets in need.
              Our mission is to ensure every pet finds a forever home where they
              are loved and cared for.
            </p>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mt-4 mb-4">
              Follow Us
            </h2>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-gray-500 dark:text-gray-400 hover:text-blue-600"
              >
                <FaFacebookF className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="text-gray-500 dark:text-gray-400 hover:text-blue-400"
              >
                <FaTwitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="text-gray-500 dark:text-gray-400 hover:text-pink-600"
              >
                <FaInstagram className="w-4 h-4" />
              </a>
            </div>
          </div>
          <div className="flex flex-col items-center sm:items-start">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Contact Us
            </h2>
            <ul className="text-gray-500 dark:text-gray-400">
              <li className="mb-2">
                <span className="font-semibold">Phone:</span> 01848232345
              </li>
              <li className="mb-2">
                <span className="font-semibold">Email:</span> WoofWOw@gmail.com
              </li>
              <li>
                <span className="font-semibold">Address:</span> Pet Street 123,
                Malibag, Dhaka
              </li>
            </ul>
          </div>
          <div className="flex flex-col items-center sm:items-start">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Services
            </h2>
            <ul className="text-gray-500 dark:text-gray-400">
              <li className="mb-2">Pet Hotel</li>
              <li className="mb-2">Grooming Service</li>
              <li>Pet Doctor</li>
            </ul>
          </div>
        </div>

        <hr className="my-6 border-gray-200 dark:border-gray-700" />
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            © 2023 WoofWow™. All Rights Reserved.
          </span>
          <div className="flex items-center space-x-6">
            <a
              href="#"
              className="text-gray-500 dark:text-gray-400 hover:text-gray-900"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-500 dark:text-gray-400 hover:text-gray-900"
            >
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
