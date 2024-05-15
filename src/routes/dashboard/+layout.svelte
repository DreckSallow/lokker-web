<script lang="ts">
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import { Newspaper, PowerOff, User } from 'lucide-svelte';
	import { page } from '$app/stores';
	import type { LayoutData } from './$types';
	import { goto } from '$app/navigation';

	export let data: LayoutData;
	const user = writable(null);

	$: user.set(data.user);
	setContext('user', data.user);
	function logout() {
		localStorage.removeItem('auth');
		goto('/');
	}
</script>

<main class="flex flex-row">
	<aside class="w-[13rem] p-4 border-r-2 border-neutral-300/60 h-screen sticky top-0">
		<a href="/" class="font-bold text-2xl italic text-center mb-6 block">Lokker</a>
		<nav class="sidebar">
			<ul class="flex flex-col gap-1">
				<li>
					<a
						href="/dashboard"
						class="flex gap-2 items-center font-semibold hover:bg-neutral-100 p-2 rounded-lg"
						class:bg-neutral-200={$page.url.pathname == '/dashboard'}
					>
						<User class="w-6 h-6" />
						My Profile
					</a>
				</li>
				<li>
					<a
						href="/dashboard/collections"
						class="flex gap-2 items-center font-semibold hover:bg-neutral-100 p-2 rounded-lg"
						class:bg-neutral-200={$page.url.pathname.startsWith('/dashboard/collections') ||
							$page.url.pathname.startsWith('/dashboard/articles')}
					>
						<Newspaper class="w-6 h-6" />
						My Collections
					</a>
				</li>
			</ul>
			<hr class="bg-neutral-400 my-5" />
			<button
				on:click={logout}
				class="flex gap-2 items-center font-semibold hover:bg-neutral-100 p-2 rounded-lg w-full"
			>
				<PowerOff class="h-5 w-5" />
				Log out
			</button>
		</nav>
	</aside>
	<slot></slot>
</main>
