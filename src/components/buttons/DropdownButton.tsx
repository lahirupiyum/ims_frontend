import { Box, Fade, Menu, MenuItem } from "@mui/material";
import { MouseEvent, useEffect, useState } from "react";
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
  isOpen: boolean;
  setIsOpen: (open:boolean) => void
}

const DropdownButton: React.FC<DropDownButton> = ({
  name,
  elements,
  isOpen,
  setIsOpen
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setIsOpen(true);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (!isOpen) handleClose();
  }, [isOpen]);

  return (
    <Box>
      <ContainedButton
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleOpen}
        sx={{
          border: "1px solid white",
          textTransform: "capitalize",
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
        {elements.map((element, index) => (
          <MenuItem
            key={index}
            onClick={element.onClick}
            sx={{ fontSize: fontSizes.xs }}
          >
            {element.label}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default DropdownButton;
