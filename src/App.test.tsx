import { render, screen } from '@testing-library/react'
import App from './App'

test('renders Vite + React heading', () => {
  render(<App />)
  const headingElement = screen.getByText(/vite \+ react/i)
  expect(headingElement).toBeInTheDocument()
})

test('renders count button', () => {
  render(<App />)
  const buttonElement = screen.getByText(/count is 0/i)
  expect(buttonElement).toBeInTheDocument()
})
