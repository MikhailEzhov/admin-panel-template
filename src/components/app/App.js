import ElementsList from '../elementsList/ElementsList';
import ElementsAddForm from '../elementsAddForm/ElementsAddForm';
import ElementsFilters from '../elementsFilters/ElementsFilters';

import './app.scss';



const App = () => {

    return (
        <main className="app">
            <div className="container">
                <div className="content">
                    <div>
                        <ElementsAddForm/>
                        <ElementsFilters/>
                    </div>
                    <ElementsList/>
                </div>
            </div>
        </main>
    )
}

export default App;