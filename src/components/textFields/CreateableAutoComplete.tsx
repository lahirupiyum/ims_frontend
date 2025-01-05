import { Box, IconButton, InputAdornment } from "@mui/material";
import Autocomplete, {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
} from "@mui/material/Autocomplete";
import MenuItem from "@mui/material/MenuItem";
import React, { useEffect, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { BasicInfo } from "../../types/common/BasicInfo";
import ContainedButton from "../buttons/ContainedButton";
import CustomTypography, { fontSizes, fontWeights } from "../typography/CustomTypography";
import { PropTypes as AutoCompletePropTypes } from "./AutoCompleteField";
import OutlinedTextField from "./OutlinedTextField";

interface CreateableAutoCompletePropTypes<T> extends AutoCompletePropTypes<T> {
  onNewValueChange: (value: string) => void;
}

const CreateableAutoComplete = <T extends BasicInfo>({
  label,
  options,
  value,
  optionLabel,
  onChange,
  onInputChange,
  onNewValueChange,
}: CreateableAutoCompletePropTypes<T>) => {
  const NEW_ITEM = "New Item";

  const [isCreating, setIsCreating] = useState<boolean>(false);
  const textFieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value?.id === 0) handleCreateNew();
  },[])

  const handleCreateNew = () => {
    setIsCreating(true);
    setTimeout(() => {
      textFieldRef.current?.querySelector('input')?.focus();
    }, 0);
  };

  const backToAutoComplete = () => {
    setIsCreating(false);
    onNewValueChange("");
  }

  return (
    <Box width="100%">
      <CustomTypography
        fontSize={fontSizes.sm}
        fontWeight={fontWeights.xl}
        ml={1}
        mb={1}
      >
        {label}
      </CustomTypography>
      {isCreating ? (
          <OutlinedTextField
            ref={textFieldRef}
            fullWidth
            placeholder={label}
            value={value?.name}
            onChange={(e) => onNewValueChange(e.target.value)}

            sx={{ "& input": {px:"14px", py: "16.5px" } }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" sx={{ cursor: "pointer" }}>
                  <IconButton onClick={backToAutoComplete}>
                    <RxCross2 fontSize={fontSizes.lg} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
      ) : (
        <Autocomplete
          fullWidth
          options={[NEW_ITEM, ...options]}
          getOptionLabel={(option: T | string) =>
            typeof option === "string" ? "NEW ITEM" : optionLabel(option)
          }
          value={value}
          onChange={(
            event: React.SyntheticEvent,
            value: string | T | null,
            reason: AutocompleteChangeReason,
            details?: AutocompleteChangeDetails<string | T> | undefined
          ) => {
            if (typeof value === "string" && value === NEW_ITEM)
              handleCreateNew();
            else
              onChange(
                event,
                value as T | null,
                reason,
                details as AutocompleteChangeDetails<T>
              );
          }}
          onInputChange={onInputChange}
          renderInput={(params) => (
            <OutlinedTextField {...params} placeholder={label}  />
          )}
          renderOption={(props, option) => {
            const { key, ...otherProps } = props;
            if (option === NEW_ITEM) {
              return (
                <Box
                  key={key}
                  width="100%"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  paddingBottom="8px"
                >
                  <ContainedButton
                    sx={{
                      fontSize: fontSizes.xs,
                      bgcolor: "#e9e9e9",
                      color: "black",
                      fontWeight: fontWeights.xl,
                      paddingY: 1,
                      zIndex: 5,
                      width: "90%",
                    }}
                    onClick={handleCreateNew}
                  >
                    + NEW {label.toUpperCase()}
                  </ContainedButton>
                </Box>
              );
            }
            return (
              <MenuItem key={key} {...otherProps}>
                {typeof option === "string" ? option : optionLabel(option)}
              </MenuItem>
            );
          }}
        />
      )}
    </Box>
  );
};

export default CreateableAutoComplete;
