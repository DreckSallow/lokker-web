<script lang="ts">
	import { ArrowRight } from 'lucide-svelte';
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

<svelte:element
	this={tag}
	class="rounded-lg py-5 px-6 border border-neutral-400 flex flex-col justify-between"
>
	<header>
		<a class="flex gap-4 items-center mb-4" href={`/profiles/${profile_id}`}>
			<Avatar
				src={authorImg}
				{alt}
				abr={authorName.trim().at(0)?.toUpperCase()}
				hClass="h-9"
				divClass="font-bold bg-neutral-300"
			/>
			<h5 class="text-base text-neutral-800 font-light">{authorName}</h5>
		</a>
		<h4 class="font-semibold text-xl text-brand mb-6">{title}</h4>
	</header>
	<div class="flex justify-between items-center gap-4">
		<span class="text-sm text-brand/90">
			Total articles: {total_articles}
		</span>
		<a href={link} class="ui-circle bg-brand p-2" title="See collection">
			<ArrowRight class="h-4 w-4 stroke-white" />
		</a>
	</div>
</svelte:element>
