<script>
	import { A, Badge, Button, Card, Hr, Skeleton } from 'flowbite-svelte';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { fetchGroupInfo, joinGroup } from './group.util.js';
	import Container from '../../../components/Container.svelte';
	import { marked } from 'marked';
	import Nav from './Nav.svelte';
	import DOMPurify from 'dompurify';

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

	function clickJoin() {
		const groupID = $page.params.id;
		(async () => {
			const data = await joinGroup(groupID);
			if (data.data.message === 'Ok') {
				alert('Join Succeed');
				window.location.reload();
			} else alert('Join Failed!');
		})();
	}

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

<main class="w-3/5 max-lg:w-4/5">
	<Nav {userInGroup} activeUrl={$page.url.pathname} />
	<Container>
		{#if groupInfo === null}
			<Skeleton />
		{:else}
			<section id="group-info container">
				<div id="group-info-metadata">
					<div class="max-lg:mb-3">
						<p class="text-2xl">{groupInfo.name}</p>
						<Hr />
						<p class="mb-2 text-xl">Group Information</p>
						<p class="text-lg">Course: {groupInfo.course}</p>
						<p class="text-lg">Leader: {groupInfo.owner}</p>
						<Hr />
						<div class="prose dark:prose-invert prose-headings:my-1">
							{@html DOMPurify.sanitize(
								marked.parse(
									groupInfo.description
										? marked(groupInfo.description ? groupInfo.description : '')
										: 'None'
								)
							)}
						</div>
					</div>
					<div class="flex items-center max-lg:justify-center lg:w-1/2 lg:justify-end">
						{#if !userInGroup}
							<Button size="lg" class="max-lg:w-2/3" on:click={clickJoin}>Join!</Button>
						{/if}
					</div>
				</div>
			</section>
		{/if}
		<Hr />
		<div id="members-container">
			<p class="mb-2 text-xl">Group Members</p>
			{#if members === null}
				<Skeleton />
			{:else}
				<div class="flex max-h-96 flex-wrap justify-center overflow-y-scroll">
					{#each members as member}
						<Card size="xs" class="mx-1 my-1">
							<span class="flex items-center justify-between">
								<A href={member.href}>{member.name}</A>
								{#if member.id === groupInfo?.ownerId}
									<Badge>Leader</Badge>
								{/if}
							</span>
							<p class="max-h-12 overflow-hidden text-ellipsis text-wrap">
								{member.description === null ? '' : member.description}
							</p>
						</Card>
					{/each}
				</div>
			{/if}
		</div>
	</Container>
</main>
