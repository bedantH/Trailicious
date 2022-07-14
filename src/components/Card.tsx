import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Modal from './Modal';
import axios from 'axios';

const body = document.querySelector("body") as HTMLElement;

export default function Card(props: any) {

    const [isClicked, setClicked] = useState<Boolean>(false);
    const [isModalOpen, setOpen] = useState<Boolean>(false);

    const handleClick = (): number => {
        setClicked(!isClicked);
        return 0;
    }

    const handleBtnClick = (e: any) => {
        setOpen(true);
        console.log(body.classList.add("no_scroll"));
    }

    return (
        <li className='card'>
            <div className='card_banner'>
                <img src={props.strMealThumb} title={props.strMeal} alt={props.strMeal} />
                <span className='card_trend_banner'>Trending</span>
                <button className='addto_wishlist' onClick={handleClick}>
                    {isClicked ? <FavoriteIcon fontSize='large' /> : <FavoriteBorderOutlinedIcon fontSize='large' />}
                </button>
            </div>
            <div className='card_info'>
                <span className='meal_cat'>{props.selectedCategory}</span>
                <h4 className='card_rent'>{props.strMeal.length > 19 ? props.strMeal.slice(0, 15) + "..." : props.strMeal}</h4>
                <p className='meal_desc'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta nam dolor necessitatibus voluptates rem voluptatibus iusto totam placeat ipsa aliquam reiciendis aspernatur, animi hic! Harum sapiente ab sunt labore iusto.</p>
                <p className='card_price'>Price: $ 100</p>
                <button onClick={handleBtnClick} data-id={props.id} className='disp_rece'>View Recipe</button>
            </div>
            {
                isModalOpen && <Modal meal={props.idMeal} setOpen={setOpen} />
            }
        </li>
    )
}
