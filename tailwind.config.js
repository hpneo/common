const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{html,js}", "./storybook/**/*.js"],
  theme: {
    extend: {
      colors: {
        accent: colors.slate,
        error: {
          25: "#fffbfa",
          50: "#fef3f2",
          100: "#fee4e2",
          200: "#fecdca",
          300: "#fda29b",
          400: "#f97066",
          500: "#f04438",
          600: "#d92d20",
          700: "#b42318",
          800: "#912018",
          900: "#7a271a",
        },
        warning: {
          25: "#fffcf5",
          50: "#fffaeb",
          100: "#fef0c7",
          200: "#fedf89",
          300: "#fec84b",
          400: "#fdb022",
          500: "#f79009",
          600: "#dc6803",
          700: "#b54708",
          800: "#93370d",
          900: "#7a2e0e",
        },
        success: {
          25: "#f6fef9",
          50: "#ecfdf3",
          100: "#d1fadf",
          200: "#a6f4c5",
          300: "#6ce9a6",
          400: "#32d583",
          500: "#12b76a",
          600: "#039855",
          700: "#027a48",
          800: "#05603a",
          900: "#054f31",
        },
      },
      fontFamily: {
        inherit: "inherit",
        mono: [
          "Roboto Mono",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          '"Liberation Mono"',
          '"Courier New"',
          "monospace",
        ],
      },
      fontSize: {
        "display-2xl": ["4.5rem", "1.25"],
        "display-xl": ["3.75rem", "1.2"],
        "display-lg": ["3rem", "1.25"],
        "display-md": ["2.25rem", "1.22"],
        "display-sm": ["1.875rem", "1.27"],
        "display-xs": ["1.5rem", "1.33"],
      },
      spacing: {
        3.5: "0.875rem",
        4.5: "1.125rem",
        10.5: "2.625rem",
        62: "15.5rem",
        100: "25rem",
        116: "29rem",
        160: "40rem",
      },
      minHeight: {
        116: "29rem",
      },
      boxShadow: {
        xs: "0px 1px 2px rgba(16, 24, 40, 0.05);",
      },
      backdropBlur: {
        xs: "2px",
      },
      typography: {
        DEFAULT: {
          css: {
            "code::before": {
              content: "",
            },
            "code::after": {
              content: "",
            },
          },
        },
      },
    },
  },
  variants: {},
  plugins: [],
};
