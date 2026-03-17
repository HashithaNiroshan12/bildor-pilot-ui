import { Chips as PrimeChips, type ChipsProps as PrimeChipsProps } from "primereact/chips";

export type ChipsProps = PrimeChipsProps;

const CHIPS_RADIUS = 12;
const CHIP_RADIUS = 8;
const MIN_HEIGHT = 44;
const FONT_SIZE = 14;

export function Chips(props: ChipsProps) {
  const { className, style, pt, ...rest } = props;
  return (
    <PrimeChips
      {...rest}
      style={{ minHeight: MIN_HEIGHT, borderRadius: CHIPS_RADIUS, fontSize: FONT_SIZE, ...style }}
      pt={{
        label: { style: { borderRadius: CHIP_RADIUS } },
        ...pt,
      }}
      className={`my-ui-chips ${className ?? ""}`.trim() || undefined}
    />
  );
}
