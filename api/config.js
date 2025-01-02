export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
  },
  COURSES: {
    LIST: '/courses',
    ENROLL: '/courses/enroll',
    PROGRESS: '/courses/progress',
  },
  USER: {
    PROFILE: '/user/profile',
    PAYMENTS: '/user/payments',
  },
};