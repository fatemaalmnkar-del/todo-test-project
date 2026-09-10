const todolist = {
    todos:[],

    addTodo(title){
        if(!title|| title.trim() ===''){
            throw new Error('Title cannot be empty');
        }
        const todo={
            id: Date.now(),
            title: title.trim(),
            completed: false,
            createdAt: new Date().toLocaleDateString(),
        };
        this.todos.push(todo);
        return todo;
    },
    removeTodo(id){
        const index = this.todos.findIndex(todo => todo.id === id);
        if(index === -1){
            throw new Error('Todo not found');
        }
        this.todos.splice(index, 1);
        return true;
    },
    toggleComplete(id){
        const todo = this.todos.find(todo => todo.id === id);
        if(!todo){
            throw new Error('Todo not found');
        }
        todo.completed = !todo.completed;
        return todo;
    },
    getTodos(){
        return [...this.todos];
    },
    getCompletedTodos(){
        return this.todos.filter(todo => todo.completed);
    },
    getPendingTodos(){
        return this.todos.filter(todo => !todo.completed);
    },
    searchTodos(keyword){
        return this.todos.filter(todo => todo.title.toLowerCase().includes(keyword.toLowerCase()));
    },
    clearAll(){
        const count = this.todos.length;
        this.todos = [];
        return count;
    }
};

module.exports = todolist;