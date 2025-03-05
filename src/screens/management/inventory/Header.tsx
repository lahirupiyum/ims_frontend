import {
  Badge,
  Box,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
} from "@mui/material";
import { ChangeEvent, ReactNode, useState } from "react";
import { BiUser } from "react-icons/bi";
import { CiSearch } from "react-icons/ci";
import TataCommunicationFlatImage from "../../../assets/images/tata-communications-flat.png";
import OutlinedTextField from "../../../components/textFields/OutlinedTextField";
import CustomTypography, {
  fontSizes,
} from "../../../components/typography/CustomTypography";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

const Header = () => {
  const profileMenu: MenuItemType[] = [
    {
      label: "Logout",
      onClick: () => {
        localStorage.removeItem("token");
        window.location.href = "/auth/login";
      },
    },
  ];

  const dispatch = useAppDispatch();
  const { searchAction, pageAction } = useAppSelector(state => state.searchParams);

  const handleSearch = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!(searchAction && pageAction)) return;
    const value = e.target.value;

    if (value.length === 0) dispatch(pageAction(0,10))
    else dispatch(searchAction(value));
  }

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
        {searchAction && pageAction && <OutlinedTextField
          placeholder="Search"
          onChange={handleSearch}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <CiSearch fontSize={fontSizes.lg} />
                </InputAdornment>
              ),
            },
          }}
        />}
        <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <HeaderIcon
            key={1}
            icon={<BiUser fontSize={"24px"} />}
            onClick={() => {}}
            isBg={true}
            isBadge={false}
            badgeCount={0}
            menu={profileMenu}
          />
        </Box>
      </Box>
    </Box>
  );
};

type MenuItemType = {
  label: string;
  onClick: () => void;
};

const HeaderIcon: React.FC<{
  key: number;
  icon: ReactNode;
  onClick: () => any;
  isBg: boolean;
  isBadge: boolean;
  badgeCount: number;
  menu?: MenuItemType[];
}> = ({ icon, onClick, isBg, badgeCount, isBadge, menu, key }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <Box>
      <IconButton
        sx={{ bgcolor: isBg ? "#E6E6E6" : "transparent", color: "black" }}
        onClick={(e) => {
          if (menu) {
            handleOpenMenu(e);
          } else onClick();
        }}
        id={`${key}-nav-icon-button`}
        aria-controls={open ? `${key}-nav-icon-menu` : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        {isBadge ? (
          <Badge badgeContent={badgeCount} color="error">
            {icon}
          </Badge>
        ) : (
          icon
        )}
      </IconButton>
      {menu && (
        <Menu
          id={`${key}-nav-icon-menu`}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": `${key}-nav-icon-button`,
          }}
        >
          {menu.map((menuItem) => (
            <MenuItem
              sx={{ px: "30px" }}
              onClick={() => {
                menuItem.onClick();
                handleClose();
              }}
            >
              <CustomTypography fontSize={fontSizes.xs}>
                {menuItem.label}
              </CustomTypography>
            </MenuItem>
          ))}
        </Menu>
      )}
    </Box>
  );
};

export default Header;
