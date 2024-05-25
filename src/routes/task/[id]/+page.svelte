<script>
	import Container from '../../../components/Container.svelte';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { fetchTask, submitCommit, submitDone } from './task.util.js';
	import {
		A,
		Avatar,
		Badge,
		Button,
		Hr,
		Input,
		Label,
		Modal,
		Textarea,
		Timeline,
		TimelineItem,
		Toggle
	} from 'flowbite-svelte';
	import { ExclamationCircleOutline } from 'flowbite-svelte-icons';

	const taskId = $page.params.id;

	/**
	 * @type {{ id: number; name: string; description: string | null; assignee: { id: number; name: string; }; reviewer: { id: number; name: string; }; create_at: string; close_at: string | null; status: string; } | null}
	 */
	let taskInfo = null;
	/**
	 * @type {{ id: number; title: string; description: string | null; reference_link: string | null; username: string; creator_id: number; create_at: string; }[] | null}
	 */
	let commits = null;
	let doneModalOpen = false;

	let isMessage = true;
	$: inputTitle = '';
	$: inputRefLink = '';
	$: inputDesc = '';

	onMount(() => {
		(async () => {
			const data = await fetchTask(taskId);
			setTimeout(() => {
				commits = data.commits;
				taskInfo = data.task;
			}, 500);
		})();
	});
</script>

<main class="w-3/5 max-lg:w-4/5">
	<Container>
		<div class="flex flex-col">
			{#if taskInfo}
				<p class="text-center text-2xl font-bold">{taskInfo.name}</p>
				<Hr />
				<div class="flex-wrap lg:flex">
					<div class="lg:w-1/2">
						<p class="text-lg font-bold">Description</p>
						<p class="text-wrap">
							{taskInfo.description}
						</p>
					</div>
					<div class="max-lg:mt-3 lg:mx-3">
						<p>
							Status: <Badge
								color={taskInfo.status === 'Todo'
									? 'orange'
									: taskInfo.status === 'Doing'
										? 'red'
										: 'green'}>{taskInfo.status}</Badge
							>
						</p>
						<p>
							Assignee: <A href={`/profile/${taskInfo.assignee.id}`}>{taskInfo.assignee.name}</A>
						</p>
						<p>
							Reviewer: <A href={`/profile/${taskInfo.reviewer.id}`}>{taskInfo.reviewer.name}</A>
						</p>
						<p>Created at: {taskInfo.create_at}</p>
					</div>
				</div>
			{/if}
			<Hr />
			{#if commits}
				<p class="mb-3 text-lg font-bold">Commit History</p>
				<Timeline class="mx-auto w-11/12 border-l-gray-600 text-gray-400">
					{#each commits as commit}
						<TimelineItem
							title={commit.title}
							date={commit.create_at}
							classTime="text-gray-600 dark:text-gray-400"
							classDiv="dark:text-gray-50 bg-gray-600 dark:bg-gray-400"
						>
							<p>
								Commit by:
								<A href={`/profile/${commit.creator_id}`}>
									{commit.username}
								</A>
							</p>
							<p class="text-wrap text-gray-800 dark:text-gray-300">
								{commit.description}
							</p>
							{#if commit.reference_link !== null}
								<A href={commit.reference_link}>{commit.reference_link}</A>
							{/if}
						</TimelineItem>
					{/each}
					<TimelineItem
						date={'2024-05-18 17:58'}
						classTime="text-gray-600 dark:text-gray-300"
						classDiv="dark:text-gray-300 bg-gray-600 dark:bg-gray-400"
					>
						<div
							class="
							flex flex-col space-y-3
							rounded-xl border border-gray-500
							bg-gray-700 p-3
							dark:text-gray-300"
						>
							<div class="flex items-center space-x-3">
								<Avatar />
								<p class="text-lg font-semibold">Harvey Tung</p>
							</div>
							<p class="self-center">
								Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore
								culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim
								cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip
								amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut
								officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia
								dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id
								nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit
								commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat
								ullamco ut ea consectetur et est culpa et culpa duis.
							</p>
						</div>
					</TimelineItem>
				</Timeline>
			{/if}
		</div>
		<Hr />
		{#if taskInfo && taskInfo.status !== 'Done'}
			<section
				id="comment-section"
				class="
				rounded-xl
				border
				border-gray-500
				bg-gray-300
				p-3
				shadow
				dark:bg-gray-700
				"
			>
				<div class="flex gap-2">
					<p class="text-lg font-semibold">
						Leave a {isMessage ? 'Message' : 'Commit'}!
					</p>
					<Toggle id="isMessage" bind:checked={isMessage} />
				</div>
				<form class="flex flex-col gap-2">
					{#if !isMessage}
						<div>
							<Label class="text-lg font-semibold">Title</Label>
							<Input bind:value={inputTitle} placeholder="Title" />
						</div>
						<div>
							<Label class="text-lg font-semibold">Reference Link(Optional)</Label>
							<Input bind:value={inputRefLink} placeholder="Ref Link" />
						</div>
					{/if}
					<div>
						<Label class="text-lg font-semibold">
							{isMessage ? 'Message' : 'Description'}
						</Label>
						<Textarea bind:value={inputDesc} placeholder="Leave your content here" />
					</div>
					<Button
						class="mt-2 w-fit"
						on:click={() =>
							submitCommit(parseInt(taskId), isMessage, inputTitle, inputRefLink, inputDesc)}
						>Submit!</Button
					>
				</form>
			</section>
			<Hr />
			<Button color="purple" on:click={() => (doneModalOpen = !doneModalOpen)}>Mark As Done!</Button
			>
			<Modal bind:open={doneModalOpen} class="text-center" outsideclose>
				<ExclamationCircleOutline class="mx-auto mb-4 h-12 w-12 text-gray-400 dark:text-gray-200" />
				<h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
					Are you sure you want to set this task as done?<br />
					This action CANNOT be reverted!
				</h3>
				<Button color="red" class="me-2" on:click={() => submitDone(parseInt(taskId))}
					>Yes, I'm sure</Button
				>
				<Button color="alternative" on:click={() => (doneModalOpen = !doneModalOpen)}
					>No, cancel</Button
				>
			</Modal>
		{/if}
	</Container>
</main>
