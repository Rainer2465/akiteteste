import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap'
import Header from '../Header';
import { Link } from 'react-router-dom';
import api from '../../services/api'
import { login } from '../../services/auth'

export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            message: '',
        };

    }


    signIn = async () => {
        const data = { email: this.email, senha: this.senha };
        api.post('auth/authenticate', data)
            .then(response => { return response.data })
            .then(data => {
                localStorage.setItem('nome', data.user.nome);
                localStorage.setItem('administrador', data.user.administrador);
                login(data.token);
                this.props.history.push("/home");

            })
            .catch(e => {
                this.setState({ message: e.message })
            });
    };

    render() {
        return (
            <div class="area">
                <ul class="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            <div className="container col-md-4 mt-5">
            <head>
                <meta charset="UTF-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" type="image/png" href="images/icons/favicon.ico"/>
                <link rel="stylesheet" type="text/css" href="vendor/bootstrap/css/bootstrap.min.css"/>
                <link rel="stylesheet" type="text/css" href="fonts/font-awesome-4.7.0/css/font-awesome.min.css"/>
                <link rel="stylesheet" type="text/css" href="vendor/animate/animate.css"/>
                <link rel="stylesheet" type="text/css" href="vendor/css-hamburgers/hamburgers.min.css"/>
                <link rel="stylesheet" type="text/css" href="vendor/select2/select2.min.css"/>
                <link rel="stylesheet" type="text/css" href="css/util.css"/>
                <link rel="stylesheet" type="text/css" href="css/main.css"/>
            
            </head>
                <Header title="Teste Aktie Now | Desenvolvedor FullStack" />
                <hr className="my-3" />
                {
                    this.state.message !== '' ? (
                        <Alert color="danger">{this.state.message}</Alert>
                    ) : ''
                }
                <Form>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input type="text" id="email" onChange={e => this.email = e.target.value} placeholder="Informe seu e-mail"></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="senha">Senha</Label>
                        <Input type="password" id="senha" onChange={e => this.senha = e.target.value} placeholder="Informe sua senha"></Input>
                    </FormGroup>
                    <Button color="primary" block onClick={this.signIn}>Entrar</Button>
                </Form>
                <Link className="text-danger" to="/register">Eu não tenho usuário</Link>
            </div>
        </div>
        );
    }
}