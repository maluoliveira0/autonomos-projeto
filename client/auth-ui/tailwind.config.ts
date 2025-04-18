import defaultTheme from 'tailwindcss/defaultTheme';
import colors from 'tailwindcss/colors';

export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          pink: colors.pink,
          indigo: colors.indigo,
          purple: colors.purple,
        },
      },
    plugins: [],
};