import {useRouter} from 'next/router';
import {Restaurant} from '@/types/restaurant';
import restaurantsData from '@/data/restaurants.json';
import ratingsData from '@/data/ratings.json';
import Link from "next/link";

const RestaurantPage = () => {
    const router = useRouter();
    const {id} = router.query;

    const restaurant = restaurantsData.find((r: Restaurant) => r.id === parseInt(id as string));

    if (!restaurant) {
        return <div>Restaurant non trouvé.</div>;
    }

    return (
        <div>
            <Link href={`/`}>Retour</Link>
            <h1>Nom : {restaurant.name}</h1>
            <p>Adresse : {restaurant.address}</p>
            <div>
                <p>Notes :</p>
                <ul>
                    {ratingsData.map((rating) => (
                        rating.restaurantId === restaurant.id ?
                            <li key={rating.id}>
                                <p>Email : {rating.email}</p>
                                <p>Note : {rating.rating}</p>
                                <p>Commentaire : {rating.comment}</p>
                            </li> :
                            null
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default RestaurantPage;