<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { fetchCourse, joinCourse } from './course.util.js';
	import { A, Avatar, Button, Card, Hr, ImagePlaceholder } from 'flowbite-svelte';
	import Container from '../../../components/Container.svelte';
	import FormButton from '../../../components/FormButton.svelte';
	import CreateModal from './CreateModal.svelte';

	const id = $page.params.id;
	/**
	 * @type {{ id: number; name: string; year: number; semester: string; description: string; teacher_id: number; teacher: string; in_course: boolean | number; } | null}
	 */
	let courseInfo = null;
	/**
	 * @type {{ id: number; name: string; description: string; owner: string; href: string | null; }[] | null}
	 */
	let groupsInfo = null;

	onMount(() => {
		(async () => {
			const data = await fetchCourse(id);
			setTimeout(() => {
				courseInfo = data['data']['course'];
				groupsInfo = data['data']['groups'];
				groupsInfo?.forEach((g, i) => {
					groupsInfo[i]['href'] = `/group/${g.id}`;
				});
			}, 300);
		})();
	});
</script>

<main
	class="
	mt-5 flex
	w-3/5 flex-col
	rounded-2xl
	bg-gray-100
	p-5
	dark:bg-gray-800
	max-lg:w-4/5
"
>
	<Container>
		{#if courseInfo === null}
			<ImagePlaceholder />
		{:else}
			<div id="course-info" class="flex justify-center">
				<Avatar size="xl" class="max-md:w-0 md:mr-3" />
				<div class="w-4/5 max-md:mx-auto">
					<p class="text-2xl">
						{courseInfo.year}-{courseInfo.semester}
						{courseInfo.name}
					</p>
					<div class="mt-3">
						<p class="text-lg">Teacher: {courseInfo.teacher}</p>
						<Hr />
						<p class="max-w-xl break-all">
							{courseInfo.description}
						</p>
					</div>
				</div>
			</div>
			{#if !courseInfo.in_course}
				<Button
					class="mx-auto"
					on:click={() => {
						joinCourse(id);
					}}>Join The Course</Button
				>
			{/if}
		{/if}
		<p class="mb-3 mt-3 border-b text-xl font-semibold">Groups</p>
		<div class="flex flex-wrap justify-center">
			{#if groupsInfo !== null}
				{#each groupsInfo as group}
					<Card size="xs" class="mx-1 my-1">
						<A href={group.href ? group.href : '#'}>{group.name}</A>
						<p>Leader: {group.owner}</p>
						<p class="overflow-hidden overflow-ellipsis">
							{group.description ? group.description : ''}
						</p>
					</Card>
				{/each}
			{/if}
		</div>
		<CreateModal />
	</Container>
</main>
