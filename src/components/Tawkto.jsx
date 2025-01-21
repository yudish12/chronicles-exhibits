"use client";
import React, { useRef } from 'react'
import TawkMessengerReact from '@tawk.to/tawk-messenger-react';

const Tawkto = () => {
    const tawkMessengerRef = useRef();

    const handleMinimize = () => {
        tawkMessengerRef.current.minimize();
    };

    return (
        <TawkMessengerReact
            propertyId="678a08f2825083258e06b98f"
            widgetId="1ihpj5th0"
            ref={tawkMessengerRef} />
    )
}

export default Tawkto