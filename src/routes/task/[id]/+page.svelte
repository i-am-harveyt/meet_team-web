<script>
	import Container from '../../../components/Container.svelte';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { fetchTask } from './fetchOne.util.js';
	import { A, Badge, Button, Hr, Timeline, TimelineItem } from 'flowbite-svelte';

	const taskId = $page.params.id;

	/**
	 * @type {{
	 id: number;
	 name: string;
	 description: string | null;
	 assignee: {
	 	id: number;
		name: string;
	 };
	 reviewer: {
	 	id: number;
		name: string;
	 };
	 create_at: string;
	 close_at: string | null;
	 status: string;
	 } | null}
	 */
	let taskInfo = null;
	/**
	 * @type {{
	 id: number;
	 title: string;
	 description: string | null;
	 reference_link: string | null;
	 username: string;
	 creator_id: number;
	 create_at: string;
	 }[] | null}
	 */
	let commits = null;

	onMount(() => {
		(async () => {
			const data = await fetchTask(taskId);
			setTimeout(() => {
				commits = data.commits;
				taskInfo = data.task;
				commits?.forEach((_, i, newArr) => {
					newArr[i].title = `Title from commit ${i}`;
				});
			}, 500);
		})();
	});
</script>

<section class="w-4/5">
	<Container>
		<div class="flex flex-col p-5">
			{#if taskInfo !== null}
				<p class="text-center text-2xl font-bold">{taskInfo.name}</p>
				<Hr />
				<div>
					<p class="text-lg font-bold">Description</p>
					<p class="text-wrap">
						{taskInfo.description}
					</p>
				</div>
				<div class="mt-3">
					<p>Status: <Badge>{taskInfo.status}</Badge></p>
					<p>
						Assignee: <A href={`/profile/${taskInfo.assignee.id}`}>{taskInfo.assignee.name}</A>
					</p>
					<p>
						Reviewer: <A href={`/profile/${taskInfo.reviewer.id}`}>{taskInfo.reviewer.name}</A>
					</p>
					<p>Created at: {taskInfo.create_at}</p>
				</div>
			{/if}
			<Hr />
			{#if commits !== null}
				<p class="mb-3 text-lg font-bold">Commit History</p>
				<Timeline class="mx-auto w-11/12">
					{#each commits as commit}
						<TimelineItem title={commit.title} date={commit.create_at}>
							<p>
								Commit by:
								<A href={`/profile/${commit.creator_id}`}>
									{commit.username}
								</A>
							</p>
							<p class="text-wrap">
								{commit.description}
							</p>
							{#if commit.reference_link !== null}
								<A href={commit.reference_link}>{commit.reference_link}</A>
							{/if}
						</TimelineItem>
					{/each}
				</Timeline>
			{/if}
		</div>
		<Button class="w-max">Mark As Done!</Button>
	</Container>
</section>
