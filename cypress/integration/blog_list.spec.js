describe('Blog app', function () {
	beforeEach(function () {
		cy.request('POST', 'http://localhost:3003/api/testing/reset')
		// user to backend
		const user = {
			name: 'Faiz Alam',
			username: 'faizalam',
			password: 'alamalam',
		}
		cy.request('POST', 'http://localhost:3003/api/users', user)
		cy.visit('http://localhost:3000')
	})

	it('Login form is shown', function () {
		cy.contains('Log in to application')
		cy.contains('username')
		cy.contains('password')
		cy.get('#loginBtn').should('contain', 'login')
	})

	describe('Login', function () {
		it('succeeds with correct credentials', function () {
			cy.get('#username').type('faizalam')
			cy.get('#password').type('alamalam')
			cy.get('#loginBtn').click()

			cy.contains('faizalam logged in')
		})

		it('fails with wrong credentials', function () {
			cy.get('#username').type('faizalam')
			cy.get('#password').type('alam')
			cy.get('#loginBtn').click()

			cy.get('.error')
				.should('contain', 'wrong username or password')
				.and('have.css', 'color', 'rgb(255, 0, 0)')
		})

		describe('when logged in', function () {
			beforeEach(function () {
				// login
				cy.get('#username').type('faizalam')
				cy.get('#password').type('alamalam')
				cy.get('#loginBtn').click()

				cy.contains('faizalam logged in')
			})

			it('A blog can be created', function () {
				cy.contains('create new blog').click()
				cy.contains('create new')

				cy.get('#title').type('Jest')
				cy.get('#author').type('Faiz')
				cy.get('#url').type('localhost:3000')

				cy.get('#createBtn').click()

				cy.contains('Jest - Faiz')
			})
		})
	})
})
