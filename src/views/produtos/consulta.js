import React from 'react'

import Card from '../../components/card'
import ProdutoService from '../../app/produtoService'
import { withRouter } from 'react-router-dom'

class ConsultaProdutos extends React.Component {

    state = {
        produtos : []
    }

    constructor(){
        super()
        this.service = new ProdutoService()
    }

    componentDidMount(){
        const produtos = this.service.obterProdutos()
        this.setState({ produtos })
    }

    preparaEditar = (sku) => {
        this.props.history.push(`/cadastro-produtos/${sku}`)
    }

    deletar = (sku) => {
        const produtos = this.service.deletar(sku)
        this.setState({produtos})

    }

    render(){
        return(
            <Card header="Consulta de Produtos">
                <table className='table table-hover'>
                    <thead>
                    <tr>
                        <th>Nome</th>
                        <th>SKU</th>
                        <th>Preço</th>
                        <th>Fornecedor</th>
                        <th></th>
                        </tr>
                    </thead>
                    <tbody>
                       {
                            this.state.produtos.map( (produto, index) => {
                                return(
                                    <tr key={index}>
                                        <th>{produto.nome}</th>
                                        <th>{produto.sku}</th>
                                        <th>{produto.preco}</th>
                                        <th>{produto.fornecedor}</th>
                                        <th>
                                        <button onClick={() => this.preparaEditar(produto.sku)} className="btn btn-primary">Editar</button>
                                        <button onClick={() => this.deletar(produto.sku)}className="btn btn-danger">Excluir</button>
                                        </th>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </Card>        
        )
    }
}

export default withRouter(ConsultaProdutos)