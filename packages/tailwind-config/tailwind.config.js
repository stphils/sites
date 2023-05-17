const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    // app content
    `src/**/*.{js,ts,jsx,tsx}`,
    // include packages if not transpiling
    // "../../packages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["var(--font-linotte)", ...defaultTheme.fontFamily.sans],
    },
    colors: {
      pink: {
        500: "#943294",
        400: "#943294",
        300: "#C054C0",
        200: "#D977D9",
        100: "#D98DD9",
        75: "#F2B6F2",
        50: "#FFE6FF",
      },
      purple: {
        500: "#403294",
        400: "#5243AA",
        300: "#6554C0",
        200: "#8777D9",
        100: "#998DD9",
        75: "#C0B6F2",
        50: "#EAE6FF",
      },
      blue: {
        500: "#1B3D6B",
        400: "#3365AA",
        300: "#517FC0",
        200: "#77A0D9",
        100: "#8DADD9",
        75: "#B6CFF2",
        50: "#E6F0FF",
      },
      teal: {
        500: "#006475",
        400: "#007E94",
        300: "#00B8D9",
        200: "#00C7E6",
        100: "#79E2F2",
        75: "#B3F5FF",
        50: "#E6FCFF",
      },
      aqua: {
        500: "#00645F",
        400: "#00857C",
        300: "#0FD5BF",
        200: "#5BE3D1",
        100: "#79F2E4",
        75: "#ABF5EC",
        50: "#E3FCF9",
      },
      green: {
        500: "#006644",
        400: "#00875A",
        300: "#36B37E",
        200: "#57D9A3",
        100: "#79F2C0",
        75: "#ABF5D1",
        50: "#E3FCEF",
      },
      yellow: {
        500: "#B23900",
        400: "#C75300",
        300: "#FFAB00",
        200: "#FFC400",
        100: "#FFE380",
        75: "#FFF0B3",
        50: "#FFFAE6",
      },
      red: {
        500: "#BF2600",
        400: "#DE350B",
        300: "#FF5630",
        200: "#FF7452",
        100: "#FF8F73",
        75: "#FFBDAD",
        50: "#FFEBE6",
      },
      grey: {
        500: "#172B4D",
        400: "#42526E",
        300: "#7A869A",
        200: "#B3BAC5",
        100: "#DFE1E6",
        75: "#F4F5F7",
        0: "#FFFFFF",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
