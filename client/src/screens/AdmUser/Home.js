import React, { Component } from 'react';
import Home from '../../components/ui/Home';

class ScreenAdmUserHome extends Component {
    render() {
        return (
            <div>
                {console.log('entrou')}
                <Home _texto={'Biblioteca Aktie Now'} />
            </div>
        );
    }
}

export default ScreenAdmUserHome;