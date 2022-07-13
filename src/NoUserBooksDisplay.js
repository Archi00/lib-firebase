const DisplayBook = ({each}) => {
  return (
    <div className="each-flex-container overflow-hidden rounded bg-gray-800 border-gray-600 hover:bg-gray-600 text-gray-300 border min-h-[20vh] max-h-[20vh] min-w-[25vw] hover:cursor-pointer max-w-[25vw]">
      <div className="list-item mx-auto">
        <div className="w-[25vw] overflow-hidden whitespace-nowrap py-4 uppercase text-center text-bold text-white text-xl">
          <h3>{each.title}</h3>
        </div>
        <div className="flex flex-row flex-1 min-w-[20vw] max-w-[20vw] mx-auto overflow-hidden text-left">
          <div className="flex justify-end flex-1">
            <a
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              {each.imageLinks ? (
                <img
                  load="lazyload"
                  className="rounded object-contain h-48 w-48 text-left m-auto"
                  alt="cover"
                  src={each.imageLinks.thumbnail}
                />
              ) : null}
            </a>

            <div className="flex justify-start flex-1">
              <ul className="display-info ml-[4vw] hover:cursor-pointer">
                {each.authors ? (
                  each.authors.length > 1 ? (
                    <li className="multiple-authors">
                      <span>Multiple Authors</span>
                    </li>
                  ) : (
                    <li className="text-xl">{each.authors}</li>
                  )
                ) : null}
                <li className="text-xl">{each.pageCount}</li>
                <li className="text-xl">{each.publishedDate}</li>
                <li className="text-xl">{each.publisher}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DisplayBook