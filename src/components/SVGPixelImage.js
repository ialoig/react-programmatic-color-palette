import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import { getRandom } from "../utils/PaletteUtils"
import { Rect } from "./shapes"

const SVGPixelImage = ({ width, height, cols, rows, palette }) => {
    
	const colSize = width / cols
	const rowSize = height / rows
	const viewBox = [0, 0, width, height]

	const [shapes, setShapes] = useState([])


	useEffect(() => {
		generateShapes(palette)
	}, [palette])
	

	const generateShapes = (palette) => {
		let randomShapes = []
		for (let x = 0; x<width; x += colSize) {
			for (let y = 0; y<height; y += 	rowSize) {

				const color = palette[getRandom(0, palette.length-1)]
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
			}
		}
		setShapes(randomShapes)
	}


	return (
		<div className="svg-pixels">
			<svg
				className="svg-container"
				viewBox={viewBox}
				width={width}
				height={height}
				xmlns="http://www.w3.org/2000/svg"
			>
				{shapes}
			</svg>
		</div>


	)
}

SVGPixelImage.propTypes = {
	width: PropTypes.number,
	height: PropTypes.number,
	cols: PropTypes.number,
	rows: PropTypes.number,
	shape: PropTypes.array,
	palette: PropTypes.array,
}

SVGPixelImage.defaultProps = {
	width: 400,
	height: 400,
	cols: 20,
	rows: 20,
}

export default SVGPixelImage