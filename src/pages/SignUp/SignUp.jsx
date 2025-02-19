import { Button, Card, FileInput, Label, TextInput } from "flowbite-react";
import Lottie from "lottie-react";
import registerLottie from "../../assets/lottie/register.json";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import toast from "react-hot-toast";
import { uploadImageToServer } from "../../api/utils";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useForm } from "react-hook-form";
import { FaLock, FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import SocialLogIn from "../../components/SocialLogIn/SocialLogIn";

const SignUp = () => {
  const { signUpNewUser, updateUserProfile } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [seePassword, setSeePassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const [image, setImage] = useState(null);

  const passwordVisibility = () => {
    setSeePassword(!seePassword);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setValue("image", file);
  };

  const onSubmit = async (data) => {
    const { name, email, password } = data;
    const imageURL = await uploadImageToServer(image);

    setErrorMsg("");
    try {
      await signUpNewUser(email, password);
      await updateUserProfile(name, imageURL);

      const userInfo = { name, email };
      axiosPublic.post("/users", userInfo).then((res) => {
        if (res.data.insertedId) {
          console.log("User added to the database");
          toast.success("Successfully Signed Up!");
        }
      });

      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Helmet>
        <title>WoofWow | Sign Up</title>
      </Helmet>
      <div className="dark:bg-gray-900">
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row justify-between items-center min-h-screen mt-20  ">
          <div className="w-full lg:w-1/2 flex items-center justify-center ">
            <Lottie animationData={registerLottie} className="w-3/4" />
          </div>
          <div className="w-full lg:max-w-md flex-1 items-center justify-center">
            <h2 className="text-2xl font-medium text-gray-800 text-center mb-6 dark:text-white">
              Register Form
            </h2>
            <Card>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
              >
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="name" value="Name" />
                  </div>
                  <TextInput
                    id="name"
                    name="name"
                    type="text"
                    icon={FaUser}
                    {...register("name", { required: "Name is required" })}
                    placeholder="Your Full Name"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="email" value="Email" />
                  </div>
                  <TextInput
                    id="email"
                    name="email"
                    type="email"
                    icon={MdEmail}
                    {...register("email", {
                      required: "Email is required",
                    })}
                    placeholder="Your Email"
                  />

                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="image" value="Select Image:" />
                  </div>
                  <FileInput
                    id="image"
                    name="image"
                    onChange={handleFileChange}
                  />
                </div>
                <div className="relative">
                  <div className="mb-2 block">
                    <Label htmlFor="password" value="Password" />
                  </div>

                  <TextInput
                    type={seePassword ? "text" : "password"}
                    icon={FaLock}
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                      maxLength: {
                        value: 20,
                        message: "Password must be less than 20 characters",
                      },
                      pattern: {
                        value:
                          /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                        message:
                          "Password must have one Uppercase, one lowercase, one number, and one special character.",
                      },
                    })}
                    placeholder="Password"
                    className="input input-bordered"
                  />
                  <div
                    onClick={passwordVisibility}
                    className="absolute right-3 top-3/4  bottom-1transform -translate-y-1/2 text-gray-500"
                  >
                    {seePassword ? <LuEye /> : <LuEyeClosed />}
                  </div>
                  {errors.password && (
                    <p className="text-red-600">{errors.password.message}</p>
                  )}
                </div>
                {errorMsg && (
                  <div className="mt-2 text-sm text-red-600">{errorMsg}</div>
                )}
                <Button type="submit" className="bg-purple-500">
                  Submit
                </Button>
                <p className="dark:text-white">
                  Already have an account?
                  <Link to="/login" className="text-blue-500 font-semibold">
                    {" "}
                    Login
                  </Link>
                </p>
              </form>
            </Card>
            <SocialLogIn></SocialLogIn>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
