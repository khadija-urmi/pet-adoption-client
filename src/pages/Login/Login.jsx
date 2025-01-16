import { Button, Card, Label, TextInput } from "flowbite-react";
import { Helmet } from "react-helmet-async";
import { useForm } from 'react-hook-form';
import { HiMail } from "react-icons/hi";
import { LuEye } from "react-icons/lu";
import { Link } from "react-router-dom";

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <>
            <Helmet>
                <title>WoofWow | LogIn</title>
            </Helmet>
            <Card className="max-w-lg mx-auto w-full bg-white border-none shadow-lg mt-12">
                <h2 className="text-3xl font-semibold text-center ">Login</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4 p-6">
                    <div>
                        <div className="mb-4 block ">
                            <Label htmlFor="email1" className="text-lg" value="Your email" />
                        </div>
                        <TextInput
                            id="email1"
                            type="email"
                            placeholder="name@mail.com"
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
                            <Label htmlFor="password1" value="Your password" className="text-lg" />
                        </div>
                        <TextInput
                            id="password1"
                            type="password"
                            {...register('password', { required: 'Password is required' })}
                            className="w-full border-2 border-gray-300 rounded-lg"
                        />
                        <div className="absolute right-3 top-3/4  bottom-1transform -translate-y-1/2 text-gray-500">
                            <LuEye className="text-lg" />
                        </div>
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    </div>
                    <Button type="submit" className="bg-purple-500">Submit</Button>
                    <p className="font-bold">New User?
                        <Link to='/signup' className="text-blue-500 font-semibold"> Sign Up</Link>
                    </p>
                </form>
            </Card>
        </>
    );
};

export default Login;
