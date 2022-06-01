import Router from "next/router";
import { ExampleLayout } from "../components/layouts/ExampleLayout";
import { useLogin } from "../lib/services/api/mutations/useLogin";
import { NextPageWithLayout } from "../lib/services/types/layouts";

const Root: NextPageWithLayout = () => {
  const {
    mutate: login,
    data: loginData,
    isLoading: loginLoading,
  } = useLogin();

  return (
    <>
      <button
        onClick={() => {
          login({
            username: "evo2@gmail.com",
            password: "alterar123",
          });
        }}
        onMouseEnter={() => {
          Router.prefetch("home");
        }}
      >
        {loginLoading ? "loading" : "Login"}
      </button>
    </>
  );
};

Root.layout = ExampleLayout;

export default Root;
