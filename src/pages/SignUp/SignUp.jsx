import { Button, Card, Checkbox, FileInput, Label, TextInput } from "flowbite-react";
import Lottie from "lottie-react";
import registerLottie from "../../assets/lottie/register.json"
import { Link } from "react-router-dom";
const SignUp = () => {
    return (
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row justify-between items-center min-h-screen">
            <div className="w-full lg:w-1/2 flex items-center justify-center">
                <Lottie animationData={registerLottie} className="w-3/4" />
            </div>
            {/* Registration Form Section */}
            <div className="w-full lg:max-w-md flex-1 items-center justify-center">
                <h2 className="text-2xl font-medium text-gray-800 text-center mb-6">Register Form</h2>
                <Card>
                    <form className="flex flex-col gap-4">
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="name" value="Name" />
                            </div>
                            <TextInput id="email1" type="email" placeholder="your name" required />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="email1" value="Your email" />
                            </div>
                            <TextInput id="email1" type="email" placeholder="your email" required />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="file-upload-helper-text" value="Upload file" />
                            </div>
                            <FileInput id="file-upload-helper-text" />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="password1" value="Your password" />
                            </div>
                            <TextInput id="password1" type="password" required />
                        </div>
                        <div className="flex items-center gap-2">
                            <Checkbox id="remember" />
                            <Label htmlFor="remember">Remember me</Label>
                        </div>
                        <Button type="submit" className="bg-purple-500">Submit</Button>
                        <p>Already have an account? <Link to='/login' className=" text-blue-500 font-semibold">
                            Login
                        </Link></p>
                    </form>
                </Card>
            </div>
        </div>
    );
};
export default SignUp;