import { useContext } from "react"
import { Button } from "../../components/Button/button"
import { AuthContext } from "../../context/auth"

const Campeonatos = () => {
    
    const {logoff} = useContext(AuthContext)
    
    return (
        <>
            <h1>Campeonatos</h1>
            <Button text={"deslogar"} variant={"green"} type={"button"} onClick={logoff}/>
        </>
    )
}
export {Campeonatos}