<script lang="ts">
    //Low security, low effort
    import Icobuttons from "$lib/components/icobuttons.svelte";
	import { onMount } from "svelte";
    const checkLogin = () => {
        const token = localStorage.getItem("token");
        if (token === null) {
            window.location.href = "/auth";
        }
    }

    onMount(() => {
        checkLogin();
    })
</script>

<!-- Messanger -->
<div class="fixed bottom-1 right-1 w-[30vh] h-[40vh] bg-tertiary/50 rounded-lg border border-solid border-primary grid grid-rows-[repeat(11,minmax(0,1fr))] grid-flow-row gap-2">
    <h2 class="row-span-2">Title</h2>
    <ul class="bg-black/20 mx-2 p-2 rounded row-[3_/_span_9]">
        <li class="flex flex-col">
            <div class="flex flex-row">
                <p class="text-[1.25rem] bg-background px-2 rounded">hi</p>
            </div>
            <span class="text-xs text-quaternary text-left">User</span>
        </li>
        <li class="flex flex-col">
            <div class="flex flex-row-reverse">
                <p class="text-[1.25rem] bg-background px-2 rounded">hi</p>
            </div>
            <span class="text-xs text-quaternary text-right">User</span>
        </li>
    </ul>
    <form class="flex mx-2 gap-1 place-content-center w-full">
        <input type="text" class="text-[1rem] w-[22vh] h-[1.5rem]">
        <input type="submit" hidden>
        <Icobuttons classes="bg-transparent hover:bg-black/10 rounded-full" icon="send" color="var(--primary)" size="sm:w-6 sm:h-6 w-3 h-3" />
    </form>
</div>

<div class="main">
    <h1 class="text-[2rem]">
        Home
    </h1>
    <div class="w-[80vw] h-[80vh] grid sm:grid-cols-6 sm:grid-rows-[repeat(9,minmax(0,1fr))] grid-rows-[repeat(18,minmax(0,1fr))] grid-cols-3 gap-1">
        <div class="bg-quaternary/70 sm:row-span-3 row-span-6 sm:col-span-2 sm:text-[1rem] text-[1.25rem] border border-solid border-primary rounded-md text-center">
            <div class="flex gap-1 place-content-center">
                <h2>Lists</h2>
                <Icobuttons classes="bg-transparent hover:bg-black/10 rounded-full" icon="plus" color="var(--primary)" size="w-6 h-6" />
            </div>
            <ul class="list-disc mx-7 text-left">
                <!-- Renders top 3 lists -->
                <li class="flex gap-1 place-content-center">1 <Icobuttons classes="bg-transparent hover:bg-black/10 rounded-full" icon="minus" color="var(--primary)" size="w-3 h-3" /></li>
                <li class="flex gap-1 place-content-center">2 <Icobuttons classes="bg-transparent hover:bg-black/10 rounded-full" icon="minus" color="var(--primary)" size="w-3 h-3" /></li>
                <li class="flex gap-1 place-content-center">3 <Icobuttons classes="bg-transparent hover:bg-black/10 rounded-full" icon="minus" color="var(--primary)" size="w-3 h-3" /></li>
            </ul>
        </div>
        <div class="bg-quaternary/70 sm:row-span-3 row-span-6 sm:col-span-2 sm:text-[1rem] text-[1.25rem] border border-solid border-primary rounded-md text-center">
            <h2>
                Inbox
                <Icobuttons classes="bg-transparent hover:bg-black/10 rounded-full" icon="plus" color="var(--primary)" size="w-6 h-6" />
            </h2>
            <ul>
                <!-- Renders top 3 inbox items -->
                <li class="flex gap-1 place-content-center">1 <Icobuttons classes="bg-transparent hover:bg-black/10 rounded-full" icon="minus" color="var(--primary)" size="w-3 h-3"/></li>
                <li class="flex gap-1 place-content-center">2 <Icobuttons classes="bg-transparent hover:bg-black/10 rounded-full" icon="minus" color="var(--primary)" size="w-3 h-3"/></li>
                <li class="flex gap-1 place-content-center">3 <Icobuttons classes="bg-transparent hover:bg-black/10 rounded-full" icon="minus" color="var(--primary)" size="w-3 h-3"/></li>
            </ul>
        </div>
    </div>
</div>