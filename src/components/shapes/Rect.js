import PropTypes from "prop-types"
import React from "react"

const Rect = ({ x, y, width, height, fill, scale, name }) => {
	return (
		<>
			<rect
				x={x}
				y={y} 
				width={width}
				height={height}
				fill={fill}
				scale={scale}
			/>
			{
				name && 
				<text 
					x={x}
					y={y + height/2} 
					fill="white"
					fontSize={12}
					fontWeight={400}
					preserveAspectRatio="xMidYMid slice"
				>
					{name}
				</text>
			}
		</>
	)
}

Rect.propTypes = {
	x: PropTypes.number,
	y: PropTypes.number,
	width: PropTypes.number,
	height: PropTypes.number,
	fill: PropTypes.string,
	scale: PropTypes.number,
	name: PropTypes.string,
}

export default Rect