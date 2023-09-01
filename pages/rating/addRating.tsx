import React, {useState} from 'react';
import {useRouter} from 'next/router';
import {Rating} from '@/types/rating';
import restaurantsData from '@/data/restaurants.json';
import ratingsData from '@/data/ratings.json';
import generateNewId from "@/services/idGeneratorService";
import {Restaurant} from "@/types/restaurant";

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
            const response = await fetch('/api/ratings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newRating),
            });

            if (response.ok) {
                const addedRating = await response.json();
                console.log('Added rating:', addedRating);
                await router.push('/');
            } else {
                console.error('Failed to add rating');
            }
        } catch (error) {
            console.error('Error adding rating:', error);
        }
    };

    return (
        <div>
            <h1>Ajouter une note</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email :</label>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>

                </div>
                <div>
                    <label>Restaurant :</label>
                    <select onChange={(e) => setRestaurantId(Number(e.target.value))}>
                        {restaurantsData.map((restaurant: Restaurant) => (
                            <option key={restaurant.id} value={restaurant.id}>{restaurant.name}</option>))}
                    </select>
                </div>
                <div>
                    <label>Note :</label>
                    <input type="number" value={rating} onChange={(e) => setRating(Number(e.target.value))}/>
                </div>
                <div>
                    <label>Commentaire :</label>
                    <input type="text" value={comment} onChange={(e) => setComment(e.target.value)}/>

                </div>
                <button type="submit">Ajouter</button>
            </form>
        </div>
    );
};

export default AddRatingPage;