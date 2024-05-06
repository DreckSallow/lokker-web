<script lang="ts">
	import MarkdownEditor from '$lib/ui/components/markdown-editor.svelte';
	import Text from '$lib/ui/components/text.svelte';
	import { ArrowLeft } from 'lucide-svelte';
	import type { PageData } from '../$types';
	export let data: PageData;

	let currentArticle = data.articles[0];
</script>

<section class="w-[70%] mx-auto my-12">
	<header class="mb-10 flex gap-6 items-center">
		<a class="bg-neutral-200 p-2 rounded-full" href="/dashboard/collections">
			<ArrowLeft class="h-5 w-5 stroke-black" />
		</a>
		<Text tag="h1" class="mb-2 text-headtext">{data.collection.name}</Text>
	</header>
	<section class="flex flex-row gap-4">
		<ul class="flex flex-col gap-2 w-[12rem]">
			{#each data.articles as article}
				<li>
					<button
						class="rounded-lg py-1 px-3 text-sm font-semibold"
						class:bg-neutral-200={currentArticle.title == article.title}
						on:click={() => (currentArticle = article)}
					>
						{article.title}
					</button>
				</li>
			{/each}
		</ul>
		<MarkdownEditor content={currentArticle.content} />
	</section>
</section>
