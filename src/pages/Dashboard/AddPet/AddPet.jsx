import { Formik } from "formik";
import Select from "react-select";
import { uploadImageToServer } from "../../../api/utils";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import toast from "react-hot-toast";
import { ImSpinner9 } from "react-icons/im";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const AddPet = () => {
  const { currentUser } = useAuth();
  const axiosSecure = useAxiosSecure();
  const categories = [
    { label: "Dog", value: "dog" },
    { label: "Cat", value: "cat" },
    { label: "Bird", value: "bird" },
    { label: "Rabbit", value: "rabbit" },
    { label: "Fish", value: "fish" },
  ];
  const vaccinated = [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
  ];

  function getLongDescription(html) {
    const divContainer = document.createElement("div");
    divContainer.innerHTML = html;
    return divContainer.textContent || divContainer.innerText || "";
  }

  return (
    <div>
      <Helmet>
        <title>Create Pet | WoofWow</title>
      </Helmet>
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 dark:bg-gray-900 dark:text-white">
        <div className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-lg my-4 dark:bg-gray-800 dark:border dark:border-gray-700">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
            Add Pet
          </h1>
          <Formik
            initialValues={{
              petName: "",
              petAge: "",
              petCategory: null,
              petLocation: "",
              shortDescription: "",
              longDescription: "",
              petImage: null,
              vaccinated: "",
            }}
            validate={(values) => {
              const errors = {};
              if (!values.petName) errors.petName = "Pet name is required";
              if (!values.petAge) errors.petAge = "Pet age is required";
              if (!values.petCategory)
                errors.petCategory = "Pet category is required";
              if (!values.petLocation)
                errors.petLocation = "Pet location is required";
              if (!values.shortDescription)
                errors.shortDescription = "Short description is required";
              if (!values.longDescription)
                errors.longDescription = "Long description is required";
              if (!values.vaccinated)
                errors.vaccinated = "Vaccination status is required";
              return errors;
            }}
            onSubmit={async (
              values,
              { setSubmitting, resetForm, setFieldError }
            ) => {
              try {
                // Upload image
                const imageUrl = await uploadImageToServer(values.petImage);
                const petFullDetails = await getLongDescription(
                  values.longDescription
                );
                if (!imageUrl) {
                  setFieldError("petImage", "Image upload failed");
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
                  adopted: false,
                  OwnerEmail: currentUser.email,
                };

                axiosSecure
                  .post("/pets", petData)
                  .then((res) => {
                    if (res.data.insertedId) {
                      toast.success("Successfully Inserted Pet Info");
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                    toast.error("Failed!");
                  });

                resetForm();
                setSubmitting(false);
              } catch (error) {
                console.error("Error submitting form:", error);
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
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Pet Name */}
                <div>
                  <label className="block text-lg font-medium text-gray-700 dark:text-white">
                    Pet Name
                  </label>
                  <input
                    type="text"
                    name="petName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.petName}
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                  {errors.petName && touched.petName && (
                    <div className="text-red-500 text-sm">{errors.petName}</div>
                  )}
                </div>

                {/* Pet Age */}
                <div>
                  <label className="block text-lg font-medium text-gray-700 dark:text-white">
                    Pet Age
                  </label>
                  <input
                    type="number"
                    name="petAge"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.petAge}
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                  {errors.petAge && touched.petAge && (
                    <div className="text-red-500 text-sm">{errors.petAge}</div>
                  )}
                </div>

                {/* Pet Category */}
                <div>
                  <label className="block text-lg font-medium text-gray-700 dark:text-white">
                    Pet Category
                  </label>
                  <Select
                    name="petCategory"
                    options={categories}
                    onChange={(selectedOption) =>
                      setFieldValue(
                        "petCategory",
                        selectedOption ? selectedOption.value : ""
                      )
                    }
                    value={
                      values.petCategory
                        ? categories.find(
                            (option) => option.value === values.petCategory
                          )
                        : null
                    }
                    onBlur={handleBlur}
                    className="w-full p-3 h-12 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                  {errors.petCategory && touched.petCategory && (
                    <div className="text-red-500 text-sm">
                      {errors.petCategory}
                    </div>
                  )}
                </div>

                {/* Pet Location */}
                <div>
                  <label className="block text-lg font-medium text-gray-700 dark:text-white">
                    Pet Location
                  </label>
                  <input
                    type="text"
                    name="petLocation"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.petLocation}
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                  {errors.petLocation && touched.petLocation && (
                    <div className="text-red-500 text-sm">
                      {errors.petLocation}
                    </div>
                  )}
                </div>

                {/* Short Description */}
                <div>
                  <label className="block text-lg font-medium text-gray-700 dark:text-white">
                    Short Description
                  </label>
                  <input
                    type="text"
                    name="shortDescription"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.shortDescription}
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                  {errors.shortDescription && touched.shortDescription && (
                    <div className="text-red-500 text-sm">
                      {errors.shortDescription}
                    </div>
                  )}
                </div>

                {/* Long Description */}
                <div>
                  <label className="block text-lg font-medium text-gray-700 dark:text-white">
                    Long Description
                  </label>
                  <ReactQuill
                    value={values.longDescription}
                    onChange={(content) =>
                      setFieldValue("longDescription", content)
                    }
                    className="w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                  {errors.longDescription && touched.longDescription && (
                    <div className="text-red-500 text-sm">
                      {errors.longDescription}
                    </div>
                  )}
                </div>

                {/* Pet Image */}
                <div>
                  <label className="block text-lg font-medium text-gray-700 dark:text-white">
                    Pet Image
                  </label>
                  <input
                    type="file"
                    name="petImage"
                    onChange={(event) => {
                      const file = event.target.files[0];
                      setFieldValue("petImage", file);
                    }}
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                  {errors.petImage && touched.petImage && (
                    <div className="text-red-500 text-sm">
                      {errors.petImage}
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full p-3 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {isSubmitting ? (
                    <ImSpinner9 className="animate-spin text-white m-auto" />
                  ) : (
                    "Add Pet"
                  )}
                </button>
              </form>
            )}
          </Formik>{" "}
        </div>
      </div>
    </div>
  );
};

export default AddPet;
