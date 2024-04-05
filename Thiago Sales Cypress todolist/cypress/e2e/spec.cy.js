describe("Cliente cadastra uma nova tarefa", () => {
  beforeEach(() => {
    cy.visit('https://phpauloreis.github.io/todo-list-alpine-js/')
  });

  it("Deve adicionar uma nova tarefa", () => {
    const tarefa = "Tarefa 0";

    // Digita a nova tarefa no campo de texto
    cy.get('#todo_title').type(tarefa);

    // Clica no botão "Criar Tarefa"
    cy.get('.btn-primary').click();

    // Verifica se a tarefa foi adicionada corretamente
    cy.contains('[x-text="todo.task"]', tarefa).should('exist');
  });

  it("Deve adicionar múltiplas tarefas consecutivas", () => {
    const tarefas = ["Tarefa 1", "Tarefa 2", "Tarefa 3"];

    // Loop para adicionar todas as tarefas
    tarefas.forEach(tarefa => {
      // Digita a nova tarefa no campo de texto
      cy.get('#todo_title').type(tarefa);

      // Clica no botão "Criar Tarefa"
      cy.get('.btn-primary').click();

      // Verifica se a tarefa foi adicionada corretamente
      cy.contains('[x-text="todo.task"]', tarefa).should('exist');
    });
  });
});

describe("Marcar tarefas como concluídas", () => {
  beforeEach(() => {
    cy.visit('https://phpauloreis.github.io/todo-list-alpine-js/');
    const tarefa = "Tarefa a ser marcada como concluída";
    // Cadastra uma tarefa para ser marcada como concluída
    cy.get('#todo_title').type(tarefa);
    cy.get('.btn-primary').click();
  });

  it("Deve marcar uma tarefa como concluída", () => {
    // Marca a primeira tarefa como concluída
    cy.get(':nth-child(2) > :nth-child(1) > .form-check-input').check();
    // Verifica se a tarefa foi marcada como concluída
    cy.get(':nth-child(2) > :nth-child(2)').should('have.class', 'completed');
  });

  it("Deve desmarcar uma tarefa concluída", () => {
    // Marca e depois desmarca a primeira tarefa
    cy.get(':nth-child(2) > :nth-child(1) > .form-check-input').check();
    cy.get(':nth-child(2) > :nth-child(1) > .form-check-input').uncheck();
    // Verifica se a tarefa não está mais marcada como concluída
    cy.get(':nth-child(2) > :nth-child(2)').should('not.have.class', 'completed');
  });
});

describe("Cliente remove tarefas da lista", () => {
  beforeEach(() => {
    cy.visit('https://phpauloreis.github.io/todo-list-alpine-js/');
    const tarefa = "Tarefa a ser removida";
    // Cadastra uma tarefa para ser removida
    cy.get('#todo_title').type(tarefa);
    cy.get('.btn-primary').click();
  });

  it("Deve remover uma tarefa", () => {
    // Remove a primeira tarefa
    cy.get('.text-end > .btn').click();
    // Confirma a remoção
    cy.on('window:confirm', () => true);
    // Verifica se a tarefa foi removida
    cy.get('.mb-3').should("have.text", "Tarefas cadastradas: 0");
  });


});
