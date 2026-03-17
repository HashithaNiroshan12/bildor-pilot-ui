import { forwardRef } from "react";
import { Toast as PrimeToast, type ToastProps as PrimeToastProps } from "primereact/toast";

export type ToastProps = PrimeToastProps;

const TOAST_RADIUS = 12;
const TOAST_FONT_SIZE = 14;
const TOAST_PADDING = "1rem 1.25rem";

export const Toast = forwardRef<PrimeToast, ToastProps>(function Toast(props, ref) {
  const { className, pt, ...rest } = props;
  return (
    <PrimeToast
      ref={ref}
      {...rest}
      pt={{
        message: { style: { borderRadius: TOAST_RADIUS, fontSize: TOAST_FONT_SIZE, padding: TOAST_PADDING } },
        ...pt,
      }}
      className={`my-ui-toast ${className ?? ""}`.trim() || undefined}
    />
  );
});
