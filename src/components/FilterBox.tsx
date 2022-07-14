import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import CardLayout from './layouts/CardLayout';
import axios from 'axios';

type Category = {
    strCategory: string
}

type Area = {
    strArea: string
}

export interface Meal {
    idMeal: string,
    strMeal: string,
    strMealThumb: string
}

export default function FilterBox() {
    /*
        Used <any> because the data source is an API, hence its not really
        absolute what format should be used here.
    */

    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<String>("beef");
    const [selectedFilterType, setSelectedFilterType] = useState<String>("category");
    const [areas, setAreas] = useState<Area[]>([]);
    const [meals, setMeals] = useState<Meal[]>([]);

    React.useEffect(() => {
        const getCategoryData = async (): Promise<any> => {
            await axios.get("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
                .then((res) => {
                    setCategories(res.data.meals);
                })
                .catch((err) => {
                    console.error(err);
                })
        }

        const getAreaData = async (): Promise<any> => {
            await axios.get("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
                .then((res) => {
                    console.table(res.data.meals);
                    setAreas(res.data.meals);
                })
                .catch(err => {
                    console.error(err);
                })
        }

        const getMealsData = async (): Promise<any> => {
            await axios.get("https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef")
                .then((res) => {
                    console.table(res.data.meals);
                    setMeals(res.data.meals);
                })
                .catch((err) => {
                    console.error(err);
                })

        }

        getCategoryData();
        getAreaData();
        getMealsData();

    }, [])

    const handleFilterType: React.FormEventHandler<HTMLSelectElement> = (event: React.FormEvent<HTMLSelectElement>) => {
        setSelectedFilterType((event.target as HTMLSelectElement).value);
    }

    const handleChange: React.FormEventHandler<HTMLSelectElement> = (e: React.FormEvent<HTMLSelectElement>) => {
        setSelectedCategory((e.target as HTMLSelectElement).value);

        const selected = (e.target as HTMLSelectElement).value;

        const selectedAlias = selectedFilterType === 'category' ? 'c' : 'a';

        const uri = `https://www.themealdb.com/api/json/v1/1/filter.php?${selectedAlias}=${selected}`;
        axios
            .get(uri)
            .then(res => {
                setMeals(res.data.meals);
            })
            .catch(err => {
                console.error(err);
            })
    };

    return (
        <>
            <section className='filter-box__layout'>
                <div className='box__layout__container'>
                    <div className='container__searchInput'>
                        <input type="text" placeholder="Search" className="input search__input" />
                        <span>
                            <SearchIcon fontSize="medium" />
                        </span>
                    </div>
                    <div className='container__filters_wrapper'>
                        <div className="filters_wrapper__byCat">
                            <label>Filter Data By</label>
                            <select className="wrapper__byCat" onChange={handleFilterType}>
                                <option value="category" defaultChecked>Category</option>
                                <option value="area">Area</option>
                            </select>
                        </div>
                        <div className="filters_wrapper__byArea">
                            <label>Select {selectedFilterType}</label>
                            <select className="wrapper__byArea" onChange={handleChange}>
                                {
                                    selectedFilterType === "category"
                                        ?
                                        categories.map((cat: Category, index) => {
                                            return (
                                                <option key={index} value={cat.strCategory.toLowerCase()} >{cat.strCategory}</option>
                                            )
                                        })
                                        :
                                        areas.map((cat: Area, index) => {
                                            return (
                                                <option key={index} value={cat.strArea.toLowerCase()} >{cat.strArea}</option>
                                            )
                                        })
                                }
                            </select>
                        </div>
                    </div>
                </div>
            </section>
            <CardLayout selectedCategory={selectedCategory} meals={meals} />
        </>
    )
}
