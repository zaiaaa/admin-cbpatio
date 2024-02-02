import './Layout.css'
import { Link } from 'react-router-dom/dist'
import { useEffect, useContext } from 'react'
import foto from "../../assets/logo.png"
import { AuthContext } from '../../context/auth'

const Layout = ({ children }) => {


    return (
        <>
            <div className="layout">
                <div className="sidebar">
                    <div className="logo">
                        <img src={foto} alt="logo" />
                    </div>
                    <nav>
                        <ul>
                            <Link to={"/campeonatos"}>Campeonatos</Link>
                            <Link to={"/home"}>home</Link>
                        </ul>
                    </nav>
                </div>
                <div className="children">
                    {children}
                </div>
            </div>
        </>
    )
}

export { Layout }