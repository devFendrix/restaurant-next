import Link from 'next/link';
import { Restaurant } from '@/types/restaurant';
import restaurantsData from '@/data/restaurants.json';
import restaurantsStyle from '@/styles/restaurants.module.css'
import style from '@/styles/global.module.css'

const HomePage = () => {
    return (
        <div className={restaurantsStyle.container}>
            <div className={restaurantsStyle.container_menu}>
                <h1>Liste des restaurants</h1>
                <div className={restaurantsStyle.container_button}>
                    <button className={restaurantsStyle.button}>
                        <Link className={style.link} href={`/restaurant/addRestaurant`}>Ajouter un restaurant</Link>
                    </button>
                    <button className={restaurantsStyle.button}>
                        <Link className={style.link} href={`/rating/addRating`}>Ajouter un avis</Link>
                    </button>
                </div>
            </div>
            <div className={restaurantsStyle.container_list}>
                <ul>
                    {restaurantsData.map((restaurant: Restaurant) => (
                        <li className={restaurantsStyle.list_element} key={restaurant.id}>
                            <Link className={style.restaurant} href={`/restaurant/${restaurant.id}`}>
                                {restaurant.name + " / " + restaurant.address}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>


        </div>
    );
};

export default HomePage;
