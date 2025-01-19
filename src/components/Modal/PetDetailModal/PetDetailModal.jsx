import { Modal } from "flowbite-react";
import PropTypes from "prop-types";
import { FaMapMarkerAlt, FaPaw } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { LuHeartHandshake } from "react-icons/lu";
import { RiBubbleChartFill } from "react-icons/ri";
import { TbVaccine } from "react-icons/tb";

const PetDetailModal = ({ open, setOpen, pet }) => {

    return (
        <div>
            <Modal show={open} onClose={() => setOpen(false)}>
                <Modal.Body>
                    <div className="">
                        <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-7xl  hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                            <img
                                className="object-fit w-full rounded-t-lg h-96 md:h-[300px] md:w-64 md:rounded-none md:rounded-s-lg"
                                src={pet?.petImage}
                                alt={`${pet?.petName}`}
                            />
                            <div className="flex flex-col justify-between p-3 leading-normal">
                                <h5 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white leading-loose">
                                    Meet the {pet?.petName}
                                </h5>
                                <p className="mb-2 font-normal text-gray-700 dark:text-gray-400 flex items-center">
                                    <SlCalender className="w-6 h-6 text-cyan-500 mr-2" />
                                    <span className="font-bold">Age </span> : {pet?.petAge}
                                </p>
                                <p className="mb-2 font-normal text-gray-700 dark:text-gray-400 flex items-center">
                                    <FaMapMarkerAlt className="w-6 h-6 text-cyan-500 mr-2" />
                                    <span className="font-bold">Location: </span> {pet?.petLocation}
                                </p>
                                <p className="mb-2 font-normal text-gray-700 dark:text-gray-400 flex items-center">
                                    <RiBubbleChartFill className="w-6 h-6 text-cyan-500 mr-2" />
                                    <span className="font-bold">About : </span>
                                    {pet?.shortDescription}
                                </p>
                                <p className="mb-2 font-normal text-gray-700 dark:text-gray-400 flex items-center">
                                    <TbVaccine className="w-6 h-6 text-cyan-500 mr-2" />
                                    <span className="font-bold">Vaccinated : </span> {pet?.
                                        vaccinated}
                                </p>
                                <p className="mb-2 font-normal text-gray-700 dark:text-gray-400 flex items-center">
                                    <FaPaw className="w-6 h-6 text-cyan-500 mr-2" />
                                    Special Needs pet
                                </p>
                                <p className="mb-2 font-normal text-gray-700 dark:text-gray-400 flex items-center">
                                    <LuHeartHandshake className="w-6 h-6 text-cyan-500 mr-2" />
                                    Friendly to other animals
                                </p>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-4xl font-bold mb-2 tracking-tight text-gray-900 dark:text-white leading-loose">About me</h2>
                            <p className="text-lg mb-3 font-normal text-gray-700 dark:text-gray-400">{pet?.petFullDetail}</p>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button
                        type="button"
                        className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 transition duration-300 ease-in-out transform hover:scale-105">
                        Adopt Me
                    </button>
                    <button
                        onClick={() => setOpen(false)}
                        className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 transition duration-300 ease-in-out transform hover:scale-105">
                        Go Back
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

PetDetailModal.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
    pet: PropTypes.shape({
        petImage: PropTypes.string.isRequired,
        petName: PropTypes.string.isRequired,
        petCategory: PropTypes.string.isRequired,
        petAge: PropTypes.string.isRequired,
        petLocation: PropTypes.string.isRequired,
        shortDescription: PropTypes.string.isRequired,
        petFullDetail: PropTypes.string.isRequired,
        vaccinated: PropTypes.string.isRequired
    }).isRequired,
};

export default PetDetailModal;
