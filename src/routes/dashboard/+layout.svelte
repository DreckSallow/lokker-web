<script lang="ts">
	import { page } from '$app/stores';
	import type { LayoutData } from './$types';
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import Avatar from '../../components/imgs/avatar.svelte';

	export let data: LayoutData;
	const user = writable(null);

	$: user.set(data.user);
	// $: console.log($page.url);
	setContext('user', data.user);
</script>

<div class="bg-overpage px-10 py-4 border-b border-neutral-400/30">
	<header class=" flex justify-between items-center">
		<span class="text-brand italic font-semibold text-xl">Lokker</span>
		<div class="flex gap-3 items-center">
			<Avatar
				src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR__2IIAULCR-xberpmuxf-9Jx3cJZLJgLm4tSb9cDwRQ&s"
				abr={$user?.username.trim().at(0)}
				alt="user_profile"
				hClass="h-[50px]"
				divClass="text-5xl font-bold"
			/>
			<span class="font-semibold text-neutral-800">{$user?.username}</span>
		</div>
	</header>
	<nav class="mt-3">
		<ul class="flex gap-4">
			<li class="" class:tab-active={$page.url.pathname == '/dashboard'}>
				<a href="/dashboard">Profile</a>
			</li>
			<li class="" class:tab-active={$page.url.pathname == '/dashboard/collections'}>
				<a href="/dashboard/collections">Collections</a>
			</li>
		</ul>
	</nav>
</div>
<slot></slot>

<style>
	.tab-active {
		background-color: yellowgreen;
		color: white;
	}
</style>
