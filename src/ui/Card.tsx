import { Card as PrimeCard, type CardProps as PrimeCardProps } from "primereact/card";

export type CardProps = PrimeCardProps;

const CARD_RADIUS = 16;
const CARD_PADDING = "1.25rem";
const TITLE_FONT_SIZE = 1.25;

export function Card(props: CardProps) {
  const { className, style, ...rest } = props;
  return (
    <PrimeCard
      {...rest}
      style={{ borderRadius: CARD_RADIUS, padding: CARD_PADDING, ...style }}
      pt={{
        title: { style: { fontSize: `${TITLE_FONT_SIZE}rem` } },
        body: { style: { padding: CARD_PADDING } },
      }}
      className={`my-ui-card ${className ?? ""}`.trim() || undefined}
    />
  );
}
