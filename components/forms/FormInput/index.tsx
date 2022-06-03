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
  disabled?: boolean;
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
          transition: background 0.2s, border 0.2s ease-out,
            opacity 0.2s ease-out;
          background-position: center right 0.75rem;
          background-size: 0;
          /** bg-image is needed for aria-invalid icon */
          background-image: var(--icon-chevron-button-inverse);
        }
      `}</style>
    </label>
  );
}
