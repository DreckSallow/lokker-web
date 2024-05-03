<script lang="ts">
	let className = '';
	export { className as class };
	export let tag: 'div' | 'li' = 'div';
</script>

<svelte:element this={tag} class={`${className} p-6 bg-overpage rounded-xl shadow-md`}>
	<slot></slot>
</svelte:element>
