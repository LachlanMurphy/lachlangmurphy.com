class elementClass {
	constructor(name, atomicNumber, atomicMass, symbol) {
		this.name = name;
		this.atomicNumber = atomicNumber;
		this.atomicMass = atomicMass;
		this.symbol = symbol;
	}
}

var Element = [null,
	new elementClass("hydrogen", 1, 1.008, "H"), 
	new elementClass("helium", 2, 4.003, "He"), 
	new elementClass("lithium", 3, 6.941, "Li"), 
	new elementClass("beryllium", 4, 9.012, "Be"), 
	new elementClass("boron", 5, 10.82, "B"), 
	new elementClass("carbon", 6, 12.01, "C"), 
	new elementClass("nitrogen", 7, 14.01, "N"), 
	new elementClass("oxygen", 8, 16, "O") 
]

empericalSubmit.onmousedown = function empericalFormula() {
	let name1 = document.getElementById("empericalElement1Name").value;
	let name2 = document.getElementById("empericalElement2Name").value;
	let name3 = document.getElementById("empericalElement3Name").value;
	let name4 = document.getElementById("empericalElement4Name").value;
	let mass1 = document.getElementById("empericalElement1Mass").value;
	let mass2 = document.getElementById("empericalElement2Mass").value;
	let mass3 = document.getElementById("empericalElement3Mass").value;
	let mass4 = document.getElementById("empericalElement4Mass").value;
	console.log(mass1, mass2, mass3);
	
	//convert mass of elements to Mols
	var mol1 = mass1 / Element[name1].atomicMass;
	var mol2 = mass2 / Element[name2].atomicMass;
	var mol3 = mass3 / Element[name3].atomicMass;
	var mol4 = mass4 / Element[name4].atomicMass;
	//devide by lowest to find amount of element
	var element1 = Math.round(mol1 / Math.min(mol1, mol2, mol3, mol4));
	var element2 = Math.round(mol2 / Math.min(mol1, mol2, mol3, mol4));
	var element3 = Math.round(mol3 / Math.min(mol1, mol2, mol3, mol4));
	var element4 = Math.round(mol4 / Math.min(mol1, mol2, mol3, mol4));

	let empericalFormula = Element[name1].symbol + String(element1).sub() + Element[name2].symbol + String(element2).sub() +Element[name3].symbol + String(element3).sub() + Element[name4].symbol + String(element4).sub();
	document.getElementById("empericalOutput").innerHTML = empericalFormula;
}