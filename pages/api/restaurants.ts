import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import { Restaurant } from '@/types/restaurant';

const RESTAURANTS_FILE_PATH = './data/restaurants.json';

export default (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const { id, name, address } = req.body;
        const newRestaurant: Restaurant = {
            id,
            name,
            address,
        };

        const restaurants = JSON.parse(fs.readFileSync(RESTAURANTS_FILE_PATH).toString());
        restaurants.push(newRestaurant);

        fs.writeFileSync(RESTAURANTS_FILE_PATH, JSON.stringify(restaurants, null, 2));

        res.status(201).json(newRestaurant);
    } else {
        // Méthode HTTP non autorisée
        res.status(405).end();
    }
};
