class CaixaDaLanchonete {

    calcularValorDaCompra(metodoDePagamento, itens) {

        //INICIALIZANDO COM ALGUMAS VARIAVEIS
        const formasDePagamentoValidas = ['dinheiro', 'debito', 'credito'] //essa constante inicializa com um array contendo três strings com os metódos de pagamento válidos
        let arrayItensPedidos = new Array //Variável chamada arrayItensPedidos, contendo uma array vazia.
        let somaItemsDoPedido = 0.0 //Essa variável será utilizada para acumular o valor total dos itens do pedido 
        let resultadoDaCompra //Essa variável será utilizada para armazenar o resultado específico de cada compra,

        //VALIDA AS REGRAS PARA REALIZAR A COMPRA
        //verificando se há itens no carrinho de compra
        if (!Array.isArray(itens) || itens.length == 0) { //Esta condição verifica se a variável itens é um array e se possui pelo menos um item.
            resultadoDaCompra = 'Não há itens no carrinho de compra!' //Se não for um array ou se estiver vazio, a mensagem 'Não há itens no carrinho de compra!' é atribuída à variável resultadoDaCompra.
        }else if (!formasDePagamentoValidas.includes(metodoDePagamento)) { //Esta condição verifica se o método de pagamento escolhido (metodoDePagamento) está incluído na lista de formas de pagamento válidas (formasDePagamentoValidas). Se não estiver, a mensagem 'Forma de pagamento inválida!' é atribuída à variável resultadoDaCompra.
            resultadoDaCompra = 'Forma de pagamento inválida!'
        } else {
            itens.forEach(item => { //Esse bloco de código diz: para cada item no array {...}):
                let itemPedido = this.criaItemPedido(item) //Crie um item de pedido com base no item do carrinho.
                let infoCodigoPedido = this.cardapio().get(itemPedido.codigo) //Pega o código do ItemPedido e busca (get) as informações desse item no cardapio

                if(itemPedido.qtd == 0) { 
                    resultadoDaCompra = "Quantidade inválida!"  
                }else if (!this.existeCodigoDeProduto(itemPedido.codigo)) {
                    resultadoDaCompra = "Item inválido!" 
                }else if(infoCodigoPedido.hasOwnProperty('extra') && 
                    !this.existeItemPrincipal(itens, infoCodigoPedido.extra)){
                        resultadoDaCompra = "Item extra não pode ser pedido sem o principal"
                }else {
                    arrayItensPedidos.push(itemPedido)    
                }
            })
        }

        //SE NENHUMA REGRA FOI QUEBRADA, CALCULA O VALOR DA COMPRA
        if (!resultadoDaCompra) {
            arrayItensPedidos.forEach(itemPedido => {
                let infoCodigoPedido = this.cardapio().get(itemPedido.codigo)
                somaItemsDoPedido = somaItemsDoPedido + (itemPedido.qtd * infoCodigoPedido.valor)
            })
            resultadoDaCompra = "R$ "+this.calculaValorDaCompra(metodoDePagamento, somaItemsDoPedido).replace(".", ",")
        } 

        return resultadoDaCompra
    }

    
    criaItemPedido(item){
        let arrayItem = item.split(',')
        let itemPedido = {
            codigo: arrayItem[0],
            qtd: arrayItem[1]}
        return itemPedido
    }

    existeCodigoDeProduto(codigoProduto){
        return this.cardapio().has(codigoProduto)
    }

    existeItemPrincipal(listaDeItensPedidos, itemExtra){
        return listaDeItensPedidos.some((itensPedidos) => itensPedidos.includes(itemExtra))
    }

    calculaValorDaCompra(metodoDePagamento, somaDoValorTotalDosItens){
        let valorDaCompra
        let descontoDinheiro = 0.05
        let acrescimoCredito = 0.03
        switch (metodoDePagamento) {
            case 'credito':
                valorDaCompra = somaDoValorTotalDosItens + somaDoValorTotalDosItens*acrescimoCredito
                break
            case 'dinheiro':
                valorDaCompra = somaDoValorTotalDosItens - somaDoValorTotalDosItens*descontoDinheiro
                break
            default:
                valorDaCompra = somaDoValorTotalDosItens
        }
        return valorDaCompra.toFixed(2)
    }

    cardapio(){
        const cardapio = new Map()
        cardapio.set('cafe', {codigo: 'cafe', descricao: 'Café', valor:3.00})
        cardapio.set('chantily', {codigo: 'chantily', descricao: 'Chantily (extra do Café)', valor:1.50, extra: 'cafe'})
        cardapio.set('suco', {codigo: 'suco', descricao: 'Suco Natural', valor:6.20})
        cardapio.set('sanduiche', {codigo: 'sanduiche', descricao: 'Sanduíche', valor:6.50})
        cardapio.set('queijo', {codigo: 'queijo', descricao: 'Queijo (extra do Sanduíche)', valor:2.00, extra: 'sanduiche'})
        cardapio.set('salgado', {codigo: 'salgado', descricao: 'Salgado', valor:7.25})
        cardapio.set('combo1', {codigo: 'combo1', descricao: '1 Suco e 1 Sanduíche', valor:9.50})
        cardapio.set('combo2', {codigo: 'combo2', descricao: '1 Café e 1 Sanduíche', valor:7.50})
        return cardapio
    }
}

export { CaixaDaLanchonete };


