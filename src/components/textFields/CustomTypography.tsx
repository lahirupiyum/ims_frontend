import { useTheme } from "@emotion/react";
import { Typography } from "@mui/material";
import { forwardRef } from "react";

export enum fontWeights {
  xs = "200",
  sm = "300",
  md = "400",
  lg = "500",
  xl = "600",
  xxl = "700",
}

export enum fontSizes {
  xs = "12px",
  sm = "14px",
  md = "16px",
  lg = "20px",
  xl = "24px",
}

enum fontColors {
  primary,
  secondary,
}

interface MUITypographyProps {
  fontWeight: fontWeights;
  fontSize: fontSizes;
  fontColor: fontColors;
  children: React.ReactNode;
  [key: string]: any;
}

const CustomTypography = forwardRef<HTMLDivElement, MUITypographyProps>(
  ({ fontWeight, fontSize, fontColor, children, ...rest }, ref) => {
    const theme = useTheme();
    const textColor = theme.palette.text;

    return (
      <Typography
        fontFamily={"Poppins, sans-serif"}
        fontSize={fontSize}
        fontWeight={fontWeight}
        color={textColor[fontColor]}
        ref={ref}
        {...rest}
      >
        {children}
      </Typography>
    );
  }
);

export default CustomTypography;
