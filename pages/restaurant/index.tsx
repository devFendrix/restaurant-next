// pages/restaurants.tsx
import React from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import { Restaurant } from '../../types/restaurant';
import { getRestaurants } from '../../services/restaurantService';
import RestaurantItem from '../../components/RestaurantItem';

const Restaurants: NextPage = () => {
    const restaurants: Restaurant[] = getRestaurants();

    return (
        <div>
            <h1>Liste des Restaurants</h1>
            <Link href="/add-restaurant">
                <a>Ajouter un restaurant</a>
            </Link>
            <ul>
                {restaurants.map((restaurant) => (
                    <RestaurantItem key={restaurant.id} restaurant={restaurant} />
                ))}
            </ul>
        </div>
    );
};

export default Restaurants;
