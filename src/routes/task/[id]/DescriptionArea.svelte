<script>
	import { Hr, A, Badge } from 'flowbite-svelte';
	/**
	 * @typedef {Object} User
	 * @property {number} id
	 * @property {string} name
	 */

	/**
	 * @typedef {Object} Props
	 * @property {string} name
	 * @property {string | null} description
	 * @property {string} status
	 * @property {User} assignee
	 * @property {User} reviewer
	 * @property {string} create_at
	 */

	/** @type {Props} */
	export let props;

	/**
	 * The name of the task.
	 * @type {string}
	 */
	export let name = props.name;

	/**
	 * The description of the task.
	 * @type {string | null}
	 */
	export let description = props.description;

	/**
	 * The status of the task.
	 * @type {string}
	 */
	export let status = props.status;

	/**
	 * The assignee of the task.
	 * @type {User}
	 */
	export let assignee = props.assignee;

	/**
	 * The reviewer of the task.
	 * @type {User}
	 */
	export let reviewer = props.reviewer;

	/**
	 * The creation date of the task.
	 * @type {string}
	 */
	export let create_at = props.create_at;
</script>

<p class="text-center text-2xl font-bold">{name}</p>
<Hr />
<div class="flex-wrap lg:flex">
	<div class="lg:w-1/2">
		<p class="text-lg font-bold">Description</p>
		<p class="text-wrap">
			{description}
		</p>
	</div>
	<div class="max-lg:mt-3 lg:mx-3">
		<p>
			Status: <Badge color={status === 'Todo' ? 'primary' : status === 'Doing' ? 'red' : 'green'}
				>{status}</Badge
			>
		</p>
		<p>
			Assignee: <A href={`/profile/${assignee.id}`}>{assignee.name}</A>
		</p>
		<p>
			Reviewer: <A href={`/profile/${reviewer.id}`}>{reviewer.name}</A>
		</p>
		<p>Created at: {create_at}</p>
	</div>
</div>
