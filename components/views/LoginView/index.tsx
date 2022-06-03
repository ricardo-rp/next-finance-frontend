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
  });

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    console.log("login!");
  };

  return (
    <main className="container">
      <article>
        <form onSubmit={handleSubmit(onSubmit)}>
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
            helperText="Digite sua senha"
          />

          <button type="submit" disabled={!isValid}>
            logar
          </button>
        </form>
      </article>
    </main>
  );
}
