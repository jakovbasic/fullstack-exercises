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

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('jakov')
      cy.get('#password').type('salainen')
      cy.contains('login').click()
    })
    /*
    it('A blog can be created', function() {
      cy.contains('add blog').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('makkone')
      cy.get('#url').type('hessu.fi')
      cy.contains('save').click()
      cy.contains('a blog created by cypress makkone')
    })
    */
    it('A blog can be created', function() {
      cy.contains('a blog created by cypress makkone')
          .contains('view').click()
      //cy.contains('like').click()

      //cy.contains('a blog created by cypress makkone')
      //    .contains('view').click()
      cy.contains('likes: 1')
    })

    it('A blog can be removed by user', function() {
      cy.contains('a blog created by cypress makkone')
          .contains('view').click()
      //cy.contains('remove').click()
    })

    it('Blogs are in like order', function() {
      cy.get('.blog').eq(0).should('contain', 'aasd')
      cy.get('.blog').eq(1).should('contain', 'uusi')
      cy.get('.blog').eq(2).should('contain', 'asdasdsad')
    })

  })
    
})