import trash from '../images/Trash.svg'


function Card(props) {
    const { card, onCardClick } = props

    function handleClick() {
        onCardClick(card);
    }

    return (
        <article className="elements__element">
            <img className="elements__mask-group" alt={card.name} src={card.link}
                onClick={handleClick} />
            <img className="elements__trash" src={trash} alt="Мусорка"
            />
            <div className="elements__group-white">
                <p className="elements__title">{card.name}</p>
                <div className="elements__group-subtitle">
                    <button className="elements__group" type="button"></button>
                    <p className="element__number-like">{card.likes.length}</p>
                </div>
            </div>
        </article>
    )
}

export default Card