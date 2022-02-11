/* eslint-disable no-unused-vars */
import { labToXyz, lchToLab, rgbToHex, xyzToRgb } from "./ColorsConverter"

const map = (n, start1, end1, start2, end2) => {
	return ((n - start1) / (end1 - start1)) * (end2 - start2) + start2
}
  
export const adjustHue = (val) => {
	if (val < 0) val += Math.ceil(-val / 360) * 360
  
	return val % 360
}

/**
 * 
 * @param {Object} opts: Object with following options: base, minLightness, maxLightness, hueStep
 * @returns 
 */
export const createHueShiftPalette = (opts) => {
	const { base, minLightness, maxLightness, hueStep } = opts
  
	const palette = [base]
  
	for (let i = 1; i < 5; i++) {
		const hueDark = adjustHue(base.h - hueStep * i)
		const hueLight = adjustHue(base.h + hueStep * i)
		const lightnessDark = map(i, 0, 4, base.l, minLightness)
		const lightnessLight = map(i, 0, 4, base.l, maxLightness)
		const chroma = base.c
  
		palette.push({
			l: lightnessDark,
			c: chroma,
			h: hueDark
		})
  
		palette.unshift({
			l: lightnessLight,
			c: chroma,
			h: hueLight
		})
	}
  
	return palette
}


const serializeHex = color => {
	if (color === undefined) {
		return undefined
	}

	let r = fixup(color.r)
	let g = fixup(color.g)
	let b = fixup(color.b)

	return "#" + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)
}

export const formatHex = c => serializeHex(c)

const clamp = value => Math.max(0, Math.min(1, value))
const fixup = value => Math.round(clamp(value) * 255)


// https://www.w3.org/TR/css-color-4/#oklab-lab-to-predefined
// - Convert Lab to (D50-adapted) XYZ
// - If needed, convert from a D50 whitepoint (used by Lab) to the D65 whitepoint used in sRGB and most other RGB spaces, 
//    with the Bradford transform. prophoto-rgb' does not require this step.
// - Convert from (D65-adapted) CIE XYZ to linear RGB
// - Convert from linear-light RGB to RGB (do gamma encoding)
export const convertToRBG = (color) => {
	const colorLab = lchToLab([color.l, color.c, color.h])
	const colorXYZ = labToXyz([colorLab.l, colorLab.a, colorLab.b])
	const colorRGB = xyzToRgb([colorXYZ.x, colorXYZ.y, colorXYZ.z])
	console.log("[convertToRBG] colorRGB: ", colorRGB)
	return colorRGB
}

export const convertToHex = (colorLCH) => {
	console.log("[convertToHex] converting color: ", colorLCH)
	const colorRGB = convertToRBG(colorLCH)
	const hex =  rgbToHex([colorRGB.r, colorRGB.g, colorRGB.b])
	console.log("[convertToHex] hex: ", hex)
	return hex
}

export const getRandom = (min, max) => {
	return Math.floor(Math.random() * (max-min+1) + min )
}


//****************** HUE SETTING & HELPERS *********** */


// Settings
const minHue = 0
const maxHue = 360

const minSat = 20
const maxSat = 80

const minLight = 30
const maxLight = 90

const scaleLight = 15
const scaleSat = 15

const rotation = 90

const pastelValues = {
	sat: 60,
	light: 70
}

const getColor = (hue, sat, light, name) => {
	// Set hue
	// hue = hue || getRandom(minHue, maxHue)

	// Redo if ugly hue is generated
	// Because magenta is hideous
	// if (hue > 288 && hue < 316) {
	// 	hue = getRandom(316, 360)
	// } else if (hue > 280 && hue < 288) {
	// 	hue = getRandom(260, 280)
	// }

	// sat = sat || getRandom(minSat, maxSat)
	// light = light || getRandom(minLight, maxLight)

	const hsl = {
		hue: hue,
		sat: sat,
		light: light,
		name: name
	}
	return hsl
}

const changeHue = (hue, rotation) => {
	const newHue = hue + rotation
	return (newHue > maxHue) ? newHue - maxHue : newHue
}

const changeLight = (light, scaleLight) => {
	const newLight = light + scaleLight
	return (newLight > maxLight) ? maxLight : newLight
}

const adjustLight = (light) => {
	return (light > maxLight) ? maxLight : light
}

const adjustSat = (sat) => {
	return (sat > maxSat) ? maxSat : sat
}

export const createBasePalette = () => {
	const base = getColor(
		getRandom(minHue, maxHue),
		pastelValues.sat,
		pastelValues.light,
		"base"
	)
	return base
}

export const createBackgroundPalette = (base) => {
	const background = getColor(
		base.hue,
		base.sat,
		adjustLight(base.light - scaleLight *2),
		"background"
	)
	return background
}

export const createHuePalette = (base) => {
	console.log("[createHuePalette] base: ", base)
	let palette = [base]
	
	// decrement light by scaleLight
	const darken = getColor(
		base.hue,
		base.sat,
		adjustLight(base.light - scaleLight),
		"darken"
	)
	palette.push(darken)

	// increment light by scaleLight
	const lighter = getColor(
		base.hue,
		base.sat,
		adjustLight(base.light + scaleLight),
		"lighter"
	)
	palette.unshift(lighter)

	// saturate light by scaleLight
	const saturate = getColor(
		base.hue,
		adjustSat(base.sat + scaleSat),
		base.light,
		"saturate"
	)
	palette.push(saturate)

	// desaturate light by scaleLight
	const desaturate = getColor(
		base.hue,
		adjustSat(base.sat - scaleSat),
		base.light,
		"desaturate"
	)
	palette.unshift(desaturate)

	// modify hue by rotation
	const hueRotationPlus = getColor(
		adjustHue(base.hue + rotation),
		base.sat,
		base.light,
		"rotate+90"
	)
	palette.push(hueRotationPlus)

	// modify hue by rotation
	const hueRotationMinus = getColor(
		adjustHue(base.hue - rotation),
		base.sat,
		base.light,
		"rotate-90"
	)
	palette.unshift(hueRotationMinus)

	
	return palette
}

export const hslToString = (hue, sat, light) => {
	const hsl = "hsl(" + hue + ", " + sat + "%, " + light + "%)"
	return hsl
}