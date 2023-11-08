<script setup>
    //ref variables
    import { ref } from 'vue';
    const mail = ref(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(mail.value)
    }
</script>
<template>
    <footer class="bg-[black] py-10">
        <div class="w-[min(85%,1000px)] mx-auto rounded-[12px] bg-[#D5D5D5]  py-10 px-10">
        <form class="flex flex-col justify-center items-center gap-5" method="post" @submit="handleSubmit">
            <div class="Montserrat text-[24px] w-fit mx-auto text-center">NEVER MISS A DROP!</div>
            <div class="Roboto max-w-[600px] text-center">Join our community today and be the first to know about latest products, shops and offers available in our website</div>

            <div class="flex max-md:flex-col gap-5">
                <div class="md:w-[390px] rounded-[18px] bg-[#000] px-3 flex min-h-[40px] overflow-hidden shadow-[0_4px_10px_1px_rgba(12,12,12,0.37)] py-2 text-white">
                    <input v-model="mail" type="email" name="email" id="email" placeholder="Enter your email address" class="flex-1 text-[14px] text-[rgba(255, 255, 255, 0.54)] max-md:w-ful;l DarkerGrotesque bg-[transparent]" />
                </div>
                <button class="orderButton">Subscribe</button>
            </div>
        </form>
        </div>
    </footer>
</template>