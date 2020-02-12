import React, { Component } from 'react';
import api from '../../services/api'

class ScreenAdmUserNotas extends Component {
    constructor(props) {
        super(props);

        this.state = {
            errorMessage: '',
            resultNotas: [],
            resultLivros: [],
            resultTudo: [],
            media: []
        }
    }


    componentDidMount = () => {
        this.fetchDataRating()
    };


    fetchDataRating = () => {
        api.get('projects/notasmedia')
            .then(Response => { return Response.data })
            .then(result => {
                console.log(result.result)
                this.setState({
                    resultNotas: result.result.notas,
                    resultLivros: result.result.livros,
                    resultTudo: result.result
                })
            });

    };




    render() {
        return (
            <div>
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Titulo</th>
                            <th scope="col">Autor</th>
                            <th scope="col">média</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.resultLivros.map((itLivro) => {
                                return (
                                    <tr>
                                        <td>{itLivro.titulo}</td>
                                        <td>{itLivro.autor}</td>
                                        <td>{
                                            this.state.resultNotas.filter(x => x.livro === itLivro._id)
                                                .map(u => {
                                                    return u.nota
                                                })
                                                .reduce((a, b) => {
                                                    return a + b
                                                }) / this.state.resultNotas.filter(x => x.livro === itLivro._id).length
                                        }
                                        </td>
                                    </tr>

                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ScreenAdmUserNotas;