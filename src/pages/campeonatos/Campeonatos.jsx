import { useContext } from "react"
import { Button } from "../../components/Button/button"
import { AuthContext } from "../../context/auth"
import { FormCadCampeonato } from "../../components/FormCadCampeonato/FormCadCampeonato"
import { SliderCampeonatos } from "../../components/SliderCampeonatos/SliderCampeonatos"


const Campeonatos = () => {

    const { logoff } = useContext(AuthContext)


    return (
        <>
            <h1 >Campeonatos</h1>
            <h2 className="h2-sublinhado">CADASTRADOS</h2>
            <SliderCampeonatos />
            <h2 className="h2-sublinhado">NOVO CAMPEONATO</h2>
            <FormCadCampeonato />
            <Button text={"deslogar"} variant={"green"} type={"button"} onClick={logoff} />
        </>
    )
}
export { Campeonatos }