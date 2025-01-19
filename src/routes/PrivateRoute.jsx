import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Spinner } from "flowbite-react";
import PropTypes from "prop-types";


const PrivateRoute = ({ children }) => {
    const { currentUser, isLoading } = useAuth();
    const location = useLocation();
    console.log("current user", currentUser);
    if (isLoading) {
        <div className="text-center">
            <Spinner aria-label="Extra large Center-aligned spinner example Purple" size="xl" color="purple" />
        </div>
    }
    if (currentUser) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace></Navigate>

};
PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
};
export default PrivateRoute;