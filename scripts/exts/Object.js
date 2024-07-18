// Abbreviations:

const c = Object
const p = c.prototype

// Descriptors:

const ce = {
    configurable: true,
    enumerable: true
}

const cw = {
    configurable: true,
    writable: true
}

const cew = {
    configurable: true,
    enumerable: true,
    writable: true
}

const cv = val => { return { configurable: true, value: val } }
const wv = val => { return { writable: true, value: val } }
const cev = val => { return { ...ce, value: val } }
const cwv = val => { return { ...cw, value: val } }
const cewv = val => { return { ...cew, value: val } }

const cg = g => { return { configurable: true, get: g } }
const ceg = g => { return { ...ce, get: g } }

const cs = s => { return { configurable: true, set: s } }
const ces = s => { return { ...ce, set: s } }

const cgs = (g, s) => { return { configurable: true, get: g, set: s } }
const cegs = (g, s) => { return { ...ce, get: g, set: s } }

const lazy = (name, defVal, desc = cw) => {
    return {
        configurable: desc.configurable ?? false,
        get: function() {
            this.defineProperty(name, cewv(defVal)) 
            return this[name]
        },
        set: function(val) { this.defineProperty(name, { ...desc, value: val }) }
    }
}

export { ce, cw, wv, cew, cv, cev, cwv, cewv, cg, ceg, cs, ces, cgs, cegs, lazy }

// Define:

c.defineProperties(p, {
    defineProperty: cwv(function(name, desc) { c.defineProperty(this, name, desc) }),
    defineProperties: cwv(function(descs) { c.defineProperties(this, descs) })
})

p.defineProperties({
    defineLazyProperty: cwv(function(name, defVal, desc) { this.defineProperty(name, lazy(name, defVal, desc)) }),
    defineLazyProperties: cwv(function(nameDefValDescTuples) {
        for (const [name, defVal, desc] of nameDefValDescTuples)
            this.defineProperty(name, lazy(name, defVal, desc))
    })
})

// Prototype:

p.defineProperty("definePrototype", cwv(function(prototype) {
    const oldCstr = this.prototype.constructor
    this.prototype = Object.create(prototype)
    this.prototype.defineProperty("constructor", wv(oldCstr))
}))

// Freeze:

p.defineProperty("freeze", cwv(function() { return c.freeze(this) }))
