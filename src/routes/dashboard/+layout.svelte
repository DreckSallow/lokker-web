<script lang="ts">
	import type { LayoutData } from './$types';
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import { Newspaper, User } from 'lucide-svelte';

	export let data: LayoutData;
	const user = writable(null);

	$: user.set(data.user);
	setContext('user', data.user);
</script>

<main class="flex flex-row">
	<aside class="w-[13rem] p-4 border-r-2 border-neutral-300/60 h-screen">
		<a href="/" class="font-bold text-2xl italic text-center mb-6 block">Lokker</a>
		<nav class="sidebar">
			<ul class="flex flex-col gap-1">
				<li class="hover:bg-neutral-200 p-2 rounded-lg">
					<a href="/dashboard" class="flex gap-2 items-center font-semibold">
						<User class="w-6 h-6" />
						My Profile
					</a>
				</li>
				<li class="hover:bg-neutral-200 p-2 rounded-lg">
					<a href="/dashboard/collections" class="flex gap-2 items-center font-semibold">
						<Newspaper class="w-6 h-6" />
						My Collections
					</a>
				</li>
			</ul>
		</nav>
	</aside>
	<slot></slot>
</main>
