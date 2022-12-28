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
} else if (localStorage.getItem('user') !== null) {
	socket.emit('getUserData', localStorage.getItem('user'));
}

let user;
socket.on('keyMatch', data => {
	user = data;
	localStorage.setItem('user', user.email); // Save the user data for this device

	document.getElementById('account').innerHTML = user.firstName;
});

socket.on('noKeyMatch', () => {
	if (localStorage.getItem('user') !== null)
		socket.emit('getUserData', localStorage.getItem('user'));
	else
		console.log("Login failed: Key match not found.");
});

socket.on('userData', data => {
	user = data;
	document.getElementById('account').innerHTML = user.firstName;
});

function account() {
	if (user != null)
		return; // TODO: send to account page
	else
		window.location.replace("https://account.lachlangmurphy.com/signin/");
}