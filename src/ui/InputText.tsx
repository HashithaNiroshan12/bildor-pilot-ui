import { InputText as PrimeInputText, type InputTextProps as PrimeInputTextProps } from "primereact/inputtext";

export type InputTextProps = PrimeInputTextProps;

const INPUT_HEIGHT = 44;
const INPUT_RADIUS = 12;
const INPUT_FONT_SIZE = 15;

export function InputText(props: InputTextProps) {
  const { className, style, ...rest } = props;
  return (
    <PrimeInputText
      {...rest}
      style={{ height: INPUT_HEIGHT, borderRadius: INPUT_RADIUS, fontSize: INPUT_FONT_SIZE, ...style }}
      className={`my-ui-input ${className ?? ""}`.trim() || undefined}
    />
  );
}
