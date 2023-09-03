import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Restaurant } from '@/types/restaurant';
import restaurantsData from '@/data/restaurants.json';
import generateNewId from "@/services/idGeneratorService";
import Link from "next/link";

const AddRestaurantPage = () => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newRestaurant: Restaurant = {
            id: generateNewId(restaurantsData),
            name,
            address,
        };

        try {
            const response = await fetch('/api/restaurants', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newRestaurant),
            });

            if (response.ok) {
                const addedRestaurant = await response.json();
                console.log('Added restaurant:', addedRestaurant);
                await router.push('/');
            } else {
                console.error('Failed to add restaurant');
            }
        } catch (error) {
            console.error('Error adding restaurant:', error);
        }
    };

    return (
        <div>
            <button><Link href={`/`}>Retour</Link></button>
            <h1>Ajouter un restaurant</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nom :</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <label>Adresse :</label>
                    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
                </div>
                <button type="submit">Ajouter</button>
            </form>
        </div>
    );
};

export default AddRestaurantPage;