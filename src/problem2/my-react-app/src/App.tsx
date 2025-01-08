import { Box } from "@mui/material";
import TokenCurrencySwapForm from "./components/TokenCurrencySwapForm";

function App() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <TokenCurrencySwapForm />
    </Box>
  );
}

export default App;
