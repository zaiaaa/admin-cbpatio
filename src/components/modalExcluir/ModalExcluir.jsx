import { ModalComponent } from "../Modal/Modal"

const ModalExcluir = ({handleOnClickSaveButton}) => {

    return (
        <>

            <ModalComponent
                variant="negative"
                titulo={'Você deseja realmente excluir o campeonato?'}
                textModalOpenBtn={'Excluir o campeonato'}
                variantTextOpenBtn={'orange'}
                handleOnClickSaveButton={handleOnClickSaveButton}
            />

        </>
    )
}

export { ModalExcluir }