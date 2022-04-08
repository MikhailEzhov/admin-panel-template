import './elementsFilters.scss';



const ElementsFilters = () => {
    return (
        <div className="elements-filters">
            <div className="elements-filters__block">
                <h3 className="elements-filters__title">Filter elements by category</h3>
                <div className="elements-filters__group">
                    <button className="elements-filters__button elements-filters__button_all">All</button>
                    <button className="elements-filters__button elements-filters__button_category1">category1</button>
                    <button className="elements-filters__button elements-filters__button_category2">category2</button>
                    <button className="elements-filters__button elements-filters__button_category3">category3</button>
                </div>
            </div>
        </div>
    )
}

export default ElementsFilters;