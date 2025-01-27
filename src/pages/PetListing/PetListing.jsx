import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Container from "../../components/Container/Container";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ProgressBar } from "react-loader-spinner";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { IoSearchSharp } from "react-icons/io5";
import NoDataFoundImg from "../../assets/noDataFound.png";
const PetListing = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const { data: allPets = [], isLoading } = useQuery({
        queryKey: ['allPets'],
        queryFn: async () => {
            const { data } = await axios('http://localhost:5000/pets');
            return data;
        },
    });

    const filteredPets = allPets
        .filter(pet => !pet.adopted)
        .filter(pet => pet.petName.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt));

    if (isLoading) {
        return (
            <div className="flex justify-center items-center">
                <ProgressBar
                    visible={true}
                    height="80"
                    width="80"
                    color="#4fa94d"
                    ariaLabel="progress-bar-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                />
            </div>
        );
    }
    return (
        <Container>
            <div className="mb-6 ">
                <div className="max-w-md mx-auto">
                    <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                            <IoSearchSharp />
                        </div>
                        <input
                            type="text"
                            className="w-full pl-10 pr-2 py-2 border rounded-lg"
                            placeholder="Search by pet name"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            {filteredPets.length === 0 && searchTerm && (
                <div className="text-center py-4 mb-6 border rounded-lg border-gray-300 bg-gray-100">
                    <img src={NoDataFoundImg} className="w-56 h-48 mx-auto" alt="No data found" />
                    <p className="text-3xl font-medium
                     text-gray-700">No data found</p>
                </div>
            )}
            <Tabs selectedTabClassName="bg-blue-600 text-white">
                <TabList className="flex space-x-4">
                    <Tab className="p-2 m-2 cursor-pointer hover:bg-blue-400 rounded-lg">All Pets</Tab>
                    <Tab className="p-2 m-2 cursor-pointer hover:bg-blue-400 rounded-lg">Dog</Tab>
                    <Tab className="p-2 m-2 cursor-pointer hover:bg-blue-400 rounded-lg">Cat</Tab>
                    <Tab className="p-2 m-2 cursor-pointer hover:bg-blue-400 rounded-lg">Bird</Tab>
                    <Tab className="p-2 m-2 cursor-pointer hover:bg-blue-400  rounded-lg">Fish</Tab>
                    <Tab className="p-2 m-2 cursor-pointer hover:bg-blue-400 rounded-lg">Rabbit</Tab>
                </TabList>

                <TabPanel>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {filteredPets.map((pet) => (
                            <div key={pet._id} className="bg-white p-4 rounded-lg shadow-lg">
                                <img
                                    src={pet.petImage}
                                    alt="Pet Image"
                                    className="w-full h-60 object-fill rounded-lg"
                                />
                                <div className="mt-4">
                                    <h3 className="text-xl font-semibold">{pet?.petName}</h3>
                                    <p className="text-gray-600">Age: {pet?.petAge}</p>
                                    <p className="text-gray-600 mb-4">Location: {pet?.petLocation}</p>
                                    <Link to={`/pet/${pet?._id}`}>
                                        <Button>View Details</Button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </TabPanel>

                <TabPanel>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {filteredPets.filter(pet => pet.petCategory === 'dog').map((pet) => (
                            <div key={pet._id} className="bg-white p-4 rounded-lg shadow-lg">
                                <img
                                    src={pet.petImage}
                                    alt="Pet Image"
                                    className="w-full h-60 object-fill rounded-lg"
                                />
                                <div className="mt-4">
                                    <h3 className="text-xl font-semibold">{pet?.petName}</h3>
                                    <p className="text-gray-600">Age: {pet?.petAge}</p>
                                    <p className="text-gray-600 mb-4">Location: {pet?.petLocation}</p>
                                    <Link to={`/pet/${pet?._id}`}>
                                        <Button>View Details</Button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </TabPanel>

                <TabPanel>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {filteredPets.filter(pet => pet.petCategory === 'cat').map((pet) => (
                            <div key={pet._id} className="bg-white p-4 rounded-lg shadow-lg">
                                <img
                                    src={pet.petImage}
                                    alt="Pet Image"
                                    className="w-full h-60 object-fill rounded-lg"
                                />
                                <div className="mt-4">
                                    <h3 className="text-xl font-semibold">{pet?.petName}</h3>
                                    <p className="text-gray-600">Age: {pet?.petAge}</p>
                                    <p className="text-gray-600 mb-4">Location: {pet?.petLocation}</p>
                                    <Link to={`/pet/${pet?._id}`}>
                                        <Button>View Details</Button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {filteredPets.filter(pet => pet.petCategory === 'bird').map((pet) => (
                            <div key={pet._id} className="bg-white p-4 rounded-lg shadow-lg">
                                <img
                                    src={pet.petImage}
                                    alt="Pet Image"
                                    className="w-full h-60 object-fill rounded-lg"
                                />
                                <div className="mt-4">
                                    <h3 className="text-xl font-semibold">{pet?.petName}</h3>
                                    <p className="text-gray-600">Age: {pet?.petAge}</p>
                                    <p className="text-gray-600 mb-4">Location: {pet?.petLocation}</p>
                                    <Link to={`/pet/${pet?._id}`}>
                                        <Button>View Details</Button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {filteredPets.filter(pet => pet.petCategory === 'fish').map((pet) => (
                            <div key={pet._id} className="bg-white p-4 rounded-lg shadow-lg">
                                <img
                                    src={pet.petImage}
                                    alt="Pet Image"
                                    className="w-full h-60 object-fill rounded-lg"
                                />
                                <div className="mt-4">
                                    <h3 className="text-xl font-semibold">{pet?.petName}</h3>
                                    <p className="text-gray-600">Age: {pet?.petAge}</p>
                                    <p className="text-gray-600 mb-4">Location: {pet?.petLocation}</p>
                                    <Link to={`/pet/${pet?._id}`}>
                                        <Button>View Details</Button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {filteredPets.filter(pet => pet.petCategory === 'rabbit').map((pet) => (
                            <div key={pet._id} className="bg-white p-4 rounded-lg shadow-lg">
                                <img
                                    src={pet.petImage}
                                    alt="Pet Image"
                                    className="w-full h-60 object-fill rounded-lg"
                                />
                                <div className="mt-4">
                                    <h3 className="text-xl font-semibold">{pet?.petName}</h3>
                                    <p className="text-gray-600">Age: {pet?.petAge}</p>
                                    <p className="text-gray-600 mb-4">Location: {pet?.petLocation}</p>
                                    <Link to={`/pet/${pet?._id}`}>
                                        <Button>View Details</Button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </TabPanel>
            </Tabs>
        </Container>
    );
};

export default PetListing;
