<script lang="ts">
	export let src: string | undefined = undefined;
	export let alt: string;
	export let abr = '';
	export let imgClass = '';
	export let divClass = '';
	export let hClass = ''; // A height for class
</script>

{#if src}
<img src="{src}" alt="{alt}" class="{`ui-circle ${hClass} ${imgClass}`}" loading="lazy" />
{:else}
<div class="{`ui-circle flex-center ${hClass} ${divClass}`}">{abr}</div>
{/if}
