import { useHttp } from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { elementsFetching, elementsFetched, elementsFetchingError } from '../../actions';
import ElementsListItem from "../elementsListItem/ElementsListItem";
import Spinner from '../spinner/Spinner';



const ElementsList = () => {

    const {elements, elementsLoadingStatus} = useSelector(state => state); // из state получаем и диструктурируем два поля
    const dispatch = useDispatch(); // получение функции dispatch
    const {request} = useHttp(); // получение функции, которая делает запрос


    useEffect(() => {
        dispatch(elementsFetching());                       // отправка в store(запуск загрузки)
        request("http://localhost:3001/elements")
            .then(data => dispatch(elementsFetched(data)))  // тогда, отправка в store(элементы загружены)
            .catch(() => dispatch(elementsFetchingError())) // ловим, отправка в store(ошибка при загрузке)
        // eslint-disable-next-line
    }, []);

    // условная проверка, если оба не выполнятся, то код идёт дальше
    if (elementsLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (elementsLoadingStatus === "error") {
        return <h4 className="">loading error</h4>
    }


    // Рендеринг элементов из массива
    const renderElementsList = (arr) => {
        if (arr.length === 0) {
            return <h4 className="">No elements</h4>
        }
        // перебор массива, возврат компонента с передачей свойств во внутрь
        return arr.map(({id, ...props}) => {
            return <ElementsListItem key={id} {...props}/>
        })
    }


    const items = renderElementsList(elements);

    return (
        <ul>
            {items}
        </ul>
    )
}

export default ElementsList;