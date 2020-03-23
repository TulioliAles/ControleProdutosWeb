import React from 'react'

const estadoInicial = {
        nome: '',
        sku: '',
        descricao: '',
        preco: 0,
        fornecedor: ''
}

export default class CadastroProduto extends React.Component {
    
    state = estadoInicial
    
    onChange = (event) => {
        const valor = event.target.value
        const nomeCampo = event.target.name
        this.setState({ [nomeCampo]: valor})
    }
    
    onSubmit = (event) => {
        console.log(this.state)
    }

    limpaCampos = () => {
        this.setState(estadoInicial)
    }

    render(){
        return(
            <div className="card">
                <div className="card-header">
                    Cadastro de Produto
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Nome: *</label>
                                <input type="text" 
                                       value={this.state.nome}
                                       onChange={this.onChange}
                                       className="form-control"
                                       name="nome" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>SKU: *</label>
                                <input type="text" 
                                       className="form-control"
                                       onChange={this.onChange}
                                       value={this.state.sku}
                                       name="sku" />
                            </div>
                        </div>
                    </div> 
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <label>Descrição:</label>
                                <textarea className="form-control"
                                onChange={this.onChange}
                                          value={this.state.descricao}
                                          name="descricao" /> 
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Preço: *</label>
                                <input type="text" 
                                       className="form-control"
                                       onChange={this.onChange}
                                       value={this.state.preco}
                                       name="preco" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Fornecedor: *</label>
                                <input type="text" 
                                       className="form-control"
                                       onChange={this.onChange}
                                       value={this.state.fornecedor}
                                       name="fornecedor" />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-1">
                            <button onClick={this.onSubmit} className="btn btn-success">Salvar</button>
                        </div>
                        <div className="col-md-1">
                            <button onClick={this.limpaCampos} className="btn btn-primary">Limpar</button>
                        </div>
                    </div>   
                </div>
            </div>
        )
    }
}