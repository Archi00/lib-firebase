import { useState } from 'react'
import { Menu } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'

export default function CategoryDropdown({categories, setCategory}) {
  const [selected, setSelected] = useState();

  const handleSubmit = (e, cat) => {
    e.preventDefault()
    setSelected(cat)
  }

  return (
    <>
      <Menu as="div" id="choosenCategory" className="relative inline-block text-left m-0">
        <>
          <Menu.Button className="inline-flex justify-center w-[17rem] rounded border border-gray-300 shadow-xl py-[1.3rem] text-xl font-medium bg-gray-600 text-black hover:bg-gray-700 focus:outline-none  focus:ring-offset-0.5">
            {!selected ? "Choose Category" : selected}
            <ChevronDownIcon className="-mr-1 ml-2 h-8 w-5" aria-hidden="true" />
          </Menu.Button>
        </>
          <Menu.Items id="menu" className="origin-top-right absolute right-0 mt-2.5 w-[17rem] rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none bg-grey-600">
            <div className="py-1 px-1 pr-1.5 bg-gray-600 rounded-md">
              {categories.map((cat, index) => {
                return (
                  <Menu.Item key={index} className="block bg-gray-600 text-white block px-4 text-xl hover:bg-gray-500">
                    <a href="#" onClick={(e) => handleSubmit(e, cat)}>
                      {cat}
                    </a>
                  </Menu.Item>
                )
              })}
            </div>
          </Menu.Items>
      </Menu>
    </>
  )
}
