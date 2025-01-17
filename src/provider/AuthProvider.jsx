import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, GithubAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, updateProfile, signOut } from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import { app } from '../firebase/firebase.config';

;

export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();


const AuthProvider = ({ children }) => {
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
            setCurrentUser(user);
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, []);
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

export default AuthProvider;