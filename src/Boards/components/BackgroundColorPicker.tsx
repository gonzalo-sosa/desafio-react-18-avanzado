import {
  ColorPickerRoot,
  ColorPickerSwatchGroup,
  ColorPickerSwatchTrigger,
} from '@/components/ui/color-picker';

export default function BackgroundColorPicker() {
  return (
    <ColorPickerRoot alignItems="flex-start">
      <ColorPickerSwatchGroup>
        {swatches.map((item) => (
          <ColorPickerSwatchTrigger key={item} value={item} />
        ))}
      </ColorPickerSwatchGroup>
    </ColorPickerRoot>
  );
}

const swatches = ['red', 'green', 'blue', 'purple', 'orange', 'pink'];
