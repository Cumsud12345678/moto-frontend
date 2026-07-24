import { Select } from '@mantine/core';

export default function CustomSelectModal({ placeolder, selected, change, options }) {
  
  return(
    <Select
      size="lg"
      placeholder={placeolder}
      searchable
      checkIconPosition="right"
      autoSelectOnBlur
      value={selected || null}
      onChange={(value) => change(value)}
      data={options}
      clearable
      variant='filled'
      styles={{ dropdown: {marginLeft: '0px'}}}
      comboboxProps={{withinPortal: false}}
    />
  )

}