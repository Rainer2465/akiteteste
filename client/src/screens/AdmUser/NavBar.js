import NavBar from '../../components/ui/NavBar';
import React, { Component } from 'react';
export default class AdmUserNavBar extends Component {
    itensMenuAdm = [
        { Nome: 'Home', Rota: '/home/texto' },
        { Nome: 'Livros', Rota: '/home/livros' },
        { Nome: 'Notas', Rota: '/home/notas' }
    ]
    itensMenuUser = [
        { Nome: 'Home', Rota: '/home/user' },
        { Nome: 'Notas', Rota: '/home/nota' }
    ]

    render() {
        return (
            <NavBar _itensMenu={localStorage.getItem('administrador') === "true" ? this.itensMenuAdm : this.itensMenuUser} />
        );
    }
}
