<script>
	import A from 'flowbite-svelte/A.svelte';
	import Avatar from 'flowbite-svelte/Avatar.svelte';
	import Card from 'flowbite-svelte/Card.svelte';
	import ImagePlaceholder from 'flowbite-svelte/ImagePlaceholder.svelte';
	import Input from 'flowbite-svelte/Input.svelte';
	import Button from 'flowbite-svelte/Button.svelte';
	import SearchOutline from 'flowbite-svelte-icons/SearchOutline.svelte';
	import { onMount } from 'svelte';
	import { fetchCourses } from './courses.util.js';
	import Container from '../../components/Container.svelte';

	let searchTerm = '';

	async function searchCourses() {
		const data = await fetchCourses(searchTerm);
		courses = data['courses'];
		meta = data['meta'];
	}

	/**
	 * @type {any[] | null}
	 */
	$: courses = null;
	$: meta = null;
	onMount(() => {
		if (window.localStorage.getItem('authorization') === null) window.location.replace('/login');
		(async () => {
			const data = await fetchCourses();
			console.log(data);
			setTimeout(() => {
				courses = data['courses'];
				meta = data['meta'];
			}, 600);
		})();
	});
</script>

<section class="jsutify-center flex w-3/5 flex-col max-lg:w-4/5">
	<Container>
		<div class="flex items-center space-x-2">
			<SearchOutline class="h-6 w-6 text-gray-500 dark:text-gray-400" />
			<Input
				bind:value={searchTerm}
				on:keyup={searchCourses}
				id="search"
				placeholder="Search"
				size="lg"
				class="pl-6"
			/>
			<Button size="sm" type="submit">Search</Button>
		</div>
		<div class="mt-5 flex justify-center space-y-3">
			{#if courses !== null && courses !== undefined}
				{#each courses as course}
					<Card padding="md" size="lg" horizontal class="items-center justify-between p-0">
						<Avatar rounded size="lg" />
						<A href={'/course/' + `${course.id}`} class="mx-auto text-center text-xl"
							>{course.year}-{course.semester} {course.name}</A
						>
					</Card>
				{/each}
			{:else}
				<ImagePlaceholder />
			{/if}
		</div>
	</Container>
</section>
