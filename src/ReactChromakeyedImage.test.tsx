import { render, screen } from '@testing-library/react'
import * as React from 'react'

import ReactChromakeyedImage from '../reactChromakeyedImage'

const IMG_SRC = "https://placecats.com/bella/300/200";

test('renders correctly on first load', () => {
	render(<ReactChromakeyedImage src={IMG_SRC} findColor="#f0f0f0" replaceColor="#00f000" tolerance={50} />)
	const button = screen.getByRole('button')
	expect(button).toHaveTextContent('0')
})
