import { FaLeaf, FaStethoscope, FaDog, FaHome } from "react-icons/fa";

const Features = () => {
    return (
        <div className="py-20 px-6 bg-gray-50">
            <div className="max-w-7xl mx-auto text-center">

                <h2 className="text-3xl md:text-4xl font-bold mb-10 text-gray-800">OUR FEATURES</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                    <div className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-lg">
                        <div className="w-16 h-16 mb-4 bg-pink-100 p-4 rounded-full flex justify-center items-center">
                            <FaLeaf className="text-pink-600" size={32} />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Natural products</h3>
                        <p className="text-sm text-gray-600">
                            We only offer products that are natural and safe for your pets. We believe in providing the best quality care through the use of chemical-free and sustainable products.
                        </p>
                    </div>

                    <div className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-lg">
                        <div className="w-16 h-16 mb-4 bg-pink-100 p-4 rounded-full flex justify-center items-center">
                            <FaStethoscope className="text-pink-600" size={32} />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Vet care</h3>
                        <p className="text-sm text-gray-600">
                            Your pet’s health is our priority. We partner with experienced veterinarians to ensure your pets receive top-notch medical care, from routine checkups to emergency services.
                        </p>
                    </div>

                    <div className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-lg">
                        <div className="w-16 h-16 mb-4 bg-pink-100 p-4 rounded-full flex justify-center items-center">
                            <FaDog className="text-pink-600" size={32} />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Training</h3>
                        <p className="text-sm text-gray-600">
                            We offer professional training to help your pet develop good habits. Whether it&apos;s basic obedience or specialized training, we work with you to ensure success.
                        </p>
                    </div>

                    <div className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-lg">
                        <div className="w-16 h-16 mb-4 bg-pink-100 p-4 rounded-full flex justify-center items-center">
                            <FaHome className="text-pink-600" size={32} />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Housing</h3>
                        <p className="text-sm text-gray-600">
                            We provide safe and comfortable housing for pets in need. Our facilities are designed to offer a cozy and caring environment while your pet waits for their forever home.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Features;
