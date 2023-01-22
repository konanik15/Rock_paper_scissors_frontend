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

<nav class="border fixed split-nav">
	<div class="nav-brand">
	  <h3><a href="#">Rock Paper Scissors</a></h3>
	</div>
	<div class="collapsible">
	  <input id="collapsible1" type="checkbox" name="collapsible1">
	  <label for="collapsible1">
		<div class="bar1"></div>
		<div class="bar2"></div>
		<div class="bar3"></div>
	  </label>
	  <div class="collapsible-body">
		<ul class="inline">
			{#if $tokenStore}
			<li>Logged as : {$tokenStore?.username} </li>
			{/if}
		  <li><a href="#">Authors</a></li>
		  <li><a href="#">About</a></li>
		  <!-- svelte-ignore security-anchor-rel-noreferrer -->
		  <li><a href="https://github.com/Neterpila/Rock_paper_scissors_backend" target="_blank">Github</a></li>
		</ul>
	  </div>
	</div>
  </nav>

<div style="min-height:100vh;padding:2rem;margin-top:68px;">
	{#if $tokenStore}
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
