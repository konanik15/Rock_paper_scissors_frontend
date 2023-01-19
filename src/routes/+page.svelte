<script>
	import Lobby from '../components/lobbyComponents/Lobby.svelte';
	import LobbyForm from '../components/lobbyComponents/LobbyForm.svelte';
	import Logout from '../components/loginComponents/Logout.svelte';
	import Login from '../components/loginComponents/Login.svelte';
    import 'papercss/dist/paper.min.css';
	import { tokenStore } from '../hooks/auth';
    import { Button, Form, Input, Alert } from 'spaper';
	let lobbyFormShow = false;

	function showLobbyForm() {
		lobbyFormShow = true;
	}

    function cancelLobbyCreation(){
        lobbyFormShow = false;
    }
</script>

<div style="display:grid;min-height:100vh;place-items:center;">
	{#if $tokenStore !== null}
		<Lobby />
		{#if lobbyFormShow === false}
			<Button type="primary" on:click={showLobbyForm}>CreateLobby</Button>
			<Logout />
		{:else}
			<LobbyForm />
            <Button type="primary" on:click={cancelLobbyCreation}>Cancel</Button>
		{/if}
	{:else}
		<Login />
	{/if}
</div>
