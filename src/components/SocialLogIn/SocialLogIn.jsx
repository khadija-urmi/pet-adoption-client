import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

const SocialLogIn = () => {
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
            <button
                className="w-full bg-blue-500 text-white py-2 px-2 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-red-500 mt-4 flex items-center justify-center space-x-2"
            >
                <FaGoogle className="w-5 h-5" />
                <span>Login with Google</span>
            </button>

            {/* GitHub Login Button */}
            <button
                className="w-full bg-gray-800 text-white py-2 px-2 rounded-md shadow hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 mt-4 flex items-center justify-center space-x-2"
            >
                <FaGithub className="w-5 h-5" />
                <span>Login with GitHub</span>
            </button>
        </div>
    );
};

export default SocialLogIn;
