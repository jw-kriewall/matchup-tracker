export const loginAction = (user) => {
    return {
      type: 'LOGIN',
      payload: user,
    };
  };
  
  export const logoutAction = () => {
    return {
      type: 'LOGOUT',
    };
  };
  