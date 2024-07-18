import { ce, cw, cev, cwv, ceg } from "../exts/Object.js"
import "../exts/Math.js"

// Constructor:

export default function Color(r = 1, g = 1, b = 1, a = 1, precreateStrings = false) {
    this.defineProperties({
        _r: cw,
        _g: cw,
        _b: cw,
        _a: cw,
        _cSSString: cw,
        _string: cw
    })

    this.r = r
    this.g = g
    this.b = b

    if (precreateStrings)
        this._updateStrings()
}

// Abbreviations:

const c = Color
const p = c.prototype

// Components:

const clamp = c => Math.clamp(c, 0, 1)
const set = function(name, val) {
    this[name] = val
    this._clearStrings()
}

p.defineProperties({
    r: {
        ...ce,
        get: function() { return this._r },
        set: function(val) { set.call(this, "_r") }
    },
    g: {
        ...ce,
        get: function() { return this._g },
        set: function(val) { set.call(this, "_g") }
    },
    b: {
        ...ce,
        get: function() { return this._b },
        set: function(val) { set.call(this, "_b") }
    },
    a: {
        ...ce,
        get: function() { return this._a },
        set: function(val) { set.call(this, "_a") } 
    }
})

// Strings:

p.defineProperties({
    _clearStrings: cwv(function() {
        this._cSSString = undefined
        this._string = undefined
        return this
    }),
    _updateStrings: cwv(function() {
        this._updateCSSString()
        this._updateString()
        return this
    }),
    _updateCSSString: cwv(function() { return this._cSSString = `rgba(${this._r * 255}, ${this._g * 255}, ${this._b * 255}, ${this._a})` }),
    _updateString: cwv(function() { return this._string = `(${this._r}, ${this._g}, ${this._b}, ${this._a})` })
})


p.toCSSString = function() { return this._cSSString ?? this._updateCSSString() }
c.toCSSString = c => (new Color(c.r, c.g, c.b, c.a)).toCSSString()

p.toString = function() { return this._string ?? this._updateString() }
c.toString = c => (new Color(c.r, c.g, c.b, c.a)).toString()

// Clone:

p.clone = function() { return c.clone(this) }
c.clone = c => new Color(c.r, c.g, c.b, c.a)

// Colors:

c.defineProperties({
    red: ceg(() => new c(1, 0, 0)),
    green: ceg(() => new c(0, 1, 0)),
    blue: ceg(() => new c(0, 0, 1)),
    black: ceg(() => new c(0, 0, 0)),
    white: ceg(() => new c(1, 1, 1))
})

c.defineProperties({
    RED: cev(c.red._updateStrings().freeze()),
    GREEN: cev(c.green._updateStrings().freeze()),
    BLUE: cev(c.blue._updateStrings().freeze()),
    BLACK: cev(c.black._updateStrings().freeze()),
    WHITE: cev(c.white._updateStrings().freeze())
})
