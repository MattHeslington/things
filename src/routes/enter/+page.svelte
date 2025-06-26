<script lang="ts">
	import type { PageData } from './$types'
	let { data }: { data: PageData } = $props()

	import { authClient } from '$lib/auth-client'

	async function loginWithGoogle() {
		await authClient.signIn.social({
			provider: 'google',
			callbackURL: '/',
			errorCallbackURL: '/',
			newUserCallbackURL: '/'
		})
	}
</script>

<button onclick={loginWithGoogle}> Login with Google </button>
<a href="/">home</a>
