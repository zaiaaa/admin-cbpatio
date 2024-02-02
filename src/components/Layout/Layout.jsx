import './Layout.css'
import { Link } from 'react-router-dom/dist'

const Layout = ({ children }) => {
    return (
        <>
            <header>
                <div className="sidebar">
                    <div className="logo"></div>
                    <nav>
                        <ul>
                            <Link to={"/campeonatos"}>Campeonatos</Link>
                        </ul>
                    </nav>
                </div>
            </header>
                {children}
            <footer>
                footer content
            </footer>
        </>
    )
}

export {Layout}