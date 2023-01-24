import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'test',
    user: {
      username: 'some'
    }
  }
  const testUser = 'tester'

  render(<Blog blog={blog} loggedUser={testUser} />)

  const element = screen.getByText('test')
  expect(element).toBeDefined()
})

test('clicking the button displays blog info', async () => {
  const blog = {
    title: 'test',
    author: 'mf',
    url: 'www.fi',
    likes: '7',
    user: {
      username: 'some'
    }
  }
  const testUser = 'tester'

  render(<Blog blog={blog} loggedUser={testUser} />)

  const user = userEvent.setup()
  await user.click(screen.getByText('view'))

  const e1 = screen.getByText('title: test')
  const e2 = screen.getByText('author: mf')
  const e3 = screen.getByText('url: www.fi')
  const e4 = screen.getByText('likes: 7')

  expect(e1).toBeDefined()
  expect(e2).toBeDefined()
  expect(e3).toBeDefined()
  expect(e4).toBeDefined()
})

test('clicking the button twice calls event handler twice', async () => {
  const blog = {
    title: 'test',
    author: 'mf',
    url: 'www.fi',
    likes: '7',
    user: {
      username: 'some'
    }
  }
  const testUser = 'tester'

  const mockHandler = jest.fn()

  render(<Blog blog={blog} loggedUser={testUser} addLike={mockHandler} />)

  const user = userEvent.setup()
  await user.click(screen.getByText('view'))
  await user.click(screen.getByText('like'))
  await user.click(screen.getByText('like'))

  expect(mockHandler.mock.calls).toHaveLength(2)
})