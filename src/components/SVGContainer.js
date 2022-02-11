import PropTypes from "prop-types"
import "../styles/App.css"
import React from "react"

const SVGContainer = ({ width, height, fill, ...props }) => {

	const viewBox = [0, 0, width, height]

	return (
		<div className="svg">
			<svg
				viewBox={viewBox}
				width={width}
				height={height}
				// fill={fill}
				xmlns="http://www.w3.org/2000/svg"
				preserveAspectRatio="xMidYMid slice"
			>
				<rect
					width={width}
					height={height}
					fill={fill}
				/>
				{
				// eslint-disable-next-line react/prop-types
					props.children
				}
			</svg>
		</div>
	)
}

SVGContainer.propTypes = {
	x: PropTypes.number,
	y: PropTypes.number,
	width: PropTypes.number,
	height: PropTypes.number,
	fill: PropTypes.string
}

SVGContainer.defaultProp = {
	width: 1000,
	height: 1000
}

export default SVGContainer