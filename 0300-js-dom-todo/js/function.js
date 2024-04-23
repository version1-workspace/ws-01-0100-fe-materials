
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

function renderTasks(container) {
  const { tasks, showCompleted } = state

  container.innerHTML = ''
  tasks.sort((a, b) => a.deadline.getTime() - b.deadline.getTime())
  const rerender = () => renderTasks(container)

  tasks.forEach((task, index) => {
    if (!showCompleted && task.completed) {
      return
    }

    renderTask(container, task, {
      onEditName: (col) => {
        const value = col.textContent
        col.innerHTML = ''

        const input = document.createElement('input')
        input.setAttribute('type', 'text')
        input.setAttribute('class', 'form__input-field')
        input.value = value

        col.innerHTML = ''
        col.appendChild(input)

        input.addEventListener('blur', (e) => {
          e.stopPropagation()
          if (e.target.value) {
            const name = e.target.value
            task.name = name
          }
          rerender()
        })

        input.focus()
      },
      onEditDeadline: (col) => {
        col.innerHTML = ''

        const input = document.createElement('input')
        input.setAttribute('type', 'date')
        input.setAttribute('class', 'form__input-field')
        input.value = col.textContent

        col.innerHTML = ''
        col.appendChild(input)

        input.addEventListener('blur', (e) => {
          e.stopPropagation()
          if (e.target.value) {
            task.deadline = AppDate.parse(e.target.value)
          }

          rerender()
        })

        input.focus()
        input.showPicker()
      },
      onComplete: (row, completed) => {
        row.classList.toggle('list__item--completed')
        if (!showCompleted && completed) {
          row.classList.add('list__item--completed-dismissing')
        }
        task.completed = completed

        setTimeout(() => {
          rerender()
        }, 1000)
      },
      onDelete: () => {
        tasks.splice(index, 1)
        rerender()
      }
    })
  })
}

const buildColumns = () => {
  return {
    checkbox: div('list__item-col list__item-col--checkbox'),
    name: div('list__item-col list__item-col--name'),
    deadline: div('list__item-col list__item-col--deadline'),
    actions: div('list__item-col list__item-col--actions')
  }
}

function renderTask(target, task, { onEditName, onEditDeadline, onComplete, onDelete }) {
  const li = document.createElement('li')
  const taskContainer = div('list__item')

  const columns = buildColumns()

  const checkboxEle = checkbox(task.completed, (checked) => {
    onComplete(taskContainer, checked)
  })

  columns.checkbox.appendChild(checkboxEle)
  columns.name.textContent = task.name
  columns.name.addEventListener('click', () => {
    onEditName(columns.name)
  })
  columns.deadline.textContent = task.deadline.toString()
  columns.deadline.addEventListener('click', () => {
    onEditDeadline(columns.deadline)
  })

  columns.actions.appendChild(icon('icon icon--trash fa-solid fa-trash', () => {
    if (window.confirm('このタスクを削除しますか？')) {
      onDelete()
    }
  }))

  Object.values(columns).forEach((column) => taskContainer.appendChild(column))
  li.appendChild(taskContainer)

  target.appendChild(li)
}

function onSubmitTask(container) {
  const form = document.querySelector('.js-form')
  const data = new FormData(form)
  const name = data.get('name')
  if (!name) {
    window.alert('タスク名を入力してください。')
    return
  }

  const deadline = AppDate.parse(data.get('deadline'))
  if (!deadline) {
    window.alert('期限日を入力してください。')
    return
  }

  state.tasks.push({
    name,
    deadline
  })

  renderTasks(container)
  form.reset()
}

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
