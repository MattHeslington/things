<script lang="ts">
	let { projects } = $props()
	import * as Dialog from '$lib/components/ui/dialog'
	import Crown from '@lucide/svelte/icons/crown'
	import { Button } from '$lib/components/ui/button'
	import { enhance } from '$app/forms'
	import { selectedProject } from '$lib/stores/projectStore'

	function selectProject(project: (typeof projects)[0]) {
		selectedProject.set(project)
	}
</script>

<section>
	<Dialog.Root>
		<Dialog.Trigger>New Project</Dialog.Trigger>
		<Dialog.Content>
			<Dialog.Header>
				<Dialog.Title>Enter a new project</Dialog.Title>
				<Dialog.Description>
					<form method="POST" action="?/addProject" use:enhance>
						<input type="text" name="name" placeholder="Project Name" required />
						<button type="submit">Add Project</button>
					</form>
				</Dialog.Description>
			</Dialog.Header>
		</Dialog.Content>
	</Dialog.Root>
	<ul class="space-y-2">
		{#each projects as project}
			{@render projectComponent(project)}
		{/each}
	</ul>
</section>

{#snippet projectComponent(project)}
	<li>
		<button
			onclick={() => selectProject(project)}
			class="hover:bg-accent flex h-10 w-full items-center rounded px-2 {$selectedProject?.id === project.id
				? 'bg-accent border'
				: 'border border-transparent'}">
			<Crown class="mr-2 inline h-4 w-4" />
			<span>{project.name}</span>
		</button>
	</li>
{/snippet}
