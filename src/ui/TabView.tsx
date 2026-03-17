import { TabView as PrimeTabView, type TabViewProps as PrimeTabViewProps } from "primereact/tabview";

export type TabViewProps = PrimeTabViewProps;

const TAB_RADIUS = 12;
const TAB_FONT_SIZE = 15;
const PANEL_PADDING = "1rem";

export function TabView(props: TabViewProps) {
  const { className, pt, ...rest } = props;
  return (
    <PrimeTabView
      {...rest}
      pt={{
        nav: { style: { borderRadius: TAB_RADIUS } },
        tab: { style: { fontSize: TAB_FONT_SIZE } },
        panelContainer: { style: { padding: PANEL_PADDING } },
        ...pt,
      }}
      className={`my-ui-tabview ${className ?? ""}`.trim() || undefined}
    />
  );
}
