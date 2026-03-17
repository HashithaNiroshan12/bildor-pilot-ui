import { InputSwitch as PrimeInputSwitch, type InputSwitchProps as PrimeInputSwitchProps } from "primereact/inputswitch";

export type InputSwitchProps = PrimeInputSwitchProps;

const SWITCH_HEIGHT = 24;
const SWITCH_WIDTH = 44;
const SLIDER_RADIUS = 10;

export function InputSwitch(props: InputSwitchProps) {
  const { className, ...rest } = props;
  return (
    <PrimeInputSwitch
      {...rest}
      pt={{
        root: { style: { width: SWITCH_WIDTH, height: SWITCH_HEIGHT } },
        slider: { style: { borderRadius: SLIDER_RADIUS } },
      }}
      className={`my-ui-inputswitch ${className ?? ""}`.trim() || undefined}
    />
  );
}
