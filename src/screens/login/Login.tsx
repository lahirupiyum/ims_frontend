import { Box, CircularProgress } from "@mui/material";
import axios from "axios";
import React, { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import TataCommunicationsImage from "../../assets/images/tata-communications.png";
import ContainedButton from "../../components/buttons/ContainedButton";
import OutlinedPasswordField from "../../components/textFields/OutlinedPasswordField";
import OutlinedTextField from "../../components/textFields/OutlinedTextField";
import CustomTypography, {
  fontSizes,
  fontWeights,
} from "../../components/typography/CustomTypography";
import { useAppDispatch } from "../../redux/hooks";
import { addOneNotification } from "../../redux/slices/notificationSlice";
import { home } from "../../utils/context-paths";
import { authUrl } from "../../utils/url-properties/urls/auth";

const Login = () => {
  const [authRequest, setAuthRequest] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true);
    await axios
      .post(authUrl, authRequest)
      .then((res) => {
        const token = res.data.token;
        localStorage.setItem("token", token);
        navigate(home);
      })
      .catch(() => {
        dispatch(
          addOneNotification({
            type: "error",
            message: "Username or password is invalid",
          })
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setAuthRequest((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <img src={TataCommunicationsImage} height="400px" />
      <Box
        sx={{
          bgcolor: "white",
          width: "550px",
          height: "400px",
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
            <Box
              width={"100%"}
              display={"flex"}
              flexDirection={"column"}
              gap={"5px"}
            >
              <FieldName>Username</FieldName>
              <OutlinedTextField
                fullWidth
                placeholder="Enter your username"
                name="username"
                onChange={handleChange}
              />
            </Box>
            <Box
              width={"100%"}
              display={"flex"}
              flexDirection={"column"}
              gap={"5px"}
            >
              <FieldName>Password</FieldName>
              <OutlinedPasswordField
                fullWidth
                placeholder="Enter password"
                name="password"
                onChange={handleChange}
              />
            </Box>
          </Box>
        </Box>
        <ContainedButton onClick={handleSubmit} fullWidth>
          {loading ? <CircularProgress sx={{color:"white"}} size="24px"  /> : "Log In"}
        </ContainedButton>
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
