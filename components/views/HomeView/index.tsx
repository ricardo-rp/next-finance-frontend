import { useUserData } from "../../../lib/services/api/queries/useUserData";

export function HomeView() {
  const { data, isLoading, isError } = useUserData();

  if (isLoading) return <div>carregando...</div>;
  if (isError) return <strong>deu ruim</strong>;
  if (!data) return <div>nao encontramos dados</div>;

  return <div>{data.nickname}</div>;
}
