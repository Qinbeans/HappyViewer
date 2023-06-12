<script lang="ts">
    export let color: string = "white";
    export let size: string = "w-6 h-6";
    export let onClick: () => void = () => { };
    export let disabled: boolean = false;
    export let classes: string = "";
    $: classes = `flex items-center justify-center rounded-full focus:outline-none ${classes}`;
    export let icon: string = "plus";
</script>

<button
    class="{classes}"
    on:click={onClick}
    disabled="{disabled}"
>
    {#if icon === "plus"}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="{color}" class="{size}">
            <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clip-rule="evenodd" />
        </svg>
    {:else if icon === "minus"}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="{color}" class="{size}">
            <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm3 10.5a.75.75 0 000-1.5H9a.75.75 0 000 1.5h6z" clip-rule="evenodd" />
        </svg>
    {:else if icon === "send"}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="{color}" class="{size}">
            <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
        </svg>
    {/if}
</button>