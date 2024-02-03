
import React, { useContext, useEffect } from 'react'
import "./login.css"
import { Card } from '../../components/Card/card'
import { Input } from '../../components/Input/input'
import { Button } from '../../components/Button/button'

import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import foto from "../../assets/logo.png"
import { AuthContext } from '../../context/auth'

const schema = yup.object({
  login: yup.string().required('Campo obrigatório'),
  senha: yup.string().required('Campo obrigatório')
}).required()


const Login = () => {

  const { handleLogin, erros } = useContext(AuthContext)

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
      handleLogin(formData)
    } catch (e) {
      console.log(e)
    }
    console.log(formData)
  }


  return (
    <div className='bg'>
      <div className='ct-card'>
        <Card variant={"purple"} width={"30rem"}>
          <h2>Login</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='ct-input'>
              <div>
                <label htmlFor="login">Login</label>
                <Input name={"login"} control={control} placeholder={"Login"} />
              </div>

              <div>
                <label htmlFor="senha">Senha</label>
                <Input name={"senha"} control={control} type={"password"} placeholder={"Senha"} />
              </div>
            </div>
            <Button text={"Entrar"} variant={"green"} type={"submit"} width={"20%"} />
          </form>
          <div className='ct-img'>
            <img src={foto} alt="adwawd" />
          </div>
          <p align="center" color='red'>{erros}</p>

        </Card>
      </div>
      {errors?.senha?.message}

    </div>
  )
}

export { Login }
