
var X = 2;

var expr = "Math.pow(-16 * " + X + ", 2) * Math.cos(128 * (Math.PI / 180)) * " + X;

console.log(eval(expr));