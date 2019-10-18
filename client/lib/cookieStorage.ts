import cookie from 'js-cookie';
import nextCookie from 'next-cookies';

export const saveCookie = (detail: { [keys: string]: string }) => {
  if (typeof window !== 'undefined') {
    for (let keys in detail) {
      cookie.set(`superstar_${keys}`, detail[keys], {
        expires: 1
      });
    }
  }
};

export const removeCookie = () => {
  if (typeof window !== 'undefined') {
    cookie.remove('superstar_name');
    cookie.remove('superstar_isAdmin');
  }
};

export const getCookie = (prop: string, ctx: any) => {
  if (typeof window !== 'undefined') {
    console.log('THIS CONTEXT', ctx);
    console.log('THIS CONTEXT SHOW', nextCookie(ctx)[`superstar_${prop}`]);
    return nextCookie(ctx)[`superstar_${prop}`];
  }
};
