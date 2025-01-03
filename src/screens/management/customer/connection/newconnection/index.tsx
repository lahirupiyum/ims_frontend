import { Box } from "@mui/material";
import CustomTypography, {
  fontSizes,
  fontWeights,
} from "../../../../../components/typography/CustomTypography";

const NewConnection = () => {
  return (
    <Box
      sx={{
        height: "100%",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <CustomTypography fontWeight={fontWeights.xxl} fontSize={fontSizes.lg}>
        NEW CONNECTION
      </CustomTypography>
    </Box>
  );
};

export default NewConnection;
