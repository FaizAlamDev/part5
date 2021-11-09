import React, { useState } from 'react'
const Blog = ({ blog, handleLikes }) => {
	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		margin: 5,
	}

	const [view, setView] = useState(false)

	const handleClick = (e) => {
		e.preventDefault()
		setView(!view)
	}

	if (view === true) {
		return (
			<div style={blogStyle}>
				<div>
					{blog.title} - {blog.author}
					<button onClick={handleClick}>hide</button>
				</div>
				<div>{blog.url}</div>
				<div>
					likes {blog.likes}{' '}
					<button onClick={handleLikes}>like</button>
				</div>
				<div>{blog.author}</div>
			</div>
		)
	}

	return (
		<div style={blogStyle}>
			<div>
				{blog.title} - {blog.author}{' '}
				<button onClick={handleClick}>view</button>
			</div>
		</div>
	)
}

export default Blog
