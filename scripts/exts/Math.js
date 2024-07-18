import { cwv } from "./Object.js"

// Abbreviations:

const c = Math

// Functions:

c.defineProperties({
    clamp: cwv((val, min, max) => c.min(c.max(min, val), max)),
    radians: cwv(deg => deg * c.PI / 180),
    degrees: cwv(rad => rad / c.PI * 180)
})
