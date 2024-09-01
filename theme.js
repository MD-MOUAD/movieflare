// theme/index.js (or wherever your theme is defined)
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  components: {
    Menu: {
      baseStyle: (props) => ({
        list: {
          bg: props.colorMode === "dark" ? "#27272a" : "white",
          color: props.colorMode === "dark" ? "white" : "black",
          borderColor: props.colorMode === "dark" ? "black" : "gray.200",
        },
        item: {
          bg: props.colorMode === "dark" ? "#27272a" : "white",
          color: props.colorMode === "dark" ? "white" : "black",
          py: 2, 
          _hover: {
            bg: props.colorMode === "dark" ? "#404040" : "#e4e4e7",
          },
        },
      }),
    },
  },
});

export default theme;