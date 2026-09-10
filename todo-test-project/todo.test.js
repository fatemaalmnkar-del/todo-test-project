import todolist, { addTodo } from "./todo";

describe('Todo List Module',()=>{
    beforeEach(()=>{
        todolist.clearAll();
    })

    test('should add new todo',()=>{
        const todo = todolist.addTodo('Test Todo');
        // console.log(todo)
        // console.log(todolist)
        expect(todo).toHaveProperty('id');
        expect(todo.title).toBe('Test Todo')
        expect(todo.completed).toBe(false)
        expect(todolist.getTodos().length).toBe(1)
    });

    test('Should not add a todo with empty title',()=>{
        expect(()=> todolist.addTodo('')).toThrow('Title cannot be empty');
        expect(()=> todolist.addTodo('   ')).toThrow('Title cannot be empty');
        expect(()=> todolist.addTodo(null)).toThrow('Title cannot be empty');
        expect(todolist.getTodos().length).toBe(0)
    })

    test('should remove a todo',()=>{
        const todo1 = todolist.addTodo('Task 1');
        const start = Date.now();
        while (Date.now() - start < 1) {
        // busy-wait – blocks everything
        }
        //console.log('After 1ms');
        const todo2 = todolist.addTodo('Task 2');
        const result = todolist.removeTodo(todo1.id)
        expect(result).toBe(true)
        expect(todolist.getTodos().length).toBe(1)
        expect(todolist.getTodos()[0].id).toBe(todo2.id)

        expect (()=> todolist.removeTodo(12412)).toThrow('Todo not found')
    })

    test('should toggle todo completion status',()=>{
        const todo = todolist.addTodo('Test Todo');
        //console.log(todolist.getTodos());
        expect(todo.completed).toBe(false);
        const updatedTodo=todolist.toggleComplete(todo.id)
        expect(updatedTodo.completed).toBe(true)
        //console.log(todolist.getTodos())

        const updatedTodo2 = todolist.toggleComplete(todo.id)
        expect(updatedTodo2.completed).toBe(false)

        expect(()=> todolist.toggleComplete(999)).toThrow('Todo not found')
    })

    test('should get all todos',()=>{
        const todo1= todolist.addTodo('Task 1');
        const todo2=todolist.addTodo('Task 2');
        const todo3=todolist.addTodo('Task 3');

        expect(todolist.getTodos().length).toBe(3)
        const result = todolist.removeTodo(todo1.id)
        expect(todolist.getTodos().length).toBe(2)

    })

    test ('should get only completed todos',()=>{
        const todo1= todolist.addTodo('Task 1');
        const start = Date.now();
        while (Date.now() - start < 1) {
        // busy-wait – blocks everything
        }
        //console.log('After 1ms');
        const todo2=todolist.addTodo('Task 2');
        const start2 = Date.now();
        while (Date.now() - start2 < 1) {
        // busy-wait – blocks everything
        }
        //console.log('After 1ms');
  c x     const todo3=todolist.addTodo('Task 3');
b
vg
        todolist.toggleComplete(todo1.id)
        const completedTodos=todolist.getCompletedTodos();
        expect(completedTodos.length).toBe(1);
        expect(completedTodos[0].id).toBe(todo1.id)
        expect(completedTodos[0].completed).toBe(true)
    })

    test('should get only pending todos',()=>{
        const todo1= todolist.addTodo('Task 1');
        const start = Date.now();
        while (Date.now() - start < 1) {
        // busy-wait – blocks everything
        }
        //console.log('After 1ms');
        const todo2=todolist.addTodo('Task 2');
        const start2 = Date.now();
        while (Date.now() - start2 < 1) {
        // busy-wait – blocks everything
        }
        //console.log('After 1ms');
        const todo3=todolist.addTodo('Task 3');

        todolist.toggleComplete(todo2.id);
        const pendingTodos = todolist.getPendingTodos();
        //console.log(pendingTodos)
        expect(pendingTodos.length).toBe(2);
        const pendingIds= pendingTodos.map(todo => todo.id);
        // console.log(pendingIds)
        expect(pendingIds).toContain(todo1.id);
        expect(pendingIds).toContain(todo3.id);


    })
    
    test('should search todos by keyword',()=>{
        const todo1 = todolist.addTodo('Buy groceries');
        const start = Date.now();
        while (Date.now() - start < 1) {
        // busy-wait – blocks everything
        }
        //console.log('After 1ms');
        const todo2 = todolist.addTodo('Read a book');
        const start2 = Date.now();
        while (Date.now() - start2 < 1) {
        // busy-wait – blocks everything
        }
        //console.log('After 1ms');
        const todo3 = todolist.addTodo('Book flight tickets');

        const results = todolist.searchTodos('Book')
        expect (results.length).toBe(2);
        const resultsIds = results.map(todo => todo.id);
        // console.log(resultsIds)
        expect(resultsIds).toContain(todo2.id)
        expect(resultsIds).toContain(todo3.id)

    })

    test('should clear all todos',()=>{
        todolist.addTodo('Task 1');
        todolist.addTodo('Task 2');
        todolist.addTodo('Task 3');
        const count = todolist.clearAll()
        expect(count).toBe(3)
        expect(todolist.getTodos().length).toBe(0)
    })

})