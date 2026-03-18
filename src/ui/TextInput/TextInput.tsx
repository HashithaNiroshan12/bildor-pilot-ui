import { forwardRef, useId } from "react";
import { InputText as PrimeInputText, type InputTextProps as PrimeInputTextProps } from "primereact/inputtext";

export type TextInputProps = Omit<PrimeInputTextProps, "id"> & {
  label?: string;
  helperText?: string;
  error?: string;
  required?: boolean;
  id?: string;
};

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(function TextInput(props, ref) {
  const { label, helperText, error, required, id: idProp, className, style, ...rest } = props;
  const autoId = useId();
  const id = idProp ?? autoId;
  const hasError = Boolean(error);
  const footerText = error ?? helperText;

  return (
    <div className={`my-ui-field ${hasError ? "my-ui-field--error" : ""}`.trim()}>
      {label && (
        <label htmlFor={id} className="my-ui-field__label">
          {label}
          {required && <span className="my-ui-field__required" aria-hidden="true"> *</span>}
        </label>
      )}
      <PrimeInputText
        ref={ref}
        id={id}
        aria-invalid={hasError || undefined}
        aria-describedby={footerText ? `${id}-helper` : undefined}
        {...rest}
        className={`my-ui-input ${hasError ? "my-ui-input--error" : ""} ${className ?? ""}`.trim()}
        style={style}
      />
      {footerText && (
        <span id={`${id}-helper`} className={`my-ui-field__helper ${hasError ? "my-ui-field__helper--error" : ""}`.trim()}>
          {footerText}
        </span>
      )}
    </div>
  );
});
