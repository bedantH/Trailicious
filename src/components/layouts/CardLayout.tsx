import React, { ReactNode, useEffect, useState } from 'react'
import Card from '../Card';
import axios from 'axios';
import { Meal } from '../FilterBox';
import Modal from '../Modal';

// export interface Meal {
//     id: string;
//     imgUrl: string;
//     mealName: string;
//     category: string;
//     area: string;
//     price: number;
// }

interface Category {
    selectedCategory: String;
    meals: Meal[];
}

export default function CardLayout(props: Category) {
    const [mealCategory, setMealCategory] = useState<String>("");
    const [meals, setMeals] = useState<Meal[]>([]);

    useEffect(() => {
        setMealCategory(props.selectedCategory);
        setMeals(props.meals);
    }, [props])

    return (
        <section className='card_display__Layout'>
            <ul>
                {
                    meals.map((meal: Meal): ReactNode => {
                        return (
                            <Card key={meal.idMeal} id={meal.idMeal} idMeal={meal.idMeal} strMeal={meal.strMeal} strMealThumb={meal.strMealThumb} selectedCategory={mealCategory} />
                        )
                    })
                }
            </ul>
        </section>
    )
}
