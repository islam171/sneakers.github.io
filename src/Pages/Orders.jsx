import axios from 'axios';
import React from 'react'

import AppContext from '../context';
import Card from '../components/Card';

function Orders() {

    const { AddCartItems, onToFavorite } = React.useContext(AppContext);

    const [Orders, setOrders] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get('https://63089f0046372013f5822251.mockapi.io/orders');
                setOrders(data.map((obj) => obj.items).flat())
                setIsLoading(false)
            } catch (error) {
                alert('Ошибка при запросе заказов')
            }
        })()
    }, []);

    return (
        <div>
            <div className="content__head">
                <h1>Мои заказы</h1>

            </div>

            <div className="Cards">
                {(isLoading ? [...Array(12)] : Orders).map((item, index) => (
                    <Card
                        key={index}
                        loading={isLoading}
                        {...item}
                    />
                ))}
            </div>
        </div>
    )
}

export default Orders