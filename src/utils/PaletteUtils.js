/* eslint-disable no-unused-vars */

export const getRandom = (min, max) => {
	return Math.floor(Math.random() * (max-min+1) + min )
}


//****************** HUE SETTING *************/


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

// if you want to generate pastel colors use this values
const pastelValues = {
	sat: 60,
	light: 70
}


//****************** HUE HELPERS *************/


const getColor = (hue, sat, light, name) => {
	const hsl = {
		hue: hue,
		sat: sat,
		light: light,
		name: name
	}
	return hsl
}

const adjustHue = (val) => {
	if (val < 0) val += Math.ceil(-val / 360) * 360
  
	return val % 360
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
		getRandom(minSat, maxSat),
		getRandom(minLight, maxLight),
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