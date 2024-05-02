<script lang="ts">
	import { X } from 'lucide-svelte';
	let dialog: HTMLDialogElement | null;

	export function close() {
		if (dialog) dialog.close();
	}
	export function show() {
		if (dialog) dialog.showModal();
	}
</script>

<dialog
	bind:this={dialog}
	on:close={() => close()}
	on:click|self={() => close()}
	on:keydown={() => {}}
	class="rounded-xl"
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		on:click|stopPropagation
		class="bg-white rounded-2xl p-6 relative pt-7 w-full h-full shadow-lg"
	>
		<button
			on:click={close}
			class="hover:bg-neutral-200/70 transition rounded-lg p-1 absolute top-1.5 right-1.5"
		>
			<X class="h-5 w-5" />
		</button>
		<slot />
	</div>
</dialog>

<style>
	dialog::backdrop {
		background-color: #36363640;
		backdrop-filter: blur(2px);
	}
</style>
