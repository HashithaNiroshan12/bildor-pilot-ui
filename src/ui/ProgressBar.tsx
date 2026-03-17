import { ProgressBar as PrimeProgressBar, type ProgressBarProps as PrimeProgressBarProps } from "primereact/progressbar";

export type ProgressBarProps = PrimeProgressBarProps;

const BAR_HEIGHT = 10;
const BAR_RADIUS = 6;

export function ProgressBar(props: ProgressBarProps) {
  const { className, style, ...rest } = props;
  return (
    <PrimeProgressBar
      {...rest}
      style={{ height: BAR_HEIGHT, borderRadius: BAR_RADIUS, ...style }}
      className={`my-ui-progressbar ${className ?? ""}`.trim() || undefined}
    />
  );
}
