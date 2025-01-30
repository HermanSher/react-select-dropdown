# React MultiSelect Dropdown Component

A highly customizable and performant dropdown component for React that supports **single** and **multi-select** modes, with built-in search functionality and virtualized rendering for large datasets.

## Requirements

- React 18 or later
- Node.js 14 or later

## Installation

```bash
# First install the required peer dependencies
npm install react-window memoize-one

# Then install the component
npm install react-multiselect-dropdown
# or
yarn add react-multiselect-dropdown
```

## Dependencies

This component has the following peer dependencies:
- `react-window`: For virtualized list rendering
- `memoize-one`: For performance optimization

These must be installed alongside the component.



## Features

* 🎯 **Single & Multi-select modes**: Switch between single and multi-select modes using the `multiSelect` prop
* 🔍 **Search functionality**: Easily search through large datasets
* ⚡ **Virtualized list**: Optimized for performance with large datasets (10,000+ items)
* 🎨 **Customizable styling**: Fully customizable colors, sizes, and styles
* ✅ **Checkmark indicators**: Visual feedback for selected items
* 🗑️ **Clear all selections**: Built-in button to clear all selections
* 📱 **Responsive design**: Works seamlessly across devices
* ♿ **Accessibility support**: Keyboard navigation and ARIA labels

## Installation

Install the component using npm or yarn:

```bash
npm install react-multiselect-dropdown
# or
yarn add react-multiselect-dropdown
```

## Basic Usage

Here's a simple example of how to use the `MultiSelectDropdown` component:

```jsx
import React, { useState } from "react";
import MultiSelectDropdown from "react-multiselect-dropdown";

const App = () => {
  const [selected, setSelected] = useState([]);
  
  const items = Array.from({ length: 1000 }, (_, i) => ({
    title: `Item ${i + 1}`,
    value: i + 1,
  }));

  return (
    <MultiSelectDropdown
      data={items}
      onChange={setSelected}
      multiSelect={true}
      height="300px"
      width="100%"
    />
  );
};

export default App;
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `Array<{title: string, value: any}>[]` | **(Required)** | Items to display in the dropdown |
| `onChange` | `(selected: Array<any>) => void` | `() => {}` | **(Required)** Callback function triggered when selections change |
| `multiSelect` | `boolean` | `false` | Enable multi-select mode |
| `width` | `string` | `"300px"` | Width of the dropdown |
| `height` | `string` | `"400px"` | Height of the dropdown list |
| `inputHeight` | `string` | `"38px"` | Height of the input field |
| `backgroundColor` | `string` | `"#ffffff"` | Background color of the dropdown |
| `textColor` | `string` | `"#333333"` | Text color of the items |
| `hoverColor` | `string` | `"#f0f0f0"` | Background color of items on hover |
| `selectedColor` | `string` | `"#e0e0e0"` | Background color of selected items |
| `placeholder` | `string` | `"Select items..."` | Placeholder text for the input field |
| `dropdownStyles` | `Object` | `{}` | Additional styles for the dropdown container |
| `itemPadding` | `string` | `"8px 12px"` | Padding for list items |
| `showSelected` | `boolean` | `false` | Show selected items in the input field |
| `maxDisplayItems` | `number` | `1` | Maximum number of selected items to display in the input field |
| `inputFontSize` | `string` | `"14px"` | Font size for the input text |
| `dropdownFontSize` | `string` | `"14px"` | Font size for dropdown items |
| `inputPadding` | `string` | `"0 8px"` | Padding for the input field |
| `checkmarkColor` | `string` | `"#2196f3"` | Color of the checkmark icon for selected items |
| `clearButtonColor` | `string` | `"#666666"` | Color of the clear (×) button |

## Examples

### Multi-Select Mode

```jsx
<MultiSelectDropdown
  data={items}
  onChange={setSelected}
  multiSelect={true}
  height="300px"
  showSelected={true}
  maxDisplayItems={3}
  selectedColor="#e3f2fd"
  checkmarkColor="#2196f3"
/>
```

### Single-Select Mode

```jsx
<MultiSelectDropdown
  data={items}
  onChange={setSelected}
  multiSelect={false}
  placeholder="Choose one item"
  selectedColor="#f5f5f5"
/>
```

### Custom Styling

```jsx
<MultiSelectDropdown
  data={items}
  backgroundColor="#2c3e50"
  textColor="#ecf0f1"
  hoverColor="#34495e"
  selectedColor="#2980b9"
  checkmarkColor="#2ecc71"
  inputHeight="45px"
  dropdownStyles={{
    border: "2px solid #3498db",
    borderRadius: "8px",
  }}
/>
```

## Styling Guide

Customize the appearance of the dropdown using the following props:

* `backgroundColor`: Main background color of the dropdown
* `textColor`: Text color of the items
* `hoverColor`: Background color of items on hover
* `selectedColor`: Background color of selected items
* `checkmarkColor`: Color of the checkmark icon
* `clearButtonColor`: Color of the clear (×) button

## License

This project is licensed under the MIT License. See the LICENSE file for details.

