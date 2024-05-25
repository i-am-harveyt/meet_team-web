<script>
	import { Card, Modal, Rating } from 'flowbite-svelte';
	/**
	 * @type {{ course: string; content: string; total: number; rating: number; }}
	 */
	export let comment;

	let modalOpen = false;
</script>

<Card size="xs" on:click={() => (modalOpen = true)} class="hover:cursor-pointer">
	<p class="text-lg font-semibold">{comment.course}</p>
	<p class="overflow-hidden text-ellipsis text-nowrap">{comment.content}</p>
	<Rating total={comment.total} rating={comment.rating} />
</Card>
<Modal size="sm" bind:open={modalOpen} title="Comments" class="text-wrap" outsideclose>
	<p class="text-lg font-semibold">{comment.course}</p>
	<p>{comment.content}</p>
	<Rating total={comment.total} rating={comment.rating} />
</Modal>
