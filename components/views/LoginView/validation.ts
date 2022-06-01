import { ErrorOption } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

export const incorrectPasswordError: ErrorOption = {
  type: "manual",
  message: `Senha incorreta. Tente novamente ou clique em ”Esqueci minha senha” para redefinir.`,
};

const loginFormSchema = z.object({
  username: z
    .string()
    .nonempty("Digite seu email.")
    .email("Digite um e-mail válido."),
  password: z.string().nonempty(),
});

export const loginFormResolver = zodResolver(loginFormSchema);

export type LoginFormData = Required<z.infer<typeof loginFormSchema>>;
