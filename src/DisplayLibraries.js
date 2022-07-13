import DropdownRender from "./NoUserDropdown"
const DisplayLibraries = () => {
  return (
    <>
    <header className="fixed top-0 w-screen p-0 bg-gray-800 block z-50">
          <div className="p-8 pt-6 h-24 rounded-lg shadow-xl delay-75 text-center flex flex-row w-screen">
            <div className="header-logo-container"></div>
            <div className="max-w-[15vw] min-w-[15vw] flex flex-row absolute left-0 ml-[1.5vw] whitespace-nowrap"></div>
            <DropdownRender />
          </div>
        </header>
        <div className="flex flex-row content-start">
          <div className="flex flex-9 mt-[8vh] mx-auto">
            <div className="each-flex-container overflow-hidden rounded text-gray-300 border min-h-[20vh] max-h-[20vh] min-w-[25vw] hover:cursor-pointer max-w-[25vw]">
              <div className="list-item">
                <div className="w-[25vw] overflow-hidden whitespace-nowrap py-4 uppercase text-bold text-white text-xl">
                  <h3>"Name of user"</h3>
                </div>
                <div className="flex flex-row flex-1 min-w-[20vw] max-w-[20vw] overflow-hidden text-left">
                  <div className="flex justify-end flex-1">
                    <div className="flex justify-start flex-1">
                      <ul className="display-info ml-[4vw] hover:cursor-pointer">
                        <li className="text-xl">"Num of total books"</li>
                        <li className="text-xl">"Num of categories"</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default DisplayLibraries