<template>
    <div class="container py-4">
        <h1 class="text-center fw-bold display-5 mb-4">Quran Portal</h1>
        <p class="text-center mb-4 lead">
            Islamic Connect provides seamless access to the Qur’an, enabling Muslims to read, listen, and reflect on its
            divine message. Our platform is dedicated to helping individuals connect with the words of Allah.
        </p>
        <div class="row g-4 ">
            <div class="col-md-6 col-lg-4">
                <div class="card custom-card shadow-sm rounded-4 overflow-hidden" style="border: 1px solid grey;">
                    <img src="/images/qc.png" alt="Mosque Locator" class="w-100 pt-4" style="object-fit: contain;" />
                    <div class="p-3">
                        <h5 class="mb-2 fw-bold display-6 text-dark text-center">Quran Explorer</h5>
                        <p class="card-text text-muted text-wrap text-center"
                            style="overflow: hidden; text-overflow: ellipsis; max-height: 4.5em;">
                            Explore the beauty and guidance of the Quran at your fingertips — perfect for seekers,
                            travelers, and newcomers alike.
                        </p>

                        <button class="form-control" onclick="window.location.href='/quran'"
                            style="background: #00bfa6; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white;height: 38px;padding: 0.375rem 0.75rem;"
                            type="submit">
                            <span class="text-center w-100"><b>Explore Quran</b></span>
                        </button>
                    </div>
                </div>
            </div>

            <div class="col-md-6 col-lg-4">
                <div class="card custom-card rounded-4 overflow-hidden" style="border: 1px solid grey; ">
                    <span
                        class="badge rounded-pill bg-success text-white position-absolute top-0 start-0 m-2">New</span>
                    <img src="/images/qe.png" alt="Islamic Shops" class="w-100 pt-4" style="object-fit: contain;" />
                    <div class="p-3">
                        <h5 class="mb-2 fw-bold display-6 text-dark text-center">Quran Companion</h5>
                        <p class="card-text text-muted text-wrap text-center"
                            style="overflow: hidden; text-overflow: ellipsis; max-height: 4.5em;">Explore the beauty and
                            guidance of the Quran at your fingertips. Whether you're deepening your faith or discovering
                            its wisdom for the first time.</p>
                        <button class="form-control" onclick="window.location.href='/surat'"
                            style="background: #00bfa6; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white;height: 38px;padding: 0.375rem 0.75rem;"
                            type="submit">
                            <span class="text-center w-100"><b>Search Recitations</b></span>
                        </button>
                    </div>
                </div>
            </div>

            <div class="col-md-6 col-lg-4">
                <div class="card custom-card rounded-4 overflow-hidden" style="border: 1px solid grey; ">
                    <span
                        class="badge rounded-pill bg-success text-white position-absolute top-0 start-0 m-2">New</span>
                    <img src="/images/history.png" alt="Islamic Shops" class="w-100 pt-4" style="object-fit: contain;" />
                    <div class="p-3">
                        <h5 class="mb-2 fw-bold display-6 text-dark text-center">Quran History</h5>
                        <p class="card-text text-muted text-wrap text-center"
                            style="overflow: hidden; text-overflow: ellipsis; max-height: 4.5em;">Explore the rich history of the Quran from its divine revelation to its meticulous preservation right at your fingertips.</p>
                        <button class="form-control" onclick="window.location.href='/history'"
                            style="background: #00bfa6; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white;height: 38px;padding: 0.375rem 0.75rem;"
                            type="submit">
                            <span class="text-center w-100"><b>Discover History</b></span>
                        </button>
                    </div>
                </div>
            </div>

        </div>
    </div>

</template>

<script>

export default {

    data() {
        return {

        }
    },

}
</script>
<style scoped>
.card.custom-card .card-text {
    max-height: 4.5em;
    text-overflow: ellipsis;
}

.card.custom-card button.form-control {
    background: #00bfa6;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    color: white;
    height: 38px;
    padding: 0.375rem 0.75rem;
    border: none;
    /* Good to be explicit */
}


.custom-card:hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.custom-card {
    height: 100%;
}

.custom-card img {
    height: 180px;
    object-fit: cover;
}

@keyframes borderPulse {
    0% {
        border-color: lightseagreen;
        box-shadow: 0 0 5px rgba(32, 178, 170, 0.5);
    }

    50% {
        border-color: #00bfa6;
        box-shadow: 0 0 15px rgba(0, 191, 166, 0.8);
    }

    100% {
        border-color: lightseagreen;
        box-shadow: 0 0 5px rgba(32, 178, 170, 0.5);
    }
}

.card.custom-card {
    animation: borderPulse 2s infinite ease-in-out;
    -webkit-animation: borderPulse 2s infinite ease-in-out;
    /* For Safari/Chrome */
    -moz-animation: borderPulse 2s infinite ease-in-out;
    /* For Firefox */
}
</style>