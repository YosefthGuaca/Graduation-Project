'use client';
import React, { useState } from 'react';

// Default color values
const defaultColors = {
  buttonText: '#000000',
  hyperlinks: '#0000FF',
  background: '#FFFFFF',
  dividerLines: '#D3D3D3',
};

// Define a type for the color selections to handle the state cleanly
type ColorSelections = typeof defaultColors;

const Sidebar: React.FC = () => {
  const [colors, setColors] = useState<ColorSelections>(defaultColors);
  // update individual colors based on the type
  const updateColor = (type: keyof ColorSelections, color: string) => {
    setColors((prevColors) => ({
      ...prevColors,
      [type]: color,
    }));
  };

  // reset colors to default
  const resetColors = () => {
    setColors(defaultColors);
  };

  return (
    <div className="bg-white p-4 text-black w-64">
      <h2 className="text-2xl font-semibold mb-4">Colors</h2>

      {/* Color sections */}

      <div className="space-y-4">
        <ColorPicker
          label="Button Text"
          color={colors.buttonText}
          onColorChange={(color) => updateColor('buttonText', color)}
        />
        <ColorPicker
          label="Hyperlinks"
          color={colors.hyperlinks}
          onColorChange={(color) => updateColor('hyperlinks', color)}
        />
        <h2 className="text-2xl font-semibold mb-4">General</h2>
        <ColorPicker
          label="Background"
          color={colors.background}
          onColorChange={(color) => updateColor('background', color)}
        />
        <ColorPicker
          label="Divider Lines"
          color={colors.dividerLines}
          onColorChange={(color) => updateColor('dividerLines', color)}
        />
      </div>

      {/* Action buttons (Save colors is not working yet) */}
      <div className="flex justify-between mt-8">
        <button onClick={resetColors} className="border px-4 py-2 rounded text-blue-600">
          Cancel
        </button>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Save Colors</button>
      </div>
    </div>
  );
};

// ColorPicker
type ColorPickerProps = {
  label: string;
  color: string;
  onColorChange: (color: string) => void;
};

const ColorPicker: React.FC<ColorPickerProps> = ({ label, color, onColorChange }) => (
  <div>
    <h3 className="font-semibold mb-2 ">{label}</h3>
    <input
      type="color"
      value={color}
      onChange={(e) => onColorChange(e.target.value)}
      className="w-8 h-8 cursor-pointer"
    />
  </div>
);

export default Sidebar;
