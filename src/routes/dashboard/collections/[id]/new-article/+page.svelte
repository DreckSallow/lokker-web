<script lang="ts">
	import type { PageData } from './$types';
	import MarkdownEditor from '$lib/ui/components/markdown-editor.svelte';
	import Text from '$lib/ui/components/text.svelte';
	import { ArrowLeft, CirclePlus } from 'lucide-svelte';
	import { goto } from '$app/navigation';
	import { api } from '$lib/utils/api';
	export let data: PageData;
	let content = '';
	let title = '';
	function create() {
		fetch(api('/articles'), {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${JSON.parse(localStorage.getItem('auth') as any).token}`,
				'Content-Type': 'Application/Json'
			},
			body: JSON.stringify({ title, content, collection_id: data.info.collection.collection_id })
		})
			.then((res) => res.json())
			.then(() => {
				goto('/dashboard/collections');
			})
			.catch(alert);
	}
</script>

<section class="w-[70%] mx-auto my-12">
	<header class="mb-10 flex items-center gap-6">
		<a href="/dashboard/collections" class="rounded-full p-2 bg-neutral-200">
			<ArrowLeft class="h-[80%]" />
		</a>
		<Text tag="h1" class="mb-2 text-headtext">{data.info.collection.name}</Text>
	</header>
	<div class="content-section">
		<MarkdownEditor bind:content bind:title />
		{#if content.length > 0 && title.length > 0}
			<hr class="bg-neutral-400 my-4" />
			<button
				type="button"
				class="btn btn-solid flex ml-auto flex items-center gap-1.5"
				on:click={create}
			>
				<CirclePlus class="h-5 w-5 stroke-white" />
				Create
			</button>
		{/if}
	</div>
</section>
