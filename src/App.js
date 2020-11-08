import "react-perfect-scrollbar/dist/css/styles.css";
import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store/store";
import { useRoutes } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import GlobalStyles from "./components/GlobalStyles";
import "./mixins/chartjs";
import theme from "./theme";
import routes from "./routes";

const App = () => {
  const routing = useRoutes(routes);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {routing}
      </ThemeProvider>
      <ToastContainer pauseOnFocusLoss={false} />
    </Provider>
  );
};

export default App;
