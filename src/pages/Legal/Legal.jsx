
import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Legal.scss";

function Legal() {

    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }, [pathname]);

    return (
        <div className='legal'>
            <h1>Mentions légales</h1>

            <div className="legal-div">
                <article className='legal-div__article'>
                    <h2>Editeur du site</h2>
                    <p>L'application web CleanHelper (ci-après "le Site") est éditée par :</p>
                    <ul>
                        <li><span className="legal-div__article--bold">Nom de l'éditeur :</span> Skorol</li>
                        <li><span className="legal-div__article--bold">Adresse :</span> [ADRESSE]</li>
                        <li><span className="legal-div__article--bold">Email de contact :</span> contact.skorol@gmail.com</li>
                        <li><span className="legal-div__article--bold">Téléphone :</span> 00 00 00 00 00</li>
                    </ul>
                </article>

                <article className="legal-div__article">
                    <h2>Hébergement</h2>
                    <ul>
                        <li> <span className="legal-div__article--bold"> Nom de l'hébergement :</span> </li>
                        <li> <span className="legal-div__article--bold">Adresse de l'hébergeur :</span></li>
                        <li><span className="legal-div__article--bold">Téléphone de l'hébergeur : </span></li>
                    </ul>
                </article>

                <article className="legal-div__article">
                    <h2>Propriété intellectuelle</h2>
                    <p>Tous les contenus présents sur le Site (textes, graphiques, logos,
                        images, logiciels, etc.) sont protégés par le droit d'auteur et sont la propriété exclusive de Skorol. Toute reproduction, modification,
                        distribution ou exploitation non autorisée est interdite.
                    </p>
                </article>

                <article className="legal-div__article">
                    <h2>Donnés personnelles</h2>
                    <p>Pour en savoir plus sur le traitement des données personnelles,
                        veuillez consulter notre Politique de confidentialité accessible <Link to="/confidentialite">ici</Link>
                    </p>
                </article>

                <article className="legal-div__article">
                    <h2>Responsabilité</h2>
                    <p>L'éditeur du Site met tout en œuvre pour fournir des informations fiables et maintenir un service de qualité.
                        Cependant, il ne saurait être tenu responsable : </p>
                    <ul>
                        <li>En cas d'erreurs ou d'omissions dans les informations fournies.</li>
                        <li>En cas de dysfonctionnements techniques, interruptions ou indisponibilités du Site.</li>
                    </ul>
                </article>

                <article className="legal-div__article">
                    <h2>Liens hypertextes</h2>
                    <p>Le Site peut contenir des liens vers d'autres sites. L'éditeur décline toute responsabilité concernant le contenu ou les pratiques de ces sites tiers.</p>
                </article>

                <article className="legal-div__article">
                    <h2> Droit applicable</h2>
                    <p>Les présentes mentions légales sont soumises au droit [français ou autre juridiction, selon ton cas]. Tout litige sera soumis aux tribunaux compétents.</p>
                </article>
            </div>
        </div>
    );
}

export default Legal;
