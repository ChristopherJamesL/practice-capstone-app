import { BaseButton, GoogleSignInButton, InvertedButton } from "./button.styles";

export const BUTTON_TYPE_CLASSES = {
    base: 'base',
    inverted: 'inverted',
    google: 'google-sign-in'
}

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) => {
    const buttonMap = {
        [BUTTON_TYPE_CLASSES.base]: BaseButton,
        [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
        [BUTTON_TYPE_CLASSES.inverted]: InvertedButton
    };
    return buttonMap[buttonType] || buttonMap[BUTTON_TYPE_CLASSES.base];
}

const Button = ({ children, buttonType = 'default', ...otherProps }) => {
    const CustomButton = getButton(buttonType);
    return <CustomButton {...otherProps} >{children}</CustomButton>
}

export default Button;