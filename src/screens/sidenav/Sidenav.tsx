import { Box } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import lightTheme from "../../assets/theme/light";
import CustomTypography, {
  fontSizes,
  fontWeights,
} from "../../components/typography/CustomTypography";
import { useAppSelector } from "../../redux/hooks";

const Sidenav = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

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

    const isSelected = (contextPath: string) => {
      const contextPathLength = contextPath.length;
      return pathname.substring(0, contextPathLength) === contextPath;
    };

    return (
      <div
        style={{
          height: "100vh",
          width: "250px",
          position: "fixed",
          top: "0",
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
                onClick={() => navigate(element.contextPath)}
                key={index}
                display="flex"
                alignItems="center"
                gap="10px"
                sx={{
                  bgcolor: isSelected(element.contextPath)
                    ? secondaryColor
                    : "white",
                  color: "black",
                  p: "16px 24px",
                  borderRadius: "10px",
                  cursor: "pointer",
                }}
              >
                {isSelected(element.contextPath) ? (
                  <element.icon.selected fontSize={fontSizes.lg} />
                ) : (
                  <element.icon.default fontSize={fontSizes.lg} />
                )}
                <CustomTypography
                  fontSize={fontSizes.sm}
                  fontWeight={
                    isSelected(element.contextPath)
                      ? fontWeights.lg
                      : fontWeights.xs
                  }
                >
                  {element.label}
                </CustomTypography>
              </Box>
            ))}
          </Box>
        </Box>
      </div>
    );
  }
};

export default Sidenav;
