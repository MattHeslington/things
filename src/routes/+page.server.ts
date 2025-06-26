import { projects, sections } from '$lib/server/db/schema'
// import { redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types';
import { desc } from 'drizzle-orm'

// export const load = (async ({ locals }) => {
//     const allProjects = await locals.db.select().from(projects).orderBy(projects.id);
//     return {
//         projects: allProjects
//     }
// }) satisfies PageServerLoad;

export const actions: Actions = {
    addProject: async ({ locals, request }) => {
        const formData = await request.formData();
        const name = formData.get('name');

        if (typeof name !== 'string') {
            return { success: false, error: 'Invalid project name' };
        }

        await locals.db.insert(projects).values({ name }).execute();
        return { success: true };
    },
    addSection: async ({ locals, request }) => {
        const formData = await request.formData();
        const name = formData.get('name');
        const projectId = formData.get('projectId');

        if (typeof name !== 'string') {
            return { success: false, error: 'Invalid section name' };
        }

        if (typeof projectId !== 'string' || !projectId) {
            return { success: false, error: 'Project ID is required' };
        }

        const projectIdNum = parseInt(projectId, 10);
        if (isNaN(projectIdNum)) {
            return { success: false, error: 'Invalid project ID' };
        }

        await locals.db.insert(sections).values({ name, projectId: projectIdNum }).execute();
        return { success: true };
    }
}