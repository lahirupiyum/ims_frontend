import { Box } from "@mui/material";
import React from "react";
import ContainedButton from "../../components/buttons/ContainedButton";
import CustomTypography, { fontSizes, fontWeights } from "../../components/textFields/CustomTypography";
import OutlinedPasswordField from "../../components/textFields/OutlinedPasswordField";
import OutlinedTextField from "../../components/textFields/OutlinedTextField";
import TataCommunicationsImage from "../../assets/images/tata-communications.png"

const Login = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:"rgba(0, 0, 0, 0.5)"
      }}
    >
      <img src={TataCommunicationsImage} height="400px" />
      <Box
        sx={{
          bgcolor: "white",
          width: "550px",
          height:"400px",
          padding: "50px 50px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "50px",
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
          width={"100%"}
        >
          <Box>
            <CustomTypography
              fontColor="primary"
              fontSize={fontSizes.xl}
              fontWeight={fontWeights.xl}
            >
              Welcome back!
            </CustomTypography>
            <CustomTypography
              fontColor="primary"
              fontWeight={fontWeights.md}
              fontSize={fontSizes.md}
            >
              Log in to Continue
            </CustomTypography>
          </Box>
          <Box
            textAlign={"start"}
            display="flex"
            flexDirection="column"
            gap={"15px"}
          >
            <Box width={"100%"} display={"flex"} flexDirection={"column"} gap={"5px"}>
              <FieldName>Email</FieldName>
              <OutlinedTextField
                fullWidth
                placeholder="Enter your email address"
              />
            </Box>
            <Box width={"100%"} display={"flex"} flexDirection={"column"} gap={"5px"}>
              <FieldName>Password</FieldName>
              <OutlinedPasswordField fullWidth placeholder="Enter password" />
            </Box>
          </Box>
        </Box>
        <ContainedButton fullWidth>Log In</ContainedButton>
      </Box>
    </div>
  );
};

const FieldName: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <CustomTypography
      fontWeight={fontWeights.md}
      fontSize={fontSizes.md}
      fontColor="secondary"
    >
      &nbsp;&nbsp;{children} <span style={{ color: "red" }}>*</span>
    </CustomTypography>
  );
};

export default Login;
