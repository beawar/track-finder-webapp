import HomePage from "./pages/HomePage";
import Error404 from "./pages/Error404";

export const routes = [
    {
        path: '/',
        component: HomePage
    },
    {
        path: '*',
        component: Error404
    }
]
