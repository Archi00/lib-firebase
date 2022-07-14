import BookPopup from "./BookPopup";
import BooksDisplay from "./BooksDisplay";
import { deleteCategory } from "./deleteBook";
import DeleteBooksTracker from "./DeleteBooksTracker";
import FilteredBooks from "./FilteredBooks";
import { classNames } from "./utils";
import { useState } from "react";

function DisplayCategories(props) {
  const [catDeleted, setCatDeleted] = useState(false)
  return (
    <div className="App">
      <div className="category-list">
        {window.location.pathname === "/dashboard/adding-books" ? (
          <>
            <BookPopup
              handleSubmit={props.handleBooSubmit}
              handleChange={props.handleBooChange}
              bookList={props.bookInfoList}
              catList={props.catList}
              user={props.user}
              displayCategory={props.displayCategory}
              clearSearch={props.clearSearch}
              showCat={props.showCat}
              handleShowCat={props.handleShowCat}
              handleShowCatTrue={props.handleShowCatTrue}
              totalBookList={props.totalBookList}
              handleAddedBooks={props.handleAddedBooks}
            />
          </>
        ) : props.bFilters.length < 1 && props.catFilters.length < 1 ? props.allBooks ? 
          <>
            <div className="category-list-container" >
              {props.totalBookList.map((book, index) => (<BooksDisplay key={index} each={book} isEdit={props.isEdit} handleDeleteTracker={props.handleDeleteTracker} deleteTracker={props.deleteTracker} />))}
            </div>
            {props.isEdit ?
            <div className={classNames("fixed left-0 bottom-0 min-w-[27.27rem] max-w-[27.27rem] z-50", Object.entries(props.deleteTracker).length > 0 ? "min-h-[20vh]" : null)}>
              <DeleteBooksTracker handleDeleteTracker={props.handleDeleteTracker} deleteTracker={props.deleteTracker} handleForceUpdate={props.handleForceUpdate} user={props.user} />
            </div>
            : null}
          </> : (
          props.catList.length > 0 ? (
            !props.displayCategory || props.catFilters.length > 0 ? (
              <>
                <div className="category-list-container">
                  {props.catFilters.length > 0
                    ? window.location.pathname("/dashboard")
                    : props.catList.map((cat, index) => props.multiCat(cat, index))}
                </div>
                {props.isEdit ? 
                  <div className={classNames("uppercase fixed left-0 bottom-0 min-w-[27.27rem] max-w-[27.27rem] z-50")}>
                    <button onClick={async () => {
                      const deleted = await deleteCategory(props.delCatTracker, props.user.uid)
                      }} className={classNames("text-bold uppercase w-full shadow-xl rounded justify-center px-8 py-4 text-2xl", Object.entries(props.delCatTracker).length > 0 ? "bg-red-700 text-gray-300 hover:text-gray-800 hover:bg-red-800" : "bg-gray-600 pointer-events-none text-gray-800")}>delete</button>
                  </div>
                : null}
              </>
            ) : (
              <div className="display-unique">
                {props.catList.map((cat, index) => props.uniqueCat(cat.data?.name, index))}  
              </div>
            )
          ) : null
        ) : (
          <div className="display-unique">
            <FilteredBooks
              bFilters={props.bFilters}
              user={props.user}
              category={props.displayCategory}
              history={props.history}
              cleanFilters={props.cleanFilters}
            />
          </div>
        )}
      </div>
    </div>
  );
}
export default DisplayCategories;
