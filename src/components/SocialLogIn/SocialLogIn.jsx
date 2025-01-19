import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useLocation, useNavigate } from "react-router-dom";

const SocialLogIn = () => {
    const { googleSignUp, gitHubLogIn } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";



    const handleGoogleLogIn = () => {
        googleSignUp()
            .then(result => {
                const userInfo = {
                    name: result.user?.displayName,
                    email: result.user?.email,
                }

                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        if (res.data.insertedId) {
                            toast.success('Successfully Signed Up!');
                            navigate(from || '/', { replace: true });
                        }
                    })
                    .catch(error => {
                        toast.error(`Error adding user to database: ${error.message}`);
                    });
            })
            .catch((error) => {
                const errorMessage = error.message;
                toast.error(`Login failed, ${errorMessage}`);
            });
    };

    const handleGitHubLogIn = () => {
        gitHubLogIn()
            .then(result => {
                const userInfo = {
                    name: result.user?.displayName,
                    email: result.user?.email,
                }

                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        if (res.data.insertedId) {
                            toast.success("Successfully Logged In with GitHub");
                            navigate(from || '/', { replace: true });
                        }
                    })
                    .catch(error => {
                        toast.error(`Error adding user to database: ${error.message}`);
                    });
            })
            .catch((error) => {
                const errorMessage = error.message;
                toast.error(`Login failed, ${errorMessage}`);
            });
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="my-2 border-b text-center">
                <div
                    className="leading-none px-1 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2"
                >
                    Or log in with
                </div>
            </div>

            <div className="flex justify-between gap-4">
                {/* Google Login Button */}
                <button onClick={handleGoogleLogIn}
                    className="w-1/2 bg-blue-500 text-white py-2 px-2 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-red-500 mt-4 flex items-center justify-center space-x-2"
                >
                    <FaGoogle className="w-5 h-5" />
                    <span>Login with Google</span>
                </button>

                {/* GitHub Login Button */}
                <button onClick={handleGitHubLogIn}
                    className="w-1/2 bg-gray-800 text-white py-2 px-2 rounded-md shadow hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 mt-4 flex items-center justify-center space-x-2"
                >
                    <FaGithub className="w-5 h-5" />
                    <span>Login with GitHub</span>
                </button>
            </div>
        </div>
    );
};

export default SocialLogIn;
