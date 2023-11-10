import styled from 'styled-components';

const InputTextSecondary = ({
  error = false,
  type = 'text',
  label,
  name,
  value,
  onChange,
  fullWidth = false,
  isRequired = true,
  ...props
}) => {
  return (
    <Wrapper>
      <Input
        name={name}
        error={isRequired ? error : false}
        type={type}
        fullWidth={fullWidth}
        autoComplete='off'
        onChange={onChange}
        placeholder=' '
        value={value}
        {...props}
      />
      <Label>{`${label}${isRequired ? '*' : ''}`}</Label>
    </Wrapper>
  );
};

export { InputTextSecondary };


const Wrapper = styled.div`
  position: relative;
  margin-bottom: 20px;
`;
const Input = styled.input`
  font-weight: 400;
  font-size: 16px;
  height: 55px;
  border-radius: 4px;
  border: 1px solid
    ${(props) => (props.error ? props.theme.colors.red : props.theme.colors.grey200)};
  width: ${(props) => (props.fullWidth ? '100%' : 'auto')};
  padding: 15px 15px 2px 15px;
  &:focus {
    outline: none;
  }
`;

const Label = styled.label`
  color: ${(props) => props.theme.colors.grey300};
  font-size: 16px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 15px;
  top: 16px;
  transition: 0.2s ease all;
  ${Input}:focus ~ &,${Input}:not(:placeholder-shown) ~ & {
    top: 5px;
    font-size: 10px;
    font-weight: 600;
    color: ${(props) => props.theme.colors.grey300};
  }
`;

