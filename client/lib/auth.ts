import Router from 'next/router';
import axios from 'axios';
import { getCookie } from '../lib/cookieStorage';
import cookie from 'js-cookie';

export const baseURL = 'http://localhost:3002';

export const LoginUser = async (email: string, password: string) => {
  const response = await axios.post(`${baseURL}/login`, {
    data: { email, password }
  });

  return response;
};

export const RegisterUser = async (
  email: string,
  name: string,
  password: string
) => {
  const response = await axios.post(`${baseURL}/register`, {
    data: { email, password, name }
  });

  return response;
};

export const auth = (ctx: any, verifyAdmin: boolean = false) => {
  const token = getCookie('token', ctx);
  const isAdmin = getCookie('isAdmin', ctx);

  if (verifyAdmin && isAdmin === 'false') {
    Router.push('/login');
    return;
  }

  if (ctx.req && !token) {
    ctx.res.writeHead(302, { Location: '/login' });
    ctx.res.end();
    return;
  }

  if (!token) {
    Router.push('/login');
  }

  return token;
};

export const isAdmin = () => {
  if (typeof window !== 'undefined') {
    return cookie.get('superstar_isAdmin') == 'true';
  }
};

export const isLoggedIn = () => {
  if (typeof window !== 'undefined') {
    return cookie.get('superstar_name');
  }
};
