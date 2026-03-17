import { MultiSelect as PrimeMultiSelect, type MultiSelectProps as PrimeMultiSelectProps } from "primereact/multiselect";

export type MultiSelectProps = PrimeMultiSelectProps;

const INPUT_MIN_HEIGHT = 44;
const INPUT_RADIUS = 12;
const MIN_WIDTH = 220;

export function MultiSelect(props: MultiSelectProps) {
  const { className, style, ...rest } = props;
  return (
    <PrimeMultiSelect
      {...rest}
      style={{ minHeight: INPUT_MIN_HEIGHT, borderRadius: INPUT_RADIUS, minWidth: MIN_WIDTH, ...style }}
      className={`my-ui-multiselect ${className ?? ""}`.trim() || undefined}
    />
  );
}
