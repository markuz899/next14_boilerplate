import { ITheme } from "./interface";
import defaultTheme from "./tenant/default";

let palette;
try {
  palette = require(`./tenant/${process.env.NEXT_PUBLIC_TENANT}`);
} catch (error) {
  console.error(`Theme not found: ${process.env.NEXT_PUBLIC_TENANT}`);
}

const theme: ITheme = {
  ...defaultTheme,
  ...palette,
};

export const availableSize: string[] = ["xs", "sm", "md", "lg", "xl"];

export const BASE_COLOR = {
  primary: theme.colors.primary,
  info: theme.colors.primary,
  success: theme.colors.success,
  warning: theme.colors.warning,
  error: theme.colors.error,
  ghost: theme.colors.dark,
};

export default theme;
