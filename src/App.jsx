import { useContext, useEffect, useState } from 'react';
import { Crumbs } from './Crumbs';
import './styles/global.css';
import { Cross } from './Cross';
import { fetchCity } from './http/weatherApi';
import { observer } from 'mobx-react-lite';
import { Context } from '.';

const App = observer(() => {
  const {store} = useContext(Context);

  const [isOpen, setIsOpen] = useState(false);

  const openClick = () => {
    setIsOpen(true);
  }

  const closeClick = () => {
    setIsOpen(false);
  }

  const getCity = (city) => {
    fetchCity(city).then(response => store.setData(response));
  }

  useEffect(() => {
    fetchCity('London').then(response => store.setData(response));
  }, [])

  return (
    <div className='main'>
      <header className='main__header'>
        <button 
          className='main__header_crumbs'
          onClick={openClick}
        >
          <Crumbs />
        </button>
        <span className='main__header_title'>
          Weatherman
        </span>
        <div style={{width: '50px'}}></div>
        <div className={`main__header_menu ${isOpen ? 'main__header_menu_opened' : ''}`}>
          <button 
            className='main__header_menu_close'
            onClick={closeClick}
          >
            <Cross />
          </button>
          <ul className='main__header_menu_list'>
            <li
              onClick={() => fetchCity('Moscow').then(response => store.setData(response))}
            >
              Moscow
            </li>
            <li
              onClick={() => fetchCity('New York').then(response => store.setData(response))}
            >
              New York
            </li>
            <li
              onClick={() => fetchCity('London').then(response => store.setData(response))}
            >
              London
            </li>
            <li
              onClick={() => fetchCity('Tokyo').then(response => store.setData(response))}
            >
              Tokyo
            </li>
            <li
              onClick={() => fetchCity('Berlin').then(response => store.setData(response))}
            >
              Berlin
            </li>
          </ul>
        </div>
      </header>
      <div className='main__info'>
        <h1 className='main__city'>
          {store.data.data.location.name}
        </h1>
        <span className='main__date'>
          {new Date().toDateString()}
        </span>
        <span className='main__current-temperature'>
        {store.data.data.current.temp_c}&deg;c
        </span>
        <div className='main__weather_container'>
          <span className='main__weather'>
            {store.data.data.current.condition.text}
          </span>
          <span className='main__weather_temperature'>
            Feels like {store.data.data.current.feelslike_c}&deg;c
          </span>
        </div>
      </div>
    </div>
  );
})

export default App;
