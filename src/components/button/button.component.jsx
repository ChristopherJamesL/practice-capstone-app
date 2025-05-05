import './button.styles.scss';
// inverted, default, google sign-in

const BUTTON_TYPE_CLASSES = {
    default: 'default',
    inverted: 'inverted',
    google: 'google-sign-in'
}

const Button = ({ children, buttonType = 'default', ...otherProps }) => {
    return (
        <button className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`} {...otherProps} >
            {children}
        </button>
    )
}

export default Button;