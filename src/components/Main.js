import React, { useEffect } from 'react';
import editButton from '../images/Edit-Button.svg'
import api from '../utils/Api'
import Card from './Card';

function Main(props) {
    const { onEditAvatar, onEditProfile, onAddPlace, onCardClick } = props

    const [userAvatar, setuserAvatar] = React.useState('')
    const [userName, setUserName] = React.useState('')
    const [userDescription, setUserDescription] = React.useState('')
    const [cards, setCards] = React.useState([])

    useEffect(() => {
        api.getProfileInfo()
            .then((res) => {
                setuserAvatar(res.avatar)
                setUserName((res.name))
                setUserDescription((res.about))
            })
            .catch(error => console.error(error))
    }, [])

    useEffect(() => {
        api.getInitialCards()
            .then((res) => {
                setCards((res))
            })
            .catch(error => console.error(error))
    }, [])

    return (
        <main>
            <section className="profile">
                <div>
                    <img className="profile__avatar" src={userAvatar} alt="ава"
                        onClick={onEditAvatar}
                    />
                    <p className="profile__avatar-edit"
                    >

                    </p>
                </div>
                <div className="profile__info">
                    <h1 className="profile__info-text-title">{userName}</h1>
                    <img className="profile__edit-button" src={editButton} alt="кнопка-изменения"
                        onClick={onEditProfile}
                    />
                    <p className="profile__info-text-subtitle">{userDescription}</p>
                </div>
                <button className="profile__add-button" type="button"
                    onClick={onAddPlace}
                >
                </button>
            </section>
            <section className="elements">
                {cards.map((card) => (
                    <Card card={card} key={card._id} onCardClick={onCardClick} />
                ))}
            </section>

        </main>
    );
}

export default Main 