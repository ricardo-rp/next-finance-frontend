import {
  FieldError,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

type FormInputProps<FormData> = {
  error?: FieldError;
  label?: string;
  name: Path<FormData>;
  register: UseFormRegister<FormData>;
  options?: RegisterOptions;
  className?: string;
  placeholder?: string;
  "aria-invalid"?: boolean;
  helperText?: string;
  readOnly?: boolean;
};

export function FormInput<FormData>({
  error,
  label,
  name,
  register,
  options,
  className,
  helperText,
  ...rest
}: FormInputProps<FormData>) {
  return (
    <label className={className} htmlFor={name}>
      {label}

      <input
        id={name}
        {...register(name, options)}
        {...(error?.message && { "aria-invalid": true })}
        {...rest}
      />

      <small>{error?.message ?? helperText}</small>

      <style jsx>{`
        input {
          transition: background 0.2s ease-out, border 0.2s ease-out,
            opacity 0.2s ease-out;
          background-position: center right 0.75rem;
          background-size: 0;
          background-image: var(--icon-chevron-button-inverse);
        }
      `}</style>
    </label>
  );
}
