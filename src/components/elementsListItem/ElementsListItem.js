import './elementsListItem.scss';



const ElementsListItem = ({name, description, category, onDelete}) => {

    let elementClassName;

    switch (category) {
        case 'category1':
            elementClassName = 'color-1';
            break;
        case 'category2':
            elementClassName = 'color-2';
            break;
        case 'category3':
            elementClassName = 'color-3';
            break;
        default:
            elementClassName = 'color-default';
    }

    return (
        <li className={`element-card ${elementClassName}`}>

            <div className="element-card__block">
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