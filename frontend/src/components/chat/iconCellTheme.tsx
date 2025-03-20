import { ThemeProvider, createTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import MdPhone from "@mui/icons-material/Phone";
import Chip from "@mui/material/Chip";

const theme = createTheme({
  components: {
    MuiIcon: {
      styleOverrides: {
        root: {
          // Match 24px = 3 * 2 + 1.125 * 16
          boxSizing: "content-box",
          padding: 2,
          fontSize: "1.125rem",
        },
      },
    },
  },
});

export default function IconCall() {
  return (
    <Stack direction="row" spacing={2}>
      <ThemeProvider theme={theme}>
        <Chip icon={<MdPhone />} label="" />
      </ThemeProvider>
    </Stack>
  );
}
