import { HexColorInput, HexColorPicker } from "react-colorful";

type ColorPickerPropsType = {
  value: string;
  onPickerChange: (color: string) => void;
}

export default function ColorPicker({ value, onPickerChange }: Readonly<ColorPickerPropsType>) {

  return (
    <div className="relative">
      <HexColorInput prefixed color={value} onChange={onPickerChange} className="hex-input" />
      <HexColorPicker color={value} onChange={onPickerChange} />
    </div>
  )
};