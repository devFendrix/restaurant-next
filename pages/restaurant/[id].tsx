import { useRouter } from 'next/router';
import { Restaurant } from '@/types/restaurant';
import restaurantsData from '@/data/restaurants.json';
import Link from "next/link";

const RestaurantPage = () => {
    const router = useRouter();
    const { id } = router.query;

    const restaurant = restaurantsData.find((r: Restaurant) => r.id === parseInt(id as string));

    if (!restaurant) {
        return <div>Restaurant non trouvé.</div>;
    }

    return (
        <div>
            <Link href={`/`}>Retour</Link>
            <h1>Nom : {restaurant.name}</h1>
            <p>Adresse : {restaurant.address}</p>
        </div>
    );
};

export default RestaurantPage;