import { Box, Fade, Menu, MenuItem } from "@mui/material";
import { MouseEvent, useState } from "react";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { fontSizes } from "../typography/CustomTypography";
import ContainedButton from "./ContainedButton";

export interface MenuElement {
  label: string;
  onClick: () => void;
}

interface DropDownButton {
  name: string;
  elements: MenuElement[];
}

const DropdownButton: React.FC<DropDownButton> = ({ name, elements }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <ContainedButton
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          border: "1px solid white",
          textTransform:"capitalize",
          bgcolor: "white",
          color: "black",
          fontSize: fontSizes.xs,
          display: "flex",
          gap: "20px",
        }}
      >
        {name} <MdOutlineArrowDropDown fontSize={fontSizes.lg} />
      </ContainedButton>
      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        {elements.map((element) => (
          <MenuItem onClick={element.onClick} sx={{ fontSize: fontSizes.xs }}>
            {element.label}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default DropdownButton;
