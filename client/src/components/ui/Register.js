
import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap'
import Header from '../Header';
import { Link } from 'react-router-dom';
import api from '../../services/api'
import { login } from '../../services/auth'

export default class Register extends Component {
    constructor() {
        super();
        this.state = {
            message: ''
        };

    }


    create = () => {
        const data = {
            nome: this.nome,
            email: this.email,
            senha: this.senha,
            administrador: this.administrador === 'on' ? true : false,
        };
        api.post('auth/register', data)
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
                    <Header title="Teste Aktie Now | Desenvolvedor FullStack" />
                    <hr className="my-3" />
                    {
                        this.state.message !== '' ? (
                            <Alert color="danger">{this.state.message}</Alert>
                        ) : ''
                    }
                    <Form>
                        <FormGroup>
                            <Label for="nome">nome</Label>
                            <Input type="text" id="nome" onChange={e => this.nome = e.target.value} placeholder="Informe seu nome"></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input type="text" id="email" onChange={e => this.email = e.target.value} placeholder="Informe seu e-mail"></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="senha">Senha</Label>
                            <Input type="password" id="senha" onChange={e => this.senha = e.target.value} placeholder="Informe sua senha"></Input>
                        </FormGroup>
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" id="customCheck1" onChange={e => this.administrador = e.target.value} />
                            <label class="custom-control-label" for="customCheck1">Administrador</label>
                        </div>
                        <Button color="primary" block onClick={this.create}>Salvar</Button>
                    </Form>
                    <Link className="text-danger" to="/">Ja sou registrado</Link>
                </div>
            </div>
        );
    }
}