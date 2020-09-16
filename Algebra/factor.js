function boxUpdate() {
	let polynomial = document.getElementById("factor").value.split('+');
	var simpPoly = '';
	for (var i = 0; i < polynomial.length; i++) {
		var number = polynomial[i].split('');
		for (var t = 0; t < number.length; t++) {
			if (String(number[t-1]) == "^") {
				number[t] = number[t].sup();
				number.splice(t+1,1);
				number.splice(t-1,1);
			}
		}
		for (var z = 0; z < number.length; z++) {
			simpPoly += number[z];
		}
		simpPoly = simpPoly + '+';
	}
	document.getElementById("box").innerHTML = simpPoly.slice(0, -1);
	var coefficeints = simpPoly.slice(0, -1).split('+');
	var leadingCoefficient;
	var constant;
	if (coefficeints[0].slice(0, 1) != 'X') {
		leadingCoefficient = parseInt(coefficeints[0]);
	} else {
		leadingCoefficient = 1;
	}
	if (coefficeints[coefficeints.length - 1].includes('X') === false) {
		constant = parseInt(coefficeints[coefficeints.length - 1]);
	} else {
		constant = 0;
	}
	var leadingCoefficientfactors = [];
	for (var i = 0; i < leadingCoefficient; i++) {
		if (leadingCoefficient % (i + 1) === 0) {
			leadingCoefficientfactors.push(i+1);
		}
	}
	var constantfactors = [];
	for (var i = 0; i < Math.abs(constant); i++) {
		if (Math.abs(constant) % (i + 1) === 0) {
			constantfactors.push(i+1);
		}
	}
	var potentialX = [];
	for (var i = 0; i < leadingCoefficientfactors.length; i++) {
		for (var t = 0; t < constantfactors.length; t++) {
			potentialX.push(constantfactors[t] / leadingCoefficientfactors[i]);
		}
	}
	var preFormula = document.getElementById("factor").value.split('');
	for (var i = 0; i < preFormula.length; i++) {
		if (preFormula[i] === '^') {
			var power = '';
			while (isNaN(parseInt(preFormula[i+1])) === false) {
				power += parseInt(preFormula[i+1]);
				preFormula.splice(i+1, 1);
			}
			preFormula[i] = "Math.pow(X, " + power + ")";
			if (preFormula[i-1] != "X"){
				preFormula[i-1] = "*";
			} else {
				if (i-1 != 0) {
					if (isNaN(parseInt(preFormula[i-2])) === false) {
						preFormula[i-1] = ' * ';
					} else {
						preFormula[i-1] = '';
					}
				} else {
					preFormula[i-1] = '';
				}
			}
		}
	}
	var formula = '';
	for (var i = 0; i < preFormula.length; i++) {
		if (preFormula[i+1] === "X") {
			formula += preFormula[i] + " * ";
		} else {
			formula += preFormula[i];
		}
	}
	var Xintercepts = [];
	for (var i = 0; i < potentialX.length; i++) {
		var X = potentialX[i];
		if (eval(formula) === 0 ) {
			Xintercepts.push(X);
		}
		var X = (potentialX[i] * -1);
		if (eval(formula) === 0 ) {
			Xintercepts.push(X);
		}
	}
	var answer = '';
	for (var i = 0; i < Xintercepts.length; i++) {
		answer += "X" + (i+1) + ": " + Xintercepts[i] + " ";
	}
	if (answer === '') {
		answer = "Error: 220";
	}
	if (constant === 0) {
		answer = "Divide by 0 Error";
	}
	document.getElementById("box").innerHTML = simpPoly.slice(0, -1) + " = " + answer;
}
function factor() {

}