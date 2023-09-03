import {useRouter} from 'next/router';
import {Restaurant} from '@/types/restaurant';
import restaurantsData from '@/data/restaurants.json';
import ratingsData from '@/data/ratings.json';
import Link from "next/link";
import restaurantsStyle from "@/styles/restaurants.module.css"
import style from '@/styles/global.module.css'

const RestaurantPage = () => {
    const router = useRouter();
    const {id} = router.query;

    const restaurant = restaurantsData.find((r: Restaurant) => r.id === parseInt(id as string));

    if (!restaurant) {
        return <div>Restaurant non trouvé.</div>;
    }

    return (
        <div className={restaurantsStyle.container}>
            <div className={restaurantsStyle.container_menu}>
                <h1>Restaurant : {restaurant.name}</h1>
                <p>Adresse : {restaurant.address}</p>
                <div className={restaurantsStyle.container_button}>
                    <button><Link className={style.link} href={`/`}>Retour</Link></button>
                </div>
            </div>

            <div className={restaurantsStyle.container_list}>
                <h2 className={restaurantsStyle.title}>Avis clients</h2>
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