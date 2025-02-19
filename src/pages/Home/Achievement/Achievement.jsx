import { FaAward, FaUsers, FaPaw, FaBuilding } from "react-icons/fa";
import bgImg from "../../../assets/counterbg.jpg";

const Achievement = () => {
  return (
    <section
      className="relative bg-cover bg-fixed"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>{" "}
      <div className="container mx-auto px-4 py-16 relative z-10 text-center">
        <h2 className="text-3xl lg:text-5xl font-semibold text-white mb-8">
          Our Achievements
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div className="bg-transparent p-8  flex flex-col items-center">
            <FaBuilding className="w-24 h-24 rounded-full p-4 bg-gray-100 text-blue-600 mb-4" />
            <h3 className="text-5xl font-bold text-white mb-2">14</h3>
            <p className="text-2xl text-white">Professionals</p>
          </div>
          <div className="bg-transparent p-8 rounded-lg shadow-lg flex flex-col items-center">
            <FaPaw className="w-24 h-24 rounded-full p-4 bg-gray-100 text-blue-600 mb-4" />
            <h3 className="text-5xl font-bold text-white mb-2">100</h3>
            <p className="text-2xl text-white">Adopted Pets</p>
          </div>
          <div className="bg-transparent p-8 rounded-lg shadow-lg flex flex-col items-center">
            <FaAward className="w-24 h-24 rounded-full p-4 bg-gray-100 text-blue-600 mb-4" />
            <h3 className="text-5xl font-bold text-white mb-2">12</h3>
            <p className="text-2xl text-white">Awards</p>
          </div>
          <div className="bg-transparent p-8 rounded-lg shadow-lg flex flex-col items-center">
            <FaUsers className="w-24 h-24 rounded-full p-4 bg-gray-100 text-blue-600 mb-4" />
            <h3 className="text-5xl font-bold text-white mb-2">1200</h3>
            <p className="text-2xl text-white">Clients</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievement;
