<script lang="ts">
	import type { PageData } from './$types';
	import MarkdownEditor from '$lib/ui/components/markdown-editor.svelte';
	import Text from '$lib/ui/components/text.svelte';
	import { ArrowLeft, CirclePlus } from 'lucide-svelte';
	export let data: PageData;
	let content = '';
	let title = '';
</script>

<section class="w-[70%] mx-auto my-12">
	<header class="mb-10 flex items-center gap-6">
		<a href="/dashboard/collections" class="rounded-full p-2 bg-neutral-200">
			<ArrowLeft class="h-[80%]" />
		</a>
		<Text tag="h1" class="mb-2 text-headtext">{data.info.collection.name}</Text>
	</header>
	<div class="content-section">
		<input
			type="text"
			spellcheck="false"
			class="border-b border-neutral-200 p-3 w-full font-semibold outline-none placeholder:text-neutral-400 text-[3.5rem] font-black text-neutral-900"
			placeholder="Title"
			bind:value={title}
		/>
		<MarkdownEditor bind:content />
		{#if content.length > 0 && title.length > 0}
			<hr class="bg-neutral-400 my-4" />
			<button type="button" class="btn btn-solid flex ml-auto flex items-center gap-1.5">
				<CirclePlus class="h-5 w-5 stroke-white" />
				Create
			</button>
		{/if}
	</div>
</section>
