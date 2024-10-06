import { Box } from "@mui/material";
import ElementBoxImage from "../../assets/images/elementbox-image.jpeg";
import TataCommunicationFlatImage from "../../assets/images/tata-communications-flat.png";
import CustomTypography, {
  fontWeights,
} from "../../components/typography/CustomTypography";

const Home = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        backgroundColor: "rgba(255,255,255,0.9)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "110px",
      }}
    >
      <img src={TataCommunicationFlatImage} width="862px" />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "72px",
        }}
      >
        <ElementBox name="Customer Management" onClick={() => {}} />
        <ElementBox name="Inventory Management" onClick={() => {}} />
      </Box>
    </div>
  );
};

const ElementBox: React.FC<{ name: string; onClick: () => void }> = ({
  name,
  onClick,
}) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        width: "456px",
        height: "300px",
        borderRadius: "20px",
        padding: "32px",
        backgroundImage: `linear-gradient(rgba(0, 48, 131, 0.8), rgba(0, 48, 131, 0.8)), url(${ElementBoxImage})`,
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        
        ":hover": {
          backgroundImage: `linear-gradient(rgba(0, 32, 96, 0.8), rgba(0, 32, 96, 0.8)), url(${ElementBoxImage})`,
        },
      }}
    >
      <CustomTypography
        fontWeight={fontWeights.lg}
        fontSize={"48px"}
        fontColor="primary"
        sx={{ color: "white" }}
      >
        {name}
      </CustomTypography>
    </Box>
  );
};

export default Home;