
//First_challenge: Your age in day ------------------
let start_fix = false;

function myfunction_start(){
	if(start_fix === false){
		let age_collect = prompt("What's your birth year? Buddy!");
		let age_Count = (2020 - age_collect) * 365;
		let h3 = document.createElement('h3');
		let text_ans = document.createTextNode("You live on earth since " + age_Count + " days, Make it useful!");
		h3.setAttribute('id', 'add_text')
		h3.appendChild(text_ans);
		document.getElementById('add_value').appendChild(h3);
	}
	start_fix = true;
}

function myfunction_reset(){
	if (start_fix === true){
		document.querySelector('#add_text').remove();
	}
	start_fix = false;
}

//second_challenge: Frog generator ------------------

function frogGen_click(){
	let frog_img = document.createElement('img');
	let div = document.createElement('div');
	frog_img.src = "image/1.webp";
	frog_img.classList = 'img-fluid';
	div.appendChild(frog_img);
	document.getElementById('frog_img').appendChild(div);
}

function frogReset(){
	document.querySelector('#frog_img div').remove();
}

//third_challenge: Frog generator ------------------

function rpsClick(yourChoice){
	let humanChoice, machChoice;

	humanChoice = yourChoice.id;

	machChoice = Choice_num(random_number());

	result = decideWinner(humanChoice, machChoice);

	message = showMessage(result);

	viewSite = front_view(humanChoice, message, machChoice); 
}

function random_number(){
	return Math.floor(Math.random() * 3);
}

function Choice_num(number){
	return ['rock', 'paper', 'scissors'][number];
}

function decideWinner(humanChoice,machChoice){
	rpsDatabase = {
		'rock': {'paper': 0, 'rock': 0.5, 'scissors': 1},
		'paper': {'scissors': 0, 'paper': 0.5, 'rock': 1},
		'scissors': {'rock': 0, 'scissors': 0.5, 'paper': 1},
	}

	var yourScore = rpsDatabase[humanChoice][machChoice];
	var compScore = rpsDatabase[machChoice][humanChoice];

	return [yourScore, compScore];
}

function showMessage([yourScore, compScore]){
	if (yourScore === 0) {
		return {'message': 'You lost!', 'color': 'red'};
	}
	else if(yourScore === 1){
		return {'message': 'You won!', 'color': 'green'};
	}
	else{
		return {'message': 'You tied!', 'color': '#c98a00'};
	}
}

function front_view(humanChoice, showMessage, machChoice) {
	let image_data = {
		'rock': document.getElementById('rock').src,
		'paper': document.getElementById('paper').src,
		'scissors': document.getElementById('scissors').src,
	}

//Remove all the images to access HumanchoiceImg and CompchoiceImg-----
	document.getElementById('rock').remove();
	document.getElementById('paper').remove();
	document.getElementById('scissors').remove();

let humanDiv = document.createElement('div');
let comDiv = document.createElement('div');
let messageDiv = document.createElement('div');

humanDiv.innerHTML = "<img class='img-fluid' src='" + image_data[humanChoice] + "'/>";
comDiv.innerHTML = "<img class='img-fluid' src='" + image_data[machChoice] + "'/>";
messageDiv.innerHTML = "<h1 style='color:" + showMessage['color'] + ";'>" + showMessage['message'] + "</h1>";
comDiv.style.boxShadow = '0px 0px 10px 3px rgba(212, 17, 33,0.67)';
humanDiv.style.boxShadow = '0px 0px 10px 3px rgba(17, 85, 212,0.67)';

document.querySelector('#third_challenge .one_field').appendChild(humanDiv);
document.querySelector('#third_challenge .one_field').appendChild(messageDiv);
document.querySelector('#third_challenge .one_field').appendChild(comDiv);
}

// Fourth chellenge all button color change ---------------------

let storgeColor = document.querySelectorAll('button');
let button_bg = [];
for(let i = 0; i < storgeColor.length; i++){
	button_bg.push(storgeColor[i].classList[1]);
} 
console.log(button_bg);

function BtnChange_color(optionBtn) {
	if (optionBtn.value === 'red'){
		redButton();
	}
	else if(optionBtn.value === 'green'){
		greenButton();
	}
	else if(optionBtn.value === 'blue'){
		blueButton();
	}
	else if(optionBtn.value === 'random'){
		randomButton();
	}
	else if(optionBtn.value === 'reset'){
		resetButton();
	}
}

function redButton(){
	for(let i = 0; i < storgeColor.length; i++){
		storgeColor[i].classList.remove(storgeColor[i].classList[1]);
		storgeColor[i].classList.add('btn-danger');
	}
}

function greenButton(){
	for(let i = 0; i < storgeColor.length; i++){
		storgeColor[i].classList.remove(storgeColor[i].classList[1]);
		storgeColor[i].classList.add('btn-success');
	}
}

function blueButton(){
	for(let i = 0; i < storgeColor.length; i++){
		storgeColor[i].classList.remove(storgeColor[i].classList[1]);
		storgeColor[i].classList.add('btn-primary');
	}
}

function randomButton(){
	for(let i = 0; i < storgeColor.length; i++){
		let randm_bg = Math.floor(Math.random() * 5);

		storgeColor[i].classList.remove(storgeColor[i].classList[1]);
		storgeColor[i].classList.add(button_bg[randm_bg]);
	}
}

function resetButton(){
	for(i = 0; i < storgeColor.length; i++){
		storgeColor[i].classList.remove(storgeColor[i].classList[1]);
		storgeColor[i].classList.add(button_bg[i]);
	}
}

// fourth challenge start------------------------

document.getElementById('hitBtn').addEventListener('click', blackjack_Hit);
document.getElementById('standBtn').addEventListener('click', blackjack_Stand);
document.getElementById('dealBtn').addEventListener('click', blackjack_Deal);

let blackjackGame ={
	'You':{'ResultSite': '#Your_result', 'div': '#Your_box', 'score': 0},
	'Dealer':{'ResultSite': '#Dealer_result', 'div': '#Dealer_box', 'score': 0},
	'Cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'K', 'Q', 'A'],
	'CardScores': {'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 10, 'K': 10, 'Q': 10, 'A': [1, 11]},
	'Wins': 0,
	'Losses': 0,
	'Draws': 0,
	'isStand': false,
	'turnsOver': false,
	'delStand': false,
} 

const YOU = blackjackGame['You'];
const DEALER = blackjackGame['Dealer'];

const hitSound = new Audio('asset/sound/sounds/swish.m4a');
const winSound = new Audio('asset/sound/sounds/cash.mp3');
const lostSound = new Audio('asset/sound/sounds/aww.mp3');

function blackjack_Hit(){
	if (blackjackGame['isStand'] === false){
		let card = randomCard();
		console.log(card);
		showCard(card,YOU);
		scoreCount(YOU,card);
		console.log(YOU['score'])
		viewScore(YOU);
		blackjackGame['delStand'] = true;
		blackjackGame['turnsOver'] = false;
	}
}

function blackjack_Stand(){
	if(blackjackGame['delStand'] === true){
		blackjackGame['isStand'] = true;
	while(DEALER['score'] < 17 && blackjackGame['isStand'] === true){
		let card = randomCard();
		showCard(card,DEALER);
		scoreCount(DEALER,card);
		viewScore(DEALER);
	}

	blackjackGame['turnsOver'] = true;
	let winner = winnerMassege(decideResult());
	console.log(winner);

	blackjackGame['delStand'] = false;
	}
}

function randomCard(){
	let randNum = Math.floor(Math.random() * 13);
	return blackjackGame['Cards'][randNum];
}

function showCard(card,activePlayer){
	if(activePlayer['score'] <= 21){
		let cardImage = document.createElement('img');
		cardImage.src = `asset/sound/images/${card}.png`;
		document.querySelector(activePlayer['div']).appendChild(cardImage);
		hitSound.play();
	}
}

function blackjack_Deal(){
	if(blackjackGame['turnsOver'] === true){
		let your_img = document.querySelector('#fifth_challenge').querySelectorAll('img');

		for (let i = 0; i < your_img.length; i++) {
			your_img[i].remove();
		}

		YOU['score'] = 0;
		DEALER['score'] = 0;
		document.querySelector('#Your_result').textContent = "0";
		document.querySelector('#Your_result').style.color = "#ffffff";
		document.querySelector('#Dealer_result').textContent = "0";
		document.querySelector('#Dealer_result').style.color = "#ffffff";

		document.querySelector('#fifth_challenge #game_intro').textContent = "Let's play!";
		document.querySelector('#fifth_challenge #game_intro').style.color = "Black";
	}

	blackjackGame['isStand'] = false;
	blackjackGame['delStand'] = false;
}

function scoreCount(activePlayer,card){
	if(card === 'A'){
		if(activePlayer['score'] + blackjackGame['CardScores'][card][1] <= 21){
			activePlayer['score'] += blackjackGame['CardScores'][card][1];
		}
		else{
			activePlayer['score'] += blackjackGame['CardScores'][card][0];
		}
	}
	else{
		activePlayer['score'] += blackjackGame['CardScores'][card];
	}
}

function viewScore(activePlayer){
	if(activePlayer['score'] > 21){
		document.querySelector(activePlayer['ResultSite']).textContent = "BUST!";
		document.querySelector(activePlayer['ResultSite']).style.color = "#f7a025";
	}
	else{
		document.querySelector(activePlayer['ResultSite']).textContent = activePlayer['score'];
	}
}

function decideResult(activePlayer){
	let winner;

	if (YOU['score'] <= 21){
		if (YOU['score'] > DEALER['score'] || DEALER['score'] > 21) {
			console.log("You Won!");
			winner = YOU;
			blackjackGame['Wins']++;
		}
		else if(YOU['score'] < DEALER['score']){
			console.log("Dealer Won!");
			winner = DEALER;
			blackjackGame['Losses']++;
		}
		else if(YOU['score'] === DEALER['score']){
			console.log("You Drew!");
			blackjackGame['Draws']++;
		}
	}
	//Condition when user or your score/dealer score BUST! -------------------
	else if(YOU['score'] > 21 && DEALER['score'] <= 21){
		console.log("Dealer won!");
		winner = DEALER;
		blackjackGame['Losses']++;
	}
	else if(YOU['score'] > 21 && DEALER['score'] > 21){
		console.log("You Drew!");
		blackjackGame['Draws']++;
	}
	return winner;
}

function winnerMassege(winner){
	if(blackjackGame['turnsOver'] === true){
		let message, messageColor;
		if (winner === YOU){
			document.querySelector('#Wins').textContent = blackjackGame['Wins'];
			message = 'You won!';
			messageColor = 'green';
			winSound.play();
		}
		else if(winner === DEALER){
			document.querySelector('#Losses').textContent = blackjackGame['Losses'];
			message = 'You Lost!';
			messageColor = 'red';
			lostSound.play();
			blackjackGame['Losses']++;
		}
		else{
			document.querySelector('#Draws').textContent = blackjackGame['Draws'];
			message = 'You Drew!';
			messageColor = '#f7a025';
			blackjackGame['Draws']++;
		}

		document.querySelector('#fifth_challenge #game_intro').textContent = message;
		document.querySelector('#fifth_challenge #game_intro').style.color = messageColor;
	}
}
