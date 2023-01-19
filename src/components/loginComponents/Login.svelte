<script>
	import axios from 'axios';
	import { push } from 'svelte-spa-router';
	import { tokenStore } from '../../hooks/auth';
	import 'papercss/dist/paper.min.css';
	import { Button, Form, Input, Alert } from 'spaper';

	let warning = '';
	let showWarning = false;
	let username = '',
		password = '';
	$: submit = async () => {
    showWarning = false;
		try {
			const response = await axios.post(
				'http://localhost:8080/login',
				{
					username,
					password
				},
				{ withCredentials: true }
			);
			if (response.status === 200) {
				console.log(response);
				$tokenStore = response.data.access_token;
			}
		} catch (e) {
			console.log('Critical Error');
		}
	};

	axios.interceptors.response.use(
		(response) => {
			return response;
		},
		(error) => {
			if (error.response.status === 401) {
				handleProblemWithLogin(error.response.data.message);
			}
			return error;
		}
	);

	function handleProblemWithLogin(message) {
		showWarning = true;
		warning = message;
		console.log('Handle message :' + message);
	}
</script>

<main class="form-signin">
	<Form on:submit>
		<div class="paper container">
			<h1 class="h3 mb-3 fw-normal">Rock Paper Scissors</h1>
				<Input bind:value={username} placeholder="Username" label="Username" />
				<br />
				<Input bind:value={password} placeholder="Password" label="Password" type="password" />
				<br />

				<Button on:click={submit} color="blue" type="primary">Login</Button>
				{#if showWarning} <Alert type="danger" dismissible>{warning}</Alert> {/if}
		</div>
	</Form>
</main>
