import React from 'react';
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import PopupWithForm from './PopupWithForm'
import ImagePopup from './ImagePopup'


function App() {
    const [ isEditProfilePopupOpen, setEditProfilePopupOpen ] = React.useState(false);
    const [ isAddPlacePopupOpen, setAddPlacePopupOpen ] = React.useState(false);
    const [ isEditAvatarPopupOpen, setEditAvatarPopupOpen ] = React.useState(false);
    const [ isPopupOpenImage, setPopupOpenImage ] = React.useState(false);
    const [ selectedCard , setSelectedCard ] = React.useState(null)
    

    const handleEditProfileClick = () => {
        setEditProfilePopupOpen(true)
    }
    
    function handleAddPlaceClick() {
        setAddPlacePopupOpen(true)
    }

    function handleEditAvatarClick() {
        setEditAvatarPopupOpen(true)
    }

    function handleCardClick(card) {
        setPopupOpenImage(true)
        setSelectedCard(card)
    }
    
    function closeAllPopups() {
        setEditProfilePopupOpen(false)
        setAddPlacePopupOpen(false)
        setEditAvatarPopupOpen(false)
        setPopupOpenImage(false)
    }
  return (
    <div className="body">
        <Header />
        <Main
        onEditProfile={handleEditProfileClick}
        onEditAvatar={handleEditAvatarClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
        />
        <Footer />
        <PopupWithForm
            name ='profile-popup'
            title ='Редактировать профиль'
            isOpen = {isEditProfilePopupOpen ? 'popup_opened' : ''}
            onClose = {closeAllPopups}
        >
            <input id="title-input" className="popup__input popup__input_field_title" readOnly type="text" name="name" value="Жак-Ив Кусто" placeholder="Имя" minLength="2" maxLength="40" required />
            <span className="title-input-error popup__error-hidden"></span>
            <input id="subtitle-input" className="popup__input popup__input_field_subtitle" type="text" name="job" readOnly value="Исследователь океана" placeholder="Профессиональная деятельность" minLength="2" maxLength="200" required  />
            <span className="subtitle-input-error popup__error-hidden popup__error-subtitle"></span>
            <button className="popup__button popup__button_disabled" type="submit" >Сохранить</button>
        </PopupWithForm>

        <PopupWithForm
            name = 'popup-cards' 
            title = 'Новое место'
            isOpen = {isAddPlacePopupOpen ? 'popup_opened' : ''}
            onClose = {closeAllPopups}
        >
            <input id="name-input" className="popup__input popup-cards__container-field-title-plus" type="text" name="field-text-title"  placeholder="Название" minLength="2" maxLength="30" required />
            <span className="name-input-error popup__error-hidden"></span>
            <input id="link-input" className="popup__input popup-cards__container-field-subtitle-plus" type="url" name="field-text-subtitle" placeholder="Ссылка на картинку" required />
            <span className="link-input-error popup__error-hidden popup__error-subtitle"></span>
            <button className="popup__button popup__button_disabled" type="submit">Создать</button>
        </PopupWithForm>

        <PopupWithForm
            name ='popup-avatar' 
            title ='Обновить аватар' 
            isOpen = {isEditAvatarPopupOpen ? 'popup_opened' : ''}
            onClose = {closeAllPopups}
        >
            <input id="avatar-input" className="popup__input popup-avatar__input" type="url" name="avatar" placeholder="Ссылка на аватар" required />
            <span className="avatar-input-error popup__error-hidden"></span>
            <button  className="popup__button popup__button_disabled"  type="submit">Сохранить</button>

        </PopupWithForm>

        <ImagePopup 
        card = {selectedCard} 
        isOpen = {isPopupOpenImage ? 'popup_opened' : ''}
        onClose = {closeAllPopups}
        />
    </div>
  );
}

export default App;
