<script>
	import { onMount } from 'svelte';
	import io from 'socket.io-client';

	let playerMove = '';
	let yourTurn = true;
	let opponentMove = '';
	const moves = ['rock', 'paper', 'scissors'];

  

	function makeMove(move) {
		if (yourTurn === ture) playerMove = move;
		yourTurn = false;
	}


	let socket = null;

</script>

<div>
	{#each moves as move}
		<button on:click={() => makeMove(move)}>{move}</button>
	{/each}
</div>
<br />
<span>You chosed : {playerMove} </span>
<br />
<span>Your opponent chosed : {opponentMove}</span>


