import {
  PaletteColor,
  PaletteColorOptions,
  TypeBackground,
  TypeText,
} from "@mui/material";

declare module "@mui/material/styles" {
  interface Palette {
    background: TypeBackground;
    primary: PaletteColor;
    secondary: PaletteColor;
    text: TypeText;
  }

  interface PaletteOptions {
    background?: Partial<TypeBackground>;
    primary?: PaletteColorOptions;
    secondary?: PaletteColorOptions;
    text?: Partial<TypeText>;
  }

  interface Theme {
    palette: Palette;
  }

  interface ThemeOptions {
    palette?: PaletteOptions;
  }
}
