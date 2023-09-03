import React, {useState} from 'react';
import {useRouter} from 'next/router';
import {Rating} from '@/types/rating';
import restaurantsData from '@/data/restaurants.json';
import ratingsData from '@/data/ratings.json';
import generateNewId from "@/services/idGeneratorService";
import {Restaurant} from "@/types/restaurant";
import formStyle from "@/styles/form.module.css";
import style from "@/styles/global.module.css"
import Link from "next/link";

const AddRatingPage = () => {
    const [restaurantId, setRestaurantId] = useState(1);
    const [email, setEmail] = useState('');
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newRating: Rating = {
            id: generateNewId(ratingsData),
            restaurantId: restaurantId,
            email: email,
            rating: rating,
            comment: comment
        };

        try {
            const response = await fetch('/api/rating', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newRating),
            });

            if (response.ok) {
                const addedRating = await response.json();
                console.log('Added rating:', addedRating);
                await router.push('/restaurant/' + restaurantId);
            } else {
                console.error('Failed to add rating');
            }
        } catch (error) {
            console.error('Error adding rating:', error);
        }
    };

    return (
        <div className={formStyle.container}>
            <h1>Ajouter une note</h1>
            <form onSubmit={handleSubmit} className={formStyle.form}>
                <div className={formStyle.container_imput}>
                    <label className={formStyle.imput_element}>Email :</label>
                    <input required className={formStyle.label_element} type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className={formStyle.container_imput}>
                    <label className={formStyle.imput_element}>Restaurant :</label>
                    <select className={formStyle.label_element} onChange={(e) => setRestaurantId(Number(e.target.value))}>
                        {restaurantsData.map((restaurant: Restaurant) => (
                            <option key={restaurant.id} value={restaurant.id}>{restaurant.name}</option>))}
                    </select>
                </div>
                <div className={formStyle.container_imput}>
                    <label className={formStyle.imput_element}>Note :</label>
                    <input required className={formStyle.label_element} type="number" min={0} max={5} value={rating} onChange={(e) => setRating(Number(e.target.value))}/>
                </div>
                <div className={formStyle.container_imput}>
                    <label className={formStyle.imput_element}>Commentaire :</label>
                    <input required className={formStyle.label_element} type="text" value={comment} onChange={(e) => setComment(e.target.value)}/>

                </div>
                <div className={formStyle.container_submit}>
                    <button type="submit">Ajouter</button>
                    <button><Link className={style.link} href={`/`}>Retour</Link></button>
                </div>
            </form>
        </div>
    );
};

export default AddRatingPage;