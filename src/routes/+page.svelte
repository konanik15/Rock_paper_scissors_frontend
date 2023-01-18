<script>
    import Lobby from '../components/lobbyComponents/Lobby.svelte';
    import LobbyForm from '../components/lobbyComponents/LobbyForm.svelte';
    import Logout from '../components/loginComponents/Logout.svelte';
    import Login from '../components/loginComponents/Login.svelte';
    import {tokenStore} from '../hooks/auth' ;
    let lobbyFormShow = false;    

    


    function showLobbyForm(){
        lobbyFormShow = true;
    }

</script>
<div style="display:grid;min-height:100vh;place-items:center;">
{#if $tokenStore !== null}
	<Lobby/>
    {#if lobbyFormShow === false}
    <button on:click={showLobbyForm}>CreateLobby</button>
    <Logout/>
    {:else}
    <LobbyForm/>
    {/if}
{:else}
    <Login/>    
{/if}
</div>