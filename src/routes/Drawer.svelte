<script>
	import { Button, CloseButton, Drawer } from 'flowbite-svelte';
	import { sineIn } from 'svelte/easing';

	// drawer hidden props
	let hidden1 = true;
	let transitionParams = {
		x: -320,
		duration: 200,
		easing: sineIn
	};
</script>

<div>
	<Button
		color="none"
		class="
		m-2 h-6 w-6
		p-0
		dark:text-gray-400
		hover:bg-gray-700 hover:text-white
		"
		on:click={() => (hidden1 = false)}
	>
		<svg
			class="h-6 w-6"
			aria-hidden="true"
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			fill="none"
			viewBox="0 0 24 24"
		>
			<path
				stroke="currentColor"
				stroke-linecap="round"
				stroke-width="2"
				d="M5 7h14M5 12h14M5 17h14"
			/>
		</svg>
	</Button>
	<Drawer transitionType="fly" {transitionParams} bind:hidden={hidden1} id="sidebar1">
		<div class="flex items-center">
			<h5
				id="drawer-label"
				class="mb-4 inline-flex items-center text-base font-semibold text-gray-500 dark:text-gray-400"
			></h5>
			<CloseButton on:click={() => (hidden1 = true)} class="mb-4 dark:text-white" />
		</div>
		<p class="mb-6 text-sm text-gray-500 dark:text-gray-400">
			Supercharge your hiring by taking advantage of our <a
				href="/"
				class="text-primary-600 underline hover:no-underline dark:text-primary-500"
			>
				limited-time sale
			</a>
			for Flowbite Docs + Job Board. Unlimited access to over 190K top-ranked candidates and the #1 design
			job board.
		</p>
		<div class="grid grid-cols-2 gap-4">
			<Button color="light" href="/">Learn more</Button>
		</div>
	</Drawer>
</div>
