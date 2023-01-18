<script>
  import axios from 'axios';
  import {push} from 'svelte-spa-router';
  import {tokenStore} from '../../hooks/auth' ;
  let username = '', password = '';
  $: submit = async () => {
      const response = await axios.post('http://localhost:8080/login', {
          username,
          password
      }, {withCredentials: true});
      if (response.status === 200) {
        console.log(response)
        $tokenStore = response.data.access_token

        //   axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        //   await push('/');
      }
  }
</script>

<main class="form-signin">
  <form on:submit|preventDefault={submit}>
      <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

      <label class="form-floating">
          <input bind:value={username} type="username" class="form-control" placeholder="Username">
          username
      </label> <br/>

      <label class="form-floating">
          <input id="pass" bind:value={password} type="password" class="form-control" placeholder="Password" > 
          <label for="pass">Password</label>
      </label> <br/>

      <button class="w-100 btn btn-lg btn-primary" type="submit">Submit</button>

  </form>
</main>