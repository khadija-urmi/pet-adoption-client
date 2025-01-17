import { Button, Card, Label, TextInput } from "flowbite-react";
import SocialLogIn from "../../components/SocialLogIn/SocialLogIn";
import { useState } from "react";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet-async";
import { useForm } from 'react-hook-form';
import { FaLock } from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import { LuEye } from "react-icons/lu";
import { LuEyeClosed } from "react-icons/lu";
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Login = () => {
    const { signIn } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [seePassword, setSeePassword] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const passwordVisibility = () => {
        setSeePassword(!seePassword);
    };

    const onSubmit = async (data) => {
        const { email, password } = data;
        console.log(password, email);
        try {
            signIn(email, password)
                .then(result => {
                    const user = result.user;
                    console.log(user);
                    console.log("User Log In successfully");
                    toast.success('Successfully Log In!');
                    navigate(from, { replace: true })
                })
                .catch((error) => {
                    const errorMessage = error.message;
                    toast.error(`Login failed,${errorMessage}`);

                });
        } catch (err) {
            console.log(err)
            toast.error('Login failed!');
        }
    };

    return (
        <>
            <Helmet>
                <title>WoofWow | LogIn</title>
            </Helmet>
            <Card className="max-w-md mx-auto w-full bg-gray-100 shadow-xl mt-6">
                <h2 className="text-3xl font-semibold text-center ">Login</h2>
                <p className="font-bold text-center">New User?
                    <Link to='/signup' className="text-blue-500 font-semibold"> Sign Up</Link>
                </p>
                <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-3 p-3">
                    <div>
                        <div className="mb-4 block ">
                            <Label htmlFor="email1" value="Email Address" />
                        </div>
                        <TextInput
                            id="email1"
                            type="email"
                            placeholder="Enter Your Email"
                            icon={HiMail}
                            {...register('email', {
                                required: 'Email is required'
                            })}
                            className="w-full border-2 border-gray-300 rounded-lg"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>
                    <div className="relative">
                        <div className="mb-4 block">
                            <Label htmlFor="password1" value="Password" />
                        </div>
                        <TextInput
                            id="password1"
                            type={seePassword ? "text" : "password"}
                            icon={FaLock}
                            placeholder="Enter Your Password"
                            {...register('password', { required: 'Password is required' })}
                            className="w-full border-2 border-gray-300 rounded-lg"
                        />
                        <div onClick={passwordVisibility} className="absolute right-3 top-3/4  bottom-1transform -translate-y-1/2 text-gray-500">
                            {
                                seePassword ? <LuEye /> : <LuEyeClosed />
                            }
                        </div>
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    </div>
                    <Button type="submit" className="bg-purple-500">Submit</Button>
                    <SocialLogIn></SocialLogIn>
                </form>
            </Card>
        </>
    );
};

export default Login;
