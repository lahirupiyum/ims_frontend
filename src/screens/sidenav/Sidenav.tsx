import { Box } from "@mui/material";
import lightTheme from "../../assets/theme/light";
import CustomTypography, {
  fontSizes,
} from "../../components/typography/CustomTypography";
import { useAppSelector } from "../../redux/hooks";
import { useLocation, useNavigate } from "react-router-dom";

const Sidenav = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  console.log(location);

  const secondaryColor = lightTheme.palette.secondary.main;
  const sidenavState = useAppSelector((state) => state.sidenav);
  if (!sidenavState) return null;
  else {
    const { title, elements } = sidenavState;
    const finalTitle = title.split(" ").map((part, index) => (
      <span key={index}>
        <span>{part}</span>
        <br />
      </span>
    ));
    return (
      <div
        style={{
          height: "100vh",
          width: "225px",
          position: "fixed",
          top:"0",
          left: "0",
          backgroundColor: "white",
          padding: "32px 16px",
          zIndex: 5,
        }}
      >
        <Box
          textAlign="center"
          display="flex"
          flexDirection="column"
          gap="20px"
        >
          <CustomTypography fontSize={fontSizes.md}>
            {finalTitle}
          </CustomTypography>
          <Box display="flex" flexDirection="column">
            {elements.map((element, index) => (
              <Box
                onClick = {() => navigate(element.contextPath)}
                key={index}
                display="flex"
                alignItems="center"
                gap="10px"
                sx={{
                  bgcolor: pathname === element.contextPath ? secondaryColor : "white" ,
                  p: "16px 24px",
                  borderRadius: "10px",
                  cursor: "pointer",
                }}
              >
                <element.icon.selected fontSize={fontSizes.lg} />
                <CustomTypography>{element.label}</CustomTypography>
              </Box>
            ))}
          </Box>
        </Box>
      </div>
    );
  }
};

export default Sidenav;
