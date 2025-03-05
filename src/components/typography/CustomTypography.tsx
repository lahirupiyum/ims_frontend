import { Typography, TypographyProps } from "@mui/material";
import { forwardRef } from "react";
import lightTheme from "../../assets/theme/light";

export enum fontWeights {
  xs = "200",
  sm = "300",
  md = "400",
  lg = "500",
  xl = "600",
  xxl = "800",
}

export enum fontSizes {
  xs = "12px",
  sm = "14px",
  md = "16px",
  lg = "20px",
  xl = "24px",
}

export enum fontColors {
  primary,
  secondary,
}

type MUITypographyProps = {
  fontWeight?: fontWeights;
  fontSize?: fontSizes | string;
  fontColor?: fontColors | string;
  children?: React.ReactNode;
} & TypographyProps

const CustomTypography = forwardRef<HTMLDivElement, MUITypographyProps>(
  ({ fontWeight, fontSize, fontColor, children, ...rest }, ref) => {
    const colorThemes = lightTheme.palette.text;
    
    const getTextColor: () => string = () => {
      switch (fontColor) {
        case fontColors.primary:
          return colorThemes.primary;
        case fontColors.secondary:
          return colorThemes.secondary
        default:
          return "#000"
      }
    }

    return (
      <Typography
        fontFamily={"Poppins, sans-serif"}
        fontSize={fontSize}
        fontWeight={fontWeight}
        color={getTextColor()}
        ref={ref}
        {...rest}
      >
        {children}
      </Typography>
    );
  }
);

export default CustomTypography;
