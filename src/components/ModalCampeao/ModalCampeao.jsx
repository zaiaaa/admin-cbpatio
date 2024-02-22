import { ModalComponent } from "../Modal/Modal"
import './ModalCampeao.css'

const ModalCampeao = () => {
    const handleOnClickSaveButton = () => {
        alert('KKKKKKKK quem ler gosta de dar o bozó')
    }


    return (
        <>
            <ModalComponent
                titulo={'Quem ganhou a porra toda?'}
                textModalOpenBtn={'Definir Campeão'}
                variantTextOpenBtn={'orange'}
                handleOnClickSaveButton={handleOnClickSaveButton}
            >
                <select name="campeao" id="campeao" className="select-campeao">
                    <option value="">
                        Selecione o otário do campeão:
                    </option>
                    <option value={`sei la`}>
                        times
                    </option>
                </select>
            </ModalComponent>
        </>
    )
}

export { ModalCampeao }