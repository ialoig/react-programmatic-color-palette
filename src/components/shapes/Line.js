import PropTypes from "prop-types"
import React from "react"

const Line = ({ x1, x2, y1, y2, strokeWidth, strokeColor, fill, scale }) => {
	return (
		<line
			x1={x1}
			x2={x2}
			y1={y1}
			y2={y2}
			strokeWidth={strokeWidth}
			stroke={strokeColor}
			fill={fill}
			scale={scale}
		/>
	)
}

Line.propTypes = {
	x1: PropTypes.number,
	x2: PropTypes.number,
	y1: PropTypes.number,
	y2: PropTypes.number,
	strokeWidth: PropTypes.number,
	strokeColor: PropTypes.string,
	fill: PropTypes.string,
	scale: PropTypes.number,
}

export default Line