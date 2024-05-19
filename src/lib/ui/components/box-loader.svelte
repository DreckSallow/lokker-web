<script lang="ts">
	export let loading = false;
	export let tag: string = 'div';
	let className = '';
	export { className as class };
</script>

<svelte:element this={tag} class={className}>
	{#if loading}
		<div class="c-loader p-3 flex items-center gap-1.5 m-auto">
			<div class="h-6 w-6 rounded-full bg-brand stroke-none" />
			<div class="h-6 w-6 rounded-full bg-brand stroke-none" />
			<div class="h-6 w-6 rounded-full bg-brand stroke-none" />
		</div>
	{:else}
		<slot></slot>
	{/if}
</svelte:element>

<style>
	.c-loader :global(div) {
		animation: loader-animation 1.5s infinite;
	}
	.c-loader :global(:nth-child(1)) {
		animation-delay: 0s;
	}
	.c-loader :global(:nth-child(2)) {
		animation-delay: 0.3s;
	}

	.c-loader :global(:nth-child(3)) {
		animation-delay: 0.6s;
	}
	@keyframes loader-animation {
		0%,
		100% {
			opacity: 0;
		}
		50% {
			opacity: 1;
		}
	}
</style>
