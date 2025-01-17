import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const SocialLogIn = () => {
    const { googleSignUp, gitHubLogIn } = useAuth();
    const axiosPublic = useAxiosPublic();
    const handleGoogleLogIn = () => {
        googleSignUp()
            .then(result => {
                console.log(result.user);
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName
                }
                console.log("user info", userInfo)
                toast.success("Successfully Log In Google")
                return axiosPublic.post('/users', userInfo)
            })
    }
    const handleGitHubLogIn = () => {
        console.log("github login")
    }
    return (
        <div className="w-full max-w-md mx-auto">
            <div className="my-2 border-b text-center">
                <div
                    className="leading-none px-1 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2"
                >
                    Or log in with
                </div>
            </div>

            {/* Google Login Button */}
            <button onClick={handleGoogleLogIn}
                className="w-full bg-blue-500 text-white py-2 px-2 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-red-500 mt-4 flex items-center justify-center space-x-2"
            >
                <FaGoogle className="w-5 h-5" />
                <span>Login with Google</span>
            </button>

            {/* GitHub Login Button */}
            <button onClick={handleGitHubLogIn}
                className="w-full bg-gray-800 text-white py-2 px-2 rounded-md shadow hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 mt-4 flex items-center justify-center space-x-2"
            >
                <FaGithub className="w-5 h-5" />
                <span>Login with GitHub</span>
            </button>
        </div>
    );
};

export default SocialLogIn;
