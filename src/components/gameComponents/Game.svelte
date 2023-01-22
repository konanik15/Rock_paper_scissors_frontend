<script>
	export let gameSocket;
	import { onMount } from 'svelte';
	import { Button, Article } from 'spaper';

	let state = "";
	let score = "0 : 0";
	let opponentMove = "";
	let myMove = "";
	let currentRound = 1;

	onMount(() => {
		gameSocket.onmessage = (event) => {
			console.log(event);
			const data = JSON.parse(event.data);
			switch(data.event){
				case "user_connected":
					console.log("USER CONNECTED", data)
					break;
				case "round_ended": 
					console.log("RoundEnded", data)
					console.log(data.data);
					state = data.data.state;
					score = data.data.score;
					opponentMove = data.data.opponent_move;
					currentRound = data.data.current_round;
					break;
				default:
					console.log("DEFAULT", data);
			}
		};
		console.log('GAME IS ON');
	});

	function makeMove(move) {
		console.log('Made move ' + move);
		myMove = move;
		gameSocket.send(JSON.stringify({ action: 'move', data: { move: move } }));
	}
</script>

<section>
<Button on:click={() => makeMove('rock')}>Rock</Button>
<Button on:click={() => makeMove('paper')}>Paper</Button>
<Button on:click={() => makeMove('scissors')}>Scissors</Button>
</section>

<br/>

<Article title="Game " border style="padding: 3em;">
	<h3>{score}</h3>
	<li>My move : {myMove}</li>
	<li>My oponnent move : {opponentMove} </li>
	<li>Current Round : {currentRound}</li>
	<li>Last Round State : {state}</li>
</Article>