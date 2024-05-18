<script lang="ts">
	type InputType = 'text' | 'email' | 'password' | 'search' | 'url';
	export let value = '';
	export let placeholder = '';
	export let type: InputType = 'text';
	export let hasError = false;
	export let required = true;
	export let className = '';
	export let tag: 'input' | 'textarea' = 'input';
	export { className as class };
</script>

{#if tag === 'input'}
	<input
		{type}
		{value}
		{placeholder}
		{required}
		class={`input ${className}`}
		class:error={(required && value.length == 0) || hasError}
		on:input={(e) => (value = e.currentTarget.value)}
	/>
{/if}
{#if tag === 'textarea'}
	<textarea
		{value}
		{placeholder}
		{required}
		class={`input ${className}`}
		class:error={(required && value.length == 0) || hasError}
		on:input={(e) => (value = e.currentTarget.value)}
	/>{/if}
