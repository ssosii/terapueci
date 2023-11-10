
import { h, render } from 'preact';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import "./checkboxField.scss";

const CheckboxField = ({ children, field, style, error, value, handleChange }) => {
    console.log("error", error);
    return (
        <div className="checkbox-field" style={{ ...style }}>
            <div>
                <Checkbox name={field} id={`checkbox-${field}`} checked={value} onChange={handleChange} sx={{
                    color: error ? "#d70105" : "inherit",
                    '&.Mui-checked': {
                        color: "#4259A9",
                    },
                }} />
            </div>
            <label for={`checkbox-${field}`} className={`text ${error && "--error"}`}>
                {children}
            </label>
        </div>
    )
}

export { CheckboxField }

// import styled from 'styled-components';

// type CheckboxProps = {
//   field: {
//     name: string;
//     value: boolean;
//     onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
//   };
//   label: string;
//   error: boolean;
// };

// const Checkbox: React.FC<CheckboxProps> = ({ field, label, error }) => {
//   console.log('field', error);
//   return (
//     <Label error={error}>
//       <StyledCheckbox
//         type='checkbox'
//         name={field.name}
//         checked={field.value}
//         onChange={field.onChange}
//         error={error}
//       />
//       <span>{label}</span>
//     </Label>
//   );
// };

// export { Checkbox };

// type StyledCheckbox = {
//   checked: boolean;
//   name: string;
//   type: string;
//   error: boolean;
// };
// const StyledCheckbox = styled.input<StyledCheckbox>`
//   appearance: none;
//   width: 18px;
//   height: 18px;
//   margin-right: 10px;
//   border: 1px solid
//     ${(props) => (props.error ? props.theme.colors.red : props.theme.colors.grey300)};

//   &:checked {
//     position: relative;
//     background: none;
//   }
//   &:checked::after {
//     position: absolute;
//     top: 3px;
//     left: 2px;
//     /* "✓" */
//     content: '';
//     width: 8px;
//     height: 3px;
//     border: 4px solid ${(props) => props.theme.colors.primary};
//     border-right: none;
//     border-top: none;
//     transform: rotate(-45deg);
//   }
// `;

// type LabelProps = {
//   error: boolean;
// };
// const Label = styled.label<LabelProps>`
//   display: flex;
//   align-items: center;
//   cursor: pointer;
//   color: ${(props) => (props.error ? props.theme.colors.red : 'inherit')};
//   span {
//     line-height: 1;
//   }
// `;

// // const StyledCheckbox = styled.input<StyledCheckbox>`
// //   appearance: none;
// //   width: 1.6rem;
// //   height: 1.6rem;
// //   border: 1px solid ${(props) => props.theme.colors.grey300};
// //   margin-right: 10px;

// //   &:checked {
// //     position: relative;
// //     background: none;
// //   }
// //   &:checked::after {
// //     position: absolute;
// //     top: 0.36rem;
// //     left: 0.12rem;
// //     /* "✓" */
// //     content: '';
// //     width: 1rem;
// //     height: 0.3rem;
// //     border: 4px solid ${(props) => props.theme.colors.primary};
// //     border-right: none;
// //     border-top: none;
// //     transform: rotate(-45deg);
// //   }
// // `;