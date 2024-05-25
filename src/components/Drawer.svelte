<script>
	import { A, Button, CloseButton, Drawer } from 'flowbite-svelte';
	import { BarsOutline } from 'flowbite-svelte-icons';
	import { sineIn } from 'svelte/easing';

	// drawer hidden props
	let hidden1 = true;
	let transitionParams = {
		x: -320,
		duration: 200,
		easing: sineIn
	};

	function logout() {
		window.localStorage.removeItem('authorization');
		alert("You're Logged Out!");
		window.location.replace('/login');
	}
</script>

<div>
	<Button
		color="none"
		class="
		m-2 h-6 w-6
		p-4
		duration-300
		hover:bg-gray-700
		hover:text-white dark:text-gray-400
		"
		on:click={() => (hidden1 = false)}
	>
		<BarsOutline />
	</Button>
	<Drawer transitionType="fly" {transitionParams} bind:hidden={hidden1} id="sidebar1">
		<div class="mb-5 flex items-center justify-between">
			<h5 id="drawer-label" class="inline-flex items-center">
				<A
					href="/"
					color="
					text-base font-semibold
					text-gray-500 dark:text-gray-400"
					class="hover:no-underline">Meet Team</A
				>
			</h5>
			<div class="flex items-center space-x-2">
				<Button outline on:click={logout} size="xs">Log Out</Button>
				<CloseButton on:click={() => (hidden1 = true)} class="dark:text-white" />
			</div>
		</div>
		<div id="links" class="flex flex-col space-y-3">
			<A href="/course">Courses</A>
			<A href="/tasks">Tasks</A>
		</div>
	</Drawer>
</div>
