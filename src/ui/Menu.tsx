import { forwardRef } from "react";
import { Menu as PrimeMenu, type MenuProps as PrimeMenuProps } from "primereact/menu";

export type MenuProps = PrimeMenuProps;

const MENU_RADIUS = 12;
const ITEM_PADDING = "0.6rem 1rem";
const ITEM_FONT_SIZE = 14;

export const Menu = forwardRef<PrimeMenu, MenuProps>(function Menu(props, ref) {
  const { className, pt, ...rest } = props;
  return (
    <PrimeMenu
      ref={ref}
      {...rest}
      pt={{
        root: { style: { borderRadius: MENU_RADIUS } },
        menu: { style: { borderRadius: MENU_RADIUS, padding: "0.25rem" } },
        menuitem: { style: { padding: ITEM_PADDING, fontSize: ITEM_FONT_SIZE } },
        ...pt,
      }}
      className={`my-ui-menu ${className ?? ""}`.trim() || undefined}
    />
  );
});
