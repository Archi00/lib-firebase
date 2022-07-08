/* This example requires Tailwind CSS v2.0+ */
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import {useState} from "react"

export default function CardFooter({bookList}) {
  const [current, setCurrent] = useState(1)

  const numOfResults = bookList.length;
  const resultsForPage = 9
  const totalPages = numOfResults / resultsForPage
  const numOfPages = totalPages % 2 !== 0 ? Math.round(totalPages + 1) : totalPages

  const classNames = (...classes) => {
    return classes.filter(Boolean).join(' ')
  }

  const displayNums = () => {
    let temp = []
    const active = "z-10 bg-gray-600 border-black text-gray-900 hover:text-gray-300"
    const inactive = "bg-gray-800 border-gray-900 text-gray-300 hover:bg-gray-900 hover:text-gray-50"
    const constant = "relative inline-flex items-center px-4 py-2 border text-sm font-medium"

    for (let i = 1; i < numOfPages + 1; i++) {
     temp.push(
      <a
        id={i}
        key={i}
        href="#"
        aria-current="page"
        onClick={() => setCurrent(i)}
        className={classNames(constant + current ? active : inactive)}
      >
        {i}
      </a>
      )
    }
    return temp;
  }

  return (
    <div className="bg-gray-700 px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
      <div className="flex-1 flex justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-lg font-medium rounded-md text-gray-300 bg-white hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="#"
          className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-lg font-medium rounded-md text-gray-300 bg-white hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-300">
            Showing <span className="font-medium">1</span> to <span className="font-medium">{numOfPages}</span> of{' '}
            <span className="font-medium">{numOfResults}</span> results
          </p>
        </div>
        <div>
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <a
              href="#"
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-900 bg-gray-800 text-sm font-medium text-gray-300 hover:bg-gray-900 hover:text-gray-50"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </a>
            {/* Current: "z-10 bg-gray-600 border-black text-gray-900 hover:text-gray-300", Default: "bg-gray-800 border-gray-900 text-gray-300 hover:bg-gray-900 hover:text-gray-50" */}
            {displayNums()}
            <a
              href="#"
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border text-sm font-medium bg-gray-800 border-gray-900 text-gray-300 hover:bg-gray-900 hover:text-gray-50"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>
    </div>
  )
}
