import { Button, Card, FileInput, Label, TextInput } from "flowbite-react";
import Lottie from "lottie-react";
import registerLottie from "../../assets/lottie/register.json"
import { Link, useNavigation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import toast from "react-hot-toast";
import { uploadImageToServer } from "../../api/utils";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const SignUp = () => {
    const { signUpNewUser, updateUserProfile } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigation()
    const [errorMsg, setErrorMsg] = useState("");
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        image: null,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            image: e.target.files[0],
        })
    }
    const validationPassword = (password) => {
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasPasswordLength = password.length >= 6;

        if (!hasUpperCase) return "Password must have at least one uppercase letter.";
        if (!hasLowerCase) return "Password must have at least one lowercase letter.";
        if (!hasPasswordLength) return "Password must be at least 6 characters long.";
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        const { name, email, password, image } = formData;
        //upload img to hosting
        const imageURL = await uploadImageToServer(image);
        console.log("filed value", name, email, password, imageURL);

        const passwordValidated = validationPassword(password);
        if (passwordValidated) {
            setErrorMsg(passwordValidated);
            return;
        }
        setErrorMsg("");
        try {
            await signUpNewUser(email, password)
            await updateUserProfile(name, imageURL)
            console.log("update user successfully",)
            setFormData({ name: "", email: "", password: "", image: null });
            const userInfo = {
                name: name,
                email: email
            }
            console.log("userInfo", userInfo)
            axiosPublic.post('/users', userInfo)
                .then(res => {
                    if (res.data.insertedId) {
                        console.log('user added to the database')
                        toast.success('Successfully Sign Up!')
                    }
                })
            navigate('/login')
        }
        catch (err) {
            console.log(err)
        }
    }
    return (
        <>
            <Helmet>
                <title>WoofWow | Sign Up</title>
            </Helmet>
            <div className="max-w-5xl mx-auto flex flex-col lg:flex-row justify-between items-center min-h-screen">
                <div className="w-full lg:w-1/2 flex items-center justify-center">
                    <Lottie animationData={registerLottie} className="w-3/4" />
                </div>
                {/* Registration Form Section */}
                <div className="w-full lg:max-w-md flex-1 items-center justify-center">
                    <h2 className="text-2xl font-medium text-gray-800 text-center mb-6">Register Form</h2>
                    <Card>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="name" value="Name" />
                                </div>
                                <TextInput id="name"
                                    name="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={handleInputChange} placeholder="Your Full Name" required />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="email1" value="Email" />
                                </div>
                                <TextInput id="email"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange} placeholder="Your Email" required />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="file-upload-helper-text" value="Select Image:" />
                                </div>
                                <FileInput id="file-upload-helper-text" name="image"
                                    onChange={handleFileChange} />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="password1" value="Password" />
                                </div>
                                <TextInput id="password1" name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    required />
                            </div>
                            {errorMsg && (
                                <div className="mt-4 text-sm
                     text-red-600">{errorMsg}</div>)}
                            <Button type="submit" className="bg-purple-500">Submit</Button>
                            <p>Already have an account? <Link to='/login' className=" text-blue-500 font-semibold">
                                Login
                            </Link>
                            </p>
                        </form>
                    </Card>
                </div>
            </div>
        </>
    );
};
export default SignUp;