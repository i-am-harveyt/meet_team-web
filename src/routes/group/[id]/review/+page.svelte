<script>
	import { Button, Label, Range, Textarea, TabItem, Tabs } from 'flowbite-svelte';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import Container from '../../../../components/Container.svelte';
	import { fetchGroupMembersAndReviews, submitReviewUpdate } from './review.util.js';

	const groupId = $page.params.id;
	/** @type {{ id: number; name: string; account: string; description: string; }[] | null} */
	let members = null;

	/**
	 * @type {object}
	 * @param {number} user_id
	 * @param {string} content
	 * */
	let reviews = {};

	onMount(async () => {
		const data = await fetchGroupMembersAndReviews(groupId);
		members = data['data']['members'];
		members.forEach((member) => {
			reviews[member.id] = {
				content: '',
				rating: 0
			};
		});
		console.log;
		data['data']['reviews'].forEach((review) => {
			reviews[review.user_id] = {
				content: review.content || '',
				rating: review.rating || 0
			};
		});
	});
</script>

<main class="w-4/5">
	<Container>
		<section id="title">
			<p class="text-2xl">Group Review</p>
		</section>
		<section id="review-section">
			{#if members !== null}
				<Tabs>
					{#each members as member, idx}
						<TabItem open={idx === 0 ? true : false}>
							<span slot="title">{member.name}</span>
							<Label class="text-lg">Review:</Label>
							<Textarea rows="10" bind:value={reviews[member.id].content} />
							<Label class="text-lg">Rating: {reviews[member.id].rating}</Label>
							<Range bind:value={reviews[member.id].rating} min="1" max="5" step="0.5" />
						</TabItem>
					{/each}
				</Tabs>
			{/if}
		</section>
		<Button
			outline
			on:click={() => {
				submitReviewUpdate(groupId, reviews);
			}}>Submit</Button
		>
	</Container>
</main>
