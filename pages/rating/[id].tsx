import {useRouter} from 'next/router';
import {Rating} from '@/types/rating';
import ratingsData from '@/data/ratings.json';
import restaurantsData from '@/data/restaurants.json';
import Link from "next/link";
import {Restaurant} from "@/types/restaurant";

const RatingPage = () => {
    const router = useRouter();
    const {id} = router.query;

    const rating = ratingsData.find((r: Rating) => r.id === parseInt(id as string));

    if (!rating) {
        return <div>Note introuvable.</div>;
    }

    return (
        <div>
            <Link href={`/`}>Retour</Link>
            <h1>Restaurant : {restaurantsData.map((restaurant: Restaurant) => (restaurant.id === rating.restaurantId ? restaurant.name : null))}</h1>
            <p>Email : {rating.email}</p>
            <p>Note : {rating.rating}</p>
            <p>Commentaire : {rating.comment}</p>
        </div>
    );
};

export default RatingPage;