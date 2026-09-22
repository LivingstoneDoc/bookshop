import { createBrowserRouter } from "react-router";
import { APP_ROUTES } from "../constants/routes";
import { RootLayout } from "../Layout/RootLayout";
import { BooksPage } from "../pages/BooksPage/BooksPage";
import { lazy, Suspense } from "react";
import { BookDetailsSkeleton } from "../pages/BookDetailsPage/BookDetailsSkeleton";
import { Spinner } from "../components/Spinner";

const BookDetailsPage = lazy(() =>
  import("../pages/BookDetailsPage/BookDetailsPage").then((module) => ({
    default: module.BookDetailsPage,
  })),
);

const CartPage = lazy(() =>
  import("../pages/CartPage/CartPage").then((module) => ({
    default: module.CartPage,
  })),
);

const NotFoundPage = lazy(() =>
  import("../pages/NotFoundPage/NotFoundPage").then((module) => ({
    default: module.NotFoundPage,
  })),
);

export const router = createBrowserRouter([
  {
    path: APP_ROUTES.HOME,
    element: <RootLayout />,
    children: [
      { index: true, element: <BooksPage /> },
      {
        path: APP_ROUTES.BOOK,
        element: (
          <Suspense fallback={<BookDetailsSkeleton />}>
            <BookDetailsPage />
          </Suspense>
        ),
      },
      {
        path: APP_ROUTES.CART,
        element: (
          <Suspense fallback={<Spinner />}>
            <CartPage />
          </Suspense>
        ),
      },
      {
        path: APP_ROUTES.NOT_FOUND,
        element: (
          <Suspense fallback={<Spinner />}>
            <NotFoundPage />
          </Suspense>
        ),
      },
    ],
  },
]);
