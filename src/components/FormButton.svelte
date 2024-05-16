<script>
	import { Button, Spinner } from 'flowbite-svelte';
	/**
	 * @type {((e: MouseEvent) => void)}
	 */
	export let onClickFunction;
	export let loading = false;
</script>

<Button
	id="register-button"
	on:click={onClickFunction}
	class="
			mx-auto mt-8
			w-fit rounded-3xl
			transition-all duration-300
			hover:rounded
			"
	disabled={loading ? true : false}
>
	{#if loading}
		<Spinner size="5" />
		<span class="ml-3">Loading</span>
	{:else}
		<span><slot /></span>
	{/if}
</Button>
