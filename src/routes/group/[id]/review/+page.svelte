<script>
	import { Button, Label, Textarea, TabItem, Tabs } from 'flowbite-svelte';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import Container from '../../../../components/Container.svelte';
	import { fetchGroupMembersAndReviews, submitReviewUpdate } from './review.util.js';
	import Nav from '../Nav.svelte';

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
				rating: 1
			};
		});
		data['data']['reviews'].forEach((review) => {
			reviews[review.user_id] = {
				content: review.content || '',
				rating: review.rating || 0
			};
		});
	});
</script>

<main class="w-4/5">
	<Nav activeUrl={$page.url.pathname} />
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
							<Textarea
								rows="10"
								bind:value={reviews[member.id].content}
								unWrappedClass="text-lg"
							/>
							<div class="flex items-center justify-center space-x-3">
								<Button
									on:click={() =>
										reviews[member.id].rating > 1 ? (reviews[member.id].rating -= 0.5) : ''}
									>-0.5</Button
								>
								<Label class="w-32 text-center text-lg">Rating: {reviews[member.id].rating}</Label>
								<Button
									on:click={() =>
										reviews[member.id].rating < 5 ? (reviews[member.id].rating += 0.5) : ''}
									>+0.5</Button
								>
							</div>
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
