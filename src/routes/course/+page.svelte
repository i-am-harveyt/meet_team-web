<script>
	import { A, Avatar, Card, ImagePlaceholder } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import { fetchCourses } from './courses.util.js';
	import Container from '../../components/Container.svelte';

	/**
	 * @type {any[] | null}
	 */
	let courses = null;
	onMount(() => {
		if (window.localStorage.getItem('authorization') === null) window.location.replace('/login');
		(async () => {
			const coursesInfo = await fetchCourses();
			setTimeout(() => {
				courses = coursesInfo;
			}, 600);
		})();
	});
</script>

<section class="w-4/5">
	<Container>
		<div class="flex justify-center space-y-3">
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
