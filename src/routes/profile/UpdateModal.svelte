<script>
	import { Button, Label, Modal, Textarea } from 'flowbite-svelte';
	import FormButton from '../../components/FormButton.svelte';
	import { marked } from 'marked';
	import { submitUpdate } from './profile.util.js';

	let modalOpen = false;
	export let value = '';
</script>

<div>
	<Button on:click={() => (modalOpen = !modalOpen)}>Edit</Button>
	<Modal size="lg" title="Update Information" bind:open={modalOpen}>
		<div class="flex flex-col items-center">
			<Label for="description-edit" class="mb-2 text-lg">Description</Label>
			<div class="flex w-4/5 max-md:flex-col md:space-x-2">
				<div class="md:w-1/2">
					<Textarea rows="30" bind:value />
				</div>
				<div
					class="
					prose prose-headings:m-0 dark:prose-invert
					break-all rounded-xl
					border border-gray-600 p-2
					md:w-1/2
					"
				>
					{@html marked.parse(value ? value : '')}
				</div>
			</div>
			<FormButton
				onClickFunction={() => {
					submitUpdate(value);
				}}>Update</FormButton
			>
		</div>
	</Modal>
</div>
