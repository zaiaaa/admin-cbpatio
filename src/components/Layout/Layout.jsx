import './Layout.css'
import { Link } from 'react-router-dom/dist'
import foto from "../../assets/logo.png"
import { useContext, useEffect, useState } from 'react';
import { Button } from '../Button/button';
import { AuthContext } from '../../context/auth';

const Layout = ({ children }) => {

    const {logoff} = useContext(AuthContext)

    const menuItem = document.querySelectorAll('.link');
    function selectLink() {
        menuItem.forEach((item) =>
            item.classList.remove('active')
        )
        this.classList.add('active')
    }

    menuItem.forEach((item) =>
        item.addEventListener('click', selectLink)
    )

    const [isliveOn, setIsLiveOn] = useState(false)

    const handleLiveOn = () => {
        setIsLiveOn(!isliveOn)
    }

    return (
        <>
            <div className="layout">
                <div className="sidebar">
                    <div className="logo">
                        <img src={foto} alt="logo" />
                    </div>
                    <nav>
                        <ul className='ul-sidebar'>
                            <Link to={"/campeonatos"} className='link'>Campeonatos</Link>
                            <Link to={"/jogos"} className='link'>Jogos</Link>
                            <Link to={"/valores"} className='link'>Valores</Link>

                        </ul>
                    </nav>
                    <Button text={ !isliveOn ? 'live on?' : 'live off?'} type={"button"} variant={"purple"} width={"100%"} padding={".75rem 2rem"} onClick={handleLiveOn} />
                    <Button text={'Sair'} type={"button"} variant={"red"} width={"100%"} padding={".75rem 2rem"} onClick={logoff} />
                </div>
                <div className="children">
                    {children}
                </div>
            </div>
        </>
    )
}

export { Layout }