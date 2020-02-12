import React, { Component } from 'react';
import Home from '../../components/ui/Home';

class ScreenUserHome extends Component {
    render() {
        return (
            <div>
                <Home _texto={'Site para avaliar os livros alugados.'} />
            </div>
        );
    }
}

export default ScreenUserHome;