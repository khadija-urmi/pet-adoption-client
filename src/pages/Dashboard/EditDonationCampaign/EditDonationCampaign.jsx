import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { ImSpinner10 } from "react-icons/im";
import { Formik } from "formik";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const EditDonationCampaign = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();

    const { data: singleDonation = {}, isLoading } = useQuery({
        queryKey: ['singleDonation', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/my-donations-camp/${id}`);
            return res.data;
        },
    });

    const handleSubmit = async (values, { resetForm }) => {
        try {
            const campaignData = {
                petName: values.petName,
                maxDonationAmount: values.maxDonationAmount,
                totalDonationAmount: values.totalDonationAmount,
                lastDate: values.lastDate,
                shortDescription: values.shortDescription,
            };
            await axiosPublic.patch(`/my-donations-camp/${id}`, campaignData);
            toast.success('Donation Campaign Updated Successfully! 🎉');
            resetForm();
            navigate('/dashboard/my-donation-campaigns');
        } catch (err) {
            console.error(err);
            toast.error('Failed to update campaign! 👊');
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Helmet>
                <title>Edit Donation | WoofWow</title>
            </Helmet>
            <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-4">Edit Donation Campaign</h2>

                <Formik
                    initialValues={{
                        petName: singleDonation.petName || '',
                        maxDonationAmount: singleDonation.maxDonationAmount || '',
                        lastDate: singleDonation.lastDate || '',
                        shortDescription: singleDonation.shortDescription || '',
                    }}
                    validate={(values) => {
                        const errors = {};
                        if (!values.petName) errors.petName = 'Pet Name is required';
                        if (!values.maxDonationAmount) errors.maxDonationAmount = 'Max donation amount is required';
                        if (!values.lastDate) errors.lastDate = 'Last date is required';
                        if (!values.shortDescription) errors.shortDescription = 'Short description is required';
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

                            <button
                                type="submit"
                                className="w-full py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? <ImSpinner10 className="animate-spin text-white m-auto" /> : 'Update Campaign'}
                            </button>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default EditDonationCampaign;
