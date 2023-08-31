import Link from 'next/link';
import { Restaurant } from '../types/restaurant';
import restaurantsData from '../data/restaurants.json';

const HomePage = () => {
    return (
        <div>
            <h1>Liste des restaurants</h1>
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
