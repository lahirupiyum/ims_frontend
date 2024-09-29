import { useTheme } from "@emotion/react";
import { Box } from "@mui/material";
import CustomTypography, {
  fontSizes,
} from "../../components/typography/CustomTypography";
import { useAppSelector } from "../../redux/hooks";

const Sidenav = () => {
  const theme = useTheme();
  const secondaryColor = theme.palette.secondary.main;
  const sidenavState = useAppSelector((state) => state.sidenav);
  if (!sidenavState) return null;
  else {
    const { title, elements } = sidenavState;
    const finalTitle = title.split(" ").map((part) => (
      <>
        <span>{part}</span>
        <br />
      </>
    ));
    return (
      <div
        style={{
          height: "100vh",
          position: "fixed",
          left: "0",
          backgroundColor: "white",
          padding: "20px 20px",
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
            {elements.map((element) => (
              <Box
                key={element.contextPath}
                display="flex"
                alignItems="center"
                gap="10px"
                sx={{
                  bgcolor: secondaryColor,
                  p: "16px 24px",
                  borderRadius: "10px",
                  cursor:"pointer"
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
