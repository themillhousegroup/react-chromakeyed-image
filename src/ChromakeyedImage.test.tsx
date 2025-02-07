import { render, screen } from '@testing-library/react'
import * as React from 'react'

import ReactChromakeyedImage from './ChromakeyedImage';

const IMG_SRC = "https://placecats.com/bella/300/200";
const TEST_ID = "rci-test-id-1"

const STANDARD_PROPS = {
	       src: IMG_SRC 
		       findColor:"#f0f0f0" 
		       replaceColor:"#00f000" 
		       tolerance:50 
		       "data-test-id": TEST_ID
}

test('renders correctly on first load', async () => {
	render(<ReactChromakeyedImage {...STANDARD_PROPS} />)
	const canvas = await screen.findByTestId(TEST_ID)
	expect(canvas).toBeDefined()
})

test('redraws when a prop is changed', async () => {
	// https://testing-library.com/docs/react-testing-library/api/#rerender
	const { rerender } = render(<ReactChromakeyedImage {...STANDARD_PROPS} />)
	const canvas = await screen.findByTestId(TEST_ID)
	expect(canvas).toBeDefined()
	const newProps {
		...STANDARD_PROPS,
		replaceColor: "#0000000"
	};
	// re-render the same component with different props
	rerender(<ReactChromakeyedImage {...newProps} />)
	await screen.findByTestId(TEST_ID)
})
