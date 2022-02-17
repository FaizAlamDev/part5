import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders title and author only', () => {
	const blog = {
		title: 'Jest',
		author: 'Faiz',
	}
	const { container } = render(<Blog blog={blog} />)
	const div = container.querySelector('.blog')
	expect(div).toHaveTextContent('Jest - Faiz')
})
