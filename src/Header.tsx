import { useState } from "react";

function Header() {
    const [rando, setRando] = useState(0);

    return (
        <>
            <h1>RG Masonry</h1>
            <button
                onClick={(e) => {
                    setRando(Math.random());
                }}
            >
                JUST CHANGE: {rando}
            </button>
        </>
    );
}

export default Header;
