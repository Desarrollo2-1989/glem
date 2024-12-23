// src/components/Card.jsx
import React from 'react';

const Card = ({ title, value }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-6 m-2 flex flex-col justify-between">
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="text-2xl font-bold text-blue-600">{value}</p>
        </div>
    );
};

export default Card;
