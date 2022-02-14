import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import { getRandom } from "../utils/PaletteUtils"
import SVGContainer from "./SVGContainer"
import { Circle, Line, Rect } from "./shapes"

const SVGShapes = ({ width, height, cols, rows, shape, palette, fill }) => {
    
	const colSize = width / cols
	const rowSize = height / rows

	const [shapes, setShapes] = useState([])


	useEffect(() => {
		generateShapes(palette)
	}, [palette])
	

	const generateShapes = (palette) => {
		let randomShapes = []
		for (let x = 0; x<width; x += colSize) {
			for (let y = 0; y<height; y += 	rowSize) {

				const color = palette[getRandom(0, palette.length-1)]
				switch(shape[getRandom(0, shape.length-1)]) {
				case "rect":
					randomShapes.push(
						<Rect 
							key={Math.random()}
							x={x}
							y={y}
							width={colSize}
							height={rowSize}
							scale={0.75}
							fill={color.value}
						/>)
					break
				case "circle":
					randomShapes.push(
						<Circle 
							key={Math.random()}
							cx={x}
							cy={y}
							radius={Math.min(colSize, rowSize) / 2}
							scale={0.75}
							fill={color.value}
						/>)
					break
				case "line":
					randomShapes.push(
						<Line 
							key={Math.random()}
							x1={x}
							x2={x + colSize}
							y1={y}
							y2={y + rowSize}
							scale={0.75}
							strokeWidth={5}
							strokeColor={color.value}
						/>)
					break
				default:
					randomShapes.push(
						<Rect 
							key={Math.random()}
							x={x}
							y={y}
							width={colSize}
							height={rowSize}
							scale={0.75}
							fill={color.value}
						/>)
					break

				}
				setShapes(randomShapes)
			}
		}
	}


	return (
		<SVGContainer 
			width={width}
			height={height}
			fill={fill}
		>
			{shapes}
		</SVGContainer>
	)
}

SVGShapes.propTypes = {
	width: PropTypes.number,
	height: PropTypes.number,
	cols: PropTypes.number,
	rows: PropTypes.number,
	shape: PropTypes.array,
	palette: PropTypes.array,
	fill: PropTypes.string
}

SVGShapes.defaultProps = {
	width: 400,
	height: 400,
	cols: 20,
	rows: 20,
}

export default SVGShapes