import { useHttp } from '../../hooks/http.hook';
import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'reselect';

import { fetchElements} from '../../actions';
import { elementDeleted } from './elementsSlice';

import ElementsListItem from "../elementsListItem/ElementsListItem";
import Spinner from '../spinner/Spinner';

import './elementsList.scss';



const ElementsList = () => {

    // Функция, берет разные части state и на их основе вернет значение
    // мемоизирована от перерендаринга через createSelector - reselect
    const selectValue = createSelector(
        (state) => state.filters.activeFilter, // filter
        (state) => state.elements.elements,    // elements
        (filter, elements) => {
            if (filter === 'all') {
                // console.log('render');
                return elements;
            } else {
                return elements.filter(item => item.category === filter);
            }
        }
    );

    const filteredElements = useSelector(selectValue); // получение отфильтрованных элементов

    const elementsLoadingStatus = useSelector(state => state.elements.elementsLoadingStatus); // из state.elements получаем нужное поле
    const dispatch = useDispatch(); // получение функции dispatch
    const {request} = useHttp(); // получение функции, которая делает запрос


    useEffect(() => {
        dispatch(fetchElements(request)); // отправка в store(запускаем общее действие, сделает запрос на получение, обработает разные состояния ответа)
        // eslint-disable-next-line
    }, []);


    // Функция берет id и по нему удаляет элемент с сервера и из store
    const onDelete = useCallback((id) => { // мемоизация, эта функция будет передавать в дочерний компонент, исключаем перерендеринг
        // Удаление элемента по id
        request(`http://localhost:3001/elements/${id}`, "DELETE") // удаление с сервера
            .then(data => console.log(data, 'Deleted'))           // тогда, проверка что удалено
            .then(dispatch(elementDeleted(id)))                   // тогда, отправка в store(удаление элемента по id)
            .catch(err => console.log(err));                      // ловим, показываем ошибку
        // eslint-disable-next-line  
    }, [request]);


    // условная проверка, если оба не выполнятся, то код идёт дальше
    if (elementsLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (elementsLoadingStatus === "error") {
        return <h4 className="">loading error</h4>
    }


    // Функция для рендаринга списка элементов
    const renderElementsList = (arr) => {
        if (arr.length === 0) {
            return <h4 className="">No elements</h4>
        }
        // перебор массива, возврат компонента с передачей свойств во внутрь
        return arr.map(({id, ...props}) => {
            return <ElementsListItem 
                    key={id} 
                    {...props}
                    onDelete={() => onDelete(id)}
                    />
        })
    }


    const items = renderElementsList(filteredElements); // отфильтрованные элементы

    return (
        <ul className="elements-list">
            {items}
        </ul>
    )
}

export default ElementsList;