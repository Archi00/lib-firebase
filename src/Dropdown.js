import { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example(categories) {
  const [selected, setSelected] = useState();
  const handleSubmit = (e, cat) => {
    e.preventDefault()
    setSelected(cat)
  }

  return (
  <Menu as="div" className="relative inline-block text-left">
      <>
        <Menu.Button className="inline-flex justify-center w-[17rem] rounded-md border border-gray-300 shadow-xl px-4 py-[1.10rem] bg-white text-xl font-medium bg-gray-600 text-black hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-0.5">
          {!selected ? "Choose Category" : selected}
          <ChevronDownIcon className="-mr-1 ml-2 h-8 w-5" aria-hidden="true" />
        </Menu.Button>
      </>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {categories.length > 0 ? categories.map(cat => {
              <form method="POST" onSubmit={(e) => handleSubmit(e, cat)}>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      type="submit"
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block w-full text-left px-4 py-2 text-sm'
                      )}
                    >
                      {cat}
                    </button>
                  )}
                </Menu.Item>
              </form>
            }) : null}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
