import { 
    signInWithGooglePopup ,
    createUserDocumentFromAuth,
    signInWithGoogleRedirect,
} from "../../utils/firebase/firebase.utils";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

const SignIn = () => {
    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        console.log('user: ', user);
        createUserDocumentFromAuth(user);
    }

    const logGoogleRedirectUser =  () => {
        signInWithGoogleRedirect();
    }

    return (
        <div>
            <SignUpForm />
            <h1>Sign In</h1>
            <button onClick={logGoogleUser} >Sign In With Google</button>
            <button onClick={logGoogleRedirectUser} >Sign In With Google Redirect</button>
        </div>
    )
}

export default SignIn;