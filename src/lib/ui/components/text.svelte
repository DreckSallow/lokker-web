<script lang="ts">
	let className = '';
	export { className as class };
	type TextVariants = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
	export let tag: TextVariants = 'p';

	const variantStyle: { [key in TextVariants]: string } = {
		h1: 'font-bold text-4xl',
		h2: 'font-bold text-3xl',
		h3: 'font-semibold text-2xl',
		h4: 'font-semibold text-xl',
		h5: 'font-normal text-lg',
		h6: 'font-normal text-normal',
		p: 'font-normal text-normal',
		span: 'font-normal text-normal'
	};
</script>

<svelte:element this={tag} class={`${variantStyle[tag]} ${className}`}>
	<slot></slot>
</svelte:element>
