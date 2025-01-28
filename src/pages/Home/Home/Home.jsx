import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
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
            <About></About>
            <div>
                <AdoptPetAction></AdoptPetAction>
            </div>
            <Features></Features>
            <PetGallery></PetGallery>
        </>

    );
};

export default Home;