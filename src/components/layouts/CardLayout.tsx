import React, { ReactNode, useEffect, useState } from 'react'
import Card from '../Card';
import axios from 'axios';
import { Meal } from '../FilterBox';

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
        setMeals(props.meals);
    }, [props])

    return (
        <section className='card_display__Layout'>
            <ul>
                {
                    meals.map((meal: Meal): ReactNode => {
                        return (
                            <Card idMeal={meal.idMeal} strMeal={meal.strMeal} strMealThumb={meal.strMealThumb} />
                        )
                    })
                }
            </ul>
        </section>
    )
}
