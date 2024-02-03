import { Grid, GridItem, Textarea } from '@chakra-ui/react'
import { Input } from '../Input/input'
import { Button } from '../Button/button'
import './FormCadCampeonato.css'
import { useForm } from 'react-hook-form'


const FormCadCampeonato = () => {

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm()


    const onSubmit = async (formData) => {
        try {
            console.log(formData)
        } catch (e) {
            console.log(e)
        }
        console.log(formData)
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className='form-campeonato'>
                {/* grid com 4 linhas e 6 colunas */}
                <Grid
                    templateRows='repeat(4, 1fr)'
                    templateColumns='repeat(6, 1fr)'
                    gap={2}
                >
                    <GridItem colSpan={4}>
                        <label htmlFor="nome">Nome</label>
                        <Input name={"nome"} control={control} />
                    </GridItem>
                    <GridItem colSpan={2}>
                        <label htmlFor="modalidade">Modalidade</label>
                        <Input name={"modalidade"} control={control} />
                    </GridItem>
                    <GridItem rowSpan={2} colSpan={2}>
                        <label htmlFor="sinopse">Sinopse</label>
                        <Textarea
                            name={"modalidade"}
                            control={control}
                            placeholder='Digite uma breve descrição sobre o campeonato...'
                            backgroundColor={'#fff'}
                            borderRadius={'10px'}
                            color={'#303030'}
                            height={'166px'}
                            size='md'
                        />
                    </GridItem>
                    <GridItem colSpan={2}>
                        <label htmlFor="valor_entrada">Valor da Entrada</label>
                        <Input name={"valor_entrada"} control={control} />
                    </GridItem>
                    <GridItem colSpan={2}>
                        <label htmlFor="premiacao">Premiação</label>
                        <Input name={"premiacao"} control={control} />
                    </GridItem>
                    <GridItem colSpan={2}>
                        <label htmlFor="jogadores_por_time">Jogadores por time</label>
                        <Input name={"jogadores_por_time"} control={control} />
                    </GridItem>

                    <GridItem colSpan={2}>
                        <label htmlFor="limite_de_inscrição">Limite de inscrição</label>
                        <Input name={"limite_de_inscrição"} control={control} />
                    </GridItem>
                    <GridItem colSpan={2} >
                        <label htmlFor="foto">Foto</label>
                        <Input name={"foto"} control={control}  />
                    </GridItem>
                    <GridItem colSpan={2}>
                        <label htmlFor="data_hora">Data & Hora</label>
                        <Input name={"data_hora"} control={control} />
                    </GridItem>
                    <GridItem colSpan={1}>
                        <Button  text={"Cadastrar"} variant={"green"} type={"submit"} width={"100%"} />
                    </GridItem>
                    <GridItem colSpan={1}>
                        <Button  text={"Limpar"} variant={"yellow"} type={"reset"} width={"100%"} />
                    </GridItem>
                </Grid>
                
            </form>
        </>
    )

}

export { FormCadCampeonato }