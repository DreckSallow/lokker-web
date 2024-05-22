<script lang="ts">
	import type { PageData } from './$types';
	import Avatar from '../../../components/imgs/avatar.svelte';
	import AppNav from '../../../components/nav.svelte';
	import { ChevronRight } from 'lucide-svelte';

	export let data: PageData;
</script>

<svelte:head>
	<title>{data.profile.username} profile</title>
</svelte:head>

<AppNav />
<main class="py-4 px-14 flex flex-col gap-2">
	<header class="flex flex-col gap-2 mt-2 mb-4 font-semibold items-start">
		<div class="flex flex-row gap-2 items-center">
			<a href="/" class="underline hover:text-brand/80 underline-offset-4"> Search collections </a>
			<ChevronRight class="h-4 w-4" />
			<span class="text-neutral-600">User profile</span>
		</div>
	</header>
	<div class="flex gap-16 items-start mt-4">
		<aside class="sticky top-0 flex flex-col items-center max-w-[250px] w-[250px]">
			<Avatar
				src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR__2IIAULCR-xberpmuxf-9Jx3cJZLJgLm4tSb9cDwRQ&s"
				abr={data.profile.username.trim().at(0)}
				alt="user profile"
				hClass="h-[240px]"
				divClass="text-5xl font-bold"
			/>
			<h1 class="text-2xl font-bold w-full mt-4">{data.profile.username}</h1>
			<h4 class="text-lg text-neutral-600 mb-4 w-full font-light">{data.profile.email}</h4>
			<div class="w-full mb-4">
				<h5 class="border-b border-neutral-300 text-neutral-600 text-sm font-semibold">Bio</h5>
				<p class="mt-3 text-black text-justify">{data.profile.bio}</p>
			</div>
			<div class="mt-4 w-full">
				<h5 class="border-b border-neutral-300 text-neutral-600 text-sm font-semibold">
					Social Links
				</h5>
				<ul class="flex flex-col gap-6 mt-3 text-sm w-full">
					<li>
						<span class="font-semibold block">Website link</span>
						<a href={data.profile.website_url} target="_blank" class="text-xs">
							{'->'}
							{data.profile.website_url}
						</a>
					</li>
					<li>
						<span class="font-semibold block">Twitter link</span>
						<a href={data.profile.twitter_url} target="_blank" class="text-xs">
							{'->'}
							{data.profile.twitter_url}
						</a>
					</li>
				</ul>
			</div>
		</aside>
		<section class="flex-1">
			<h2 class="text-xl font-semibold border-b border-neutral-300 mb-6 text-neutral-600">
				List of collections
			</h2>
			<ul class="grid grid-cols-3 gap-6">
				{#each data.collections as coll}
					<li
						class="py-5 px-6 rounded-lg border border-neutral-400 flex flex-col justify-between items-start"
					>
						<h4 class="font-semibold text-lg mb-5">{coll.name}</h4>
						<a
							href={`/collections/${coll.collection_id}`}
							class="rounded-lg bg-brand text-white text-sm px-3.5 py-1.5 inline-block"
						>
							See collection
						</a>
					</li>
				{/each}
			</ul>
		</section>
	</div>
</main>
