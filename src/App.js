import React, { useEffect, useState } from "react"
import "./styles/App.css"
import SVGPalette from "./components/SVGPalette"
import SVGShapes from "./components/SVGShapes"
import { 
	createBackgroundPalette,
	createBasePalette,
	createHuePalette,
	hslToString } from "./utils/PaletteUtils"

function App() {

	const [fill, setFill] = useState("")

	const [palette, setPalette] = useState()
	const [fullPalette, setFullPalette] = useState([])

	useEffect(() => {
		const handler = setTimeout(() => {
			generatePalette()
		}, 2000)

		return () => {
			clearTimeout(handler)
		}
	}, [palette])


	const generatePalette = () => {
		// creating base color
		const hslBase = createBasePalette()
		
		// creating background color
		const hslBg = createBackgroundPalette(hslBase)
		const fill = hslToString(hslBg.hue, hslBg.sat, hslBg.light)
		setFill(fill)
		console.log("[generatePalette] fill: ", fill)
		const bgColor = {
			value:fill,
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
		console.log("[generatePalette] palette: ", hslPaletteToString)
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
					<div className="shapes">
						<div>
							<p className="title gradient-text">{"Shapes"}</p>
							<SVGShapes 
								width={400}
								height={400}
								cols={20}
								rows={20}
								shape={["rect", "circle", "line"]}
								palette={palette}
								fill={fill}
							/>
						</div>

						<div>
							<p className="title gradient-text">{"Pixels"}</p>
							<SVGShapes 
								width={400}
								height={400}
								cols={20}
								rows={20}
								shape={["rect"]}
								palette={palette}
								fill={fill}
							/>
						</div>
					</div>
					<p className="title gradient-text">{"Palette"}</p>
					<SVGPalette
						width={712}
						height={128}
						cols={fullPalette.length}
						rows={1}
						palette={fullPalette}
						fill={fill}
					/>
				</>
			}
		</div>
	)
}

export default App
