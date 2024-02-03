import { Grid, GridItem, Textarea } from '@chakra-ui/react'
import { Input } from '../Input/input'
import { Button } from '../Button/button'
import './FormCadCampeonato.css'
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Api } from '../../services/api'

    const schema = yup.object({
        nome: yup.string(),
        modalidade: yup.string().max(20, 'No máximo 20 caracteres.'),
        sinopse: yup.string(),
        
        valor_entrada: yup.number().test({
            name: 'formato',
            message: 'O número deve estar no formato 0.00',
            test: value => /^\d+(\.\d{1,2})?$/.test(value.toString()),
        }).typeError('Deve ser um número'),
        premiacao: yup.number().test({
            name: 'formato',
            message: 'O número deve estar no formato 0.00',
            test: value => /^\d+(\.\d{1,2})?$/.test(value.toString()),
        }).typeError('Deve ser um número'),

        jogadores_por_time: yup.number().typeError('Deve ser um número'),
        limite_de_inscrição: yup.number('Deve ser um número'),
        foto: yup.mixed(),
        data_hora: yup.date()
        

    }).required()

const FormCadCampeonato = () => {

    // falta só fazer a requisição aqui
    const handleCreateCampeonato = async (formData) => {
        try{
            Api.post('/campeonatos/cadastrar', {
                nome: formData.nome,
                foto: formData.foto,

            })
        }catch(e){

        }
    }

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
    })


    const onSubmit = async (formData) => {
        try {
            console.log(formData)
        } catch (e) {
            console.log(e)
        }
        //console.log(formData)
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
                        <Input name={"nome"} control={control} type={"text"} />
                    </GridItem>
                    <GridItem colSpan={2}>
                        <label htmlFor="modalidade">Modalidade</label>
                        <Input name={"modalidade"} control={control} type={'text'}/>
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
                            outline={'none'} 
                            type={'text'}
                            required
                        />
                    </GridItem>
                    <GridItem colSpan={2}>
                        <label htmlFor="valor_entrada">Valor da Entrada</label>
                        <Input name={"valor_entrada"} control={control}/>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <label htmlFor="premiacao">Premiação</label>
                        <Input name={"premiacao"} control={control} />
                    </GridItem>
                    <GridItem colSpan={2}>
                        <label htmlFor="jogadores_por_time">Jogadores por time</label>
                        <Input name={"jogadores_por_time"} control={control} type={'number'} />
                    </GridItem>

                    <GridItem colSpan={2}>
                        <label htmlFor="limite_de_inscrição">Limite de inscrição</label>
                        <Input name={"limite_de_inscrição"} control={control} type={'number'} />
                    </GridItem>
                    <GridItem colSpan={2} >
                        <label htmlFor="foto">Foto</label>
                        <Input name={"foto"} control={control} type={"file"}/>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <label htmlFor="data_hora">Data & Hora</label>
                        <Input name={"data_hora"} control={control} type='datetime-local' />
                    </GridItem>
                    <GridItem colSpan={1}>
                        <Button  text={"Cadastrar"} variant={"green"} type={"submit"} width={"100%"} padding={'2rem'} margin={'1.5rem 0'} />
                    </GridItem>
                    <GridItem colSpan={1}>
                        <Button  text={"Limpar"} variant={"yellow"} type={"reset"} width={"100%"} margin={'1.5rem 0'} padding={'2rem'}/>
                    </GridItem>
                </Grid>
                {/* colocar todos os possiveis erros nesse formato */}
                <p>{errors?.nome?.message}</p>
                <p>{errors?.data_hora?.message}</p>
                <p>{errors?.foto?.message}</p>
                <p>{errors?.jogadores_por_time?.message}</p>
                <p>{errors?.limite_de_inscrição?.message}</p>
                <p>{errors?.sinopse?.message}</p>
                <p>{errors?.valor_entrada?.message}</p>
                <p>{errors?.modalidade?.message}</p>
                <p>{errors?.premiacao?.message}</p>

            </form>
        </>
    )

}

export { FormCadCampeonato }