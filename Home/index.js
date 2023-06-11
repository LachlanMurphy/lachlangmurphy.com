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


/* Used for accounts/server not currently in use
// Acount stuff
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
	if (data == null)
		return; // No user found
	user = data;
	document.getElementById('account').innerHTML = user.firstName;
});

socket.on('sendKey', key => {
	let param = new URLSearchParams();
	param.append('user', key);
	let url = "https://account.lachlangmurphy.com/account/?" + param.toString();
	window.location.href = url;
});

function account() {
	if (user != null)
		socket.emit('requestKey', user.email);
	else
		window.location.href = "https://account.lachlangmurphy.com/signin/";
}

*/