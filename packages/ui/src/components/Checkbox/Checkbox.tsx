import { Checkbox as PrimeCheckbox, type CheckboxProps as PrimeCheckboxProps } from "primereact/checkbox";

export type CheckboxProps = PrimeCheckboxProps;

const BOX_SIZE = 22;
const BOX_RADIUS = 6;

export function Checkbox(props: CheckboxProps) {
  const { className, ...rest } = props;
  return (
    <PrimeCheckbox
      {...rest}
      pt={{ input: { style: { width: BOX_SIZE, height: BOX_SIZE, borderRadius: BOX_RADIUS } } }}
      className={`my-ui-checkbox ${className ?? ""}`.trim() || undefined}
    />
  );
}
