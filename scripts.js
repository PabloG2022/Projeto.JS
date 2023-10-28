const button = document.querySelector('.button-add-task') //querySelector chama a classe, documentByID chama o ID
const input = document.querySelector('.input-task') //primeiro se cria as funções antes de comecar a codar
const listaCompleta = document.querySelector('.list-tasks')

let minhaListaDeItens = [] //criando um array com let, essa lista deverá ser colocada na função adcionarNovaTarefa

function adicionarNovaTarefa() { //toda vez que clicar no botão irá chamar esta função
  minhaListaDeItens.push({ //o push vai colocar a informação digitada dentro do minhaListaDeItens
    tarefa: input.value,
    concluida: false,
  })

  input.value = ''

  mostrarTarefas()
}

function mostrarTarefas() {
  let novaLi = ''

  minhaListaDeItens.forEach((item, posicao) => {   //posição do array
    novaLi =
      novaLi +  //deve usar crase `` para poder chamar variável dentro do dolar ${tarefa} que virá d forEach
      `

      <li class="task ${item.concluida && 'done'}">
      <img src="./img/checked.png" alt="check-na-tarefa" onclick="concluirTarefa(${posicao})">
      <p>${item.tarefa}</p>
      <img src="./img/trash.png" alt="tarefa-para-o-lixo" onclick="deletarItem(${posicao})">
  </li>
        `
  })

  listaCompleta.innerHTML = novaLi

  localStorage.setItem('lista', JSON.stringify(minhaListaDeItens))
}

function concluirTarefa(posicao) {
  minhaListaDeItens[posicao].concluida = !minhaListaDeItens[posicao].concluida

  mostrarTarefas()
}
function deletarItem(posicao) { 
  minhaListaDeItens.splice(posicao, 1)
  
  mostrarTarefas()
}

function recarregarTarefas() {
  const tarefasDoLocalStorage = localStorage.getItem('lista')

  if (tarefasDoLocalStorage) {
    minhaListaDeItens = JSON.parse(tarefasDoLocalStorage)
  }

  mostrarTarefas()
}

recarregarTarefas()
button.addEventListener('click', adicionarNovaTarefa) //toda vez que o botão for clicado ele executará uma função

//debugando: click no botão, chamei a funcão adcionarT..., pega o valor do input, guardar dentro do array,mostrarTarefas
//vai pegar minhaList..., pegar o texto dentro do array, vai chagar no tarefa, colocar dentro da Li