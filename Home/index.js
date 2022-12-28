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

// Grab the user from the login stuff
let param = new URLSearchParams(window.location.search);
let key = param.get("user");

if (key !== null) {
	socket.emit('getKeyMatch', key);
	console.log("Sent");
}

let user;
socket.on('keyMatch', data => {
	user = data;
	console.log(user);
	localStorage.setItem('user', user); // Save the user data for this device
});