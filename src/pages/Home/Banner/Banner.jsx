import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Img1 from "../../../assets/slide1.jpg";
import Img2 from "../../../assets/slide2.jpg";
import Img3 from "../../../assets/slide3.jpg";
import Img4 from "../../../assets/slide4.jpg";

const Banner = () => {
    return (
        <div className="w-full">
            <Carousel
                autoPlay
                infiniteLoop
                showThumbs={false}
                showStatus={false}
                dynamicHeight={true}
                className="w-full "
            >
                <div className="relative w-full">
                    <img
                        src={Img1}
                        alt="Adopt a Pet"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white px-4">
                        <h1 className="text-4xl lg:text-6xl font-bold mb-4">
                            Find Your Furry Friend Today!
                        </h1>
                        <p className="text-lg lg:text-xl mb-6">
                            Adopting a pet changes lives – both yours and theirs.
                        </p>
                        <button className="px-6 py-3 bg-blue-500 rounded-lg hover:bg-blue-600 transition">
                            Adopt Now
                        </button>
                    </div>
                </div>

                <div className="relative w-full">
                    <img
                        src={Img2}
                        alt="Adopt a Pet"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white px-4">
                        <h1 className="text-4xl lg:text-6xl font-bold mb-4">
                            Give a Pet a Second Chance
                        </h1>
                        <p className="text-lg lg:text-xl mb-6">
                            Be the hero they need. Adopt and make a lifelong friend.
                        </p>
                        <button className="px-6 py-3 bg-blue-500 rounded-lg hover:bg-blue-600 transition">
                            Find Pets Near You
                        </button>
                    </div>
                </div>

                <div className="relative w-full">
                    <img
                        src={Img3}
                        alt="Adopt a Pet"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white px-4">
                        <h1 className="text-4xl lg:text-6xl font-bold mb-4">
                            Adopt, Don’t Shop
                        </h1>
                        <p className="text-lg lg:text-xl mb-6">
                            There are many pets waiting for a loving home. Make a difference today.
                        </p>
                        <button className="px-6 py-3 bg-blue-500 rounded-lg hover:bg-blue-600 transition">
                            Learn More
                        </button>
                    </div>
                </div>

                <div className="relative w-full">
                    <img
                        src={Img4}
                        alt="Adopt a Pet"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white px-4">
                        <h1 className="text-4xl lg:text-6xl font-bold mb-4">
                            Change a Pet’s Life Today
                        </h1>
                        <p className="text-lg lg:text-xl mb-6">
                            Adoption is a gift that will bring joy to your life and their life forever.
                        </p>
                        <button className="px-6 py-3 bg-blue-500 rounded-lg hover:bg-blue-600 transition">
                            Start Your Journey
                        </button>
                    </div>
                </div>
            </Carousel>
        </div>
    );
};

export default Banner;
