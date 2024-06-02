<script>
	import { A, TimelineItem } from 'flowbite-svelte';

	/**
	 * @property {number} id
	 */
	export const id = 0;

	/**
	 * @property {string} title
	 */
	export let title = '';
	/**
	 * @property {string} create_at
	 */
	export let create_at = '';
	/**
	 * @property {number} creator_id
	 */
	export let creator_id = 0;
	/**
	 * @property {string} username
	 */
	export let username = '';
	/**
	 * @property {string} description
	 */
	export let description = '';
	/**
	 * @property {string | null} reference_link
	 * @type {null}
	 */
	export let reference_link;
</script>

<TimelineItem
	{title}
	date={create_at}
	classTime="text-gray-600 dark:text-gray-400"
	classDiv="dark:text-gray-50 bg-gray-600 dark:bg-gray-400"
>
	<p>
		Commit by:
		<A href={`/profile/${creator_id}`}>
			{username}
		</A>
	</p>
	<p class="text-wrap text-gray-800 dark:text-gray-300">
		{description}
	</p>
	{#if reference_link !== null}
		<A href={reference_link}>{reference_link}</A>
	{/if}
</TimelineItem>
