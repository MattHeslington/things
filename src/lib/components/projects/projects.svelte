<script lang="ts">
	let { projects } = $props()
	import * as Dialog from '$lib/components/ui/dialog'
	import { enhance } from '$app/forms'
	import { selectedProject } from '$lib/stores/projectStore'

	function selectProject(project: typeof projects[0]) {
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
			<li>
				<button 
					class="w-full text-left p-2 rounded hover:bg-gray-100 transition-colors {$selectedProject?.id === project.id ? 'bg-blue-100 border-blue-500 border' : 'border border-transparent'}"
					onclick={() => selectProject(project)}
				>
					{project.icon} {project.name}
				</button>
			</li>
		{/each}
	</ul>
</section>
