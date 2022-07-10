import React, {useState} from "react";
import BookPopup from "./BookPopup";
import BooksDisplay from "./BooksDisplay";
import FilteredBooks from "./FilteredBooks";

function DisplayCategories(props) {
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
            />
          </>
        ) : props.bFilters.length < 1 ? props.allBooks ? 
          <div className="category-list-container" >
            {props.totalBookList.map(book => <BooksDisplay each={book} isEdit={props.isEdit} handleDeleteTracker={props.handleDeleteTracker} />)}</div> : (
          props.catList.length > 0 ? (
            !props.displayCategory ? (
              <div className="display-categories" id="catZone">
                {props.catFilters.length > 0
                  ? props.catFilters.map((e) => props.multiCat(e))
                  : props.catList.map((title) => props.multiCat(title))}
              </div>
            ) : (
              <div className="display-unique">
                {props.catList.map((title) => props.uniqueCat(title))}
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
