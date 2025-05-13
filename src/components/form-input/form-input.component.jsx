import { 
    GroupContainer,
    FormInputField,
    FormInputLabel
} from "./form-input.styles";

const FormInput = ({ label, value, ...otherProps }) => {
    const shouldShrink = Boolean(value && value.length);

    return (
        <GroupContainer >
            <FormInputField {...otherProps} />
            {label && (
                <FormInputLabel shrink={shouldShrink} >
                    {label}
                </FormInputLabel>
            )}
        </GroupContainer>
    )
};

export default FormInput;