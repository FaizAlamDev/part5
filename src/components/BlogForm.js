import React from 'react'

const BlogForm = ({ addBlog }) => {
	return (
		<div>
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
	)
}

export default BlogForm
