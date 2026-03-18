import { Button as PrimeButton, type ButtonProps as PrimeButtonProps } from "primereact/button";

// The 3 visual styles a button can have
export type ButtonVariant = "solid" | "outlined" | "ghost";

// Our Button accepts all PrimeReact button props, plus a "variant" prop
export type ButtonProps = PrimeButtonProps & {
  variant?: ButtonVariant;
};

export function Button(props: ButtonProps) {
  const { variant = "solid", size = "large", className, ...rest } = props;

  // PrimeReact uses "outlined" and "text" booleans to control style.
  // We map our simple "variant" to those booleans here.
  const outlined = variant === "outlined";
  const text     = variant === "ghost";

  return (
    <PrimeButton
      {...rest}
      outlined={outlined}
      text={text}
      size={size}
      className={`my-ui-button my-ui-button--${variant} ${className ?? ""}`.trim()}
    />
  );
}
