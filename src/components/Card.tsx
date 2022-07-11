import React from 'react'

export default function Card(props: any) {
    return (
        <li className='card'>
            <div className='card_banner'>
                <img src={props.strMealThumb} title={props.strMeal} alt={props.strMeal} />
            </div>
            <div className='card_info'>
                <h4 className='card_rent'>{props.strMeal}</h4>
            </div>
        </li>
    )
}
