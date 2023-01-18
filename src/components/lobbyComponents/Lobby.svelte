<script>
	function getLobbies() {
		return fetch('http://localhost:8080/lobby/').then((res) => res.json());
	}

	const promise = getLobbies();
	let socket = null;

</script>

<h1>Lobby List</h1>

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
