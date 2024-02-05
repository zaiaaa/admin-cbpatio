import { FormCadCampeonato } from "../../components/FormCadCampeonato/FormCadCampeonato"
import { SliderCampeonatos } from "../../components/SliderCampeonatos/SliderCampeonatos"


const Campeonatos = () => {

    return (
        <>
            <h1 >Campeonatos</h1>
            <h2 className="h2-sublinhado">CADASTRADOS</h2>
            <SliderCampeonatos />
            <h2 className="h2-sublinhado">NOVO CAMPEONATO</h2>
            <FormCadCampeonato />
        </>
    )
}
export { Campeonatos }