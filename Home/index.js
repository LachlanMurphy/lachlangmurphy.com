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
const socket = io("https://vps.lachlangmurphy.com", {withCredentials: true});

let user = null;
if (sessionStorage.getItem('user') !== null) {
	socket.emit('getUserData', sessionStorage.getItem('user'));
}

socket.on('sendUserData', data => {
	user = data;
});

function account() {

}