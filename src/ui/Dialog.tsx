import { Dialog as PrimeDialog, type DialogProps as PrimeDialogProps } from "primereact/dialog";

export type DialogProps = PrimeDialogProps;

const DIALOG_RADIUS = 16;
const HEADER_FONT_SIZE = 1.125;

export function Dialog(props: DialogProps) {
  const { className, style, ...rest } = props;
  return (
    <PrimeDialog
      {...rest}
      style={{ borderRadius: DIALOG_RADIUS, ...style }}
      contentStyle={{ borderRadius: DIALOG_RADIUS }}
      pt={{
        header: { style: { fontSize: `${HEADER_FONT_SIZE}rem` } },
      }}
      className={`my-ui-dialog ${className ?? ""}`.trim() || undefined}
    />
  );
}
