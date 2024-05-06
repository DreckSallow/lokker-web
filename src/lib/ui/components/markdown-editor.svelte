<script lang="ts">
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import { onDestroy, onMount } from 'svelte';
	export let content = '';

	let element: Element | undefined;
	let editor: Editor | undefined;
	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [StarterKit],
			content,
			autofocus: true,
			onTransaction: () => {
				editor = editor;
			}
		});
		element?.setAttribute('spellcheck', 'false');
	});
	onDestroy(() => {
		if (editor) editor.destroy();
	});
</script>

<div
	bind:this={element}
	class="w-full h-screen [&>.tiptap]:border-neutral-200/70 [&>.tiptap]:border prose prose-neutral prose-lg"
/>

<style>
	div :global(.tiptap) {
		height: 100%;
		outline: none;
		border-width: 2px;
		border-radius: 5px;
		padding: 0.8rem;
	}
</style>
