"use client";
import React, { useRef } from 'react'
import dynamic from "next/dynamic";

const TawkMessengerReact = dynamic(() => import('@tawk.to/tawk-messenger-react'), { ssr: false });

const Tawkto = () => {
    const tawkMessengerRef = useRef();

    const handleMinimize = () => {
        tawkMessengerRef.current.minimize();
    };

    return (
        <div className="fixed bottom-0 right-0">
            <TawkMessengerReact
                propertyId="678a08f2825083258e06b98f"
                widgetId="1ihpj5th0"
                ref={tawkMessengerRef}
            />
        </div>
    )
}

export default Tawkto