import { Box, IconButton, InputAdornment } from "@mui/material";
import { ReactNode } from "react";
import { BiUser } from "react-icons/bi";
import { CiSearch } from "react-icons/ci";
import {
  IoChatbubbleEllipsesOutline,
  IoNotificationsOutline,
} from "react-icons/io5";
import TataCommunicationFlatImage from "../../../assets/images/tata-communications-flat.png";
import OutlinedTextField from "../../../components/textFields/OutlinedTextField";
import { fontSizes } from "../../../components/typography/CustomTypography";

const Header = () => {
  return (
    <Box
      sx={{
        bgcolor: "white",
        px: "24px",
        py: "16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <img src={TataCommunicationFlatImage} height="24px" />
      <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <OutlinedTextField
          placeholder="Search"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <CiSearch fontSize={fontSizes.lg} />
                </InputAdornment>
              ),
            },
          }}
        />
        <Box sx={{display:"flex", alignItems:"center", gap:"5px"}}>
          <HeaderIcon
            icon={<IoChatbubbleEllipsesOutline fontSize={"24px"} />}
            onClick={() => {}}
            isBg={false}
          />
          <HeaderIcon
            icon={<IoNotificationsOutline fontSize={"24px"} />}
            onClick={() => {}}
            isBg={false}
          />
          <HeaderIcon
            icon={<BiUser fontSize={"24px"} />}
            onClick={() => {}}
            isBg={true}
          />
        </Box>
      </Box>
    </Box>
  );
};

const HeaderIcon: React.FC<{
  icon: ReactNode;
  onClick: () => any;
  isBg: boolean;
}> = ({ icon, onClick, isBg }) => {
  return (
    <IconButton
      sx={{ bgcolor: isBg ? "#E6E6E6" : "transparent", color: "black" }}
      onClick={onClick}
    >
      {icon}
    </IconButton>
  );
};

export default Header;
