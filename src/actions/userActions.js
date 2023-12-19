export const loginAction = (user) => {
    return {
      type: 'userAuth/login',
      payload: user,
    };
  };
  
  export const logoutAction = () => {
    return {
      // @TODO: logoutAction should be a Thunk so completion can be tracked for page refresh.
      type: 'userAuth/logout'
    };
  };
  