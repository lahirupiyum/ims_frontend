import {
  Autocomplete,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  AutocompleteInputChangeReason,
  Box,
} from "@mui/material";
import { SyntheticEvent } from "react";
import CustomTypography, {
  fontSizes,
  fontWeights,
} from "../typography/CustomTypography";
import OutlinedTextField from "./OutlinedTextField";

export type PropTypes<T> = {
  label: string;
  options: T[];
  optionLabel: (option: T) => string;
  value: T | null;
  onChange: (
    event: SyntheticEvent<Element, Event>,
    value: T | null,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<T> | undefined
  ) => void;
  onInputChange?:
    | ((
        event: React.SyntheticEvent,
        value: string,
        reason: AutocompleteInputChangeReason
      ) => void)
};

const AutoCompleteFormField = <T,>({
  label,
  options,
  value,
  optionLabel,
  onChange,
  onInputChange,
}: PropTypes<T>) => {
  return (
    <Box sx={{ width: "100%" }}>
      <CustomTypography
        fontSize={fontSizes.sm}
        fontWeight={fontWeights.xl}
        ml={1}
        mb={1}
      >
        {label}
      </CustomTypography>
      <Autocomplete
        fullWidth
        options={options}
        getOptionLabel={optionLabel}
        value={value}
        onChange={onChange}
        renderInput={(params) => (
          <OutlinedTextField placeholder={label} {...params} />
        )}
        onInputChange={onInputChange}
      />
    </Box>
  );
};

export default AutoCompleteFormField;
