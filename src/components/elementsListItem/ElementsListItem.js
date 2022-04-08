import './elementsListItem.scss';



const ElementsListItem = ({name, description, category, onDelete}) => {

    let elementClassName;

    switch (category) {
        case 'category1':
            elementClassName = 'element-card__block_category1';
            break;
        case 'category2':
            elementClassName = 'element-card__block_category2';
            break;
        case 'category3':
            elementClassName = 'element-card__block_category3';
            break;
        default:
            elementClassName = 'element-card__block_default';
    }

    return (
        <li className="element-card">

            <div className={`element-card__block ${elementClassName}`}>
                <h3 className="element-card__name">{name}</h3>
                <p className="element-card__description">{description}</p>
            </div>

            <button 
                type="button" 
                className="element-card__button" 
                aria-label="Close"
                onClick={onDelete}
                ></button>
        </li>
    )
}

export default ElementsListItem;