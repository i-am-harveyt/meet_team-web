<script>
	import { Badge, Button } from 'flowbite-svelte';
	import { onMount } from 'svelte';

	/**
	 * @type {number}
	 */
	export let id;
	/**
	 * @type {string}
	 */
	export let name;
	/**
	 * @type {string | undefined | null}
	 */
	export let description;
	/**
	 * @type {string}
	 */
	export let status;

	/**
	 * @type {
			"red" |
			"green" |
			"primary" |
			"yellow" |
			"purple" |
			"blue" |
			"dark" |
			"none" |
			"indigo" |
			"pink" |
			undefined
	 }
	 */
	let colorStr = 'primary';

	onMount(() => {
		if (status === 'Todo') colorStr = 'primary';
		else if (status === 'Doing') colorStr = 'red';
		else colorStr = 'green';
	});
</script>

<Button
	outline
	color="none"
	class="
	mt-3
	flex w-11/12
	flex-col
	items-start
	bg-gray-300
	shadow
	shadow-gray-500
	dark:bg-gray-700
	dark:text-gray-300"
	href={'/task/' + `${id}`}
>
	<div class="flex w-full justify-between">
		<p class="text-lg">{name}</p>
		<Badge color={colorStr}>{status}</Badge>
	</div>
	<p class="w-full overflow-hidden overflow-ellipsis text-start">
		{description === null ? '' : description}
	</p>
</Button>
