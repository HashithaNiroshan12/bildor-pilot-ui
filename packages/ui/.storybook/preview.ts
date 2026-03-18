import type { Preview } from "@storybook/react-vite";

import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "../src/tokens/tokens.css";
import "../src/tokens/primereact-overrides.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "todo",
    },
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#ffffff" },
        { name: "surface", value: "#f6f7fb" },
        { name: "dark", value: "#0b1220" },
      ],
    },
  },
};

export default preview;
