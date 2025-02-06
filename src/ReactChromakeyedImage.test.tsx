import { render, screen } from '@testing-library/react'
import * as React from 'react'

import ReactChromakeyedImage from '../reactChromakeyedImage'

test('renders correctly on first load', () => {
	render(<ReactChromakeyedImage />)
	const button = screen.getByRole('button')
	expect(button).toHaveTextContent('0')
})
