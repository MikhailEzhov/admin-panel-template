import './elementsAddForm.scss';



const ElementsAddForm = () => {
    return (
        <form className="add-form">
            <div className="add-form__block">
                <label htmlFor="name" className="add-form__label">Name of the new element</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="add-form__input-name" 
                    id="name" 
                    placeholder="What is the name of the element?"
                />
            </div>

            <div className="add-form__block">
                <label htmlFor="text" className="add-form__label">Description of the new element</label>
                <textarea
                    required
                    name="text" 
                    className="add-form__textarea-description" 
                    id="text" 
                    placeholder="What is the element description?"
                />
            </div>

            <div className="add-form__block">
                <label htmlFor="category" className="add-form__label">Select a category for an element</label>
                <select 
                    required
                    className="add-form__select-category" 
                    id="category" 
                    name="category">
                    <option>The category for the element...</option>
                    <option value="category1">category1</option>
                    <option value="category2">category2</option>
                    <option value="category3">category3</option>
                </select>
            </div>

            <button type="submit" className="add-form__button">Create</button>
        </form>
    )
}

export default ElementsAddForm;