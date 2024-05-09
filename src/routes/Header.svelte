<script>
	import { DarkMode, Navbar, NavBrand } from 'flowbite-svelte';
	import Drawer from './Drawer.svelte';
	import { onMount } from 'svelte';

	/**
	 * @type {string | null}
	 */
	let auth = null;

	onMount(() => {
		auth = localStorage.getItem('authorization');
	});
</script>

<Navbar fluid={true}>
	{#if auth !== null}
		<Drawer />
	{/if}
	<NavBrand href="/" class="mx-auto">
		<span
			class="
			whitespace-nowrap
			text-xl
			font-semibold
			dark:text-gray-200">Meet Team</span
		>
	</NavBrand>
	<DarkMode
		class="
		m-2 flex h-6
		w-6 items-center justify-center p-0
		hover:bg-gray-700 hover:text-white
	"
	/>
</Navbar>
