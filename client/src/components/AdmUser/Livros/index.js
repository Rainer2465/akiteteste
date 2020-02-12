import React, { Component } from 'react';
import api from '../../../services/api'


class ComponetAdmUserBooks extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            titulo: '',
            autor: '',
            editora: '',
            errorMessage: '',
            result: [],
            update: false
        }


        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount = () => {
        this.fetchData()
    };


    fetchData = () => {
        api.get('projects/livros')
            .then(response => { return response.data })
            .then(data => {
                this.setState({
                    result: data.livro
                })
            })

    };



    bookEdit = (id) => {

        api.delete('projects/livros/' + id)
            .then(res => {
                this.setState({ errorMessage: res.data.Error });
                this.fetchData();
            })
            .catch(e => {
                this.setState({ errorMessage: e.message })
                this.fetchData();
            });
    }



    createBook = () => {
        if (this.state.update) {

            const data = { titulo: this.titulo, autor: this.autor, editora: this.editora };
            api.put('projects/livros/' + this.state.id, data)
                .then(result => {
                    this.setState({ errorMessage: result.Error });
                    this.fetchData();
                })
                .catch(e => {
                    this.setState({ errorMessage: e.message })
                });


            this.setState({ update: false });
        }
        else {
            const data = { titulo: this.titulo, autor: this.autor, editora: this.editora };
            api.post('projects/livros', data)
                .then(result => {
                    this.setState({ errorMessage: result.Error });
                    this.fetchData();
                })
                .catch(e => {
                    this.setState({ errorMessage: e.message })
                });

        }
        this.clearCamp();
    };

    editBook = (id, titulo, autor, editora) => {
        this.setState({
            id: id
        });
        this.titulo = titulo;
        this.autor = autor;
        this.editora = editora;
        document.getElementById('titulo').value = titulo;
        document.getElementById('autor').value = autor;
        document.getElementById('editora').value = editora;
        this.setState({ update: true });


    }

    handleSubmit(e) {
        e.preventDefault();
    }

    clearCamp() {
        document.getElementById('titulo').value = '';
        document.getElementById('autor').value = '';
        document.getElementById('editora').value = '';
        this.setState({
            titulo: '',
            autor: '',
            editora: '',

        })

    }


    render() {
        return (
            <div>
                {
                    this.state.errorMessage ? (
                        <div class="alert alert-danger alert-dismissible fade show" role="alert">
                            <strong>{this.state.errorMessage}</strong>
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>) : ''
                }
                <form onSubmit={this.handleSubmit}>
                    <div className="form-row align-items-center">
                        <div className="col-auto">
                            <input type="text" onChange={e => this.titulo = e.target.value} className="form-control mb-2" id="titulo" placeholder="Titulo do Livro" />
                        </div>
                        <div className="col-auto">
                            <input type="text" onChange={e => this.autor = e.target.value} className="form-control mb-2" id="autor" placeholder="Autor do Livro" />
                        </div>
                        <div className="col-auto">
                            <input type="text" onChange={e => this.editora = e.target.value} className="form-control mb-2" id="editora" placeholder="Editora do Livro" />
                        </div>
                        <div className="col-auto">
                            <button type="submit" className="btn btn-primary mb-2" onClick={this.createBook} id="botaoSalvar">Salvar</button>
                        </div>
                    </div>
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Titulo</th>
                                <th scope="col">Autor</th>
                                <th scope="col">Editora</th>
                                <th scope="col">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.result.map((item) => {
                                    return (
                                        <tr key={item._id}>
                                            <td>{item.titulo}</td>
                                            <td>{item.autor}</td>
                                            <td>{item.editora}</td>
                                            <td>
                                                <button type="submit" className="btn btn-danger" onClick={() => this.bookEdit(item._id)}>
                                                    Delete
                                                </button>
                                                <button type="submit" className="btn btn-success ml-2" onClick={() => this.editBook(item._id, item.titulo, item.autor, item.editora)}>
                                                    Editar
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </form>
            </div>


        );
    }
}

export default ComponetAdmUserBooks;