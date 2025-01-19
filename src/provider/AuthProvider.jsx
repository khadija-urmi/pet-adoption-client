import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, GithubAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, updateProfile, signOut } from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import { app } from '../firebase/firebase.config';
import useAxiosPublic from '../hooks/useAxiosPublic';
import PropTypes from 'prop-types';


export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();


const AuthProvider = ({ children }) => {
    const axiosPublic = useAxiosPublic();
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const signUpNewUser = (email, password) => {
        setIsLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    };
    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }
    const googleSignUp = () => {
        return signInWithPopup(auth, googleProvider);
    }
    const gitHubLogIn = () => {
        return signInWithPopup(auth, githubProvider);
    }
    const logOutUser = () => {
        return signOut(auth);
    }
    const updateUserProfile = (userName, image) => {
        return updateProfile(auth.currentUser, {
            displayName: userName,
            photoURL: image
        });
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsLoading(true);
            if (user) {
                setCurrentUser(user);
                const userInfo = { email: user.email };
                axiosPublic.post('/jwt', userInfo)
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token);
                        }
                    })
                    .catch((error) => {
                        console.error('Error fetching token:', error);
                    })
                    .finally(() => setIsLoading(false));
            }
            else {
                setCurrentUser(null);
                localStorage.removeItem('access-token');
                setIsLoading(false);
            }
        });

        return () => unsubscribe();
    }, [axiosPublic]);

    const userInfo = {
        currentUser,
        setCurrentUser,
        isLoading,
        signUpNewUser,
        signIn,
        googleSignUp,
        gitHubLogIn,
        logOutUser,
        updateUserProfile
    }

    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
export default AuthProvider;