import { Formik } from 'formik';
import Select from 'react-select';
import { uploadImageToServer } from "../../../api/utils";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import toast from 'react-hot-toast';
import { ImSpinner9 } from 'react-icons/im';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useParams } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const EditPetInfo = () => {
    const { id } = useParams();
    const { currentUser } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: singlePet = {}, isLoading } = useQuery({
        queryKey: ['singlePet', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-added-pet/${id}`);
            return res.data;
        },
    });

    const categories = [
        { label: 'Dog', value: 'dog' },
        { label: 'Cat', value: 'cat' },
        { label: 'Bird', value: 'bird' },
        { label: 'Rabbit', value: 'rabbit' },
        { label: 'Fish', value: 'fish' },
    ];
    const vaccinated = [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' },
    ];


    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-teal-200 via-teal-300 to-blue-300">
                <div className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-lg my-4">
                    <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
                        <Skeleton width={200} />
                    </h1>
                    <form className="space-y-4">
                        <div>
                            <label className="block text-lg font-medium text-gray-700">
                                <Skeleton width={120} />
                            </label>
                            <Skeleton height={40} />
                        </div>

                        <div>
                            <label className="block text-lg font-medium text-gray-700">
                                <Skeleton width={120} />
                            </label>
                            <Skeleton height={40} />
                        </div>

                        <div>
                            <label className="block text-lg font-medium text-gray-700">
                                <Skeleton width={120} />
                            </label>
                            <Skeleton height={40} />
                        </div>

                        <div>
                            <label className="block text-lg font-medium text-gray-700">
                                <Skeleton width={120} />
                            </label>
                            <Skeleton height={40} />
                        </div>

                        <div>
                            <label className="block text-lg font-medium text-gray-700">
                                <Skeleton width={120} />
                            </label>
                            <Skeleton height={40} />
                        </div>

                        <div>
                            <label className="block text-lg font-medium text-gray-700">
                                <Skeleton width={120} />
                            </label>
                            <Skeleton height={40} />
                        </div>

                        <div>
                            <label className="block text-lg font-medium text-gray-700">
                                <Skeleton width={120} />
                            </label>
                            <Skeleton height={40} />
                        </div>

                        <div>
                            <label className="block text-lg font-medium text-gray-700">
                                <Skeleton width={120} />
                            </label>
                            <Skeleton height={40} />
                        </div>

                        <button
                            type="submit"
                            disabled
                            className="w-full p-3 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <ImSpinner9 className="animate-spin text-white m-auto" />
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    const handleSubmit = async (values, { setSubmitting, resetForm, setFieldError }) => {
        try {
            // Upload image
            const imageUrl = await uploadImageToServer(values.petImage);
            const petFullDetails = await getLongDescription(values.longDescription);

            if (!imageUrl) {
                setFieldError('petImage', 'Image upload failed');
                setSubmitting(false);
                return;
            }
            if (!petFullDetails) {
                setFieldError("failed to get text");
                setSubmitting(false);
                return;
            }

            const { longDescription, ...remainingValues } = values;
            const petData = {
                ...remainingValues,
                petImage: imageUrl,
                petFullDetail: petFullDetails,
                addedAt: new Date().toISOString(),
                adopted: singlePet.adopted,
                OwnerEmail: currentUser.email,
            };

            // Update the pet data
            await axiosSecure.patch(`/pets/${id}`, petData);
            toast.success("Pet updated successfully!");
            resetForm();
            setSubmitting(false);
        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmitting(false);
        }
    };

    function getLongDescription(html) {
        const divContainer = document.createElement("div");
        divContainer.innerHTML = html;
        return divContainer.textContent || divContainer.innerText || "";
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-teal-200 via-teal-300 to-blue-300">
            <div className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-lg my-4">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Edit Pet Info</h1>
                <Formik
                    initialValues={{
                        petName: singlePet.petName || '',
                        petAge: singlePet.petAge || '',
                        petCategory: singlePet.petCategory || '',
                        petLocation: singlePet.petLocation || '',
                        shortDescription: singlePet.shortDescription || '',
                        longDescription: singlePet.longDescription || '',
                        petImage: null,
                        vaccinated: singlePet.vaccinated || '',
                    }}
                    validate={(values) => {
                        const errors = {};
                        if (!values.petName) errors.petName = 'Pet name is required';
                        if (!values.petAge) errors.petAge = 'Pet age is required';
                        if (!values.petCategory) errors.petCategory = 'Pet category is required';
                        if (!values.petLocation) errors.petLocation = 'Pet location is required';
                        if (!values.shortDescription) errors.shortDescription = 'Short description is required';
                        if (!values.longDescription) errors.longDescription = 'Long description is required';
                        if (!values.vaccinated) errors.vaccinated = 'Vaccination status is required';
                        return errors;
                    }}
                    onSubmit={handleSubmit}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        setFieldValue,
                        isSubmitting,
                    }) => (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-lg font-medium text-gray-700">Pet Name</label>
                                <input
                                    type="text"
                                    name="petName"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.petName}
                                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.petName && touched.petName && <div className="text-red-500 text-sm">{errors.petName}</div>}
                            </div>

                            <div>
                                <label className="block text-lg font-medium text-gray-700">Pet Age</label>
                                <input
                                    type="number"
                                    name="petAge"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.petAge}
                                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.petAge && touched.petAge && <div className="text-red-500 text-sm">{errors.petAge}</div>}
                            </div>

                            <div>
                                <label className="block text-lg font-medium text-gray-700">Pet Category</label>
                                <Select
                                    name="petCategory"
                                    options={categories}
                                    onChange={(selectedOption) => setFieldValue('petCategory', selectedOption ? selectedOption.value : '')}
                                    value={values.petCategory ? categories.find(option => option.value === values.petCategory) : null}
                                    onBlur={handleBlur}
                                    className="w-full p-3 h-12 rounded-md shadow-sm"
                                />
                                {errors.petCategory && touched.petCategory && <div className="text-red-500 text-sm">{errors.petCategory}</div>}
                            </div>

                            <div>
                                <label className="block text-lg font-medium text-gray-700">Vaccinated</label>
                                <Select
                                    name="vaccinated"
                                    options={vaccinated}
                                    onChange={(selectedOption) => setFieldValue('vaccinated', selectedOption ? selectedOption.value : '')}
                                    value={values.vaccinated ? vaccinated.find(option => option.value === values.vaccinated) : null}
                                    onBlur={handleBlur}
                                    className="w-full p-3 h-12 rounded-md shadow-sm"
                                />
                                {errors.vaccinated && touched.vaccinated && <div className="text-red-500 text-sm">{errors.vaccinated}</div>}
                            </div>

                            <div>
                                <label className="block text-lg font-medium text-gray-700">Pet Location</label>
                                <input
                                    type="text"
                                    name="petLocation"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.petLocation}
                                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.petLocation && touched.petLocation && <div className="text-red-500 text-sm">{errors.petLocation}</div>}
                            </div>

                            <div>
                                <label className="block text-lg font-medium text-gray-700">Short Description</label>
                                <input
                                    type="text"
                                    name="shortDescription"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.shortDescription}
                                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.shortDescription && touched.shortDescription && <div className="text-red-500 text-sm">{errors.shortDescription}</div>}
                            </div>

                            <div>
                                <label className="block text-lg font-medium text-gray-700">Long Description</label>
                                <ReactQuill
                                    value={values.longDescription}
                                    onChange={(content) => setFieldValue('longDescription', content)}
                                    className="w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.longDescription && touched.longDescription && <div className="text-red-500 text-sm">{errors.longDescription}</div>}
                            </div>

                            <div>
                                <label className="block text-lg font-medium text-gray-700">Pet Image</label>
                                <input
                                    type="file"
                                    name="petImage"
                                    onChange={(event) => {
                                        const file = event.target.files[0];
                                        setFieldValue('petImage', file);
                                    }}
                                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.petImage && touched.petImage && <div className="text-red-500 text-sm">{errors.petImage}</div>}
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full p-3 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {isSubmitting ? <ImSpinner9 className="animate-spin text-white m-auto" /> : 'Update Pet Info'}
                            </button>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default EditPetInfo;
