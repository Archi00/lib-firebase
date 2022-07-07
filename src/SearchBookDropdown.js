import { useState } from 'react'
import { Menu } from '@headlessui/react'

export default function SearchBookDropdown({bookList}) {
  return (
    <>
    {bookList.map((book, index) => {<li>{book.volumeInfo.title}</li>})}
    {/*} 
      <Menu as="div" className="relative inline-block text-left">
        <Menu.Items id="menu" className="origin-top-right absolute right-0 mt-2.5 w-[17rem] rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none bg-grey-600">
          <div className="py-1 px-1 pr-1.5 bg-gray-600 rounded-md">
            {bookList.map((book, index) => {
              return (
                <Menu.Item key={index} className="block bg-gray-600 text-white block px-4 text-xl hover:bg-gray-500">
                  <a href="#" >
                    {book.volumeInfo.title}
                  </a>
                </Menu.Item>
              )
            })}
          </div>
        </Menu.Items>
      </Menu>
          */}
    </>
  )
}