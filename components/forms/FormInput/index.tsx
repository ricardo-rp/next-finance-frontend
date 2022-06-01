import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import {
  FieldError,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

import styles from "./styles.module.css";

type FormInputProps<FormData> = {
  error?: FieldError;
  label?: string;
  name: Path<FormData>;
  register: UseFormRegister<FormData>;
  options?: RegisterOptions;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export function FormInput<FormData>({
  error,
  label,
  name,
  register,
  options,
  className,
  ...rest
}: FormInputProps<FormData>) {
  return (
    <div className={`${className} flex flex-col`}>
      <label htmlFor={name}>{label}</label>

      <input id={name} {...rest} {...register(name, options)} />

      <strong className={styles.error}>{error?.message}</strong>
    </div>
  );
}
