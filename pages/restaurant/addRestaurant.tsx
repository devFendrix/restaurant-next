import { useState } from 'react';
import { useRouter } from 'next/router';
import { Restaurant } from '@/types/restaurant';
import restaurantsData from '@/data/restaurants.json';
import generateNewId from "@/services/idGenerator";

const AddRestaurantPage = () => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newRestaurant: Restaurant = {
            id: generateNewId(restaurantsData),
            name,
            address,
        };

        // @TODO Logic to add newRestaurant to JSON file or another data storage
        console.log(newRestaurant);

        router.push('/');
    };

    return (
        <div>
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