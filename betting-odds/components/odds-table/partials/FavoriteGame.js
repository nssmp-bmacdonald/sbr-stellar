import { useRouter } from 'next/router';

import { useEffect, useState } from 'react';

import { isFavorite, deleteFavorite, saveFavorite } from '/data/favorite-data';

import style from '/styles/odds-table/partials/FavoriteGame.module.scss';

const FavoriteGame = ({ gameId, league, date, updateOddsTables }) => {
    const { asPath } = useRouter();
    const [isSelected, setIsSelected] = useState(false);

    useEffect(() => {
       setIsSelected(isFavorite(gameId));
    }, [gameId])

    const saveGame = () => {
        const isFavorites = asPath.includes('/favorites');

        // toggle the button
        if (!isFavorites)
            setIsSelected(!isSelected);

        if (!isSelected) {
            saveFavorite(gameId, league, date);
            updateOddsTables(gameId, 'add');
        }
        else {
            deleteFavorite(gameId);
            updateOddsTables(gameId, 'delete');
        }
    }

    return (
        <button
            id={gameId}
            data-cy="favorite-icon"
            className={`flex-centered ${style.iconFavorite} ${isSelected ? style.selected : ''}`}
            onClick={saveGame}>
            <i className="sbr-icon-star-icon"></i> <span className='sr-only'>Click this button to add this game as a favorite</span>
        </button>
    )
}


export default FavoriteGame;