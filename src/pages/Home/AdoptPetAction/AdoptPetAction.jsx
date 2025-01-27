import Img1 from "../../../assets/actionbg.jpg"

const AdoptPetAction = () => {
    return (
        <div className="relative w-full h-[80vh] bg-cover bg-center" style={{ backgroundImage: `url(${Img1})`, backgroundAttachment: 'fixed' }}>
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white px-6 py-8">
                <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                    Give a Pet a Loving Home Today
                </h2>
                <p className="text-lg lg:text-xl mb-8 max-w-3xl mx-auto">
                    Adopting a pet is one of the most rewarding decisions you&apos;ll ever make. By opening your heart and home, you’re giving a pet the chance at a better life. Adopt today and make a difference.
                </p>
            </div>
        </div>
    );
};

export default AdoptPetAction;