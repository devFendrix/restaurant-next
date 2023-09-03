import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Restaurant } from '@/types/restaurant';
import restaurantsData from '@/data/restaurants.json';
import generateNewId from "@/services/idGeneratorService";
import Link from "next/link";
import formStyle from "@/styles/form.module.css";
import style from "@/styles/global.module.css";

const AddRestaurantPage = () => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newId = generateNewId(restaurantsData)
        const newRestaurant: Restaurant = {
            id: newId,
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
                await router.push('/restaurant/' + newId);
            } else {
                console.error('Failed to add restaurant');
            }
        } catch (error) {
            console.error('Error adding restaurant:', error);
        }
    };

    return (
        <div className={formStyle.container}>
            <h1>Ajouter un restaurant</h1>
            <form className={formStyle.form} onSubmit={handleSubmit}>
                <div className={formStyle.container_imput}>
                    <label className={formStyle.imput_element}>Nom :</label>
                    <input className={formStyle.label_element} type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className={formStyle.container_imput}>
                    <label className={formStyle.imput_element}>Adresse :</label>
                    <input className={formStyle.label_element} type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
                </div>
                <div className={formStyle.container_submit}>
                    <button type="submit">Ajouter</button>
                    <button><Link className={style.link} href={`/`}>Retour</Link></button>
                </div>

            </form>
        </div>
    );
};

export default AddRestaurantPage;