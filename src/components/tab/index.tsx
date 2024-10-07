import { Box } from "@mui/material";
import ContainedButton from "../buttons/ContainedButton";
import { fontSizes } from "../typography/CustomTypography";
import { useLocation, useNavigate } from "react-router-dom";

export interface TabElement {
  label: string;
  contextPath: string;
}

const TabContainer: React.FC<{ elements: TabElement[] }> = ({ elements }) => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 0,
        justifyContent: "start",
        borderRadius: "20px",
      }}
    >
     {elements.map((element, index) => <TabButton key={index} element={element} />)}
    </Box>
  );
};

const TabButton: React.FC<{ element: TabElement }> = ({ element }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isSelected = pathname === element.contextPath;

  return (
    <ContainedButton
      sx={{
        bgcolor: isSelected? "black" : "white",
        color: isSelected? "white" : "black",
        borderRadius:"0",
        fontSize: fontSizes.xs,
        ":hover": {
          bgcolor: isSelected? "" :"lightblue",
        },
        transition:"all 0.2s"
      }}
      onClick={()=> navigate(element.contextPath)}
    >
      {element.label}
    </ContainedButton>
  );
};

export default TabContainer;
