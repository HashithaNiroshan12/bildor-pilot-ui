import { Dropdown as PrimeDropdown, type DropdownProps as PrimeDropdownProps } from "primereact/dropdown";

export type DropdownProps = PrimeDropdownProps;

const INPUT_HEIGHT = 44;
const INPUT_RADIUS = 12;
const MIN_WIDTH = 220;

export function Dropdown(props: DropdownProps) {
  const { className, style, ...rest } = props;
  return (
    <PrimeDropdown
      {...rest}
      style={{ minHeight: INPUT_HEIGHT, borderRadius: INPUT_RADIUS, minWidth: MIN_WIDTH, ...style }}
      className={`my-ui-dropdown ${className ?? ""}`.trim() || undefined}
    />
  );
}
