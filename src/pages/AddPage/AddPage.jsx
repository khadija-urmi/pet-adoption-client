import { Formik } from 'formik';
import Select from 'react-select';
import { uploadImageToServer } from "../../api/utils";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AddPage = () => {
    const categories = [
        { label: 'Dog', value: 'dog' },
        { label: 'Cat', value: 'cat' },
        { label: 'Bird', value: 'bird' },
        { label: 'Rabbit', value: 'rabbit' },
        { label: 'Reptile', value: 'reptile' },
        { label: 'Fish', value: 'reptile' },
        { label: 'Fish', value: 'fish' },
    ];

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
                        try {
                            // Upload image
                            const imageUrl = await uploadImageToServer(values.petImage);
                            if (!imageUrl) {
                                setFieldError('petImage', 'Image upload failed');
                                setSubmitting(false);
                                return;
                            }

                            const petData = {
                                ...values,
                                petImage: imageUrl,
                                addedAt: new Date().toISOString(),
                                adopted: false,
                            };

                            console.log('Adding pet:', petData);

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
                                <Select
                                    name="petCategory"
                                    options={categories}
                                    onChange={(option) => setFieldValue('petCategory', option)}
                                    onBlur={handleBlur}
                                    value={values.petCategory}
                                    className="w-full p-5 rounded-md shadow-sm"
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
                                {isSubmitting ? 'Submitting...' : 'Add Pet'}
                            </button>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default AddPage;
