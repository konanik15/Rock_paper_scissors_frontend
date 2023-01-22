<script>
	import axios from 'axios';
	import { push } from 'svelte-spa-router';
	import { tokenStore } from '../../hooks/auth';
	let name = '',
		password = '';
	$: submit = async () => {
		const response = await axios.post(
			'http://localhost:8080/lobby/',
			{
				name,
				password
			},
			{
				headers: {
					authorization: $tokenStore.token
				}
			}
		);
		if (response.status === 200) {
			console.log('New game : ' + response);

			//   axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
			//   await push('/');
		}
	};
</script>

<main class="form-signin">
	<form on:submit|preventDefault={submit}>
		<h1 class="h3 mb-3 fw-normal">Enter Lobby Details</h1>

		<label class="form-floating">
			<input bind:value={name} type="name" class="form-control" placeholder="name" />
			lobbyName
		</label> <br />

		<label class="form-floating">
			<input
				id="pass"
				bind:value={password}
				type="password"
				class="form-control"
				placeholder="Password"
			/>
			<label for="pass">password</label>
		</label> <br />

		<button class="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
	</form>
</main>
