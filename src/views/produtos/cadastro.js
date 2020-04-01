import React from 'react'

import ProdutoService from '../../app/produtoService'
import Card from '../../components/card'
import { withRouter } from 'react-router-dom'

const estadoInicial = {
        nome: '',
        sku: '',
        descricao: '',
        preco: 0,
        fornecedor: '',
        sucesso: false,
        errors: [],
        atualizando: false
}

class CadastroProduto extends React.Component {
    
    state = estadoInicial

    constructor(){
        super()
        this.service = new ProdutoService()
    }
    
    onChange = (event) => {
        const valor = event.target.value
        const nomeCampo = event.target.name
        this.setState({ [nomeCampo]: valor})
    }
    
    onSubmit = (event) => {
        event.preventDefault()
        const produto = {
            nome: this.state.nome,
            sku: this.state.sku,
            descricao: this.state.descricao,
            preco: this.state.preco,
            fornecedor: this.state.fornecedor
        }
        try{
            this.service.salvar(produto)
            this.limpaCampos()
            this.setState({ sucesso: true })
        }catch(erro){
            const errors = erro.errors
            this.setState({ errors : errors })
        }
    }

    limpaCampos = () => {
        this.setState(estadoInicial)
    }

    componentDidMount(){
        const sku = this.props.match.params.sku

        if(sku){
            const resultado = this.service.obterProdutos().filter(produto => produto.sku === sku)
            if(resultado.length === 1){
                const produtoEncontrado = resultado[0]
                this.setState({...produtoEncontrado, atualizando: true})
            }
        }
    }

    render(){
        return(
            <Card header={this.state.atualizando ? 'Atualização de Produto ' : 'Cadastro de Produto '}>
                <form id="frmProduto" onSubmit={this.onSubmit}>
                    {
                        this.state.sucesso && 
                        <div class="alert alert-dismissible alert-success">
                            <button type="button" class="close" data-dismiss="alert">&times;</button>
                            <strong>Ótimo!</strong> Produto cadastrado com sucesso.
                        </div>
                    }
                    {
                        this.state.errors.length > 0 && 
                            this.state.errors.map(msg => {
                                return(
                                    <div class="alert alert-dismissible alert-danger">
                                        <button type="button" class="close" data-dismiss="alert">&times;</button>
                                        <strong>Erro!</strong> {msg}
                                    </div>
                                )
                            })
                    }
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
                                    disabled={this.state.atualizando}
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
                            <button type="submit" className="btn btn-success">
                                { this.state.atualizando ? 'Atualizar' : 'Salvar'}
                            </button>
                        </div>
                        <div className="col-md-1">
                            <button onClick={this.limpaCampos} className="btn btn-primary">Limpar</button>
                        </div>
                    </div>
                </form>       
            </Card>
        )
    }
}

export default withRouter(CadastroProduto)