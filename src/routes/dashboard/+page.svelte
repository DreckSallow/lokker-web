<script lang="ts">
	import type { PageData } from './$types';
	import { Edit2, Eye } from 'lucide-svelte';
	import Avatar from '../../components/imgs/avatar.svelte';
	import Card from '$lib/ui/components/card.svelte';
	import Text from '$lib/ui/components/text.svelte';
	export let data: PageData;
	let status: 'edit' | 'view' = 'view';
</script>

<main class="px-6 py-4 w-[60%]">
	<header class="flex justify-between">
		<Text tag="h1" class="text-neutral-600">Profile</Text>
		<button
			class="btn-solid text-sm flex items-center gap-1"
			on:click={() => (status = status == 'edit' ? 'view' : 'edit')}
		>
			{#if status == 'view'}
				<Edit2 class="h-4" />
				Edit
			{:else}
				<Eye class="h-4" />
				View
			{/if}
		</button>
	</header>
	{#if status == 'view'}
		<section class="mt-4 grid grid-cols-2 gap-6">
			<Card class="col-span-1">
				<Text tag="h3" class="text-headtext mb-4">Info</Text>
				<div class="flex flex-col items-center justify-center">
					<Avatar
						src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR__2IIAULCR-xberpmuxf-9Jx3cJZLJgLm4tSb9cDwRQ&s"
						abr={data.user?.username.trim().at(0)}
						alt="data.user profile"
						hClass="h-[100px]"
						divClass="text-5xl font-bold"
					/>
					<h4 class="mt-4">{data.user?.username}</h4>
				</div>
			</Card>
			<Card class="col-span-1">
				<Text tag="h3" class="text-headtext mb-4">Links</Text>
				<ul class="w-full overflow-hidden">
					<li>
						<Text tag="h6" class="font-semibold">Website</Text>
						<a href={data.user?.website_url}>{data.user?.website_url}</a>
					</li>
					<li>
						<Text tag="h6" class="font-semibold">Twitter</Text>
						<a href={data.user?.twitter_url}>{data.user?.twitter_url}</a>
					</li>
				</ul>
			</Card>
			<Card class="col-span-2">
				<Text tag="h3" class="text-headtext mb-4">Bio</Text>
				{data.user?.bio}
			</Card>
		</section>
	{/if}
	{#if status == 'edit'}
		edit
	{/if}
</main>
