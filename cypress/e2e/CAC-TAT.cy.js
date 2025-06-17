describe(('Central de Atendimento ao Cliente TAT'), () => {
  beforeEach(() => {
    cy.visit('src/index.html');
  })

  it('Verifica o título da Aplicação', () => { //TC01
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT');
  })

  it('preenche os campos obrigatórios e envia o formulário', () => { //TC02
    cy.clock();
    const textLong = Cypress._.repeat('Henrick', 10);
    cy.get('#firstName').type('Henrick', { delay:0 });
    cy.get('#lastName').type('Borba', { delay:0 });
    cy.get('#email').type('HenrickBorba@gmail.com', { delay:0 });
    cy.get('#open-text-area').type(textLong, { delay:0 });
    cy.enviarForm();
    cy.get('.success').should('be.visible');
    cy.tick(3000);
    cy.get('.success').should('not.be.visible');
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => { //TC03
    cy.clock();
    cy.preencheCamposObrigatorios('Henrick', 'Borba', 'HenrickBorba');
    cy.enviarForm();
    cy.get('.error').should('be.visible');
    cy.tick(3000);
    cy.get('.error').should('not.be.visible');
  })

  it('Validação de campo de Telefone', () => { //TC04
    cy.get('#phone').type('Olá!').should('have.value', '');
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => { //TC05
    cy.clock();
    cy.preencheCamposObrigatorios('Henrick', 'Borba', 'Henrickborba@gmail.com');
    cy.botaoObrigatorio('tel');
    cy.enviarForm();
    cy.get('.error').should('be.visible');
    cy.tick(3000);
    cy.get('.error').should('not.be.visible');
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => { //TC06
    cy.get('#firstName').type('Henrick', { delay:0 }).should('have.value', 'Henrick').clear().should('have.value', '');
    cy.get('#lastName').type('Borba', { delay:0 }).should('have.value', 'Borba').clear().should('have.value', '');
    cy.get('#email').type('HenrickBorba@gmail.com', { delay:0 }).should('have.value', 'HenrickBorba@gmail.com').clear().should('have.value', '');
    cy.botaoObrigatorio('tel');
    cy.get('#phone').type('92129391', { delay:0 }).should('have.value', '92129391').clear().should('have.value', '');
    cy.enviarForm();
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => { //TC07
    cy.clock();
    cy.enviarForm();
    cy.get('.error').should('be.visible');
    cy.tick(3000);
    cy.get('.error').should('not.be.visible');
  })
  
  it('envia o formuário com sucesso usando um comando customizado', () => { //TC08
    cy.clock();
    cy.preencheCamposObrigatorios('Henrick', 'Borba', 'Henrickborba@gmail.com');
    cy.enviarForm();
    cy.get('.success').should('be.visible');
    cy.tick(3000);
    cy.get('.success').should('not.be.visible');
  })

  it('seleciona um produto (YouTube) por seu texto', () => { //TC09
    cy.get('select').select('YouTube').should('have.value', 'youtube'); // Seleção pelo texto YouTube
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', () => { //TC10
    cy.get('select').select('mentoria').should('have.value', 'mentoria'); // Seleção pelo value mentoria
  })

  it('seleciona um produto (Blog) por seu índice', () => { //TC11
    cy.get('select').select(1).should('have.value', 'blog'); // Seleção pelo indice 1
  })

  it('marca o tipo de atendimento "Feedback"', () => { //TC12
    cy.get('input[type="radio"]').check('feedback').should('have.value', 'feedback');
  })

  it('marca cada tipo de atendimento', () => { //TC13
    cy.get('input[type="radio"]').each(($cada) => {
      cy.wrap($cada).check().should('be.checked');
    });
  });

  it('marca ambos checkboxes, depois desmarca o último', () => { //TC14
    cy.get('input[type="checkbox"]').check().should('be.checked').last().uncheck().should('not.be.checked');
  })

  it('seleciona um arquivo da pasta fixtures', () => { //TC15
    cy.get('input[type="file"]').selectFile('cypress/fixtures/example.json')
      .then(input => {
        expect(input[0].files[0].name).to.equal('example.json');
      });
  })

  it('seleciona um arquivo simulando um drag-and-drop', () => { //TC16
    cy.get('input[type="file"]').selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
      .then(input => {
        expect(input[0].files[0].name).to.equal('example.json');
      })
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => { //TC17
    cy.fixture('example.json').as('arquivoExemplo');
    cy.get('input[type="file"]').selectFile('@arquivoExemplo')
      .then(input => {
        expect(input[0].files[0].name).to.equal('example.json');
      })
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => { //TC18
    cy.contains('a', 'Política de Privacidade').should('have.attr', 'target', '_blank').and('have.attr', 'href', 'privacy.html');
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => { //TC19
    cy.contains('a', 'Política de Privacidade').invoke('removeAttr', 'target').click();
  })
  
  it('exibe e oculta as mensagens de sucesso e erro usando .invoke()', () => { //TC20
    cy.get('.success').should('not.be.visible').invoke('show').should('be.visible').and('contain', 'Mensagem enviada com sucesso.').invoke('hide').should('not.be.visible');
    cy.get('.error').should('not.be.visible').invoke('show').should('be.visible').and('contain', 'Valide os campos obrigatórios!').invoke('hide').should('not.be.visible');
  })

  it('preenche o campo da área de texto usando o comando invoke', () => { //TC21
    cy.get('#open-text-area').invoke('val', 'um texto qualquer').should('have.value', 'um texto qualquer');
  })

  it('faz uma requisição HTTP', () => { //TC22
    cy.request('GET', 'https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html',)
      .should((response) => {
        expect(response.status).to.eq(200);
        expect(response.statusText).to.eq('OK');
        expect(response.body).to.include('CAC TAT');
      })
  })

  it('Achando o gato escondido', () => { //TC23
    cy.get('#cat').invoke('show').should('be.visible');
  })

  it('Mudando um texto', () => { //TC24
    cy.get('#title').invoke('text', 'CAT TAT');
  })
})
