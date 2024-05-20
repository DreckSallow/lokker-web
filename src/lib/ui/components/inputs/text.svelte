<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	type InputType = 'text' | 'email' | 'password' | 'search' | 'url';

	export let value = '';
	export let placeholder = '';
	export let type: InputType = 'text';
	export let hasError = false;
	export let required = true;
	export let className = '';
	export let tag: 'input' | 'textarea' = 'input';
	export { className as class };

	const dispatch = createEventDispatcher();

	function onInput(
		e: Event & { currentTarget: EventTarget & (HTMLInputElement | HTMLTextAreaElement) }
	) {
		value = e.currentTarget.value;
		dispatch('input', value);
	}

	let inputRef: Option<HTMLInputElement | HTMLTextAreaElement> = null;

	export function focus() {
		inputRef?.focus();
	}
</script>

{#if tag === 'input'}
	<input
		{type}
		{value}
		{placeholder}
		{required}
		class={`input ${className}`}
		class:error={hasError}
		on:input={onInput}
		bind:this={inputRef}
	/>
{/if}
{#if tag === 'textarea'}
	<textarea
		{value}
		{placeholder}
		{required}
		class={`input ${className}`}
		class:error={(required && value.length == 0) || hasError}
		on:input={onInput}
		bind:this={inputRef}
	/>{/if}
