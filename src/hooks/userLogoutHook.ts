import { useAppSelector } from "./hooks";

const useUserLogout = () => {
  const user = useAppSelector((state) => state.userReducer.logoutTime);
  return user;
};

export default useUserLogout;