<script>
	import Container from '../../../components/Container.svelte';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { fetchTask, fetchMessages, submitCommit, submitDone } from './task.util.js';
	import {
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
	import MessageCard from '../../../components/MessageCard.svelte';
	import DescriptionArea from './DescriptionArea.svelte';
	import CommitBlock from './CommitBlock.svelte';

	const taskId = $page.params.id;

	/**
	 * @type {{ id: number; name: string; description: string | null; assignee: { id: number; name: string; }; reviewer: { id: number; name: string; }; create_at: string; close_at: string | null; status: string; } | null}
	 */
	let taskInfo = null;
	/**
	 * @type {{ id: number; title: string; description: string | null; reference_link: string | null; username: string; creator_id: number; create_at: string; }[] | null}
	 */
	let thread = [];
	let doneModalOpen = false;

	let isMessage = true;
	$: inputTitle = '';
	$: inputRefLink = '';
	$: inputDesc = '';

	onMount(() => {
		(async () => {
			const fetchedTasks = await fetchTask(taskId);
			const fetchedMessages = await fetchMessages(parseInt(taskId));
			const commits = fetchedTasks.commits;
			taskInfo = fetchedTasks.task;
			const messages = fetchedMessages;

			thread = commits
				?.concat(messages)
				.map((item) => ({
					...item,
					isMessage: item.reference_link === undefined ? true : false
				}))
				.sort((a, b) => new Date(a.create_at) - new Date(b.create_at)); // from old to new
		})();
	});
</script>

<main class="w-3/5 max-lg:w-4/5">
	<Container>
		<div class="flex flex-col">
			{#if taskInfo}
				<DescriptionArea
					name={taskInfo.name}
					description={taskInfo.description}
					status={taskInfo.status}
					assignee={taskInfo.assignee}
					reviewer={taskInfo.reviewer}
					create_at={taskInfo.create_at}
				/>
			{/if}
			<Hr />
			{#if thread}
				<p class="mb-3 text-lg font-bold">Commit History</p>
				<Timeline class="mx-auto w-11/12 border-l-gray-600 text-gray-400">
					{#each thread as item}
						{#if !item.isMessage}
							<CommitBlock {...item} />
						{:else}
							<TimelineItem
								date={item.create_at}
								classTime="text-gray-600 dark:text-gray-400"
								classDiv="dark:text-gray-50 bg-gray-600 dark:bg-gray-400"
							>
								<MessageCard name={item.username}>{item.description}</MessageCard>
							</TimelineItem>
						{/if}
					{/each}
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
				text-gray-600
				dark:text-gray-300
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
							<Label class="text-lg font-semibold text-gray-600 dark:text-gray-300">Title</Label>
							<Input bind:value={inputTitle} placeholder="Title" />
						</div>
						<div>
							<Label class="text-lg font-semibold text-gray-600 dark:text-gray-300">Reference Link(Optional)</Label>
							<Input bind:value={inputRefLink} placeholder="Ref Link" />
						</div>
					{/if}
					<div>
						<Label class="text-lg font-semibold text-gray-600 dark:text-gray-300">
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
