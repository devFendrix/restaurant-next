import Link from 'next/link';
import { Restaurant } from '@/types/restaurant';
import restaurantsData from '@/data/restaurants.json';

const HomePage = () => {
    return (
        <div>
            <h1>Liste des restaurants</h1>
            <button>
                <Link href={`/restaurant/addRestaurant`}>Ajouter un restaurant</Link>
            </button>
            <button>
                <Link href={`/rating/addRating`}>Ajouter un avis</Link>
            </button>
            <ul>
                {restaurantsData.map((restaurant: Restaurant) => (
                    <li key={restaurant.id}>
                        <Link href={`/restaurant/${restaurant.id}`}>
                            {restaurant.name + " / " + restaurant.address}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HomePage;
