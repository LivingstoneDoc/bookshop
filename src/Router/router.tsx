import { createBrowserRouter } from "react-router";
import { APP_ROUTES } from "../constants/routes";
import { RootLayout } from "../Layout/RootLayout";
import { BooksPage } from "../pages/BooksPage/BooksPage";
import { CardPage } from "../pages/CardPage/CardPage";
import { NotFoundPage } from "../pages/NotFoundPage/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: APP_ROUTES.HOME,
    element: <RootLayout />,
    children: [
      { index: true, element: <BooksPage /> },
      { path: APP_ROUTES.CART, element: <CardPage /> },
      { path: APP_ROUTES.NOT_FOUND, element: <NotFoundPage /> },
    ],
  },
]);
