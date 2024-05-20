<script lang="ts">
	import { LoaderCircle } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';

	type BtnType = 'solid' | 'outline';
	export let variant: BtnType = 'solid';
	export let type: Option<'submit' | 'reset' | 'button'> = 'button';
	export let loading = false;
	export let loadingText = 'Please wait';
	let className = '';
	export { className as class };
	const styleBind = {
		solid: 'btn bg-brand text-white',
		outline: 'btn border-2 border-brand-soft;'
	};

	const dispatch = createEventDispatcher();
</script>

<button
	class={`btn ${styleBind[variant]} ${loading ? 'bg-brand/70' : ''} ${className}`}
	disabled={loading}
	{type}
	on:click={() => !loading && dispatch('click')}
>
	{#if loading}
		<LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
		{loadingText}
	{:else}
		<slot />
	{/if}
</button>
