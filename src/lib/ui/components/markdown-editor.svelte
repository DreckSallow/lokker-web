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
			extensions: [StarterKit.configure({ heading: { levels: [2, 3, 4, 5, 6] } })],
			content,
			autofocus: true,
			onTransaction: () => {
				editor = editor;
			},
			onUpdate({ editor }) {
				content = editor.isEmpty ? '' : editor.getHTML();
			}
		});
		element?.setAttribute('spellcheck', 'false');
	});

	onDestroy(() => {
		if (editor) editor.destroy();
	});
</script>

<div bind:this={element} class="min-h-32 prose prose-neutral prose-lg w-full max-w-full" />

<style>
	div :global(.tiptap) {
		height: 100%;
		width: 100%;
		outline: none;
		min-height: inherit;
	}
</style>
