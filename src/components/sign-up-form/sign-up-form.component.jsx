import { useState } from 'react';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import { 
    createAuthUserWithEmailAndPassword, 
    createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';
import { SignUpContainer, SignUpTitle } from './sign-up-form.styles';

export const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({...formFields, [name]: value});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert('passwords do not match')
            return;
        }
        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, { displayName })
            setFormFields(defaultFormFields);
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('cannot create user, email already in use')
            } else {
                console.log('error creating user', error);
            }
        }
    }

    return (
        <SignUpContainer >
            <SignUpTitle>Don't Have An Account?</SignUpTitle>
            <span>Sign Up With Email And Password</span>
            <form onSubmit={handleSubmit} >
                <FormInput
                    label="Display Name" 
                    type="text" 
                    required 
                    onChange={handleChange} 
                    name='displayName'
                    value={displayName}
                />
                <FormInput
                    label="Email" 
                    type="email" 
                    required onChange={handleChange} 
                    name='email'
                    value={email}
                />
                <FormInput
                    label="Password" 
                    type="password" 
                    required 
                    onChange={handleChange} 
                    name='password'
                    value={password}
                />
                <FormInput
                    label="Confirm Password" 
                    type="password" 
                    required 
                    onChange={handleChange} 
                    name='confirmPassword'
                    value={confirmPassword}
                />
                <Button type='submit' >SIGN UP</Button>
            </form>
        </SignUpContainer>
    )
}

export default SignUpForm;