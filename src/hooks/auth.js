import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const AUTH_KEY = 'auth';
export const tokenStore = writable(browser && JSON.parse(localStorage.getItem(AUTH_KEY)));

// export const setUserData = (username, token) => {
// 	$tokenStore = {
// 		username,
// 		token
// 	};
// };

tokenStore.subscribe((authData) => {
	if (!browser) return;
	if (!authData) localStorage.removeItem(AUTH_KEY);
	else localStorage.setItem(AUTH_KEY, JSON.stringify(authData));
});
