describe('Blog app', function() {
  beforeEach(function() {
    /*cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'jakov',
      username: 'jakovb',
      password: 'salasana'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)*/
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('blogs')
    cy.contains('log in')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('jakov')
      cy.get('#password').type('salainen')
      cy.contains('login').click()

      cy.contains('create new')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('sesperi')
      cy.get('#password').type('hesperi')
      cy.contains('login').click()

      cy.get('.error').should('contain', 'wrong username or password') 
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('.error').should('have.css', 'border-style', 'solid')
    })

  })

})