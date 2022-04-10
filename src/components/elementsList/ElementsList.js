import { useHttp } from '../../hooks/http.hook';
import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { elementsFetching, elementsFetched, elementsFetchingError, elementDeleted } from '../../actions';
import ElementsListItem from "../elementsListItem/ElementsListItem";
import Spinner from '../spinner/Spinner';

import './elementsList.scss';



const ElementsList = () => {

    // получение отфильтрованных элементов
    const filteredElements = useSelector(state => {
        if (state.activeFilter === 'all') {
            return state.elements;
        } else {
            return state.elements.filter(item => item.category === state.activeFilter);
        }
    })

    const elementsLoadingStatus = useSelector(state => state.elementsLoadingStatus); // из state получаем нужное поле
    const dispatch = useDispatch(); // получение функции dispatch
    const {request} = useHttp(); // получение функции, которая делает запрос


    useEffect(() => {
        dispatch(elementsFetching());                       // отправка в store(запуск загрузки)
        request("http://localhost:3001/elements")
            .then(data => dispatch(elementsFetched(data)))  // тогда, отправка в store(элементы загружены)
            .catch(() => dispatch(elementsFetchingError())) // ловим, отправка в store(ошибка при загрузке)
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