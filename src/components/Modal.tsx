import React, { useEffect, useState } from 'react'
import ModalLayout from './layouts/ModalLayout'
import axios from 'axios';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from 'swiper';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';

// Import Swiper styles
import 'swiper/css';


const body = document.querySelector("body") as HTMLElement;

export default function Modal({ meal, setOpen }: any) {

    const [currentMeal, setCurrentMeal] = useState<any>({});

    useEffect(() => {
        axios
            .get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal}`)
            .then((res) => {
                const data = res.data.meals[0];
                const correctData = {
                    ingredients: [],
                    measures: []
                } as any;

                Object.keys(data).forEach((key) => {
                    if (data[key] !== null && data[key] !== "") {
                        if (key.includes("strIngredient")) {
                            if (data[key] !== null && data[key] !== "") {
                                correctData["ingredients"].push(data[key]);
                            }
                        } else if (key.includes("strMeasure")) {
                            if (data[key] !== null && data[key] !== "") {
                                correctData["measures"].push(data[key]);
                            }
                        } else {
                            correctData[key] = data[key];
                        }
                    }
                })

                if (correctData['strTags']) {
                    correctData['strTags'] = correctData['strTags'].split(",");
                }

                var arr = correctData['strInstructions'].split("\r\n");

                arr.forEach((ele: any, index: any) => {
                    console.log(ele.toString().length);
                    if (ele.toString().length === 1) {
                        arr.splice(index, 1);
                    } else if (ele.toString().length === 0) {
                        arr.splice(index, 1);
                    }
                });

                console.log(arr);
                correctData["strInstructions"] = arr;

                setCurrentMeal(correctData);
            })
            .catch((err) => {
                console.error(err);
            })
    }, [meal])

    useEffect(() => {
        console.log(currentMeal);
    }, [currentMeal])

    return (
        <ModalLayout>
            {currentMeal ? <section className='modal__wrapper'>
                <div className="modal_main_container">
                    <button onClick={() => {
                        setOpen(false);
                        body.classList.remove("no_scroll");
                    }}
                        className='close_btn'>
                        <ArrowForwardOutlinedIcon fontSize='large' />
                    </button>
                    <Swiper
                        modules={[Autoplay, Keyboard, Pagination, Scrollbar, Zoom]}
                        spaceBetween={50}
                        slidesPerView={1}
                        onSlideChange={() => console.log('slide change')}
                        onSwiper={(swiper) => console.log(swiper)}
                    >

                        <SwiperSlide>
                            <div className='section_one'>
                                <div className='meal_img_wrapper' style={{
                                    backgroundImage: `url(${currentMeal.strMealThumb})`
                                }}>
                                </div>
                                <div className="meal_tags">
                                    {currentMeal.strTags && currentMeal.strTags.map((ele: any) => {
                                        return (
                                            <span className='meal_Tag'>
                                                {ele}
                                            </span>
                                        )
                                    })}
                                </div>
                                <h2 className="meal_name">
                                    <span className='meal_id'>#{currentMeal.idMeal}</span>
                                    <br />
                                    {currentMeal.strMeal}
                                </h2>
                                <div className='meal_infos'>
                                    <div className='meal_origin'>
                                        <h4>Area of origin: </h4>
                                        <span>{currentMeal.strArea}</span>
                                    </div>
                                    <div className='meal_cat'>
                                        <h4>Category: </h4>
                                        <span>{currentMeal.strCategory}</span>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='section_two'>
                                <h2 className='main_title'>
                                    Steps to make:
                                </h2>
                                <ul className='list_Steps'>
                                    {
                                        currentMeal.strInstructions && currentMeal.strInstructions.map((ele: any) => {
                                            return (
                                                <li>{ele}</li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='section_two section_three'>
                                <h2 className='main_title'>
                                    Ingredients Needed:
                                </h2>
                                <ul className='list_Steps'>
                                    {
                                        currentMeal.ingredients && currentMeal.ingredients.map((ele: any, index: any) => {
                                            return (
                                                <li>{ele}  :  {currentMeal.measures[index]}</li>
                                            )
                                        })
                                    }
                                </ul>
                                <h2 className='main_title_1'>
                                    YouTube Video for reference:
                                </h2>
                                <iframe src="https://www.youtube.com/embed/4aZr5hZXP_s" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </section> : <h1>?</h1>}
        </ModalLayout>
    )
}
