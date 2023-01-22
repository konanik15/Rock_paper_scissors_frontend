<script>
	import { tokenStore } from '../../hooks/auth';
	import 'papercss/dist/paper.min.css';
	import { Button, Form, Input, Alert } from 'spaper';
	import Game from '../gameComponents/Game.svelte';

	let socket = null;
	let gameSocket = null;
	let isReady = false;

	function getLobbies() {
		return fetch('http://localhost:8080/lobby/').then((res) => res.json());
	}

	

	const promise = getLobbies();
	const connectToLobby = (lobbyId) => {
		if (socket) socket.close();
		socket = new WebSocket('ws://localhost:8080/lobby/' + lobbyId + '?token=' + $tokenStore.token);
		socket.onmessage = (event) => {
			const data = JSON.parse(event.data);
			
			if (data.event === 'game_started') {
				startGame(data.game_id);
			}
			console.log(data);
		};
		isReady = false;
	};

	function setReady() {
		isReady = true;
		socket.send(JSON.stringify({ action: 'ready' }));
	}

	function startGame(gameId) {
		console.log('TRYING TO START NEW GAME :');
		gameSocket = new WebSocket(
			'ws://localhost:8080/game/' + gameId + '?token=' + $tokenStore.token
		);
		console.log('GAME STARTED BY ID ' + gameId);
	}
</script>

<main style="display: flex;">
	<section>
		<h2>Lobby List</h2>

		{#await promise}
			"Waiting for lobbies"
		{:then lobbies}
			<ul>
				{#each lobbies as lobby}
					<li>
						<span style = "font-size: 2em;">{lobby.name}</span>
						<button on:click={() => connectToLobby(lobby._id)}> Join Lobby </button>
					</li>
				{/each}
			</ul>
		{/await}
	</section>
	{#if socket}
		Im in Lobby
		{#if !isReady}
			<Button on:click={() => setReady()}>Ready</Button>
		{/if}
	{/if}
	{#if gameSocket}
		Im in Game
		<Game gameSocket={gameSocket}/>
	{/if}
</main>
