import React from "react"
import { Button, SelectMenu } from "evergreen-ui"

interface MultipleSearchProps {
  title: string
  values: string[]
  selectedItemsState: any[]
  setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>
}

const MultipleSelect: React.FC<MultipleSearchProps> = ({
  title, values, selectedItemsState, setSelectedItems
}) => {
  const [options] = React.useState(
    values.map((label) => ({
      label,
      value: label,
    }))
  )
  const [selectedItemNamesState, setSelectedItemNames] = React.useState(null)

  const [filter, setFilter] = React.useState('')

  return (
    <SelectMenu
      isMultiSelect
      hasTitle={false}
      options={options}
      width={500}
      selected={selectedItemsState}
      onFilterChange={(filter) => setFilter(filter)}
      onSelect={(item) => {
        const selected = [...selectedItemsState, item.value]
        const selectedItems = selected
        const selectedItemsLength = selectedItems.length
        let selectedNames = ''
        if (selectedItemsLength === 0) {
          selectedNames = ''
        } else if (selectedItemsLength === 1) {
          selectedNames = selectedItems.toString()
        } else if (selectedItemsLength > 1) {
          selectedNames = selectedItemsLength.toString() + ' выбрано...'
        }
        setSelectedItems(selectedItems as any)
        setSelectedItemNames(selectedNames as any)
      }}
      onDeselect={(item) => {
        const deselectedItemIndex = selectedItemsState?.indexOf(item.value as never)
        const selectedItems = selectedItemsState.filter((_item, i) => i !== deselectedItemIndex)
        const selectedItemsLength = selectedItems.length
        let selectedNames = ''
        if (selectedItemsLength === 0) {
          selectedNames = ''
        } else if (selectedItemsLength === 1) {
          selectedNames = selectedItems.toString()
        } else if (selectedItemsLength > 1) {
          selectedNames = selectedItemsLength.toString() + ' выбрано...'
        }

        setSelectedItems(selectedItems)
        setSelectedItemNames(selectedNames as any)
      }}
    >
      <Button width="100%" marginBottom={20}>
        {selectedItemNamesState || title}
      </Button>
    </SelectMenu>
  )
}

export default MultipleSelect