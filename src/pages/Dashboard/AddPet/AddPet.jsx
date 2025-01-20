import { Formik } from 'formik';
import Select from 'react-select';
import { uploadImageToServer } from "../../../api/utils";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import toast from 'react-hot-toast';
import { ImSpinner9 } from 'react-icons/im';


const AddPet = () => {
    const axiosPublic = useAxiosPublic();
    const categories = [
        { label: 'Dog', value: 'dog' },
        { label: 'Cat', value: 'cat' },
        { label: 'Bird', value: 'bird' },
        { label: 'Rabbit', value: 'rabbit' },
        { label: 'Fish', value: 'fish' },
    ];

    function getLongDescription(html) {
        const divContainer = document.createElement("div");
        divContainer.innerHTML = html;
        return divContainer.textContent || divContainer.innerText || "";
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300">
            <div className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-lg my-4">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Add Pet</h1>
                <Formik
                    initialValues={{
                        petName: '',
                        petAge: '',
                        petCategory: null,
                        petLocation: '',
                        shortDescription: '',
                        longDescription: '',
                        petImage: null,
                    }}
                    validate={(values) => {
                        const errors = {};
                        if (!values.petName) errors.petName = 'Pet name is required';
                        if (!values.petAge) errors.petAge = 'Pet age is required';
                        if (!values.petCategory) errors.petCategory = 'Pet category is required';
                        if (!values.petLocation) errors.petLocation = 'Pet location is required';
                        if (!values.shortDescription) errors.shortDescription = 'Short description is required';
                        if (!values.longDescription) errors.longDescription = 'Long description is required';
                        return errors;
                    }}

                    onSubmit={async (values, { setSubmitting, resetForm, setFieldError }) => {
                        console.log("this is values", { values })
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
                                return
                            }
                            const { longDescription, ...remainingValues } = values;
                            console.log("long descrip", longDescription)
                            console.log("value", remainingValues)
                            const petData = {
                                ...remainingValues,
                                petImage: imageUrl,
                                petFullDetail: petFullDetails,
                                addedAt: new Date().toISOString(),
                                adopted: false,
                            };

                            console.log('Adding pet:', petData);
                            axiosPublic.post('/pets', petData)
                                .then(res => {
                                    console.log(res.data)
                                    if (res.data.insertedId) {
                                        toast.success("Sucessfully Inserted Pet Info")
                                    }
                                })
                                .catch(err => {
                                    console.log(err)
                                    toast.error("Failed!")
                                })

                            resetForm();
                            setSubmitting(false);
                        } catch (error) {
                            console.error('Error submitting form:', error);
                            setSubmitting(false);
                        }
                    }}
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
                        //form start....
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
                                {/* React Select */}
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
                            {/* React Quil  */}
                            <div>
                                <label className="block text-lg font-medium text-gray-700">Long Description</label>
                                <ReactQuill n
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
                                {isSubmitting ? <ImSpinner9 className="animate-spin text-white m-auto" /> : 'Add Pet'}
                            </button>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default AddPet;
