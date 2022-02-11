import PropTypes from "prop-types"
import React from "react"

const Circle = ({ cx, cy, radius, fill, scale }) => {
	return (
		<circle
			r={radius}
			cx={cx + radius}
			cy={cy + radius} 
			fill={fill}
			scale={scale}
		/>
	)
}

Circle.propTypes = {
	cx: PropTypes.number,
	cy: PropTypes.number,
	radius: PropTypes.number,
	fill: PropTypes.string,
	scale: PropTypes.number,
}

export default Circle