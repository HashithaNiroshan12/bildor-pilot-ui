import { RadioButton as PrimeRadioButton, type RadioButtonProps as PrimeRadioButtonProps } from "primereact/radiobutton";

export type RadioButtonProps = PrimeRadioButtonProps;

const BOX_SIZE = 22;

export function RadioButton(props: RadioButtonProps) {
  const { className, ...rest } = props;
  return (
    <PrimeRadioButton
      {...rest}
      pt={{ input: { style: { width: BOX_SIZE, height: BOX_SIZE } } }}
      className={`my-ui-radiobutton ${className ?? ""}`.trim() || undefined}
    />
  );
}
