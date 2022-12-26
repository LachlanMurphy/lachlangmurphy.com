let socket = io.connect('https://vps.lachlangmurphy.com');

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
let user = null;
if (sessionStorage.getItem('user') !== null) {
	socket.emit('getUserData', sessionStorage.getItem('user'));
}

socket.on('sendUserData', data => {
	user = data;
});

function account() {

}