import React, { useEffect } from 'react';
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
// import PopupWithForm from './PopupWithForm'
import EditProfilePopup from './EditProfilePopup'
import AddPlacePopup from './AddPlacePopup'
import EditAvatarPopup from './EditAvatarPopup'
import ImagePopup from './ImagePopup'
import api from '../utils/Api'
import { CurrentUserContext } from './contexts/CurrentUserContext'


function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isPopupOpenImage, setIsPopupOpenImage] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(null)
    const [currentUser, setCurrentUser] = React.useState('')
    const [cards, setCards] = React.useState([])

    useEffect(() => {
        api.getProfileInfo()
            .then(res => {
                setCurrentUser(res)
            })
            .catch(error => console.error(error))
    }, [])

    useEffect(() => {
        api.getInitialCards()
            .then((res) => {
                setCards(res)
            })
            .catch(error => console.error(error))
    }, [])

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        if (!isLiked) {
            api.likeCard(card._id)
                .then((newCard) => {
                    setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
                });
        } else {
            api.likeOffCard(card._id)
                .then((newCard) => {
                    setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
                });
        }
    }

    function handleCardDelete(card) {
        api.deliteCard(card._id)
            .then(setCards(cards.filter(element => element._id !== card._id)))
    }

    const handleEditProfileClick = () => {
        setIsEditProfilePopupOpen(true)
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true)
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true)
    }

    function handleCardClick(card) {
        setIsPopupOpenImage(true)
        setSelectedCard(card)
    }

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false)
        setIsAddPlacePopupOpen(false)
        setIsEditAvatarPopupOpen(false)
        setIsPopupOpenImage(false)
    }

    function handleUpdateUser(obj) {
        api.patchProfileInfo(obj.name, obj.about)
        obj.avatar = currentUser.avatar
        setCurrentUser(obj)
        closeAllPopups()
    }

    function handleUpdateAvatar(link) {
        api.newAvatar(link.avatar)
        link.name = currentUser.name
        link.about = currentUser.about
        closeAllPopups()
        setCurrentUser(link)
    }

    function handleAddPlaceSubmit(input) {
        api.addNewCard(input.place, input.link)
            .then((newCard) => {
                setCards([newCard, ...cards]);
            })
        closeAllPopups()
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="body">
                <Header />
                <Main
                    onEditProfile={handleEditProfileClick}
                    onEditAvatar={handleEditAvatarClick}
                    onAddPlace={handleAddPlaceClick}
                    onCardClick={handleCardClick}
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                />
                <Footer />
                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                >
                </EditProfilePopup>
                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateCards={handleAddPlaceSubmit}
                >
                </AddPlacePopup>
                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                />
                <ImagePopup
                    card={selectedCard}
                    isOpen={isPopupOpenImage}
                    onClose={closeAllPopups}
                />
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
