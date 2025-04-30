
// Aqui criamos uma suíte para este único teste: sem descrição e detalhamento. Apenas por ser uma page fora,
// modificando o 'cy.visit'

// Há dois testes iguais apenas separados por VIEWPORTS de tamanho desktop e outro de Iphone (mais em 'API>>Viewport' em docs Cypress)
    context('720p resolution', () => {
      beforeEach(() => {
        // run these tests as if in a desktop
        // browser with a 720p monitor
        cy.viewport(1280, 720)
      })
        it('testa a página da política de privacidade de forma independente', () => {
            cy.visit('./src/privacy.html')
    
            cy.contains('h1','CAC TAT - Política de Privacidade').should('be.visible')
            cy.contains('p','Talking About Testing').should('be.visible')
        })
    })

    context('iphone-5 resolution', () => {
      beforeEach(() => {
        // run these tests as if in a mobile browser
        // and ensure our responsive UI is correct
        cy.viewport('iphone-5')
      })
        it('testa a página da política de privacidade de forma independente', () => {
        cy.visit('./src/privacy.html')

        cy.contains('h1','CAC TAT - Política de Privacidade').should('be.visible')
        cy.contains('p','Talking About Testing').should('be.visible')
        })
    })