import { useEffect } from "react";

import './style.css';

import backImage from './assets/error.png';

export default function NoMatch() {

    useEffect(() => {
        document.title = "Page No Found";
    }, []);

    return (
        <main className="main-noPageFound">
            <div className="back-img-noPageFound">
                <img src={backImage} alt="no se ha encontrado la pagina imagen" />
            </div>
            <h2 className="title-noPageFound">ERROR 404</h2>
            <h3 className="subtitle-noPageFound">Page no found</h3>
        </main>
    );
}