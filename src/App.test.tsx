import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

test('renders navigation header', async () => {
  render(<App />)
  
  // Check for navigation elements
  expect(screen.getByText('Vite App')).toBeInTheDocument()
  expect(screen.getByText('Home')).toBeInTheDocument()
  expect(screen.getByText('About')).toBeInTheDocument()
})

test('renders home page content by default', async () => {
  render(<App />)
  
  // Wait for lazy loaded component
  await waitFor(() => {
    expect(screen.getByText(/vite \+ react/i)).toBeInTheDocument()
  })
  
  // Check for count button
  await waitFor(() => {
    expect(screen.getByText(/count is 0/i)).toBeInTheDocument()
  })
})

test('navigates to about page', async () => {
  const user = userEvent.setup()
  render(<App />)
  
  // Click on About link in navigation
  const aboutLink = screen.getByRole('link', { name: 'About' })
  await user.click(aboutLink)
  
  // Wait for lazy loaded component and check for About page content
  await waitFor(() => {
    expect(screen.getByRole('heading', { name: 'About' })).toBeInTheDocument()
    expect(screen.getByText(/modern full-stack web application/i)).toBeInTheDocument()
  })
})
