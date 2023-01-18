<script>
	import { onMount } from 'svelte';
	import io from 'socket.io-client';

	let playerMove = '';
	let opponentMove = '';
	const moves = ['rock', 'paper', 'scissors'];

    var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2dpdGh1Yi5jb20vTmV0ZXJwaWxhL1JvY2tfcGFwZXJfc2Npc3NvcnNfYmFja2VuZCIsInN1YiI6InVzZXIxIiwiaWF0IjoxNjczODk2MTYwfQ.HZXhu7PLqVHY-a8mwdoWXW6693Ez5KHOjX7jSizn4TQ';
  

	function makeMove(move) {
		if (playerMove === '') playerMove = move;
	}

	function getLobbies() {
		return fetch('http://localhost:8080/lobby/').then((res) => res.json());
	}

	const promise = getLobbies();
	let socket = null;

	// onMount(() => { socket.on("connect", () => console.log("Im connected to Gateway"))})
</script>

<div>
	<h1>Welcome to Game</h1>
	{#each moves as move}
		<button on:click={() => makeMove(move)}>{move}</button>
	{/each}
</div>
<br />
<span>You chosed : {playerMove} </span>
<br />
<span>Your opponent chosed : {opponentMove}</span>
{#await promise}
	"Waiting for lobbies"
{:then lobbies}
	<ul>
		{#each lobbies as lobby}
			<li>
				<span>{lobby._id}</span>
				<span>{lobby.name}</span>
				<button
					on:click={() => {
						socket = new WebSocket('ws://localhost:8080/lobby/' + lobby._id+ '?token=' + token);
					}}
				>
					Join Lobby
				</button>
			</li>
		{/each}
	</ul>
{/await}
