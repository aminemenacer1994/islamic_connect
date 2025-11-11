<template>
    <div class="container py-4">
        <h1 class="text-center fw-bold display-5 mb-4">Quran Portal</h1>
        <p class="text-center mb-4 lead">
            Islamic Connect provides seamless access to the Qur’an, enabling Muslims to read, listen, and reflect on its
            divine message. Our platform is dedicated to helping individuals connect with the words of Allah.
        </p>
        <div class="row g-4 ">

            <div class="col-md-6 col-lg-4">
                <div class="card custom-card rounded-4 overflow-hidden" style="border: 1px solid grey; ">
                    <span
                        class="badge rounded-pill bg-success text-white position-absolute top-0 start-0 m-2">New</span>
                    <img src="/images/qc.png" alt="Islamic Shops" class="w-100 pt-4" style="object-fit: contain;" />
                    <div class="p-3">
                        <h5 class="mb-2 fw-bold display-6 text-dark text-center">Quran Explorer</h5>
                        <p class="card-text text-muted text-wrap text-center"
                            style="overflow: hidden; text-overflow: ellipsis; max-height: 4.5em;">Explore the beauty and
                            guidance of the Quran at your fingertips — perfect for seekers,
                            travelers, and newcomers alike.</p>
                        <button class="form-control" onclick="window.location.href='/quran'"
                            style="background: #0b5d4b; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white;height: 38px;padding: 0.375rem 0.75rem;"
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
                            style="background: #0b5d4b; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white;height: 38px;padding: 0.375rem 0.75rem;"
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
                    <img src="/images/history.png" alt="Islamic Shops" class="w-100 pt-4"
                        style="object-fit: contain;" />
                    <div class="p-3">
                        <h5 class="mb-2 fw-bold display-6 text-dark text-center">Quran History</h5>
                        <p class="card-text text-muted text-wrap text-center"
                            style="overflow: hidden; text-overflow: ellipsis; max-height: 4.5em;">Explore the rich
                            history of the Quran from its divine revelation to its meticulous preservation right at your
                            fingertips.</p>
                        <button class="form-control" onclick="window.location.href='/history'"
                            style="background: #0b5d4b; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white;height: 38px;padding: 0.375rem 0.75rem;"
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
    props: {
        isAuthenticated: { type: Boolean, required: true },
        isSubscribed: { type: Boolean, required: true },
    },
    methods: {
        goTo(path) {
            window.location.href = path;
        },
    },
};
</script>

<style scoped>
.card.custom-card .card-text {
    max-height: 4.5em;
    text-overflow: ellipsis;
}

.card.custom-card button.form-control {
    background: #0b5d4b;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    color: white;
    height: 38px;
    padding: 0.375rem 0.75rem;
    border: none;
}

.custom-card:hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease-in-out;
}

.custom-card {
    height: 100%;
    transition: all 0.3s ease;
}

.custom-card img {
    height: 180px;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.custom-card:hover img {
    transform: scale(1.05);
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
}

.restricted-access {
    background: #28b66324;
    transition: all 0.3s ease;
}

.restricted-access:hover {
    background: #28b66324;
    transform: translateY(-2px);
}

.restricted-access a:hover {
    color: #009e87;
    text-decoration: underline;
}
</style>
