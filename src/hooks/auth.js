import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const TOKEN = 'token';
export const tokenStore = writable(browser && localStorage.getItem(TOKEN));
tokenStore.subscribe((token) => {
	if (!browser) return;
	if (!token) localStorage.removeItem(TOKEN);
	else localStorage.setItem(TOKEN, token);
});
