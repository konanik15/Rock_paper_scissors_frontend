<script>
	import { tokenStore } from '../../hooks/auth';

	function handleLogout() {
		$tokenStore = null;
	}
</script>

<button on:click={handleLogout}>Logout</button>
