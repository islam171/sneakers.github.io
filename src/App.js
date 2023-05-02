import React, {useState} from 'react'

import Axios from 'axios'
import {
    Routes, Route
} from "react-router-dom";

import Header from './components/Header'
import Saidbar from './components/Saidbar/Saidbar'
import Home from './Pages/Home'
import Favorites from './Pages/Favorites'
import Orders from './Pages/Orders'

import AppContext from './context'


function App() {

    const [cardOpened, setCardOpened] = useState(false);
    const [cartitems, setCartItems] = useState([])
    const [items, setItems] = useState([])
    const [SearchValue, setSearchValue] = useState('');
    const [favorits, setFavorites] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    React.useEffect(() => {
        async function fetchData() {

            try {
                const [cartResponce, favoritesResponce, itemsResponce] = await Promise.all([await Axios.get("https://63089f0046372013f5822251.mockapi.io/cart"), await Axios.get("https://63089f0046372013f5822251.mockapi.io/Favorite"), await Axios.get("https://63089f0046372013f5822251.mockapi.io/items")])

                setIsLoading(false)
                setCartItems(cartResponce.data);
                setFavorites(favoritesResponce.data);
                setItems(itemsResponce.data);

            } catch (error) {
                alert('Ошибка при запросе данных')
                console.error(error)
            }
        }

        fetchData();
    }, []);

    const AddCartItems = (obj) => {
        try {
            const finditem = cartitems.find((item) => Number(item.perentId) === Number(obj.id))
            if (finditem) {
                setCartItems((prev) => prev.filter((item) => Number(item.perentId) !== Number(obj.id)))  // удаляем карточку с корзины
                Axios.delete(`https://63089f0046372013f5822251.mockapi.io/cart/${finditem.id}`);
            } else {
                Axios.post("https://63089f0046372013f5822251.mockapi.io/cart", obj);
                setCartItems((prev) => [...prev, obj]);
            }

        } catch (error) {
            alert('Error')
            console.error(error)
        }
    }

    const onRemoveItem = (id) => {
        Axios.delete(`https://63089f0046372013f5822251.mockapi.io/cart/${id}`);
        setCartItems((prev) => prev.filter(item => item.id !== id))
    }

    const onChangeSearchInput = (event) => {
        setSearchValue(event.target.value)
    }

    const onToFavorite = async (obj) => {
        try {
            if (favorits.find(favobj => Number(favobj.id) === Number(obj.id))) {
                Axios.delete(`https://63089f0046372013f5822251.mockapi.io/Favorite/${obj.id}`);
            } else {
                const {data} = await Axios.post("https://63089f0046372013f5822251.mockapi.io/Favorite", obj);
                setFavorites((prev) => [...prev, data]);
            }
        } catch (error) {
            alert('Error')
            console.error(error)
        }


    }

    const isItemAdded = (id) => {
        return cartitems.some((obj) => Number(obj.perentId) === Number(id))
    }


    return (<AppContext.Provider
        value={{cartitems, items, favorits, isItemAdded, onToFavorite, setCardOpened, setCartItems, isLoading}}>
        <div className="wrapper">
            <Saidbar onClose={() => setCardOpened(false)} items={cartitems} onRemove={(onRemoveItem)}
                     opened={cardOpened}/>

            <Header onCart={() => setCardOpened(true)}/>

            <div className="content">
                <div className="__container">
                    <Routes>
                        <Route path="/" element={<Home
                            SearchValue={SearchValue}
                            setSearchValue={setSearchValue}
                            onChangeSearchInput={onChangeSearchInput}
                            AddCartItems={AddCartItems}
                            onToFavorite={onToFavorite}
                            cartitems={cartitems}
                            isLoading={isLoading}
                        />} exact/>
                        <Route path="/favorite" element={<Favorites/>} exact/>

                        <Route path="/orders" element={<Orders/>} exact/>

                    </Routes>
                </div>
            </div>
        </div>
    </AppContext.Provider>);
}

export default App;
