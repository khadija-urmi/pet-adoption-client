import { LiaSpinnerSolid } from "react-icons/lia";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Container from "../../components/Container/Container";
import { Button } from "flowbite-react";
import { useState } from "react";
import PetDetailModal from "../../components/Modal/PetDetailModal/PetDetailModal";

const PetListing = () => {
    const [openModal, setOpenModal] = useState(true);
    const [selectedPet, setSelectedPet] = useState(null);

    const openPetModal = (pet) => {
        setSelectedPet(pet);
        setOpenModal(true);
    };
    const { data: allPets, isLoading } = useQuery({
        queryKey: ['allPets'],
        queryFn: async () => {
            const { data } = await axios('http://localhost:5000/pets');
            return data;
        },
    });
    console.log("pet ", allPets)

    if (isLoading) {
        return <button disabled type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
            <LiaSpinnerSolid className="w-12 h-10 animate-spin text-white m-auto" />
            Loading...
        </button>
    }

    return (
        <Container>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {allPets.map((pet) => (
                    <div key={pet._id} className="bg-white p-4 rounded-lg shadow-lg">
                        <img src={pet.petImage} alt="Pet Image" className="w-full h-52 object-fill rounded-lg" />
                        <div className="mt-4">
                            <h3 className="text-xl font-semibold">{pet?.petName}</h3>
                            <p className="text-gray-600">Age: {pet?.petAge}</p>
                            <p className="text-gray-600 mb-4">Location: {pet?.petLocation}</p>
                            {/* when button is click , it will go modal which is created in components */}
                            <Button onClick={() => openPetModal(pet)}>View Details</Button>
                        </div>
                    </div>
                ))}
                {selectedPet && (
                    <PetDetailModal
                        open={openModal}
                        setOpen={setOpenModal}
                        pet={selectedPet}
                    />
                )}
            </div>
        </Container >
    );
};

export default PetListing;