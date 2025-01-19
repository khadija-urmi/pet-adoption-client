
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Container from "../../components/Container/Container";

const PetListing = () => {

    const { data: allPets, isLoading } = useQuery({
        queryKey: ['allPets'],
        queryFn: async () => {
            const { data } = await axios('http://localhost:5000/pets');
            return data;
        },
    });
    console.log("pet ", allPets)
    if (isLoading) {
        return <h2>Loading...</h2>;
    }
    // addedAt
    // :
    // "2025-01-18T15:22:49.103Z"
    // adopted
    // :
    // false
    // petAge
    // :
    // 2
    // petCategory
    // :
    // "dog"
    // petFullDetail
    // :
    // "extremely friendly and loves to play with both children and adults. Bella is very social and gets along well with other dogs"
    // petImage
    // :
    // "https://i.ibb.co.com/8r9xmr8/dog1.jpg"
    // petLocation
    // :
    // "Chittagong"
    // petName
    // :
    // "Bella"
    // shortDescription
    // :
    // "Energetic and loves walks"
    // _id
    // :
    // "678bc749332fd799d2485705"

    return (
        <Container>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {allPets.map((pet) => (
                    <div key={pet._id} className="bg-white p-4 rounded-lg shadow-lg">
                        <img src={pet.petImage} alt="Pet Image" className="w-full h-52 object-fill rounded-lg" />
                        <div className="mt-4">
                            <h3 className="text-xl font-semibold">{pet.petName}</h3>
                            <p className="text-gray-600">Age: {pet.petAge}</p>
                            <p className="text-gray-600">Location: {pet.petLocation}</p>
                            <button className="mt-4 bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600">
                                View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </Container>
    );
};

export default PetListing;