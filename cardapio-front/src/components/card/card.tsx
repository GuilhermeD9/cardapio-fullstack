import React from "react";
import "./card.css"

interface CardProps {
    price: number,
    title: string,
    image: string
    id: number;
    onDelete: (id:number) => void;
}

export const Card: React.FC<CardProps> = ({ price, title, image, id, onDelete}) => {
    return(
        <div className="card">
            <img src={image}/>
            <h2>{title}</h2>
            <p><b>Valor: R$</b>{price}</p>
            <button onClick={() => onDelete(id)}>Deletar</button>
        </div>
    )
}