<script>
	import { A, Badge, Button, Card, Hr, Skeleton } from 'flowbite-svelte';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { fetchGroupInfo } from './group.util.js';
	import Container from '../../../components/Container.svelte';

	const groupId = $page.params.id;
	/**
	 * @type {{
	 * id: number;
	 * name: string;
	 * course: string;
	 * owner: string;
	 * ownerId: number;
	 * description: string | null;
	 * } | null}
	 */
	let groupInfo = null;

	/**
	 * @type {{
	 * id: number;
	 * name: string;
	 * account: string;
	 * description: string;
	 * href: string;
	 * }[] | null}
	 */
	let members = null;
	let userInGroup = false;

	onMount(() => {
		(async () => {
			const data = await fetchGroupInfo(groupId);
			setTimeout(() => {
				groupInfo = data['data']['group'];
				members = data['data']['members'];
				userInGroup = data['data']['inGroup'];
				members?.forEach((m, i, newArr) => {
					newArr[i]['href'] = `/profile/${m.id}`;
				});
			}, 800);
		})();
	});
</script>

<section class="w-4/5">
	<Container>
		{#if groupInfo === null}
			<Skeleton />
		{:else}
			<p class="text-2xl">{groupInfo.name}</p>
			<div id="group-info-container" class="lg:flex">
				<div class="max-lg:mb-3 lg:w-1/2">
					<p class="mb-2 text-xl">Group Information</p>
					<p class="text-lg">Course: {groupInfo.course}</p>
					<p class="text-lg">Leader: {groupInfo.owner}</p>
					<p class="text-lg">{groupInfo.description === null ? '' : groupInfo.description}</p>
				</div>
				<div
					class="
					flex
					items-center
					max-lg:justify-center
					lg:w-1/2
					lg:justify-end
					"
				>
					{#if !userInGroup}
						<Button size="lg" class="max-lg:w-2/3">Join!</Button>
					{/if}
				</div>
			</div>
		{/if}
		<Hr />
		<div id="members-container">
			<p class="mb-2 text-xl">Group Members</p>
			{#if members === null}
				<Skeleton />
			{:else}
				<div class="flex flex-wrap justify-center">
					{#each members as member}
						<Card size="xs" class="mx-1 my-1">
							<span class="flex items-center justify-between">
								<A href={member.href}>{member.name}</A>
								{#if member.id === groupInfo?.ownerId}
									<Badge>Leader</Badge>
								{/if}
							</span>
							<p>{member.account}</p>
							<p class="overflow-hidden overflow-ellipsis">
								{member.description === null ? '' : member.description}
							</p>
						</Card>
					{/each}
				</div>
			{/if}
		</div>
	</Container>
</section>