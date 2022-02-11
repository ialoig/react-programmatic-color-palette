import React, { useEffect, useState } from "react"
import "./styles/App.css"
import SVGImage from "./components/SVGImage"
import SVGShapes from "./components/SVGShapes"
import { createBackgroundPalette, createBasePalette, createHuePalette, hslToString } from "./utils/PaletteUtils"
// import SVGImage from "./components/SVGImage"

function App() {

	const [fill, setFill] = useState("")

	const [palette, setPalette] = useState()
	const [fullPalette, setFullPalette] = useState([])

	useEffect(() => {
		generatePalette()
	}, [])


	const generatePalette = () => {
		// creating base color
		const hslBase = createBasePalette()
		
		// creating background color
		const hslBg = createBackgroundPalette(hslBase)
		const toString = hslToString(hslBg.hue, hslBg.sat, hslBg.light)
		setFill(toString)
		const bgColor = {
			value:toString,
			name: hslBg.name
		}
		
		// creating palette from base color
		const hslPalette = createHuePalette(hslBase)
		const hslPaletteToString = hslPalette.map((palette) => {
			const toString = hslToString(palette.hue, palette.sat, palette.light)
			const color = {
				value: toString,
				name: palette.name
			}
			return color
		})
		setPalette(hslPaletteToString)

		// adding background color to the full palette array
		let fullPalette = [...hslPaletteToString]
		fullPalette.push(bgColor)
		setFullPalette(fullPalette)
	}
	
	return (
		<div className="App">
			{
				palette && fill && 
				<>
					<p className="title gradient-text">{"Shapes"}</p>
					<SVGShapes 
						width={256}
						height={256}
						cols={4}
						rows={4}
						shape={["rect", "circle", "line"]}
						palette={palette}
						fill={fill}
					/>
					<p className="title gradient-text">{"Palette"}</p>
					<SVGImage
						width={712}
						height={128}
						cols={fullPalette.length}
						rows={1}
						palette={fullPalette}
						fill={fill}
					/>
					<p className="title gradient-text">{"Pixels"}</p>
					<SVGShapes 
						width={256}
						height={256}
						cols={4}
						rows={4}
						shape={["rect"]}
						palette={palette}
						fill={fill}
					/>
				</>
			}
		</div>
	)
}

export default App
