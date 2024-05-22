<script lang="ts">
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import { onDestroy, onMount } from 'svelte';
	export let content = '';
	export let title = '';

	let element: Element | undefined;
	let editor: Editor | undefined;

	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [StarterKit.configure({ heading: { levels: [2, 3, 4, 5, 6] } })],
			content,
			onTransaction: () => {
				editor = editor;
			},
			onUpdate({ editor }) {
				content = editor.isEmpty ? '' : editor.getHTML();
			}
		});
		element?.setAttribute('spellcheck', 'false');
		console.log(document.querySelector('#editor-title'));
		(document.querySelector('#editor-title') as Option<HTMLInputElement>)?.focus();
	});

	onDestroy(() => {
		if (editor) editor.destroy();
	});
</script>

<input
	id="editor-title"
	type="text"
	spellcheck="false"
	class="border-b border-neutral-200 p-3 w-full font-semibold outline-none placeholder:text-neutral-400 text-[3.5rem] font-black text-neutral-900"
	placeholder="Title"
	bind:value={title}
	on:keydown={(e) => {
		if (e.key == 'Enter' || e.key == 'ArrowDown') {
			editor?.commands.focus();
		}
	}}
/>
<div bind:this={element} class="min-h-32 prose prose-neutral prose-lg w-full max-w-full" />

<style>
	div :global(.tiptap) {
		height: 100%;
		width: 100%;
		outline: none;
		min-height: inherit;
	}
</style>
