import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import AdoptPetAction from "../AdoptPetAction/AdoptPetAction";
import About from "../About/About";
import Features from "../Features/Features";
import PetGallery from "../PetGallery/PetGallery";
import Achievement from "../Achievement/Achievement";

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
      <Achievement></Achievement>
    </>
  );
};

export default Home;
