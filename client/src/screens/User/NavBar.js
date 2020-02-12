import NavBar from '../../components/ui/NavBar';
import React, { Component } from 'react';
/**
|--------------------------------------------------
| NavBar do Usuario comum, com os item do menu
| passados por paramentro.
|--------------------------------------------------
*/
export default class UserNavBar extends Component {
    itensMenu = [
        { Nome: 'Home', Rota: '/user/home' },
        { Nome: 'Notas', Rota: '/user/notas' }
    ]
    render() {
        return (
            <NavBar _itensMenu={this.itensMenu} />
        );
    }
}
