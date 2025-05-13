import { useState } from 'react';
import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import { 
    signInAuthUserWithEmailAndPassword,
    signInWithGooglePopup
} from '../../utils/firebase/firebase.utils';
import { SignInContainer, SignInTitle, ButtonsContainer } from './sign-in-form.styles';

export const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password  } = formFields;

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({...formFields, [name]: value})
    }

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await signInAuthUserWithEmailAndPassword(email, password);
        } catch (error) {
            switch (error.code) {
                case "auth/invalid-credential":
                    alert('incorrect email or password');
                    break;
                case "auth/user-not-found":
                    alert("no use associated with this email");
                    break;
                default:
                    console.log('error', error)
            }
        } finally {
            setFormFields(defaultFormFields);
        }
    }

    return (
        <SignInContainer>
            <SignInTitle>Already Have An Account?</SignInTitle>
            <span>Sign In With Email And Password Or Google</span>
            <form onSubmit={handleSubmit} >
                <FormInput 
                    required
                    label="Email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                />
                <FormInput 
                    required
                    label="Password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                />
                <ButtonsContainer>
                    <Button type="submit" >SIGN IN</Button>
                    <Button  
                        onClick={signInWithGoogle} 
                        buttonType={BUTTON_TYPE_CLASSES.google} 
                    >
                        GOOGLE SIN IN
                    </Button>
                </ButtonsContainer>
            </form>
        </SignInContainer>
    )
}

export default SignInForm