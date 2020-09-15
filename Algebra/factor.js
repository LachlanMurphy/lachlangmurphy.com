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
	var factors = simpPoly.slice(0, -1).split('+');
	var D = factors.length + 1;
	var C = 0;
	var R = 0;
	var Z = 0;
	var theta = 0;
	console.log(factors);
}

function factor() {

}