import { useParams } from "react-router-dom"

const EditarCampeonato = () =>{
    const {id} = useParams()


    return(
        <>
            oie {id}
        </>
    )
}

export {EditarCampeonato}