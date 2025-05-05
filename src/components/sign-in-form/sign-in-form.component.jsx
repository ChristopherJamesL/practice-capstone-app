import { useState } from 'react';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import { defaultFormFields } from '../sign-up-form/sign-up-form.component';
import { 
    auth, 
    signInAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth,
    signInWithGooglePopup
} from '../../utils/firebase/firebase.utils';
import './sign-in-form.styles.scss';

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password  } = formFields;

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({...formFields, [name]: value})
    }

    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const result = await signInAuthUserWithEmailAndPassword(email, password);
            console.log('success', result);
            setFormFields(defaultFormFields);
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
        }
        

    }

    return (
        <div className='sign-in-container'>
            <h2>Already Have An Account?</h2>
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
                <div className='buttons-container'>
                    <Button type="submit" >SIGN IN</Button>
                    <Button  onClick={signInWithGoogle} buttonType='google' >GOOGLE SIN IN</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm