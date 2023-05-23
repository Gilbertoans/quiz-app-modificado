const pergunta = document.querySelector('.perguntas')
const respostas = document.querySelector('.respostas')
const textFim = document.querySelector('.fim span')
const content = document.querySelector('.content')
const contentFinish = document.querySelector('.fim')
const btnReiniciar = document.querySelector('.fim button')
const progresso = document.getElementById('barra')
const ctx = document.getElementById('myChart')

let h_res = [[], [], []]

let score = 0

import perguntas from './perguntas.js'

let perguntaAtual = 0
let questaoCorretas = 0

function loadQuestion() {
  progresso.setAttribute('style', 'width:' + perguntaAtual * 20 + '%')

  const item = perguntas[perguntaAtual]
  respostas.innerHTML = ''
  pergunta.innerHTML = item.question

  h_res[0].push(item.question)

  item.answers.forEach(resposta => {
    const div = document.createElement('div')

    div.innerHTML = `
    <button data="${resposta.option}" class="resposta" data-points="${resposta.points}">
    ${resposta.option}
    </button>
    `

    respostas.appendChild(div)
  })

  document.querySelectorAll('.resposta').forEach(item => {
    item.addEventListener('click', nextQuestion)
  })
}

btnReiniciar.onclick = () => {
  content.style.display = 'flex'
  contentFinish.style.display = 'none'

  perguntaAtual = 0
  questaoCorretas = 0
  localStorage.setItem('score', score)
  return window.location.assign('inicial.html')
}

function nextQuestion(e) {
  h_res[1].push(e.target.getAttribute('data-points'))
  if (e.target.getAttribute('data-points')) {
    localStorage.setItem('h_res', [h_res[1]])
  }

  if (perguntaAtual < perguntas.length - 1) {
    perguntaAtual++
    loadQuestion()
  } else {
    finish()
  }
}

function finish() {
  textFim.innerHTML = '<h1>Resultados</h1>'
  for (let i = 0; i < h_res[0].length; i++) {
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Apostolo', 'Profeta', 'Evangelista', 'Pastor', 'Mestre'],
        datasets: [
          {
            label: '# of Votes',
            data: [h_res[1][i], 0, 0, 0, 0],
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    })
    textFim.innerHTML += `
    ${h_res[0][i]} = ${h_res[1][i]} -> ${h_res[2][i]} <br>
    `
    console.log(h_res[1][i])
  }
  textFim.innerHTML +=
    '<hr>' + localStorage.getItem('nome') + console.log(h_res)
  content.style.display = 'none'
  contentFinish.style.display = 'flex'
}
const datapoints = localStorage.getItem('h_res')
console.log(Number(datapoints))
loadQuestion()
