import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import SVGContainer from "./SVGContainer"
import { Rect } from "./shapes"

const SVGImage = ({ width, height, cols, rows, palette }) => {
    
	const colSize = width / cols
	const rowSize = height / rows
	
	const [shapes, setShapes] = useState([])

	useEffect(() => {
		generateRects(palette)
	}, [])
	

	
	const generateRects = (palette) => {
		let localShapes = []
		let x = 0
		for (const color of palette) {
			localShapes.push(
				<Rect 
					key={Math.random()}
					x={x}
					y={0}
					width={colSize}
					height={rowSize}
					scale={0.75}
					fill={color.value}
					name={color.name}
				/>
			)
			x += colSize
		}
		setShapes(localShapes)
	}




	return (
		<SVGContainer 
			width={width}
			height={height}
		>
			{shapes}
		</SVGContainer>
	)
}

SVGImage.propTypes = {
	width: PropTypes.number,
	height: PropTypes.number,
	cols: PropTypes.number,
	rows: PropTypes.number,
	palette: PropTypes.array,
}

SVGImage.defaultProps = {
	width: 1000,
	height: 1000,
	cols: 4,
	rows: 4,
}

export default SVGImage