import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import { FormInput } from "../../forms/FormInput";
import { useLogin } from "../../../lib/services/api/mutations/useLogin";
import { LoginFormData, loginFormResolver } from "./validation";

export function LoginView() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    resolver: loginFormResolver,
    mode: "onChange",
    delayError: 1000,
  });

  const { mutate, isLoading: loginLoading } = useLogin();

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    try {
      mutate(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <header>Faça login:</header>

      <FormInput
        name="username"
        label="E-mail"
        placeholder="E-mail"
        register={register}
        error={errors.username}
      />

      <FormInput
        name="password"
        label="Senha"
        placeholder="******"
        register={register}
        error={errors.password}
      />

      <button
        type="submit"
        disabled={!isValid || loginLoading}
        className="border-2"
      >
        logar
      </button>
    </form>
  );
}
