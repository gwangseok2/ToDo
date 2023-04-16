import TodoItem from './todo-test';

describe('app.js', () => {
  test('creatTodo를 실행하면 class문법을 통해 인스턴스가 생성된다', () => {
    const result = new TodoItem();
    expect(result).toBeTruthy();
  });
});