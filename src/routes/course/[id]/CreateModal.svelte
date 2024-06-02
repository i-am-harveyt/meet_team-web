<script>
	import { Button, Input, Label, Modal, Textarea } from 'flowbite-svelte';
	import FormButton from '../../../components/FormButton.svelte';
	import { marked } from 'marked';
	import { page } from '$app/stores';
	import { createGroup } from './group.util';

	let modalOpen = false;
	let groupName = '';
	let groupDesc = '';
	const courseId = $page.params.id;

	function submitCreate() {
		createGroup(courseId, groupName, groupDesc);
	}
</script>

<div class="flex justify-center">
	<Button class="mt-2 mx-auto w-1/3" on:click={() => (modalOpen = !modalOpen)}>Create</Button>
	<Modal size="lg" title="Update Information" bind:open={modalOpen}>
		<div class="flex flex-col items-center">
			<div class="mb-2 flex w-4/5 items-center justify-around max-md:flex-col">
				<Label for="group name input" class="mr-2 text-lg">Group Name</Label>
				<Input
					placeholder="Group Name"
					id="group name input"
					bind:value={groupName}
					class="w-3/4"
				/>
			</div>
			<Label for="description edit" class="mb-2 text-lg">Description</Label>
			<div class="flex w-4/5 max-md:flex-col md:space-x-2">
				<div class="md:w-1/2">
					<Textarea id="description-edit" rows="30" bind:value={groupDesc} />
				</div>
				<div
					class="
					prose dark:prose-invert prose-headings:m-0
					break-all rounded-xl
					border border-gray-600 p-2
					md:w-1/2
					"
				>
					{@html marked.parse(groupDesc ? groupDesc : '')}
				</div>
			</div>
			<FormButton onClickFunction={submitCreate}>Submit!</FormButton>
		</div>
	</Modal>
</div>
