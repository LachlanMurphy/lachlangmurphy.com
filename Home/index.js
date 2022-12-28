function toggleSidebar() {
	document.getElementById("sideBar").classList.toggle("active");
	document.getElementById("burger").classList.toggle("active");
	document.getElementById("coverDiv").classList.toggle("active");
	if (document.getElementById("subPieces").classList == "active") {
		document.getElementById("subPieces").classList.toggle("active");
	}
}

function togglePieces() {
	document.getElementById("subPieces").classList.toggle("active");
}

// Acount stuff
// const io = require("socket.io-client");
const socket = io("https://account.lachlangmurphy.com");

let user = null;
if (localStorage.getItem('user') !== null) {
	socket.emit('getUserData', localStorage.getItem('user'));
	console.log("Sent");
}

socket.on('userData', data => {
	user = data;
	console.log(user);
});

function account() {

}