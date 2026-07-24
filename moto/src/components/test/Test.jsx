import { useState } from "react";

import {
  Label, 
  ListBox, 
  Select,
  Autocomplete,
  EmptyState,
  SearchField,
  useFilter,
  Button,
  Drawer
} from "@heroui/react";

export default function Test() {

  const [selected, setSelected] = useState(2)
  console.log(selected)
  const data = ['florida', 'delaware', 'california', 'Texas']


  const [selectedKey, setSelectedKey] = useState(3);

  const {contains} = useFilter({sensitivity: "base"});
  const items = [
    {id: 1, name: "Florida"},
    {id: 2, name: "Delaware"},
    {id: 3, name: "California"},
    {id: 4, name: "Texas"},
    {id: 5, name: "New York"},
    {id: 6, name: "Washington"},
  ];

  // Drawer lazimli menu
  // Fieldset lazimli ornek form


  return (
    <div style={{margin: '200px'}}>
      <Select onSelectionChange={(value) => setSelected(value)} selectedKey={selected} validate='0' className="w-[256px] mb-5" placeholder="Select one">
        <Label>State</Label>
        <Select.Trigger style={{ borderRadius: '10px' }}>
          <Select.Value />
          <Select.Indicator />
        </Select.Trigger>
        <Select.Popover>
          <ListBox>
            {
              items.map((p, index) => {
                return (
                  <ListBox.Item key={p.id} id={p.id} textValue={index + 1}>
                    {p.name}
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                )

              })
            }
          </ListBox>
        </Select.Popover>
      </Select>

      <Autocomplete
        className="w-[256px] mb-5"
        placeholder="Select one"
        selectionMode="single"
        value={selectedKey}
        // onChange={setSelectedKey}
        onSelectionChange={(key) => {
          setSelectedKey(key);
          console.log(key); // "florida", "california" vs.
        }}
      >
        <Label>State</Label>
        <Autocomplete.Trigger>
          <Autocomplete.Value />
          <Autocomplete.ClearButton />
          <Autocomplete.Indicator />
        </Autocomplete.Trigger>
        <Autocomplete.Popover>
          <Autocomplete.Filter filter={contains}>
            <SearchField autoFocus name="search" variant="secondary" aria-label="Search states">
              <SearchField.Group>
                <SearchField.SearchIcon />
                <SearchField.Input placeholder="Search states..." />
                <SearchField.ClearButton />
              </SearchField.Group>
            </SearchField>
            <ListBox renderEmptyState={() => <EmptyState>No results found</EmptyState>}>
              {items.map((item) => (
                <ListBox.Item key={item.id} id={item.id} textValue={item.name}>
                  {item.name}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Autocomplete.Filter>
        </Autocomplete.Popover>
      </Autocomplete>


      <Drawer>
        <Button variant="secondary">Terms & Conditions</Button>
        <Drawer.Backdrop>
          <Drawer.Content>
            <Drawer.Dialog>
              <Drawer.Handle />
              <Drawer.CloseTrigger />
              <Drawer.Header>
                <Drawer.Heading>Terms & Conditions</Drawer.Heading>
              </Drawer.Header>
              <Drawer.Body>
                {Array.from({ length: 20 }).map((_, i) => (
                  <p key={i} className="mb-3">
                    Paragraph {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                    pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet hendrerit
                    risus, sed porttitor quam.
                  </p>
                ))}
              </Drawer.Body>
              <Drawer.Footer>
                <Button slot="close" variant="secondary">
                  Decline
                </Button>
                <Button slot="close">Accept</Button>
              </Drawer.Footer>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>


      <div className="flex mt-7 gap-2">
        {
          items.map((item, index) => {
            const active = 2
            return (
              <button key={index} className={`px-3 py-1 rounded-full cursor-pointer ${active == index ? 'bg-blue-500 text-white' : 'border-2 hover:bg-gray-200'}`}>
                {item.name}
              </button>
            )
          })
        }
      </div>


      <div className="flex mt-7 gap-2">
        {
          items.map((item, index) => {
            const active = [1,2,3]
            return (
              <button onClick={(e) => console.log(item.name)} key={index} className={`px-3 py-1 rounded-full cursor-pointer ${active[index] == index + 1 ? 'bg-blue-500 text-white' : 'border-2 hover:bg-gray-200'}`}>
                {item.name}
              </button>
            )
          })
        }
      </div>



      <div className="relative w-[256px] mt-6">
        <input
          className="peer bg-gray-500 w-full border border-gray-300 rounded-lg px-3 pt-5 pb-2 text-sm outline-none focus:border-blue-500 transition-all"
          placeholder=" "
          id="state-input"
        />
        <label
          htmlFor="state-input"
          className="absolute left-3 top-3 text-xs text-gray-400 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-500"
        >
          State
        </label>
      </div>




      <div className="mt-6">
        <Drawer>
          <Button variant="secondary">Open Drawer</Button>
          <Drawer.Backdrop>
            <Drawer.Content placement="top">
              <Drawer.Dialog>
                <Drawer.Header>
                  <Drawer.Heading>Drawer Title</Drawer.Heading>
                </Drawer.Header>
                <Drawer.Body>
                  <p>
                    This is a bottom drawer built with React Aria's Modal component. It slides up from
                    the bottom of the screen with a smooth CSS transition.
                  </p>
                </Drawer.Body>
                <Drawer.Footer>
                  <Button slot="close" variant="secondary">
                    Cancel
                  </Button>
                  <Button slot="close">Confirm</Button>
                </Drawer.Footer>
              </Drawer.Dialog>
            </Drawer.Content>
          </Drawer.Backdrop>
        </Drawer>
      </div>
      

      


    </div>
  );
}