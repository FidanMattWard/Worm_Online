import { ce, cev, ceg, cwv } from "../exts/Object.js"

// Constructor:

export default function Vec2(x, y) {
    if (x === undefined)
        x = 0

    if (y === undefined)
        y = x

    this.x = x
    this.y = y
}

// Abbreviations:

const c = Vec2
const p = c.prototype

// Square:

p.defineProperty("square", {
    ...ce,
    get: function() { return c.getSquare(this) },
    set: function(val) { c.setSquare(this, val) }
})

c.getSquare = vec => vec.x * vec.y
c.setSquare = (vec, val) => c.mul(vec, val / c.getSquare(vec))

// Distance:

p.distance = function(to) { return c.distance(this, to) }
c.distance = (from, to) => c.length(c.diff(to, from))

// Normed:

p.defineProperty("normed", ceg(function() { return c.normed(this) } ))
c.normed = vec => c.norm(c.clone(vec))

// Norm:

p.norm = function() { return c.norm(this) }
c.norm = vec => c.setLength(vec, 1)

// Length:

p.defineProperty("length", {
    ...ce,
    get: function() { return c.getLength(this) },
    set: function(val) { c.setLength(this, val) }
})

c.getLength = vec => Math.sqrt(vec.x ** 2 + vec.y ** 2)
c.setLength = (vec, val) => {
    const length = c.getLength(vec)

    if (length)
        c.mul(vec, val / c.getLength(vec))
    else {
        vec.x = 0
        vec.y = 0
    }
    
    return vec
}

// Neged:

p.defineProperty("neged", ceg(function() { return c.neged(this) }))
c.neged = vec => c.prod(vec, -1)

// Neg:

p.neg = function() { return c.neg(this) }
c.neg = vec => c.mul(vec, -1)

// Define Overloaded:

const defineOverloadedMethod = (name, func) => {
    const visitName = `${name}Vec2`

    p[name] = function(rhs, ...args) { return c[name](this, rhs, ...args) }
    c[name] = (lhs, rhs, ...args) => rhs[visitName](lhs, ...args)

    p.defineProperty(visitName, cwv(function(vec) { return func(vec, this.x, this.y) }))
    Number.prototype.defineProperty(visitName, cwv(function(vec, y) {
        const x = this.valueOf()

        if (y === undefined)
            y = x

        return func(vec, x, y)
    }))
}

// Sum:

p.sum = function(rhs, ...args) { return c.sum(this, rhs, ...args) }
c.sum = (lhs, rhs, ...args) => c.clone(lhs).add(rhs, ...args)

// Add:

defineOverloadedMethod("add", (vec, x, y) => {
    vec.x += x
    vec.y += y
    return vec
})

// Diff:

p.diff = function(rhs, ...args) { return c.diff(this, rhs, ...args) }
c.diff = (lhs, rhs, ...args) => c.clone(lhs).sub(rhs, ...args) 

// Sub:

defineOverloadedMethod("sub", (vec, x, y) => {
    vec.x -= x
    vec.y -= y
    return vec
})

// Prod:

p.prod = function(rhs, ...args) { return c.prod(this, rhs, ...args) }
c.prod = (lhs, rhs, ...args) => c.clone(lhs).mul(rhs, ...args)

// Mul:

defineOverloadedMethod("mul", (vec, x, y) => {
    vec.x *= x
    vec.y *= y
    return vec
})

// Quot:

p.quot = function(rhs, ...args) { return c.quot(this, rhs, ...args) }
c.quot = (lhs, rhs, ...args) => c.clone(lhs).div(rhs, ...args)

// Div:

defineOverloadedMethod("div", (vec, x, y) => {
    vec.x /= x
    vec.y /= y
    return vec
})

// Rem:

p.rem = function(of, ...args) { return c.rem(this, of, ...args) }
c.rem = (vec, of, ...args) => c.clone(vec).mod(of, ...args)

// Mod:

defineOverloadedMethod("mod", (vec, x, y) => {
    vec.x %= x
    vec.y %= y
    return vec
})

// Resip:

p.defineProperty("resip", ceg(function() { return c.resip(this) }))
c.resip = vec => new c(1 / vec.x, 1 / vec.y)

// Ceiled:

p.defineProperty("ceiled", ceg(function() { return c.ceiled(this) }))
c.ceiled = vec => c.mapped(vec, Math.ceil)

// Ceil:

p.ceil = function() { return c.ceil(this) }
c.ceil = vec => c.map(vec, Math.ceil)

// Floored:

p.defineProperty("floored", ceg(function() { return c.floored(this) }))
c.floored = vec => c.mapped(vec, Math.floor)

// Floor:

p.floor = function() { return c.floor(this) }
c.floor = vec => c.map(vec, Math.floor)

// Truced:

p.defineProperty("trunced", ceg(function() { return c.trunced(this) }))
c.truced = vec => c.mapped(vec, Math.trunc)

// Trunc:

p.trunc = function() { return c.trunc(this) }
c.trunc = vec => c.map(vec, Math.trunc) 

// Map:

p.map = function(func) { c.map(this, func) }
c.map = (vec, func) => {
    vec.x = func(vec.x)
    vec.y = func(vec.y)
    return vec
}

// Mapped:

p.mapped = function(func) { c.mapped(this, func) }
c.mapped = (vec, func) => new c(func(vec.x), func(vec.y))

// Expand Args:

c.addExpandForMethods = (object, methodNames) => {
    for (const name of methodNames)
        c.addExpandForMethod(object, name)
}

c.addExpandForMethod = (object, methodName) => {
    const old = object[methodName]
    object[methodName] = function(...args) { return old.apply(this, c.expand(args)) }
}

c.expand = (args) => {
    const res = []
    
    for (const arg of args)
        if (arg instanceof Vec2)
            res.push(arg.x, arg.y)
        else
            res.push(arg)

    return res
}

// Clone:

p.clone = function() { return c.clone(this) }
c.clone = vec => new c(vec.x, vec.y)

// String:
  
p.toString = function() { return c.toString(this) }
c.toString = vec => `(${this.x}, ${this.y})`

// Zero:

c.defineProperty("zero", ceg(() => new c()))
c.defineProperty("ZERO", cev(c.zero.freeze()))

// One:

c.defineProperty("one", ceg(() => new c(1)))
c.defineProperty("ONE", cev(c.one.freeze()))
