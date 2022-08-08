/*First the faces and suits are declared for later pulling*/
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

//The x cordinates for the different faces in the sprites
var cardImageX = [null,
	"-20px",//ace
	"-81px",//two
	"-143px",//three
	"-204px",//four
	"-266px",//five
	"-327px",//six
	"-389px",//seven
	"-451px",//eight
	"-512px",//nine
	"-574px",//ten
	"-635px",//jack
	"-697px",//king
	"-758px"//queen
]

//Sprites for the suits
var cardImageY = [null,
	"-40px",//clubs
	"-136px",//diamonds
	"-232px",//hearts
	"-327px"//spades
]

//constructor for each card
class card {
	constructor (cardID) {
		this.face = faces[Math.floor((cardID / 4) + 1)];//assigns face
		this.suit = suits[cardID % 4 + 1];//assigns suit
		this.cardID = cardID + 1;//assigns ID to the card for later refrences
		this.imageX = cardImageX[Math.floor((cardID / 4) + 1)];//sprite image x
		this.imageY = cardImageY[cardID % 4 + 1];//sprite image y
	}
}

//shuffles deck by rearanging order in the array
function shuffle(deck) {
	let currentIndex = deck.length,  randomIndex;

  while (currentIndex != 0) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [deck[currentIndex], deck[randomIndex]] = [
      deck[randomIndex], deck[currentIndex]];
  }
}

//takes the array of cards and makes them visible to player while giving them atributes
 function displayCards(deck) {
 	for (var i = deck.length - 1; i >= 0; i--) {
 		var div = document.createElement("div");//element in which cards will be shown

 		//styling atributes for the card elements
 		div.style.width = "62px";
 		div.style.height = "95px";
 		div.style.backgroundImage = "url(Assets/cardImage.jpg)";
 		div.style.backgroundPosition = "-142px -422px";
 		div.style.float = "left";
 		div.id = deck[i].cardID;//id assign for later use
 		div.style.position = 'absolute';
 		div.style.top = "20px";
 		div.style.left = "20px";

 		div.addEventListener("contextmenu", e => e.preventDefault());//dissables the right click popup menu when right clicking a card

 		//add div element to the screen
 		document.getElementById("table").appendChild(div);

 		//adding drag and drop for each card as well as right click to reveal/hide
 		let card = document.getElementById(deck[i].cardID);
 		card.onmousedown = function(event) {
 			if (event.button == "2") {
 				//right click to reveal/hide by using sprites
 				if (card.style.backgroundPosition == newDeck[parseInt(card.id) - 1].imageX + " " + newDeck[parseInt(card.id) - 1].imageY) {
 					card.style.backgroundPosition = div.style.backgroundPosition = "-142px -422px";
 				} else {
					card.style.backgroundPosition = newDeck[parseInt(card.id) - 1].imageX + " " + newDeck[parseInt(card.id) - 1].imageY;
 				}
 			} else {
 				//left click to move card around the screen
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

//Function that creates a new deck and shuffles it for playing a game
document.getElementById("newDeckButton").onmousedown = function() {
	//construct deck array
	var newDeck = []

	for (var i = 0; i <= 51; i++) {
		newDeck.push(new card(i));
	}

	//remove prior cards on table if them are there
	while (document.getElementById("table").firstChild) {
  	document.getElementById("table").removeChild(document.getElementById("table").firstChild);
  }

  //shuffle the deck and display the deck
	shuffle(newDeck);
	displayCards(newDeck);
}