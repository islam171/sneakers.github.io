import React from 'react'
import AppContext from '../context'

const Info = ({ title, desc, image }) => {

    const {setCardOpened} = React.useContext(AppContext)

    return (    
        <div>
            <div className="CartEmty">
                <img src={image} alt="Cart" />
                <h3 className="CartEmty__title">{title}</h3>
                <p>{desc}</p>
                <button onClick={() => setCardOpened(false)}>
                    Вернуться назад 
                </button>
            </div>
        </div>
    )
}

export default Info