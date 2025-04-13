import { IconButton, InputAdornment, TextFieldProps } from "@mui/material";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import OutlinedTextField from "./OutlinedTextField";

type PasswordFieldProps = {
  placeholder: string;
} & TextFieldProps

const OutlinedPasswordField: React.FC<PasswordFieldProps> = ({
  placeholder,
  ...rest
}) => {
  const [textVisible, setTextVisible] = useState(false);

  const handleTextVisibility = () => setTextVisible(!textVisible);

  return (
    <OutlinedTextField
      placeholder={placeholder}
      type={textVisible ? "text" : "password"}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleTextVisibility}>
                {textVisible ? (
                  <FiEyeOff fontSize={16} />
                ) : (
                  <FiEye fontSize={16} />
                )}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
      {...rest}
    />
  );
};

export default OutlinedPasswordField;
