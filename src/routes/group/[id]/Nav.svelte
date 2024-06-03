<script>
	import { NavLi, NavUl, Navbar } from 'flowbite-svelte';
	import { page } from '$app/stores';

	export let activeUrl = '';
	export let userInGroup = true;
	let activeClass = 'text-cyan-400 bg-green-700 bg-transparent';
</script>

<Navbar color="none" class="mb-5 flex items-center justify-center rounded-2xl py-0">
	<NavUl
		divClass="mx-auto w-full"
		ulClass="mx-auto text-xl h-10 items-center w-64 border flex justify-around"
		hidden={false}
		{activeUrl}
		{activeClass}
	>
		<NavLi href={`/group/${$page.params.id}`}>Info</NavLi>
		{#if userInGroup}
			<NavLi href={`/group/${$page.params.id}/tasks`}>Tasks</NavLi>
			<NavLi href={`/group/${$page.params.id}/review`}>Reviews</NavLi>
		{/if}
	</NavUl>
</Navbar>
