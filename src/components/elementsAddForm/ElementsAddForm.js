import { useHttp } from '../../hooks/http.hook';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid'; // генерация случаных id

import { elementCreated } from '../../actions';

import './elementsAddForm.scss';



const ElementsAddForm = () => {

    // Состояния для контроля формы - локальные состояния
    const [elementName, setElementName] = useState('');
    const [elementDescription, setElementDescription] = useState('');
    const [elementCategory, setElementCategory] = useState('');

    const {filters, filtersLoadingStatus} = useSelector(state => state); // из state получаем и диструктуризируем поля
    const dispatch = useDispatch(); // получение функции dispatch
    const {request} = useHttp(); // получение функции, которая делает запрос


    // Отправка формы для создания нового элемента
    const onSubmitHandler = (e) => {
        e.preventDefault();
        const newElement = {
            id: uuidv4(), // генерация id через библиотеку uuid
            name: elementName,
            description: elementDescription,
            category: elementCategory
        }
        // Отправка данных на сервер и в store
        request("http://localhost:3001/elements", "POST", JSON.stringify(newElement)) // отправка на сервер, формат JSON
            .then(res => console.log(res, 'Sending successful'))                    // тогда, проверка что оправлено
            .then(dispatch(elementCreated(newElement)))                             // тогда, отправка в store(создание элемента)
            .catch(err => console.log(err));                                        // ловим, показываем ошибку
        // Очищаем форму после отправки
        setElementName('');
        setElementDescription('');
        setElementCategory('');
    }


    // Функция для рендаринга фильтров
    const renderFilters = (filters, status) => {
        // проверка загрузки фильтров
        if (status === "loading") {
            return <option>Loading elements</option>
        } else if (status === "error") {
            return <option>loading error</option>
        }
        // если фильтры есть, то рендерим их
        if (filters && filters.length > 0 ) {
            return filters.map(({name, label}) => {
                // eslint-disable-next-line
                if (name === 'all')  return; // фильтр all не нужен, остановка на нём

                return <option key={name} value={name}>{label}</option>
            })
        }
    }


    return (
        <form className="add-form" onSubmit={onSubmitHandler}>
            <div className="add-form__block">
                <label htmlFor="name" className="add-form__label">Name of the new element</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="add-form__input-name" 
                    id="name" 
                    placeholder="What is the name of the element?"
                    value={elementName}
                    onChange={(e) => setElementName(e.target.value)}
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
                    value={elementDescription}
                    onChange={(e) => setElementDescription(e.target.value)}
                />
            </div>

            <div className="add-form__block">
                <label htmlFor="category" className="add-form__label">Select a category for an element</label>
                <select 
                    required
                    className="add-form__select-category" 
                    id="category" 
                    name="category"
                    value={elementCategory}
                    onChange={(e) => setElementCategory(e.target.value)}>
                    <option value="">The category for the element...</option>
                    {renderFilters(filters, filtersLoadingStatus)}
                </select>
            </div>

            <button type="submit" className="add-form__button">Create</button>
        </form>
    )
}

export default ElementsAddForm;