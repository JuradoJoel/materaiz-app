/**
 * Every path that is used in the application must be added here. This way, if a path changes, it will be changed in one place only.
 */
export const PATHS = {
  path: '',
  'successfully-reset-password': {
    root: '/successfully-reset-password',
  },
  home: {
    root: '/home',
  },
  exploreProducts: {
    root: '/explore-products',
    byCategory: (id: number | string) => `/explore-products/category/${id}`,
    byProduct: (id: number | string) => `/explore-products/product/${id}`,
  },
  wholesale: {
    root: '/wholesale',
    byCategory: (id: number | string) => `/wholesale/category/${id}`,
    byProduct: (id: number | string) => `/wholesale/product/${id}`,
  },
  customDesigns: {
    root: '/custom-designs',
  },
  cart: {
    root: '/cart',
  },
  auth: {
    root: '/auth',
    login: '/auth/login',
    forgotPassword: '/auth/forgot-password',
    resetPassword: (id: number | string) => `/auth/reset-password/${id}`,
    newPassword: '/auth/new-password',
    verify: '/auth/verify',
    register: '/auth/register',
  },
} as const;

/**
 * Every path that a role can access must be added here. Otherwise, the user will be redirected to the Not allowed page.
 */
export const PATHS_PER_ROLE = [
  {
    role: 'super_admin',
    paths: [],
  },
];