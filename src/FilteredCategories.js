const DisplayFilters = ({cat, isEdit, handleDisplay, delCatTracker, showNumOfBooks, flag, setTracker }) => {
  const count = showNumOfBooks(cat.data?.name);
  flag = false;
  const active = "bg-gray-600 border-red-600 hover:bg-gray-700"
  const inactive = "bg-gray-800 border-gray-600 hover:bg-gray-600"
  console.log(cat)
  return (
    <Router>
      <Link id="category" to={`${!isEdit ? "/dashboard/" + cat.data?.name : "/dashboard"}`} onClick={(e) => {
        if (!isEdit) handleDisplay(cat.data?.name)
        if (isEdit) {
          if (delCatTracker.hasOwnProperty(cat.id)){
            delete delCatTracker[cat.id]
            setTracker({delCatTracker: {}})
          } else {
            setTracker({delCatTracker: {[cat.id]: cat}})
          }
        }
      }}
      className={classNames("block bg-gray-800 text-center rounded border text-2xl text-gray-300 group hover:shadow-xl hover:bg-gray-600", this.state.delCatTracker.hasOwnProperty(cat.id) && this.state.isEdit ? active : inactive)}
      >
        <div className="list-item">
          <div className="w-[25vw] overflow-hidden whitespace-nowrap py-4 uppercase text-bold text-white text-2xl">
            <h3 className="text-center">{cat.data?.name}</h3>
          </div>
          <div className="mt-4"><h4>{count}</h4></div>
        </div>
      </Link>
    </Router>
  );
}
const FilteredCategories = ({arr, isEdit, handleDisplay, delCatTracker, showNumOfBooks, flag, setTracker }) => {
  return (
    arr.map((cat, index) => <DisplayFilters key={index} cat={cat} isEdit={isEdit} handleDisplay={handleDisplay} delCatTracker={delCatTracker} showNumOfBooks={showNumOfBooks} flag={flag} setTracker={setTracker} />)
  )
}

export default FilteredCategories
