function boxUpdate() {
	var polynomial = document.getElementById("factor").value.split('+'|'-');
	var simpPoly = '';
	var visualEquation = '';
	for (var i = 0; i < polynomial.length; i++) {
		var number = polynomial[i].split('');
		for (var t = 0; t < number.length; t++) {
			if (String(number[t]) == 'x') {
				number[t] = "X";
			}
			if (String(number[t]) == "-") {
				simpPoly += "+-";
			} else {
				simpPoly += number[t];
			}
			if (String(number[t-1]) == '^') {
				visualEquation += number[t].sup();
				visualEquation = visualEquation.replace(/\^/g, '');
			} else {
				visualEquation += number[t];
			}
		}
	}
	document.getElementById("box").innerHTML = visualEquation;
	var coefficients = simpPoly.split('+');
	var leadingCoefficient;
	var constant;
	if (coefficients[coefficients.length - 1].includes('X') === true) {
		var zeroForm = true;
		var newFormula = [];
		for (var i = 0; i < coefficients.length; i++) {
			var newNumber = '';
			var coefficientsTemp = coefficients[i].split('');
			if (isNaN(parseInt(coefficientsTemp[coefficientsTemp.length - 1] - 1)) === false) {
				coefficientsTemp[coefficientsTemp.length - 1] = parseInt(coefficientsTemp[coefficientsTemp.length - 1] - 1);
			} else {
				coefficientsTemp[coefficientsTemp.length - 1] = coefficientsTemp[coefficientsTemp.length - 1].replace("X", '');
			}
			for (var t = 0; t < coefficientsTemp.length; t++) {
				newNumber += coefficientsTemp[t];
			}
			newFormula.push(newNumber);
		}
		coefficients = newFormula;
	}
	constant = parseInt(coefficients[coefficients.length - 1]);
	if (coefficients[0].slice(0, 1) != 'X') {
		if (coefficients[0].slice(0, 1) == '-' && coefficients[0].slice(1, 2) == "X") {
			leadingCoefficient = -1;
		} else {
			leadingCoefficient = parseInt(coefficients[0]);
		}
	} else {
		leadingCoefficient = 1;
	}
	
	var leadingCoefficientfactors = [];
	for (var i = 0; i < Math.abs(leadingCoefficient); i++) {
		if (Math.abs(leadingCoefficient) % (i + 1) === 0) {
			leadingCoefficientfactors.push((i+1)*(leadingCoefficient/Math.abs(leadingCoefficient)));
		}
	}
	var constantfactors = [];
	for (var i = 0; i < Math.abs(constant); i++) {
		if (Math.abs(constant) % (i + 1) === 0) {
			constantfactors.push((i+1)*(constant/Math.abs(constant)));
		}
	}
	var potentialX = [];
	for (var i = 0; i < leadingCoefficientfactors.length; i++) {
		for (var t = 0; t < constantfactors.length; t++) {
			potentialX.push(constantfactors[t] / leadingCoefficientfactors[i]);
		}
	}
	var preFormula = coefficients.join("+").split('');
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
	if (zeroForm === true) {
		answer += "X" + (i+1) + ": 0"
	}
	if (constant === 0) {
		answer = "Divide by 0 Error";
	}
	if (Xintercepts == '') {
		answer = "The computer is unable to compute this eqation.";
	}
	document.getElementById("box").innerHTML = visualEquation + " = " + answer;
}