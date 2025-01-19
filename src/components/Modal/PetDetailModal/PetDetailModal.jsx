import { Button, Modal } from "flowbite-react";
import PropTypes from "prop-types";
import { FaPaw } from "react-icons/fa";
import { LuHeartHandshake } from "react-icons/lu";

const PetDetailModal = ({ open, setOpen, pet }) => {

    return (
        <div>
            <Modal show={open} onClose={() => setOpen(false)}>
                <Modal.Body>
                    <div>
                        <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                        >
                            <img
                                className="object-cover w-full rounded-t-lg h-96 md:h-full md:w-48 md:rounded-none md:rounded-s-lg"
                                src={pet?.petImage}
                                alt=""
                            />
                            <div className="flex flex-col justify-between p-4 leading-normal">
                                <h5 className="mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white leading-loose">
                                    Meet the {pet?.petName}
                                </h5>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                    <span className="font-bold"> Age : </span>{pet?.petAge}
                                </p>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                    <span className="font-bold">Location </span>
                                    : {pet?.petLocation}
                                </p>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                    <span className="font-bold">About </span>
                                    : {pet?.shortDescription}
                                </p>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 flex items-center">
                                    <span className="text-cyan-500 mr-2">
                                        <FaPaw className="w-6 h-6" />
                                    </span>
                                    Special Needs pet
                                </p>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 flex items-center">
                                    <span className="text-cyan-500 mr-2">
                                        <LuHeartHandshake className="w-6 h-6 " />
                                    </span>
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
                    <button type="button" className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Adopt Me</button>
                    <button onClick={() => setOpen(false)}
                        className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Go Back Pet page</button>
                </Modal.Footer>
            </Modal>
        </div >
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
    }).isRequired,
};
export default PetDetailModal;