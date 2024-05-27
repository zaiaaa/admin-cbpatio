import {
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import { Button } from '../Button/button'

const ModalComponent = ({ children, titulo, textModalOpenBtn, variantTextOpenBtn, handleOnClickSaveButton}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Button text={textModalOpenBtn} type={'button'} variant={variantTextOpenBtn} padding={'1rem'} width={'50%'} margin={'25px 0'} onClick={onOpen} />

            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} size={'xl'}>
                <ModalOverlay
                    backdropFilter='auto'
                    backdropBlur='1.5px' />
                <ModalContent backgroundColor={'#1B1D21'}>
                    <ModalHeader>{titulo}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        {children}
                    </ModalBody>

                        <ModalFooter>
                            {
                                handleOnClickSaveButton && (
                                    <Button text={'Salvar'} type={'button'} variant={'green'} padding={'1rem'} width={'100%'}
                                        onClick={handleOnClickSaveButton} />
                                )
                            }
                            <Button text={'Cancelar'} type={'button'} variant={'red'} padding={'1rem'} margin={'10px'} width={'100%'} onClick={onClose} />

                        </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export { ModalComponent }