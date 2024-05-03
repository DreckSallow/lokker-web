<script lang="ts">
	import type { PageData } from '../../$types';
	import SocialIcon from '../../../components/icons/socialIcon.svelte';
	import Avatar from '../../../components/imgs/avatar.svelte';
	import AppNav from '../../../components/nav.svelte';

	export let data: PageData;
</script>

<AppNav />
<main class="py-4 flex gap-4 items-start">
	<aside class="sticky top-0 p-6 flex flex-col items-center max-w-[250px] w-[250px]">
		<Avatar
			src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR__2IIAULCR-xberpmuxf-9Jx3cJZLJgLm4tSb9cDwRQ&s"
			abr={data.profile.username.trim().at(0)}
			alt="user profile"
			hClass="h-[180px]"
			divClass="text-5xl font-bold"
		/>
		<h2 class="text-3xl font-bold mt-4">{data.profile.username}</h2>
		<h4 class="mt-1">{data.profile.email}</h4>
		<p class="mt-3 text-black">{data.profile.bio}</p>
		<ul class="flex flex-row gap-6 mt-6">
			<li>
				<a href={data.profile.website_url} target="_blank">
					<SocialIcon name="web" styleClass="h-7 w-7" />
				</a>
			</li>
			<li>
				<a href={data.profile.twitter_url} target="_blank">
					<SocialIcon name="twitter" styleClass="h-7 w-7" />
				</a>
			</li>
		</ul>
	</aside>
	<section class="p-8 flex-1">
		<h2 class="text-3xl font-bold mb-6">Collections</h2>
		<ul class="grid grid-cols-3 gap-6">
			{#each data.collections as coll}
				<li
					class="p-4 rounded-xl border border-neutral-400 flex flex-col justify-between items-start"
				>
					<h4 class="font-semibold text-xl mb-3">{coll.name}</h4>
					<a
						href={`/collections/${coll.collection_id}`}
						class="rounded-lg bg-neutral-700 text-white text-sm px-3.5 py-1 inline-block"
						>See collection</a
					>
				</li>
			{/each}
		</ul>
	</section>
</main>
