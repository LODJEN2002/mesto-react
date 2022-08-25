import closeIcon from '../images/Close-Icon.svg'

function PopupWithForm(props) {
    const { name , title, isOpen , onClose } = props

    return(
        <div className={`popup ${name} ${isOpen}`}>
            <div className="popup__container">
                <img className="popup__close-icon" src={closeIcon} alt="Закрытие" onClick={onClose}/>
                <h2 className="popup__container-title">{title}</h2>
                <form className="popup__form" name={name}>
                    {props.children}
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm 