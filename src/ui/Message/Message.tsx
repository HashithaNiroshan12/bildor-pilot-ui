import { Message as PrimeMessage, type MessageProps as PrimeMessageProps } from "primereact/message";

export type MessageProps = PrimeMessageProps;

const MESSAGE_RADIUS = 10;
const MESSAGE_PADDING = "0.75rem 1rem";
const MESSAGE_FONT_SIZE = 14;

export function Message(props: MessageProps) {
  const { className, style, ...rest } = props;
  return (
    <PrimeMessage
      {...rest}
      style={{ borderRadius: MESSAGE_RADIUS, padding: MESSAGE_PADDING, fontSize: MESSAGE_FONT_SIZE, ...style }}
      className={`my-ui-message ${className ?? ""}`.trim() || undefined}
    />
  );
}
