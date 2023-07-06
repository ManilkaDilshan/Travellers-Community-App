// color design tokens export
export const colorTokens = {
    grey: {
        0: "#FFFFFF",
        10: "#F6F6F6",
        50: "#F0F0F0",
        100: "#E0E0E0",
        200: "#C2C2C2",
        300: "#A3A3A3",
        400: "#858585",
        500: "#666666",
        600: "#4D4D4D",
        700: "#333333",
        800: "#1A1A1A",
        900: "#0A0A0A",
        1000: "#000000",
    },
    primary: {
        50: "#ecf8f7",
        100: "#c7eae7",
        200: "#a2ddd7",
        300: "#7dcfc8",
        400: "#57c1b8",
        500: "#3ea89e",
        600: "#30827b",
        700: "#225d58",
        800: "#153835",
        900: "#071312",
    },
    warning: {
        50: "#fff9e8",
        100: "#ffecb9",
        200: "#ffe08b",
        300: "#ffd45d",
        400: "#ffc72e",
        500: "#ffbb00",
        600: "#d19900",
        700: "#a27700",
        800: "#745500",
        900: "#463300",
    },
    success: {
        50: "#e8ffeb",
        100: "#b9ffc2",
        200: "#8bff99",
        300: "#5dff70",
        400: "#2eff47",
        500: "#00ff1e",
        600: "#00d119",
        700: "#00a213",
        800: "#00740e",
        900: "#004608",
    },
    danger: {
        50: "#ffe8e8",
        100: "#ffb9b9",
        200: "#ff8b8b",
        300: "#ff5d5d",
        400: "#ff2e2e",
        500: "#ff0000",
        600: "#d10000",
        700: "#a20000",
        800: "#740000",
        900: "#460000",
    },
};

// mui theme settings
export const themeSettings = (mode) => {
    return {
        palette: {
            mode: mode,
            ...(mode === "dark"
                ? {
                    // palette values for dark mode
                    primary: {
                        dark: colorTokens.primary[200],
                        main: colorTokens.primary[500],
                        light: colorTokens.primary[800],
                    },
                    warning: {
                        dark: colorTokens.warning[200],
                        main: colorTokens.warning[500],
                        light: colorTokens.warning[800],
                    },
                    success: {
                        dark: colorTokens.success[200],
                        main: colorTokens.success[500],
                        light: colorTokens.success[800],
                    },
                    danger: {
                        dark: colorTokens.danger[200],
                        main: colorTokens.danger[500],
                        light: colorTokens.danger[800],
                    },
                    neutral: {
                        dark: colorTokens.grey[100],
                        main: colorTokens.grey[200],
                        mediumMain: colorTokens.grey[300],
                        medium: colorTokens.grey[400],
                        light: colorTokens.grey[700],
                    },
                    background: {
                        default: colorTokens.grey[900],
                        alt: colorTokens.grey[800],
                    },
                }
                : {
                    // palette values for light mode
                    primary: {
                        dark: colorTokens.primary[700],
                        main: colorTokens.primary[500],
                        light: colorTokens.primary[50],
                    },
                    warning: {
                        dark: colorTokens.warning[700],
                        main: colorTokens.warning[500],
                        light: colorTokens.warning[50],
                    },
                    success: {
                        dark: colorTokens.success[700],
                        main: colorTokens.success[500],
                        light: colorTokens.success[50],
                    },
                    danger: {
                        dark: colorTokens.danger[700],
                        main: colorTokens.danger[500],
                        light: colorTokens.danger[50],
                    },
                    neutral: {
                        dark: colorTokens.grey[700],
                        main: colorTokens.grey[500],
                        mediumMain: colorTokens.grey[400],
                        medium: colorTokens.grey[300],
                        light: colorTokens.grey[50],
                    },
                    background: {
                        default: colorTokens.grey[10],
                        alt: colorTokens.grey[0],
                    },
                }),
        },
        typography: {
            fontFamily: ["Rubik", "sans-serif"].join(","),
            fontSize: 12,
            h1: {
                fontFamily: ["Rubik", "sans-serif"].join(","),
                fontSize: 40,
            },
            h2: {
                fontFamily: ["Rubik", "sans-serif"].join(","),
                fontSize: 32,
            },
            h3: {
                fontFamily: ["Rubik", "sans-serif"].join(","),
                fontSize: 24,
            },
            h4: {
                fontFamily: ["Rubik", "sans-serif"].join(","),
                fontSize: 20,
            },
            h5: {
                fontFamily: ["Rubik", "sans-serif"].join(","),
                fontSize: 16,
            },
            h6: {
                fontFamily: ["Rubik", "sans-serif"].join(","),
                fontSize: 14,
            },
        },
    };
};
