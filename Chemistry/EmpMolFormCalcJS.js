class elementClass {
	constructor(atomicMass, name, symbol, atomicNumber) {
		this.name = name;
		this.atomicNumber = atomicNumber;
		this.atomicMass = atomicMass;
		this.symbol = symbol;
	}
}

var Element = [null,
	new elementClass(1.0079, 'Hydrogen', 'H', 1), 
	new elementClass(4.0026, 'Helium',	'He', 2), 
	new elementClass(6.941,	'Lithium', 'Li', 3), 
	new elementClass(9.0122, 'Beryllium', 'Be', 4), 
	new elementClass(10.811, 'Boron', 'B', 5), 
	new elementClass(12.0107, 'Carbon', 'C', 6), 
	new elementClass(14.0067, 'Nitrogen', 'N', 7), 
	new elementClass(15.9994, 'Oxygen', 'O', 8), 
	new elementClass(18.9984, 'Fluorine', 'F', 9), 
	new elementClass(20.1797, 'Neon', 'Ne', 10), 
	new elementClass(22.9897, 'Sodium', 'Na', 11), 
	new elementClass(24.305, 'Magnesium', 'Mg', 12), 
	new elementClass(26.9815, 'Aluminum', 'Al', 13), 
	new elementClass(28.0855, 'Silicon', 'Si', 14), 
	new elementClass(30.9738, 'Phosphorus', 'P', 15), 
	new elementClass(32.065, 'Sulfur', 'S', 16),
	new elementClass(35.453, 'Chlorine', 'Cl', 17), 
	new elementClass(39.948, 'Argon', 'Ar', 189), 
	new elementClass(39.0983, 'Potassium', 'K', 19), 
	new elementClass(40.078, 'Calcium', 'Ca', 20), 
	new elementClass(44.9559, 'Scandium', 'Sc', 21), 
	new elementClass(47.867, 'Titanium', 'Ti', 22), 
	new elementClass(50.9415, 'Vanadium', 'V', 23), 
	new elementClass(51.9961, 'Chromium', 'Cr', 24),
	new elementClass(54.938, 'Manganese', 'Mn', 25),
	new elementClass(55.845, 'Iron', 'Fe', 26),
	new elementClass(58.6934, 'Nickel', 'Ni', 28),
	new elementClass(58.9332, 'Cobalt', 'Co', 27),
	new elementClass(63.546, 'Copper', 'Cu', 29),
	new elementClass(65.39, 'Zinc', 'Z', 30),
	new elementClass(69.723, 'Gallium', 'Ga', 31),
	new elementClass(72.64, 'Germanium', 'Ge', 32),
	new elementClass(74.9216, 'Arsenic', 'As', 33),
	new elementClass(78.96, 'Selenium', 'Se', 34),
	new elementClass(79.904, 'Bromine', 'Br', 35),
	new elementClass(83.8, 'Krypton', 'Kr', 36),
	new elementClass(85.4678, 'Rubidium', 'Rb', 37),
	new elementClass(87.62, 'Strontium', 'Sr', 38),
	new elementClass(88.9059, 'Yttrium', 'Y', 39),
	new elementClass(91.224, 'Zirconium', 'Zr', 40),
	new elementClass(92.9064, 'Niobium', 'Nb', 41),
	new elementClass(95.94, 'Molybdenum', 'Mo', 42),
	new elementClass(98, 'Technetium', 'Tc', 43),
	new elementClass(101.07, 'Ruthenium', 'Ru', 44),
	new elementClass(102.9055, 'Rhodium', 'Rh', 45),
	new elementClass(106.42, 'Palladium', 'Pd', 46),
	new elementClass(107.8682, 'Silver', 'Ag', 47),
	new elementClass(112.411, 'Cadmium', 'Cd', 48),
	new elementClass(114.818, 'Indium', 'In', 49),
	new elementClass(118.71, 'Tin', 'Sn', 50),
	new elementClass(121.76, 'Antimony', 'Sb', 51),
	new elementClass(126.9045, 'Iodine', 'I', 53),
	new elementClass(127.6, 'Tellurium', 'Te', 52),
	new elementClass(131.293, 'Xenon', 'Xe', 54),
	new elementClass(132.9055, 'Cesium', 'Cs', 55),
	new elementClass(137.327, 'Barium', 'Ba', 56),
	new elementClass(138.9055, 'Lanthanum', 'La', 57),
	new elementClass(140.116, 'Cerium', 'Ce', 58),
	new elementClass(140.9077, 'Praseodymium', 'Pr', 59),
	new elementClass(144.24, 'Neodymium', 'Nd', 60),
	new elementClass(145, 'Promethium', 'Pm', 61),
	new elementClass(150.36, 'Samarium', 'Sm', 62),
	new elementClass(151.964, 'Europium', 'Eu', 63),
	new elementClass(157.25, 'Gadolinium', 'Gd', 64),
	new elementClass(158.9253, 'Terbium', 'Tb', 65),
	new elementClass(162.5, 'Dysprosium', 'Dy', 66),
	new elementClass(164.9303, 'Holmium', 'Ho', 67),
	new elementClass(167.259, 'Erbium', 'Er', 68),
	new elementClass(168.9342, 'Thulium', 'Tm', 69),
	new elementClass(173.04, 'Ytterbium', 'Yb', 70),
	new elementClass(174.967, 'Lutetium', 'Lu', 71),
	new elementClass(178.49, 'Hafnium', 'Hf', 72),
	new elementClass(180.9479, 'Tantalum', 'Ta', 73),
	new elementClass(183.84, 'Tungsten', 'W', 74),
	new elementClass(186.207, 'Rhenium', 'Re', 75),
	new elementClass(190.23, 'Osmium', 'Os', 76),
	new elementClass(192.217, 'Iridium', 'Ir', 77),
	new elementClass(195.078, 'Platinum', 'Pt', 78),
	new elementClass(196.9665, 'Gold', 'Au', 79),
	new elementClass(200.59, 'Mercury', 'Hg', 80),
	new elementClass(204.3833, 'Thallium', 'Tl', 81),
	new elementClass(207.2, 'Lead', 'Pb', 82),
	new elementClass(208.9804, 'Bismuth', 'Bi', 83),
	new elementClass(209, 'Polonium', 'Po', 84),
	new elementClass(210, 'Astatine', 'At', 85),
	new elementClass(222, 'Radon', 'Rn', 86),
	new elementClass(223, 'Francium', 'Fr', 87),
	new elementClass(226, 'Radium', 'Ra', 88),
	new elementClass(227, 'Actinium', 'Ac', 89),
	new elementClass(231.0359, 'Protactinium', 'Pa', 91),
	new elementClass(232.0381, 'Thorium', 'Th', 90),
	new elementClass(237, 'Neptunium', 'Np', 93),
	new elementClass(238.0289, 'Uranium', 'U', 92),
	new elementClass(243, 'Americium', 'Am', 95),
	new elementClass(244, 'Plutonium', 'Pu', 94),
	new elementClass(247, 'Curium', 'Cm', 96),
	new elementClass(247, 'Berkelium', 'Bk', 97),
	new elementClass(251, 'Californium', 'Cf', 98),
	new elementClass(252, 'Einsteinium', 'Es', 99),
	new elementClass(257, 'Fermium', 'Fm', 100),
	new elementClass(258, 'Mendelevium', 'Md', 101),
	new elementClass(259, 'Nobelium', 'No', 102),
	new elementClass(261, 'Rutherfordium', 'Rf', 104),
	new elementClass(262, 'Lawrencium', 'Lr', 103),
	new elementClass(262, 'Dubnium', 'Db', 105),
	new elementClass(264, 'Bohrium', 'Bh', 107),
	new elementClass(266, 'Seaborgium', 'Sg', 106),
	new elementClass(268, 'Meitnerium', 'Mt', 109),
	new elementClass(272, 'Roentgenium', 'Rg', 111),
	new elementClass(277, 'Hassium', 'Hs', 108)
]

empiricalSubmit.onmousedown = function() {
	var name = [];
	var mass = [];
	for (var i = 0; i < compoundLength; i++) {
		var compoundName = document.getElementById("empiricalElement" + (i + 1) + "Name").value.split(/[\s,]+/);
		var compoundMass = document.getElementById("empiricalElement" + (i + 1) + "Mass").value;
		var compoundMol = 0;
		for (var t = 0; t < compoundName.length / 2; t++) {
			compoundMol = compoundMol + (Element[compoundName[t * 2]].atomicMass * compoundName[t*2+1]);
		}
		mass.push(compoundMass / compoundMol * compoundName[1] * Element[compoundName[0]].atomicMass);
		name.push(document.getElementById("empiricalElement" + (i + 1) + "Name").value.split(/[\s,]+/)[0]);
	}

	if (compoundLength > elementLength) {
		var lastMass = document.getElementById("totalMass").value;
		for (var i = 0; i < compoundLength; i++) {
			lastMass = lastMass - mass[i];
		}
		name.push("8");
		mass.push(lastMass);
	}

	//convert mass of elements to Mols
	var mol = [];
	for (var i = 0; i < elementLength; i++) {
		mol.push(mass[i] / Element[name[i]].atomicMass);
	}

	//devide by lowest to find amount of element
	var molecularMultiplier = 1;
	for (var i = 0; i < elementLength; i++) {
		if (mol[i] / Math.min.apply(null, mol) > Math.round(mol[i] / Math.min.apply(null, mol)) + .01 || mol[i] / Math.min.apply(null, mol) < Math.round(mol[i] / Math.min.apply(null, mol)) - .01) {
			molecularMultiplier = 1;
			var molTemp = mol[i];
			while (molTemp / Math.min.apply(null, mol) > Math.round(molTemp / Math.min.apply(null, mol)) + .01 || molTemp / Math.min.apply(null, mol) < Math.round(molTemp / Math.min.apply(null, mol)) - .01) {
				molecularMultiplier = molecularMultiplier + 1;
				if (molTemp * molecularMultiplier > Math.round(molTemp / Math.min.apply(null, mol)) + .01 || molTemp * molecularMultiplier < Math.round(molTemp / Math.min.apply(null, mol)) - .01) {
					molTemp = molTemp * molecularMultiplier;
				}
			}
		}
	}

	var element = [];
	if (molecularMultiplier > 1) {
		for (var i = 0; i < elementLength; i++) {
			element.push(Math.round(mol[i] / Math.min.apply(null, mol) * molecularMultiplier));
		}
	} else {
		for (var i = 0; i < elementLength; i++) {
			element.push(Math.round(mol[i] / Math.min.apply(null, mol)));
		}
	}

	var molecularMass = 0;
	for (var i = 0; i < elementLength; i++) {
		molecularMass = molecularMass + Element[name[i]].atomicMass * element[i];
	}

	var molecularMultiple = Math.round(document.getElementById("gramPerMol").value / molecularMass);

	//Forming the Formula
	var empiricalFormula = '';
	var molecularFormula = '';
	for (var i = 0; i < element.length; i++) {
		empiricalFormula += Element[name[i]].symbol + String(element[i]).sub();
		molecularFormula += Element[name[i]].symbol + String(element[i] * molecularMultiple).sub()
	}
	document.getElementById("empiricalOutput").innerHTML = "Empirical Formula: " + empiricalFormula + "	Molecular Formula: " + molecularFormula;
}

var compoundLength = 0;
var elementLength = 0;
setLength.onmousedown = function() {
	compoundLength = parseInt(document.getElementById("compoundLength").value);
	elementLength = parseInt(document.getElementById("elementLength").value);
	for (var i = 0; i < 4; i++) {
		document.getElementById("empiricalElement" + (i + 1) + "Name").style.display = "block";
		document.getElementById("empiricalElement" + (i + 1) + "Mass").style.display = "block";
		document.getElementById((i + 1) + "Head").style.display = "block";
	}
	for (var i = 0; i < 4 - compoundLength; i++) {
		var t = compoundLength + i + 1;
		document.getElementById("empiricalElement" + t + "Name").style.display = "none";
		document.getElementById("empiricalElement" + t + "Mass").style.display = "none";
		document.getElementById(t + "Head").style.display = "none";
	}
}