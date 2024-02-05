import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLocation } from 'react-router-dom';

const CustomerSellHistory = () => {
    const { id } = useParams();
    const location = useLocation();
    const customer = location.state.customer;
    console.log(customer);

    return (
        <div>
            <p> {id}</p>
            <p> {customer.name}</p>
        </div>
    )
}

export default CustomerSellHistory;