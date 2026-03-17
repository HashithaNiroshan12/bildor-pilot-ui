import { Button as PrimeButton, type ButtonProps as PrimeButtonProps } from "primereact/button";

export type ButtonProps = PrimeButtonProps;

/** Default size for all buttons from this wrapper. Override with the `size` prop. */
const DEFAULT_SIZE = "large" as const;
/** Default border radius (px) for all buttons. Override with the `style` prop. */
const DEFAULT_RADIUS = 20;

export function Button(props: ButtonProps) {
  const { className, size = DEFAULT_SIZE, style, ...rest } = props;
  return (
    <PrimeButton
      {...rest}
      size={size}
      style={{ borderRadius: DEFAULT_RADIUS, ...style }}
      className={`my-ui-button ${className ?? ""}`.trim() || undefined}
    />
  );
}
