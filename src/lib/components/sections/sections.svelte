<script lang="ts">
	let { sections } = $props()
	import * as Dialog from '$lib/components/ui/dialog'
	import { enhance } from '$app/forms'
	import { selectedProject } from '$lib/stores/projectStore'
</script>

<section>
	{#if $selectedProject}
		<h3 class="text-md mb-2">{$selectedProject.name} Sections</h3>
	{/if}
	<Dialog.Root>
		<Dialog.Trigger>Add Section</Dialog.Trigger>
		<Dialog.Content>
			<Dialog.Header>
				<Dialog.Title>Enter a new section</Dialog.Title>
				<Dialog.Description>
					{#if $selectedProject}
						<form method="POST" action="?/addSection" use:enhance>
							<input type="hidden" name="projectId" value={$selectedProject.id} />
							<input type="text" name="name" placeholder="Section Name" required />
							<button type="submit">Add Section</button>
						</form>
					{:else}
						<p class="text-muted-foreground">Please select a project first</p>
					{/if}
				</Dialog.Description>
			</Dialog.Header>
		</Dialog.Content>
	</Dialog.Root>
	<ul>
		{#each sections as section}
			<li>{section.name}</li>
		{/each}
	</ul>
</section>
