<script lang="ts">
	import { onMount } from "svelte";
    import type { ModalConfig, TokenCache } from "$lib/ts/types";
    import { createClient } from '@supabase/supabase-js'
    import type { SupabaseClient } from '@supabase/supabase-js'

    /** @type {import('./$types').PageData} */
	export let data: any;
	let url = data.url;
	let key = data.key;

    let modal: ModalConfig | null = null;
    let state = "";
    let email = "";
    let token = "";

    //get state from url query
    onMount(() => {
        const urlParams = new URLSearchParams(window.location.search);
        let query = urlParams.get('state');
        if (!query) {
            state = ""
        } else {
            state = query;
        }
        //check if logged in
        let tokenStore = window.localStorage.getItem("token");
        if (tokenStore) {
            let cached: TokenCache = JSON.parse(tokenStore);
            if (cached.expiration > Date.now()) {
                //token is still valid
                window.location.href = "/";
            } else {
                //token is expired
                window.localStorage.removeItem("token");
            }
        }
    })

    const signup = async () => {
        //signup logic
        if (!email) return;
        let supabase: SupabaseClient<any, "public", any>;
        try {
            supabase = createClient(url, key)
        } catch (e) {
            console.log(e);
            modal = {
                title: "Error",
                message: "Invalid URL or Key",
                link: "/auth",
            }
            return;
        }
        const { data: _, error } = await supabase.from('clients').insert([
            { email: email },
        ])
        if (error) {
            console.log(error);
            modal = {
                title: "Error",
                message: "Error signing up",
                link: "/auth",
            }
            return;
        }
        //get token
        const { data: tokenData, error: tokenError } = await supabase.from('clients').select('token').eq('email', email)
        if (tokenError) {
            console.log(tokenError);
            modal = {
                title: "Error",
                message: "Error signing up",
                link: "/auth",
            }
            return;
        }
        if (tokenData.length == 0) {
            console.log("No token found");
            modal = {
                title: "Error",
                message: "Error signing up",
                link: "/auth",
            }
            return;
        }
        const ttl = 604800;
        const tokenStore = {
            token: tokenData[0].token,
            ttl: ttl,
        }
        window.localStorage.setItem("token", JSON.stringify(tokenStore));
        modal = {
            title: "Success",
            message: "Remember your token for login: " + tokenData[0].token,
            link: "/",
        }
    }

    const login = async () => {
        //login logic
        if (!email || !token) return;
        let supabase: SupabaseClient<any, "public", any>;
        try {
            supabase = createClient(url, key)
        } catch (e) {
            console.log(e);
            modal = {
                title: "Error",
                message: "Invalid URL or Key",
                link: "/auth",
            }
            return;
        }
        const { data: tokenData, error: tokenError } = await supabase.from('clients').select('token').eq('email', email)
        if (tokenError) {
            console.log(tokenError);
            modal = {
                title: "Error",
                message: "Error logging in",
                link: "/auth",
            }
            return;
        }
        if (tokenData.length == 0) {
            console.log("No token found");
            modal = {
                title: "Error",
                message: "Error logging in",
                link: "/auth",
            }
            return;
        }
        if (tokenData[0].token != token) {
            console.log("Token mismatch");
            modal = {
                title: "Error",
                message: "Error logging in",
                link: "/auth",
            }
            return;
        }
        //ttl is 7 days in ms
        const ttl = 604800;
        const tokenStore: TokenCache = {
            token: tokenData[0].token,
            expiration: Date.now() + ttl,
        }
        window.localStorage.setItem("token", JSON.stringify(tokenStore));
        modal = {
            title: "Success",
            message: "Logged in",
            link: "/",
        }
    }
</script>

{#if modal}
    <div class="z-10 h-screen w-screen absolute top-0 left-0 grid place-content-center bg-black/50">
        <div class="text-center w-[50vh] p-2 bg-quaternary border rounded border-ok">
            <h1>{modal.title}</h1>
            <p>{modal.message}</p>
            <button on:click={ () => window.location.href = modal ? modal.link : "/" }>Continue</button>
        </div>
    </div>
{/if}

<div class="main">
    {#if state == "signup"}
        <form on:submit={signup} class="grid place-content-center w-[50vh] h-[50vh]">
            <h1>Sign Up</h1>
            <input type="email" bind:value={email} name="email" id="email" placeholder="Please enter an email">
            <input type="submit" value="Sign Up">
            <div>
                Already have an account?
                <button on:click={ () => window.location.href = "/auth?state=login" }>
                    Login
                </button>
            </div>
        </form>
    {:else if state == "login"}
        <form on:submit={login} class="grid place-content-center w-[50vh] h-[50vh]">
            <h1>Login</h1>
            <input type="email" bind:value={email} name="email" id="email" placeholder="Please enter an email">
            <input type="password" bind:value={token} name="token" id="token" placeholder="Please enter your token">
            <input type="submit" value="Login">
            <div>
                Don't have an account?
                <button on:click={ () => window.location.href = "/auth?state=signup" }>
                    Signup
                </button>
            </div>
        </form>
    {:else}
        <div class="grid place-content-center w-[50vh] h-[50vh]">
            <button on:click={ () => window.location.href = "/auth?state=login" }>
                Login
            </button>
            <button on:click={ () => window.location.href = "/auth?state=signup" }>
                Signup
            </button>
        </div>
    {/if}
</div>