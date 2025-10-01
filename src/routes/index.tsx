import { createHashRouter, Navigate, RouteObject } from 'react-router-dom';
//
// layouts
import CompactLayout from '../layouts/compact';
import DashboardLayout from '../layouts/dashboard';
// config
import { PATH_AFTER_LOGIN } from '../config';

import App from 'src/App';

import { ElementType, lazy, Suspense } from 'react';
import LoadingScreen from 'src/components/loading-screen';
import { LoadingSpinner } from 'src/components/loading-spinner';
import NotAllowedPage from 'src/pages/NotAllowedPage';

/**
 * This will show a full screen spinner while the component is loading.
 * It is meant to we used for pages
 */
const withLoadingScreen = (Component: ElementType) => (props: any) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );

/**
 * This will show a spinner while the component is loading
 * It is meant to we used for components where you do not want to block the whole page
 */
const withLoadingSpinner = (Component: ElementType) => (props: any) =>
  (
    <Suspense fallback={<LoadingSpinner />}>
      <Component {...props} />
    </Suspense>
  );

async function importOrReload(importPromise: Promise<any>) {
  try {
    return await importPromise;
  } catch (e) {
    if (e.message.includes('dynamically imported module')) {
      window.location.reload();
    }
  }
}

const lazyWithReload = (factory: () => Promise<{ default: ElementType }>) =>
  lazy(() => importOrReload(factory()));

const LazyPage404 = withLoadingScreen(lazyWithReload(() => import('../pages/Page404')));

const LazyHomePage = withLoadingSpinner(lazy(() => import('src/features/home/HomePage')));

const LazyCategoryPage = withLoadingSpinner(
  lazy(() => import('src/features/home/FilteredProducts'))
);
const LazyProductDetailpage = withLoadingSpinner(
  lazy(() => import('src/features/product/ProductDetail'))
);
const LazyCartPage = withLoadingSpinner(lazy(() => import('src/features/cart/Cart')));

const LazyWholesalePage = withLoadingSpinner(
  lazy(() => import('src/features/product/WholesaleFilteredProducts'))
);

const ROUTES: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
      {
        path: 'home',
        element: (
          <>
            <DashboardLayout>
              <LazyHomePage />
            </DashboardLayout>
          </>
        ),
      },
      {
        path: 'explore-products',
        element: <DashboardLayout />,
        children: [
          {
            path: 'category/:id',
            element: <LazyCategoryPage />,
          },
          {
            path: 'product/:id',
            element: <LazyProductDetailpage />,
          },
        ],
      },
      {
        path: 'wholesale',
        element: <DashboardLayout />,
        children: [
          {
            path: '',
            element: <LazyWholesalePage />,
          },
          {
            path: 'category/:id',
            element: <LazyWholesalePage />,
          },
          {
            path: 'product/:id',
            element: <LazyProductDetailpage />,
          },
        ],
      },
      {
        path: 'cart',
        element: (
          <DashboardLayout>
            <LazyCartPage />
          </DashboardLayout>
        ),
      },
      {
        element: <CompactLayout />,
        children: [
          { path: '404', element: <LazyPage404 /> },
          { path: 'not-allowed', element: <NotAllowedPage /> },
        ],
      },
      { path: '*', element: <Navigate to="/404" replace /> },
    ],
  },
];

export const router = createHashRouter(ROUTES);
