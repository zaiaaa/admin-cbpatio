import './Layout.css'
import { Link } from 'react-router-dom/dist'
import foto from "../../assets/logo.png"

const Layout = ({ children }) => {

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
                    <div className="live-on-btn">
                        live on?
                    </div>
                </div>
                <div className="children">
                    {children}
                </div>
            </div>
        </>
    )
}

export { Layout }