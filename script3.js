const comecar = document.querySelector('.btn-comecar')

comecar.comeco = () => {
  const guardaNome = document.querySelector('#nome').value
  if (guardaNome) {
    localStorage.setItem('nome', guardaNome)
    window.location.href = 'quiz.html'
  } else {
    alert('digite um nome')
  }
}
