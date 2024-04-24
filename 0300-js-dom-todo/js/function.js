
const state = {
  showCompleted: false,
  tasks: [
    {
      name: 'Task 1',
      deadline: new AppDate().getDateInXMonth(1),
    },
    {
      name: 'Task 2',
      deadline: new AppDate().getDateInXMonth(2),
    },
    {
      name: 'Task 3',
      deadline: new AppDate().getDateInXMonth(3),
    },
  ]
}

// ↓↓↓ ここを実装

function renderTasks(container) {
}

function onSubmitTask(container) {
}

// ↑↑↑

function main() {
  const todoContainer = document.querySelector('.js-list-container')

  document.querySelector('.js-form').addEventListener('submit', (e) => {
    e.preventDefault()
    onSubmitTask(todoContainer)
  })

  document.querySelector('.js-show-completed').addEventListener('change', (e) => {
    state.showCompleted = e.target.checked
    renderTasks(todoContainer)
  })
  renderTasks(todoContainer)
}

main()
