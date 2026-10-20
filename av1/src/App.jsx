
import { useState } from 'react'
import './App.css'
import Ordem from './components/ordem'

function App() {
  const [pedidos, setPedido] = useState([
    {
      idOrdem: crypto.randomUUID(),
      dsCliente: 'Maria Luana',
      dsServico: 'Pintar Bicicleta',
      nuValor: 55,
      fgConcluida: true
    },
    {
      idOrdem: crypto.randomUUID(),
      dsCliente: 'Lucas Perin',
      dsServico: 'Trocar pneu e Camara de ar',
      nuValor: 40,
      fgConcluida: false
    },
    {
      idOrdem: "a3f1...",
      dsCliente: "Marina Alves",
      dsServico: "Troca de pastilhas de freio",
      nuValor: 85,
      fgConcluida: false
    }
  ])

  const [cliente, setCliente] = useState('')
  const [servico, setServico] = useState('')
  const [valor, setValor] = useState('')

  function cadastrarPedido() {
    if (
      cliente.trim() === '' ||
      servico.trim() === '' ||
      valor.trim() === ''
    ) {
      alert('Preencha todos os campos!')
      return
    }

    if (valor < 0 ) {
      alert('Informe um valor válido, maior ou igual a zero!')
      return
    }

    const novoPedido = {
      idOrdem: crypto.randomUUID(),
      dsCliente: cliente,
      dsServico: servico,
      nuValor: valor,
      fgConcluida: false
    }

    setPedido([...pedidos, novoPedido])

    setCliente('')
    setServico('')
    setValor('')
  }

  function concluirPedido(id) {
    const novaLista = pedidos.map((pedido) => {
      if (pedido.idOrdem === id) {
        return {
          ...pedido,
          fgConcluida: !pedido.fgConcluida
        }
      }

      return pedido
    })

    setPedido(novaLista)
  }

  function excluirPedido(id) {
    const novaLista = pedidos.filter((pedido) => {
      return pedido.idOrdem !== id
    })

    setPedido(novaLista)
  }

  const totalPedidos = pedidos.length

  const pedidosConcluidos = pedidos.filter((pedido) => {
    return pedido.fgConcluida === true
  }).length

  const ordensPendentes = totalPedidos - pedidosConcluidos

  const valorTotal = pedidos.reduce((total, pedido) => {
    return total + pedido.nuValor
  }, 0)

  return (
    <div className="container">
      <h1>Pneus & Cia</h1>

      <h2>Nova ordem de serviço</h2>

      <div className="contador">
        <p>Total de ordens: {totalPedidos}</p>
        <p>Concluídas: {pedidosConcluidos}</p>
        <p>Pendentes: {ordensPendentes}</p>
        <p>
          Valor total: R$ {valorTotal}
        </p>
      </div>

      <div className="formulario">

          
        <input
          type="text"
          placeholder="Nome do cliente"
          value={cliente}
          onChange={(e) => setCliente(e.target.value)}
        />

        <input
          type="text"
          placeholder="Serviço a realizar"
          value={servico}
          onChange={(e) => setServico(e.target.value)}
        />

        <input
          type="number"
          min="0"
          step="any"
          placeholder="Valor do serviço"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
        />

        <button onClick={cadastrarPedido}>
          Cadastrar ordem
        </button>
      </div>

      <h2>Ordens de serviço</h2>

      <div className="lista">
        {pedidos.map((pedido) => (
          <Ordem
            key={pedido.idOrdem}
            ordem={pedido}
            concluirAtendimento={concluirPedido}
            excluirAtendimento={excluirPedido}
          />
        ))}
      </div>

      <div>
        {pedidos.length === 0 ? (
              <p>Nenhum pedido adicionado ainda.</p>) : (
            <ul>
            </ul>
            )}
      </div>  

    </div>
  )
}

export default App
