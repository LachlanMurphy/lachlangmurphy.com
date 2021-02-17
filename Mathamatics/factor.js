function boxUpdate() {
	/*This program uses the rational roots test to find the roots of the polynomial.
	The rational roots test is flawed and cannot solve all polynimials. The type of
	method I used in this program is derrived from the website 
	https://www.purplemath.com/modules/rtnlroot.htm.*/

	//We must first get what the user has inputted and simplify it for the computer to read.
	//The user input is split by + and - into an array. 
	var polynomial = document.getElementById("factor").value.split('+'|'-');
	/*Unfortunately the computer doesn't read the input the same we humans do, 
	so we must translate it into a language the computer can understand. The 
	version of the formula that the computer will read will be stored as the 
	variable simpPoly*/
	var simpPoly = '';
	var visualEquation = ''; //What the user sees is different. So what the user sees will be stored as visualEquation.

	//Cmputer wont notice a floating 0 for the constant. i.e 30 as a constant. So we must add one for it.
	if (polynomial[polynomial.length-1] == '') {
		polynomial.splice(polynomial.length, 0, '0');
	}

	/*Each individual part of the equation is seperated. Each little part is torn into
	smaller peices to be analyzed. This loop analysis the equation for simpPoly and visualEquation.*/
	for (var i = 0; i < polynomial.length; i++) {
		//Each character is split.
		var number = polynomial[i].split('');
		for (var t = 0; t < number.length; t++) {
			//Each split character is checked to see if they are any of the following.
			if (String(number[t]) == 'x') {
				number[t] = "X"; //Makes the program not case sensitive.
			}

			//Users will most likey just put -n instead of +-n, so we must translate that for the computer.
			if (String(number[t]) == "-") {
				simpPoly += "+-";
			} else {
				simpPoly += number[t];
			}

			/*If the carrot symbol is used we must change the number after it into a superscript.*/
			if (String(number[t-1]) == '^') {
				visualEquation += number[t].sup();
				visualEquation = visualEquation.replace(/\^/g, ''); //Getting rid of old carrot prefix.
			} else {
				visualEquation += number[t];
			}
		}
	}

	localStorage.setItem('visualEquation', visualEquation);
	//Once the equation has been simplified we can display it to the user.
	document.getElementById("box").innerHTML = visualEquation;

	/*The rational roots test needs the leading coefficient and the constant.
	So we will extract those two from the simplified polynomial. Each part of
	the simplified polynomial is plit, and stored into the array coeffiecients.*/
	var coefficients = simpPoly.split('+');
	var leadingCoefficient;
	var constant;

	//Make sure the first character isn't null.
	if (coefficients[0] == "") {
		coefficients.shift();
	}

	/*One of the ways the rational roots test is flawed is because it NEEDS a constant.
	If the equation doesn't have a constant than it has a devide by zero errot. So in
	order to fix that we devide the entire equation by X, so we know at least one of 
	the roots is 0, the rest we can calculate from the new equation.*/
	if (coefficients[coefficients.length - 1].includes('X') === true) {
		//Later on when the answer is being formed we must check to see if there wasn't a constant
		var zeroForm = true;
		var newFormula = []; //This is were the new equation will be stored
		for (var i = 0; i < coefficients.length; i++) {
			//Each part of the equation must be manipulated, so we push it to a variable newNumber.
			var newNumber = '';
			var coefficientsTemp = coefficients[i].split(''); //store into a temp variable so the previous variable isn't corrupted in the precess.

			//The last number doesn't have an X, so if its the number is the last one, then we skip over it.
			if (isNaN(parseInt(coefficientsTemp[coefficientsTemp.length - 1] - 1)) === false) {
				coefficientsTemp[coefficientsTemp.length - 1] = parseInt(coefficientsTemp[coefficientsTemp.length - 1] - 1);
			} else {
				coefficientsTemp[coefficientsTemp.length - 1] = coefficientsTemp[coefficientsTemp.length - 1].replace("X", '');
			}

			//Pushing all characters back together.
			for (var t = 0; t < coefficientsTemp.length; t++) {
				newNumber += coefficientsTemp[t];
			}

			//Pushing full part to the new equation.
			newFormula.push(newNumber);
		}
		//Now that all of the old equation has been changed, we can replace it with the new one.
		coefficients = newFormula;
	}

	//Finding the constant of the equation.
	constant = parseInt(coefficients[coefficients.length - 1]);

	/*Now we must find the leading coeffiecient. The hard part about this is that the user
	may just put X or -X instead of 1X or -1X. So we check to see if there is no leading
	coefficient and if so, make it a 1 or negitive 1.*/
	if (String(coefficients[0].charAt(0)) != 'X' && String(coefficients[0].slice(0, 2)) != '-X') {
		if (coefficients[0].slice(0, 1) == '-' && coefficients[0].slice(1, 2) == "X") {
			leadingCoefficient = -1;
		} else {
			//If the leading coefficient isn't just X, then the leading coefficient is extracted.
			leadingCoefficient = parseInt(coefficients[0]);
		}
	} else {
		leadingCoefficient = 1;
	}

	/*Now we must find the factors of the leading coefficient. In order
	to do that we just go through all of the factors of the number.*/
	var leadingCoefficientfactors = [];
	for (var i = 0; i < Math.abs(leadingCoefficient); i++) {
		//The MOD is used to see if the number is a factor or not.
		if (Math.abs(leadingCoefficient) % (i + 1) === 0) {
			leadingCoefficientfactors.push((i+1)*(leadingCoefficient/Math.abs(leadingCoefficient)));
		}
	}
	
	//Now we do the same, just with the constant.
	var constantfactors = [];
	for (var i = 0; i < Math.abs(constant); i++) {
		if (Math.abs(constant) % (i + 1) === 0) {
			constantfactors.push((i+1)*(constant/Math.abs(constant)));
		}
	}

	/*We now have the factors of the leading coefficiant and the constant.
	Per the rational roots test, the potential X's are when oyou put the 
	constant over the leading coefficient and devide. There is another flaw
	in the rational roots test here. Sometimes not all of the possible roots
	are shown via this method, so some may be left out.*/
	var potentialX = [];
	for (var i = 0; i < leadingCoefficientfactors.length; i++) {
		for (var t = 0; t < constantfactors.length; t++) {
			potentialX.push(constantfactors[t] / leadingCoefficientfactors[i]);
		}
	}

	//Now we formulate the equation for the computer to properly read.
	var preFormula = coefficients.join("+").split('');
	for (var i = 0; i < preFormula.length; i++) {
		//Computer doesn't read powers as carrots, so we change that.
		if (preFormula[i] === '^') {
			var power = '';
			while (isNaN(parseInt(preFormula[i+1])) === false) {
				power += parseInt(preFormula[i+1]); //Extracts the power number.
				preFormula.splice(i+1, 1); //Removes ol carrot.
			}

			preFormula[i] = "Math.pow(X, " + power + ")"; //Translates power to computer language.

			/*The computer can't read nMath.pow(X, pow), so we must change it to n * Math.pow(X, pow).*/
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

	//The final step of forming the final formula.
	var formula = '';
	for (var i = 0; i < preFormula.length; i++) {
		//Computer can't read nX, so we change to n * X.
		if (preFormula[i+1] === "X") {
			if (preFormula[i] === '+' || preFormula[i] === '-') {
				formula += preFormula[i] + "1 * "
			} else {
				formula += preFormula[i] + " * ";
			}
		} else {
			formula += preFormula[i];
		}
	}

	/*Now we do the actual evaluating, The rational root test works by
	taking all the possible roots and plugging them into the equation.
	If that turns out to equal 0, then it's a root.*/
	var Xintercepts = [];
	for (var i = 0; i < potentialX.length; i++) {
		var repeatCheck = false;
		var X = potentialX[i]; 
		if (eval(formula) === 0 ) {
			Xintercepts.push(X);
		}
		var X = (potentialX[i] * -1); //We must test both the positive and negitives of the potential X's.
		if (eval(formula) === 0 ) {
			Xintercepts.push(X);
		}
	}

	//Now that we have the roots, we make them readable by the user.
	var answer = '';
	for (var i = 0; i < Xintercepts.length; i++) {
		//Smashing all the answers together. I'm not entirely sure but I think it's from left to right relative to the X axis.
		if (answer.includes(Xintercepts[i]) === false) {
			answer += "X" + (i+1) + ": " + Xintercepts[i] + " ";
		}
	}

	//Remember the check to see if we had to divide by X? Welp here it is. This just adds the 0 root to the answer.
	if (zeroForm === true) {
		answer += "X" + (i+1) + ": 0"
	}
	
	//Like I said earlier, the rational root test doesn't always work, so if there are no roots, then we tell the user it doesn't work.
	localStorage.setItem('formulaCheck', 'false');
	if (Xintercepts == '') {
		answer = "The computer is unable to compute this equation.";
		localStorage.setItem('polynomial', polynomial);
		polynomialFunctions();
	}

	console.log(answer);

	//Displaying the answer with the equation.
	if (localStorage.getItem('formulaCheck') === 'false') {
		document.getElementById("box").innerHTML = visualEquation + " = " + answer;
	}
}

function polynomialFunctions() {
	var polynomial = localStorage.getItem('polynomial').split('');
	var polynomialTemp = '';
	for (var i = 0; i < polynomial.length; i++) {
		if (polynomial[i] == "-") {
			polynomialTemp += "+-"
		} else {
			polynomialTemp += polynomial[i];
		}
	}
	polynomial = polynomialTemp.split("+");
	if (polynomial[0] == '') {
		polynomial.shift();
	}
	var coefficients = [];
	var powers = [];
	var polynomialTemp = '';
	for (var i = 0; i < polynomial.length; i++) {
		var polyString = '';
		var polyPart = polynomial[i].split('');
		for (var t = 0; t < polyPart.length; t++) {
			if (polyPart[t] == "x") {
				polyPart[t] = "X";
			}
			if (polyPart[t] != "X") {
				if (polyPart[t] == "-") {
					polyString += "-";
				} else {
					polyString += polyPart[t];
				}
			} else {
				if (polyPart[t-1] == '-') {
					coefficients.push(-1)
				} else if (t === 0) {
					coefficients.push(1);
				} else {
					coefficients.push(polyString);
				}
				console.log(polyPart);
				if (polyPart[t+1] == "^") {
					powers.push(polyPart[t+2]);
				} else {

					if (powers[powers.length-1] - 1 !== polyPart[t+2]) {
						powers.push(powers[powers.length-1] - 1);
					}
					powers.push(powers[powers.length-1] - 1);
				}
			}
		}
	}
	polynomial.shift();
	if (polynomial[polynomial.length-1].includes("X") === false && polynomial[polynomial.length-1].includes("x") === false) {
		coefficients.push(parseInt(polynomial[polynomial.length-1]));
	} else {
		coefficients.push("0");
	}
	powers.push("0");
	if (parseInt(powers[0]) === 2) {
		var a = parseInt(coefficients[0]);
		if (parseInt(powers[1]) === 1) {
			var b = parseInt(coefficients[1]);
		} else {
			var b = 0;
		}
		if (parseInt(powers[2]) === 0) {
			var c = parseInt(coefficients[2]);
		} else {
			var c = 0;
		}
		quadraticFormula(a, b, c);
	} if (parseInt(powers[0]) === 3) {
		console.log(coefficients, powers);
		var a = parseInt(coefficients[0]);
		if (parseInt(powers[1]) === 2) {
			var b = parseInt(coefficients[1]);
		} else {
			var b = 0;
		}
		if (parseInt(powers[2]) === 1) {
			var c = parseInt(coefficients[2]);
		} else {
			var c = 0;
		}
		if (parseInt(powers[3]) === 0) {
			var d = parseInt(coefficients[3]);
		} else {
			var d = 0;
		}
		console.log(a, b, c, d);
		cubicFormula(a, b, c, d);
	} 
};

function quadraticFormula(a, b, c) {
	var s = 1;
	var X1 = (-b+s*Math.sqrt(Math.pow(b, 2)-4*a*c))/(2*a);
	var s = -1;
	var X2 = (-b+s*Math.sqrt(Math.pow(b, 2)-4*a*c))/(2*a);
	if (isNaN(X1) === false || isNaN(X2) === false) {
		document.getElementById("box").innerHTML = localStorage.getItem('visualEquation') + " = " + "X1: " + X1 + " X2: " + X2;
		localStorage.setItem('formulaCheck', 'true');
	} else {
		localStorage.setItem('formulaCheck', 'false');
	}
}

function cubicFormula(a, b, c, d) {
	console.log(a, b, c, d);
	var cubicAnswer = [];
	for (var i = 0; i < 3; i++) {
		var n = i;
		cubicAnswer.push((-2*b+((-1+sqrt(-3))/2)^n*cbrt(4*(-2*b^3+9*a*b*c-27*a^2*d+sqrt((-2*b^3+9*a*b*c-27*a^2*d)^2-4*(b^2-3*a*c)^3)))+((-1-sqrt(-3))/2)^n*cbrt(4*(-2*b^3+9*a*b*c-27*a^2*d-sqrt((-2*b^3+9*a*b*c-27*a^2*d)^2-4*(b^2-3*a*c)^3))))/(6*a));
	}
	console.log(cubicAnswer);
}