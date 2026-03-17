import { Calendar as PrimeCalendar, type CalendarProps as PrimeCalendarProps } from "primereact/calendar";

export type CalendarProps = PrimeCalendarProps;

const INPUT_HEIGHT = 44;
const INPUT_RADIUS = 12;
const PANEL_RADIUS = 12;
const FONT_SIZE = 14;

export function Calendar(props: CalendarProps) {
  const { className, style, ...rest } = props;
  return (
    <PrimeCalendar
      {...rest}
      style={{ height: INPUT_HEIGHT, borderRadius: INPUT_RADIUS, fontSize: FONT_SIZE, ...style }}
      panelStyle={{ borderRadius: PANEL_RADIUS, fontSize: FONT_SIZE }}
      className={`my-ui-calendar ${className ?? ""}`.trim() || undefined}
    />
  );
}
