import { useState } from 'react';
import FormInput from '../form-input/form-input.component';
import { 
    createAuthUserWithEmailAndPassword, 
    createUserDocumentFromAuth 
} from '../../utils/firebase/firebase.utils';
import './sign-up-form.styles.scss'

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields

    console.log(formFields)

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
            console.log('user: ', user)
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
        <div className="sign-up-form-container" >
            <h1>Sign Up With Email And Password</h1>
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
                <button type='submit' >Submit</button>
            </form>
        </div>
    )
}

export default SignUpForm;