import Img1 from "../../../assets/adopt-1.jpg";
const About = () => {
    return (
        <div className="py-20 px-6 bg-gray-50">
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center">
                <div className="lg:w-1/2 mb-6 lg:mb-0">
                    <img
                        src={Img1}
                        alt="Happy Pet"
                        className="w-full h-auto rounded-lg "
                    />
                </div>

                <div className="lg:w-1/2 lg:pl-12">
                    <h2 className="text-4xl font-bold mb-6 text-gray-800">
                        Your pets deserve the best
                    </h2>
                    <p className="text-lg text-gray-600 mb-6">
                        Adopting a pet is one of the most rewarding decisions you can make. Not only do you give an animal a loving home, but you also open your heart to an unconditional companion. Every pet deserves a chance at happiness, and your decision to adopt can change their life forever.
                    </p>

                    <div className="space-y-6">
                        <div>
                            <h3 className="text-2xl font-semibold text-blue-600">Our Philosophy</h3>
                            <p className="text-lg text-gray-600">
                                We believe in giving every pet the love and care they deserve. Our philosophy is built around the well-being of our furry friends, ensuring that they find their forever homes filled with happiness and care.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-2xl font-semibold text-blue-600">Our Organization</h3>
                            <p className="text-lg text-gray-600">
                                Our organization is dedicated to rescuing and rehoming pets in need. We work tirelessly to ensure that each pet receives the best possible care, from sheltering to rehoming, and beyond.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-2xl font-semibold text-blue-600">Partnerships with our team</h3>
                            <p className="text-lg text-gray-600">
                                We have built strong partnerships with local veterinarians, animal shelters, and volunteers to provide the highest level of care and support to our pets. These collaborations help us give every pet a better life.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;