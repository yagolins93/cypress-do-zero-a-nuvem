
// O bloco 'describe' define a suíte de teste, já o bloco 'it' define o caso de teste
  describe('Central de Atendimento ao Cliente TAT', () => {
      beforeEach(() => {  //para entrar na url antes dos testes para não repetir o mesmo comportamento
        cy.visit('./src/index.html')      
      })
      
//bloco de Testes:
    it('Verifica o título da aplicação', () => {
      cy.title().should('be.equals','Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', () => {
      //criou-se longText atribuiu-se pacote Cypress com a funcion ._ que tem repeat dentro
      const longText = Cypress._.repeat('textodeexemplolongoparatestegpress', 10)
      //ações automáticas
      cy.get('#firstName').type('Roberto')
      cy.get('#lastName').type('Lins de Freitas')
      cy.get('#email').type('yagolins@gmail.com')
      //abaixo, com intuito de tirar o delay de 10s, chamamos o longText criado acima e parametrizamos delay=0
      cy.get('#open-text-area').type(longText, { delay : 0 })
      cy.contains('button', 'Enviar').click()
      //verificação do que é esperado
      cy.get('.success').should('be.visible')
    })
    
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
      const longText = Cypress._.repeat('textodeexemplolongoparatestegpress', 10)
      //ações automáticas
      cy.get('#firstName').type('Roberto')
      cy.get('#lastName').type('Lins de Freitas')
      cy.get('#email').type('yagolinsgmail.com')
      //abaixo, com intuito de tirar o delay de 10s, chamamos o longText criando acima e parametrizamos delay=0
      cy.get('#open-text-area').type(longText, { delay : 0 })
      cy.get('button[type="submit"]').click()
      //verificação do que é esperado sempre com uma linha separando
      cy.get('.error').should('be.visible')
    })

    it('campo telefone continua vazio quando tentamos colocar valor não-numérico', () => {
      cy.get('#phone')
        .type('abcd')

        .should('have.value','') //para assegurar o teste, é preciso estar vazio o campo após tentar digitar 'abcd'
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
      cy.get('#firstName').type('Roberto')
      cy.get('#lastName').type('Lins de Freitas')
      cy.get('#email').type('yagolins@gmail.com')
//      cy.get('#phone').type('929555552616')
      cy.get('#open-text-area').type('teste')
      cy.get('#phone-checkbox').check()
//    modificando a forma de apertar o botao enviar: de seletor css para conteúdo da tag html.      
      cy.contains('button', 'Enviar').click()

      cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
      function preencheApaga (campo,dadosDigitados){ //Criei essa função para evitar repetição
        cy.get(campo).type(dadosDigitados) //pega o campo e digita
        .should('have.value', dadosDigitados) // certifica que o valor do campo seja igual ao digitado *só exemplo
        .clear()
        .should('have.value','')
      }
        preencheApaga('#firstName', 'Yagus')
        preencheApaga('#lastName', 'Robertus')
        preencheApaga('#email', 'yrld@true.com')
        preencheApaga('#phone', '84198040')

/*      cy.get('#firstName').type('Yagus')
        .should('have.value','Yagus') // certifica que o valor do campo seja igual ao digitado *só exemplo
        .clear()
        .should('have.value','') //certifica que o campo name esteja vazio
*/  })
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
      cy.get('.button')
        .click()
      
      cy.get('.error').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', () => {
      const dados = { //criando objeto para interar a partir daqui com o COMANDO CUSTOMIZADO (commands.js)
        firstName: 'Alessandra',
        lastName: 'Nascimento',
        email: 'ale@example.com',
        texto: 'teste.'
      }
      //chamando o COMANDO CUSTOMIZADO que está em commands.js
      cy.fillMandatoryFieldsAndSubmit(dados) //com o objeto criado aqui chamado 'dados'
      
      cy.get('.success').should('be.visible')
    })

    //Aula 3: Select()
    it('seleciona um produto (YouTube) por seu texto', () => {
      cy.get('#product').select('YouTube').should('have.value','youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', () => {
      cy.get('#product').select('mentoria').should('have.value','mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', () => {
      cy.get('#product').select(1).should('have.value','blog')
    })

    //Aula 4: Inputs do tipo RADIO -> use check()
    it('marca o tipo de atendimento "Feedback"', () => {
      //cy.get(':nth-child(4) > input') - abaixo a regra do curso foi substituir por nome mais sugestivo.
        cy.get('input[type="radio"][value="feedback"]').check()
        .should('have.checked')
    })

     it('marca cada tipo de atendimento e checa', () => { 
      //Aqui selecionando cada opção .each() e empacotando a função de check com .wrap() para cada uma.
      cy.get('input[type="radio"]') //pegando apenas o tipo radio conforme o HTML
        .each ((TipoDeAtendimento) => {  //construindo a função
        cy.wrap(TipoDeAtendimento)
          .check()
          .should('be.checked')  
        })
     })

   it('marca ambos checkboxes, depois desmarca o último', () => {
      cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      //agora desmarcando somente o útimo e checando com not.be.checked
      .last()
      .uncheck()
      .should('not.be.checked')
    })  
      
    it('seleciona um arquivo da pasta fixtures', () => {
      cy.get('#file-upload')
        .selectFile('cypress/fixtures/example.json') //selecionando um arquivo com Copy Relative Path
        
        .should(input => {      //agora o .should() vai ter como parametro um objeto 'input' que contem 'files'
          expect(input[0].files[0].name).to.equal('example.json')  //teste compara o valor de 'name' em files que está em input e o nome do arquivo 'example.json'
        })
    })

    it('seleciona um arquivo simulando um drag-and-drop', () => {
      //cy.document().selectFile('file.json', { action: 'drag-drop' }) drag-drop é 'arrasta e solta' para o arquivo no caso
      cy.get('#file-upload')
        .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})

        .should(input => {
          expect(input[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
      cy.fixture('example.json').as('sampleFile') //aqui fazendo um 'alias' para o caminho do arquivo e dando nome 'sampleFile': arquivo simples
      cy.get('#file-upload')
        .selectFile('@sampleFile') //pegando aquivo pelo 'alias' criado acima
        
        .should(input => {      //agora o .should() vai ter como parametro um objeto 'input' que contem 'files'
          expect(input[0].files[0].name).to.equal('example.json')  //teste compara o valor de 'name' em files que está em input e o nome do arquivo 'example.json'
        })
    })

    //Aula 36: Trabalhando com links que abrem em nova página
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
      cy.contains('a','Política de Privacidade')      // função cy.contains acessando tag <a> contendo 'Politc...'
        .should('have.attr', 'href', 'privacy.html')    //função 'have.attr' seleciona um atributo 'href' contendo 'pr...html' da tag <a>
        .and('have.attr', 'target', '_blank')     //acessando outra parte do .should para ver se tem '_blank'(abre em outra page) em 'target'
    })

    //Extra1: retirando 'target = _blank' para abrir Privacidade na mesma page através da função .invoke()
    
    it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
      cy.viewport(410, 860)
      cy.contains('a', 'Política de Privacidade')
        .invoke('removeAttr', 'target')
        .click()
      
      cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
    })

  })
