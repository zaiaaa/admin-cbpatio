import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverArrow,
    PopoverCloseButton,
    Button
} from '@chakra-ui/react'

const PopoverComponent = ({textDispare, children, popoverTitle}) => {
    return (
        <>
            <Popover>
                <PopoverTrigger>
                    <Button backgroundColor={'transparent'}  width={'10%'}>{textDispare}</Button>
                </PopoverTrigger>
                <PopoverContent>
                   
                   
                    <PopoverHeader color={'#303030'} fontWeight={'600'}>{popoverTitle}</PopoverHeader>
                    <PopoverBody color={'#303030'} fontWeight={'600'}>{children}</PopoverBody>
                </PopoverContent>
            </Popover>

        </>
    )

}

export { PopoverComponent }