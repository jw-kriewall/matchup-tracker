import { useAppSelector } from "./hooks";

const useUser = () => {
  const user = useAppSelector((state) => state.userReducer.user);
  return user;
};

export default useUser;