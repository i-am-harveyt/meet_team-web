<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { fetchCourse } from './course.util.js';
	import { A, Avatar, Card, Hr, ImagePlaceholder } from 'flowbite-svelte';
	import Container from '../../../components/Container.svelte';

	const id = $page.params.id;
	/**
	 * @type {{
		 id: number;
		 name: string;
		 year: number;
		 semester: string;
		 description: string;
		 teacher_id: number;
		 teacher: string;
		 } | null}
	 */
	let courseInfo = null;
	/**
	 * @type {{
		 id: number;
		 name: string;
		 description: string;
		 owner: string;
		 href: string | null;
		 }[] | null}
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

<section class="w-4/5">
	<Container>
		{#if courseInfo === null}
			<ImagePlaceholder />
		{:else}
			<div id="course-info" class="flex justify-center p-5">
				<Avatar size="xl" class="max-md:w-0 md:mr-3" />
				<div class="max-md:mx-auto">
					<p class="text-2xl">
						{courseInfo.year}-{courseInfo.semester}
						{courseInfo.name}
					</p>
					<div class="mt-3">
						<p>Teacher: {courseInfo.teacher}</p>
						<Hr />
						<p class="max-w-xl break-all">
							{courseInfo.description}
						</p>
					</div>
				</div>
			</div>
		{/if}
		<p class="p-5 text-xl">Groups</p>
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
	</Container>
</section>
