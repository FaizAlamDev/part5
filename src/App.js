import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Error from './components/Error'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)

	const [msg, setMsg] = useState(null)
	const [error, setError] = useState(null)

	useEffect(() => {
		blogService.getAll().then((blogs) => setBlogs(blogs))
	}, [])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedInUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
		}
	}, [])

	const handleLogin = async (e) => {
		e.preventDefault()

		try {
			const user = await loginService.login({ username, password })
			blogService.setToken(user.token)
			window.localStorage.setItem('loggedInUser', JSON.stringify(user))
			setUser(user)
			setUsername('')
			setPassword('')
			setMsg(`${user.name} logged in`)
			setTimeout(() => {
				setMsg(null)
			}, 4000)
		} catch (exception) {
			console.log(exception)
			setError('wrong username or password')
			setTimeout(() => {
				setError(null)
			}, 4000)
		}
	}

	const handleLogout = (e) => {
		e.preventDefault()
		window.localStorage.removeItem('loggedInUser')
		setUser(null)
	}

	const addBlog = async (e) => {
		e.preventDefault()
		let blog = {
			title: e.target.title.value,
			author: e.target.author.value,
			url: e.target.url.value,
		}

		blogService.setToken(user.token)
		const returnedBlog = await blogService.create(blog)
		setBlogs(blogs.concat(returnedBlog))
		setMsg(`a new blog '${blog.title}' by ${blog.author} added`)
		setTimeout(() => {
			setMsg(null)
		}, 4000)
	}

	if (user === null) {
		return (
			<div>
				<h2>Log in to application</h2>
				<Error error={error} />
				<form onSubmit={handleLogin}>
					<div>
						username:
						<input
							type='text'
							value={username}
							name='Username'
							onChange={({ target }) => setUsername(target.value)}
						/>
					</div>
					<div>
						password:
						<input
							type='password'
							value={password}
							name='Password'
							onChange={({ target }) => setPassword(target.value)}
						/>
					</div>
					<button type='submit'>login</button>
				</form>
			</div>
		)
	}

	return (
		<div>
			<h2>blogs</h2>
			<Notification message={msg} />
			<p>
				{user.username} logged in{' '}
				<button onClick={handleLogout}>logout</button>
			</p>
			<div>
				<h2>create new</h2>
				<form onSubmit={addBlog}>
					title <input type='text' name='title' />
					<br />
					author <input type='text' name='author' />
					<br />
					url <input type='text' name='url' />
					<br />
					<button type='submit'>create</button>
				</form>
			</div>
			{blogs.map((blog) => (
				<Blog key={blog.id} blog={blog} />
			))}
		</div>
	)
}

export default App
