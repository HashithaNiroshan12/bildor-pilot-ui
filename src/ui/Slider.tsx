import { Slider as PrimeSlider, type SliderProps as PrimeSliderProps } from "primereact/slider";

export type SliderProps = PrimeSliderProps;

const TRACK_HEIGHT = 8;
const HANDLE_SIZE = 20;
const RAIL_RADIUS = 4;

export function Slider(props: SliderProps) {
  const { className, pt, ...rest } = props;
  return (
    <PrimeSlider
      {...rest}
      pt={{
        range: { style: { height: TRACK_HEIGHT, borderRadius: RAIL_RADIUS } },
        handle: { style: { width: HANDLE_SIZE, height: HANDLE_SIZE } },
        ...pt,
      }}
      className={`my-ui-slider ${className ?? ""}`.trim() || undefined}
    />
  );
}
