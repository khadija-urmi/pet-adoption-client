import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import PetListing from "../../PetListing/PetListing";
import AdoptPetAction from "../AdoptPetAction/AdoptPetAction";
import About from "../About/About";
import Features from "../Features/Features";
import PetGallery from "../PetGallery/PetGallery";

const Home = () => {
    return (
        <>
            <Helmet>
                <title>WoofWow | Home</title>
            </Helmet>
            <div>
                <Banner></Banner>
            </div>
            <div>
                <h2 className="text-3xl font-semibold text-center mt-10 mb-6">All Pet Collection</h2>
                <PetListing></PetListing>
            </div>
            <div>
                <AdoptPetAction></AdoptPetAction>
            </div>
            <About></About>
            <Features></Features>
            <PetGallery></PetGallery>
        </>

    );
};

export default Home;