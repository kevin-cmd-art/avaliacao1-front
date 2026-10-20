
import './Ordem.css'

function Ordem({ ordem: atendimento, concluirAtendimento, excluirAtendimento }) {
  return (
    <div className={`ordem ${atendimento.fgConcluida ? 'concluida' : ''}`}>
      <h3>{atendimento.dsCliente}</h3>

      <p>Serviço: {atendimento.dsServico}</p>

      <p>
        Valor: R$ {atendimento.nuValor}
      </p>

      <p>
        Status: {atendimento.fgConcluida ? 'Concluída' : 'Pendente'}
      </p>

      <button onClick={() => concluirAtendimento(atendimento.idOrdem)}>
        {atendimento.fgConcluida ? 'Reabrir Pedido' : 'Concluir Pedido'}
      </button>

      <button onClick={() => excluirAtendimento(atendimento.idOrdem)}>
        Excluir
      </button>
    </div>
  )
}

export default Ordem
