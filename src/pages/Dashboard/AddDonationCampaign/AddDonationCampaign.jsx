import { Formik } from 'formik';

import { uploadImageToServer } from '../../../api/utils';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import { ImSpinner9 } from 'react-icons/im';
import useAuth from '../../../hooks/useAuth';

const AddDonationCampaign = () => {
    const { currentUser } = useAuth();
    const axiosSecure = useAxiosSecure();

    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Create Donation Campaign</h2>

            <Formik
                initialValues={{
                    petName: '',
                    petPicture: null,
                    maxDonationAmount: '',
                    totalDonationAmount: '',
                    lastDate: '',
                    shortDescription: '',
                    longDescription: '',
                }}
                validate={(values) => {
                    const errors = {};
                    if (!values.petName) errors.petName = 'Pet Name is required'
                    if (!values.petPicture) errors.petPicture = 'Pet picture is required';
                    if (!values.maxDonationAmount) errors.maxDonationAmount = 'Max donation amount is required';
                    if (!values.totalDonationAmount) errors.totalDonationAmount = 'total donation amount is required even if it 0';
                    if (!values.lastDate) errors.lastDate = 'Last date is required';
                    if (!values.shortDescription) errors.shortDescription = 'Short description is required';
                    if (!values.longDescription) errors.longDescription = 'Long description is required';
                    return errors;
                }}
                onSubmit={async (values, { setSubmitting, setFieldError, resetForm }) => {

                    try {
                        // Upload image
                        const imageUrl = await uploadImageToServer(values.petPicture);
                        if (!imageUrl) {
                            setFieldError('petPicture', 'Image upload failed');
                            setSubmitting(false);
                            return;
                        }
                        const campaignData = {
                            ...values,
                            petPicture: imageUrl,
                            createdAt: new Date().toISOString(),
                            EventOwnerEmail: currentUser.email,
                        };
                        console.log("full event data");
                        await axiosSecure.post('/donations', campaignData);
                        toast.success('Donation Campaign Created Successfully! ✔️');
                        resetForm();
                    } catch (err) {
                        console.error(err);
                        toast.error('Failed to create campaign! ❌');
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
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-lg font-medium text-gray-700">Pet Name</label>
                            <input
                                type="text"
                                name="petName"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.petName}
                                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.petName && touched.petName && <div className="text-red-500 text-sm">{errors.petName}</div>}
                        </div>
                        {/* Pet Picture */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Pet Picture</label>
                            <input
                                type="file"
                                name="petPicture"
                                onChange={(event) => {
                                    const file = event.target.files[0];
                                    setFieldValue('petPicture', file);
                                }}
                                className="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            />
                            {errors.petPicture && touched.petPicture && <div className="text-red-500 text-sm">{errors.petPicture}</div>}
                        </div>

                        {/* Max Donation Amount */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Maximum Donation Amount</label>
                            <input
                                type="number"
                                name="maxDonationAmount"
                                value={values.maxDonationAmount}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            />
                            {errors.maxDonationAmount && touched.maxDonationAmount && <div className="text-red-500 text-sm">{errors.maxDonationAmount}</div>}
                        </div>
                        {/* Total Donation Amount */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Total Collected Donation Amount</label>
                            <input
                                type="number"
                                name="totalDonationAmount"
                                value={values.totalDonationAmount}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            />
                            {errors.totalDonationAmount && touched.totalDonationAmount && <div className="text-red-500 text-sm">{errors.totalDonationAmount}</div>}
                        </div>

                        {/* Last Date */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Last Date of Donation</label>
                            <input
                                type="datetime-local"
                                name="lastDate"
                                value={values.lastDate}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            />
                            {errors.lastDate && touched.lastDate && <div className="text-red-500 text-sm">{errors.lastDate}</div>}
                        </div>

                        {/* Short Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Short Description</label>
                            <input
                                type="text"
                                name="shortDescription"
                                value={values.shortDescription}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            />
                            {errors.shortDescription && touched.shortDescription && <div className="text-red-500 text-sm">{errors.shortDescription}</div>}
                        </div>

                        {/* Long Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Long Description</label>
                            <textarea
                                name="longDescription"
                                value={values.longDescription}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="mt-2 block w-full py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            />
                            {errors.longDescription && touched.longDescription && <div className="text-red-500 text-sm">{errors.longDescription}</div>}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? <ImSpinner9 className="animate-spin text-white m-auto" /> : 'Create Campaign'}
                        </button>
                    </form>
                )}
            </Formik>
        </div>
    );
};

export default AddDonationCampaign;
