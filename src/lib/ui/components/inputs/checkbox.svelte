<script lang="ts">
	import { Check } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';

	export let checked = false;
	export let id: string | undefined = undefined;
	let className: string | undefined = undefined;
	export { className as class };

	const dispatch = createEventDispatcher();
</script>

<button
	role="checkbox"
	type="button"
	aria-checked={checked}
	{id}
	class={`rounded border border-neutral-800 flex justify-center items-center ${checked ? 'bg-neutral-800' : ''} aspect-square h-5 w-5 ${className}`}
	on:click={() => {
		checked = !checked;
		dispatch('change', checked);
	}}
>
	{#if checked}
		<Check class={`w-[80%] aspect-square stroke-white`} />
	{:else}
		<span class="w-[80%] aspect-square" />
	{/if}
</button>
