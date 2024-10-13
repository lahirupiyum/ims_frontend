import { Badge, Box, IconButton, InputAdornment } from "@mui/material";
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
        <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <HeaderIcon
              icon={<IoChatbubbleEllipsesOutline fontSize={"24px"} />}
              onClick={() => {}}
              isBg={false}
              isBadge={false}
              badgeCount={0}
            />
            <HeaderIcon
              icon={<IoNotificationsOutline fontSize={"24px"} />}
              onClick={() => {}}
              isBg={false}
              isBadge
              badgeCount={5}
            />
          </Box>
          <HeaderIcon
            icon={<BiUser fontSize={"24px"} />}
            onClick={() => {}}
            isBg={true}
            isBadge={false}
            badgeCount={0}
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
  isBadge: boolean;
  badgeCount: number;
}> = ({ icon, onClick, isBg, badgeCount, isBadge }) => {
  return (
    <IconButton
      sx={{ bgcolor: isBg ? "#E6E6E6" : "transparent", color: "black" }}
      onClick={onClick}
    >
      {isBadge ? (
        <Badge badgeContent={badgeCount} color="error">
          {icon}
        </Badge>
      ) : (
        icon
      )}
    </IconButton>
  );
};

export default Header;
