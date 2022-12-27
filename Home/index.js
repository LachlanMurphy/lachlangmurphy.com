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
const socket = io("https://vps.lachlangmurphy.com");

let user = null;
if (sessionStorage.getItem('user') !== null) {
	socket.emit('getUserData', sessionStorage.getItem('user'));
	console.log("Sent");
}

socket.on('sendUserData', data => {
	user = data;
	console.log(user);
});

function account() {

}