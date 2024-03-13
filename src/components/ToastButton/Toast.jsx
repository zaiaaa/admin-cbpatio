import { useToast } from '@chakra-ui/react'
import { Button } from '../Button/button'

const ToastButton = ({titleToast, descriptionToast, type, variant, text, width, padding, margin, onClick}) => {
    const toast = useToast()
    return (
        <Button
            type={type}
            variant={variant}
            text={text}
            width={width}
            padding={padding}
            margin={margin}
            onClick={() =>
                toast({
                    position: 'bottom-left',
                    title: titleToast,
                    description: descriptionToast,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                })
            }
        />
    )
}

export { ToastButton }