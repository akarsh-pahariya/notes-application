import { createBrowserRouter } from "react-router-dom";
import Login from "./assets/Components/Login";
import Signup from "./assets/Components/Signup";
import Home from "./assets/Components/Home";
import App from "./App";

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/signup",
                element: <Signup />,
            },
        ],
    },
]);

export default appRouter;
