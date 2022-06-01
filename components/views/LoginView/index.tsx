import { useForm, SubmitHandler } from "react-hook-form";
import { FormInput } from "../../forms/FormInput";
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

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    console.log("login!");
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

      <button type="submit" disabled={!isValid} className="border-2">
        logar
      </button>
    </form>
  );
}
