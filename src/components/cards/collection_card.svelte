<script lang="ts">
	import Avatar from '../imgs/avatar.svelte';

	export let tag: 'div' | 'li';
	export let authorImg: string | undefined;
	export let alt: string;
	export let authorName: string;
	export let title: string;
	export let link: string;
	export let profile_id: number;
	export let total_articles: number = 0;
</script>

<svelte:element this={tag} class="rounded-lg p-4 border border-neutral-300">
	<a class="flex gap-4 items-center mb-2" href={`/profiles/${profile_id}`}>
		<Avatar
			src={authorImg}
			{alt}
			abr={authorName.trim().at(0)}
			hClass="h-9"
			divClass="font-bold bg-neutral-500"
		/>
		<h5 class="text-base text-neutral-800 font-light">{authorName}</h5>
	</a>
	<h4 class="font-semibold text-xl text-brand mb-6">{title}</h4>
	<div class="flex justify-between items-center gap-4">
		<a href={link} class="btn-solid inline-block text-sm px-3 py-2">Ver Colleccion</a>
		<span class="text-sm font-neutral-400"
			>{total_articles} {total_articles == 1 ? 'article' : 'articles'}</span
		>
	</div>
</svelte:element>
