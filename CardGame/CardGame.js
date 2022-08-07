var faces = [null, 
	'ace',
	'two',
	'three',
	'four',
	'five',
	'six',
	'seven',
	'eight',
	'nine',
	'ten',
	'jack',
	'queen',
	'king'
]

var suits = [null,
	'clubs',
	'diamonds',
	'hearts',
	'spades'
]

var cardImageX = [null,
	"-20px",
	"-81px",
	"-143px",
	"-204px",
	"-266px",
	"-327px",
	"-389px",
	"-451px",
	"-512px",
	"-574px",
	"-635px",
	"-697px",
	"-758px"
]

var cardImageY = [null,
	"-40px",
	"-136px",
	"-232px",
	"-327px"
]

class card {
	constructor (cardID) {
		this.face = faces[Math.floor((cardID / 4) + 1)];
		this.suit = suits[cardID % 4 + 1];
		this.cardID = cardID + 1;
		this.imageX = cardImageX[Math.floor((cardID / 4) + 1)];
		this.imageY = cardImageY[cardID % 4 + 1];
	}
}

var newDeck = []

for (var i = 0; i <= 51; i++) {
	newDeck.push(new card(i));
}

function shuffle(deck) {
	let currentIndex = deck.length,  randomIndex;

  while (currentIndex != 0) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [deck[currentIndex], deck[randomIndex]] = [
      deck[randomIndex], deck[currentIndex]];
  }
}

 function displayCards(deck) {
 	for (var i = deck.length - 1; i >= 0; i--) {
 		var div = document.createElement("div");
 		div.style.width = "62px";
 		div.style.height = "95px";
 		div.style.backgroundImage = "url(Assets/cardImage.jpg)";
 		div.style.backgroundPosition = "-142px -422px";
 		div.style.float = "left";
 		div.id = deck[i].cardID;
 		div.style.position = 'absolute';
 		div.style.top = "20px";
 		div.style.left = "20px";
 		div.addEventListener("contextmenu", e => e.preventDefault());
 		document.getElementById("table").appendChild(div);
 		let card = document.getElementById(deck[i].cardID);
 		card.onmousedown = function(event) {
 			console.log(newDeck[parseInt(card.id) - 1].face + " of " + newDeck[parseInt(card.id) - 1].suit);
 			if (event.button == "2") {
 				card.style.backgroundPosition = newDeck[parseInt(card.id) - 1].imageX + " " + newDeck[parseInt(card.id) - 1].imageY;
 			} else {
	 			let offsetX = event.clientX - parseInt(card.style.left);
	 			let offsetY = event.clientY - parseInt(card.style.top);

	 			function mouseMove(event) {
	 				card.style.top = event.clientY - offsetY + "px";
	 				card.style.left = event.clientX - offsetX + "px";
	 			}

	 			document.addEventListener("mousemove", mouseMove);

	 			card.onmouseup = function() {
	 				document.removeEventListener("mousemove", mouseMove);
	 				card.onmouseup = null;
	 			}
	 		}
		};
 	}
 }

document.getElementById("newDeckButton").onmousedown = function() {
	var newDeck = []

	for (var i = 0; i <= 51; i++) {
		newDeck.push(new card(i));
	}

	while (document.getElementById("table").firstChild) {
        document.getElementById("table").removeChild(document.getElementById("table").firstChild);
    }

	shuffle(newDeck);
	displayCards(newDeck);
}