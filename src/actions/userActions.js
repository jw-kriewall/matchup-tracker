export const loginAction = (user) => {
    return {
      type: 'userAuth/login',
      payload: user,
    };
  };
  
  export const logoutAction = () => {
    return {
      type: 'userAuth/logout'
    };
  };
  