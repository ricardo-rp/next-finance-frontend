import { useQuery } from "react-query";
import { getUserId } from "../../../utils/getUserId";
import { axiosInstance } from "../axios";

type LoginData = { nickname: string };

const getUser = async (userId: string) => {
  const { data } = await axiosInstance.get<LoginData>(`users/${userId}`);

  return data;
};

const useUserData = () => {
  const userId = getUserId();

  // A propriedade `enabled` garante que a query nao sera chamada com userId === null
  return useQuery<LoginData>(`users`, () => getUser(userId as string), {
    enabled: userId !== null,
    refetchOnMount: false,
  });
};

export { useUserData, getUser };
