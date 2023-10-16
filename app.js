const fs = require('fs');
const readline = require('readline');
const { addTask, updateTask, deleteTask } = require('./todo');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Function to display the current Todo List
function displayTodoList() {
  const todoList = loadTodoList();
  console.log('Todo List:');
  todoList.forEach((task, index) => {
    console.log(`${index + 1}. ${task}`);
  });
  console.log('');
}

// Function to prompt the user for a new task
function promptAddTask() {
  rl.question('Enter a new task: ', (task) => {
    addTask(task);
    console.log('Task added successfully.\n');
    displayTodoList();
    promptMainMenu();
  });
}

// Function to prompt the user to update a task
function promptUpdateTask() {
  displayTodoList();
  rl.question('Enter the number of the task to update: ', (index) => {
    index = Number(index) - 1;
    if (isNaN(index)) {
      console.log('Invalid task index.\n');
      promptMainMenu();
    } else {
      rl.question('Enter the new task: ', (newTask) => {
        try {
          updateTask(index, newTask);
          console.log('Task updated successfully.\n');
        } catch (err) {
          console.log(err.message + '\n');
        }
        displayTodoList();
        promptMainMenu();
      });
    }
  });
}

// Function to prompt the user to delete a task
function promptDeleteTask() {
  displayTodoList();
  rl.question('Enter the number of the task to delete: ', (index) => {
    index = Number(index) - 1;
    if (isNaN(index)) {
      console.log('Invalid task index.\n');
      promptMainMenu();
    } else {
      try {
        deleteTask(index);
        console.log('Task deleted successfully.\n');
      } catch (err) {
        console.log(err.message + '\n');
      }
      displayTodoList();
      promptMainMenu();
    }
  });
}

// Function to prompt the user for the main menu options
function promptMainMenu() {
  console.log('Main Menu:');
  console.log('1. Add a task');
  console.log('2. Update a task');
  console.log('3. Delete a task');
  console.log('4. Exit');
  console.log('');

  rl.question('Enter your choice: ', (choice) => {
    console.log('');

    switch (choice) {
      case '1':
        promptAddTask();
        break;
      case '2':
        promptUpdateTask();
        break;
      case '3':
        promptDeleteTask();
        break;
      case '4':
        rl.close();
        break;
      default:
        console.log('Invalid choice.\n');
        promptMainMenu();
    }
  });
}

function loadTodoList() {
  try {
    const data = fs.readFileSync('todo.txt', 'utf8');
    return JSON.parse(data);
  } catch (err) {
    // If the data file doesn't exist, return an empty array
    if (err.code === 'ENOENT') {
      return [];
    }
    throw err;
  }
}

// Function to save the Todo List to the data file
function saveTodoList(todoList) {
  fs.writeFileSync('todo.txt', JSON.stringify(todoList));
}

function promptAddTask() {
    rl.question('Enter a new task: ', (task) => {
      if (task.trim() === '') {
        console.log('Task cannot be empty.\n');
        promptMainMenu();
      } else {
        addTask(task);
        console.log('Task added successfully.\n');
        displayTodoList();
        promptMainMenu();
      }
    });
  }
  
  // Function to prompt the user to update a task
  function promptUpdateTask() {
    displayTodoList();
    rl.question('Enter the number of the task to update: ', (index) => {
      index = Number(index) - 1;
      if (isNaN(index)) {
        console.log('Invalid task index.\n');
        promptMainMenu();
      } else {
        rl.question('Enter the new task: ', (newTask) => {
          if (newTask.trim() === '') {
            console.log('Task cannot be empty.\n');
            promptMainMenu();
          } else {
            try {
              updateTask(index, newTask);
              console.log('Task updated successfully.\n');
            } catch (err) {
              console.log(err.message + '\n');
            }
            displayTodoList();
            promptMainMenu();
          }
        });
      }
    });
  }
  
  // Function to prompt the user to delete a task
  function promptDeleteTask() {
    displayTodoList();
    rl.question('Enter the number of the task to delete: ', (index) => {
      index = Number(index) - 1;
      if (isNaN(index)) {
        console.log('Invalid task index.\n');
        promptMainMenu();
      } else {
        try {
          deleteTask(index);
          console.log('Task deleted successfully.\n');
        } catch (err) {
          console.log(err.message + '\n');
        }
        displayTodoList();
        promptMainMenu();
      }
    });
  }
  


// Start the application
promptMainMenu();