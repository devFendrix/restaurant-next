import {NextApiRequest, NextApiResponse} from 'next';
import fs from 'fs';
import {Rating} from '@/types/rating';

const RATINGS_FILE_PATH = './data/ratings.json';

export default (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const {id, restaurantId, email, rating, comment} = req.body;
        const newRating: Rating = {
            id,
            restaurantId,
            email,
            rating,
            comment,
        };

        const ratings = JSON.parse(fs.readFileSync(RATINGS_FILE_PATH).toString());
        ratings.push(newRating);

        fs.writeFileSync(RATINGS_FILE_PATH, JSON.stringify(ratings, null, 2));

        res.status(201).json(newRating);
    } else {
        // Méthode HTTP non autorisée
        res.status(405).end();
    }
};
