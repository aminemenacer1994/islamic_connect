<template>
    <div class="container py-4">
        <h1 class="text-center fw-bold display-5 mb-4">Media Center</h1>
        <p class="text-center mb-4 lead">The Media Center at Islamic Connect is a central hub for inspiring and educational Islamic content. It brings together voices, stories, and teachings from across the Muslim world, helping you stay connected, informed, and uplifted.</p>
        <div class="row g-4">
            <div class="col-md-6 col-lg-4">
                <div class="card custom-card rounded-4 overflow-hidden">
                    <!-- <span class="badge rounded-pill bg-success text-white position-absolute top-0 start-0 m-2">New</span> -->
                    <img src="/images/ap.avif" alt="Qibla finder" class="w-90 mt-1" style="object-fit: contain; padding: 20px;" />
                    <div class="p-3">
                        <h1 class="mb-2 fw-bold text-dark text-center">Audio Podcasts</h1>
                        <p class="card-text text-muted text-wrap text-center" style="overflow: hidden; text-overflow: ellipsis; max-height: 4.5em;">
                            Islamic podcasts offer insightful discussions and teachings from speakers on various aspects of Islamic faith, history, and daily life.
                        </p>
                        <!-- <button class="form-control" onclick="window.location.href='/content'" type="submit">
                            <span class="text-center w-100"><b>Stream Podcasts</b></span>
                        </button>  -->
                        <button v-if="isAuthenticated && isSubscribed" class="form-control" @click="goTo('/content')" type="button" style="background: #0b5d4b; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white; height: 38px; padding: 0.375rem 0.75rem;">
                            <span class="text-center w-100"><b>Stream Podcasts</b></span>
                        </button>
                        <div v-else class="restricted-access text-center p-2" style="border-radius: 5px; animation: borderPulse 2s infinite ease-in-out;">
                            <p class="mb-1 text-muted small">You must be subscribed to access</p>
                            <a href="/subscribe" class="text-decoration-none" style="color: #228B22; font-weight: bold;">Subscribe Now</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6 col-lg-4">
                <div class="card custom-card rounded-4 overflow-hidden">
                    <!-- <span class="badge rounded-pill bg-success text-white position-absolute top-0 start-0 m-2">New</span> -->
                    <img src="/images/mtv2.png" alt="Watch Live" class="w-100" style="object-fit: contain;" />
                    <div class="p-3">
                        <h1 class="mb-2 fw-bold text-dark text-center">Channel Guide</h1>
                        <p class="card-text text-muted text-wrap text-center" style="overflow: hidden; text-overflow: ellipsis; max-height: 4.5em;">
                            Find Islamic channels and access their posts, channel, website, playlists, and videos directly on YouTube.
                        </p>
                        <!-- <button class="form-control" onclick="window.location.href='/streaming'" type="submit">
                            <span class="text-center w-100"><b>View Channels</b></span>
                        </button>  -->
                        <button v-if="isAuthenticated && isSubscribed" class="form-control" @click="goTo('/streaming')" type="button" style="background: #0b5d4b; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white; height: 38px; padding: 0.375rem 0.75rem;">
                            <span class="text-center w-100"><b>View Channels</b></span>
                        </button>
                        <div v-else class="restricted-access text-center p-2" style=" border-radius: 5px; animation: borderPulse 2s infinite ease-in-out;">
                            <p class="mb-1 text-muted small">You must be subscribed to access</p>
                            <a href="/subscribe" class="text-decoration-none" style="color: #228B22; font-weight: bold;">Subscribe Now</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6 col-lg-4">
                <div class="card custom-card rounded-4 overflow-hidden">
                    <!-- <span class="badge rounded-pill bg-success text-white position-absolute top-0 start-0 m-2">New</span> -->
                    <img src="/images/radio5.jpg" alt="Radio stations" class="w-100" style="object-fit: contain;" />
                    <div class="p-3">
                        <h1 class="mb-2 fw-bold text-dark text-center">Reciters Stations</h1>
                        <p class="card-text text-muted text-wrap text-center" style="overflow: hidden; text-overflow: ellipsis; max-height: 4.5em;">
                            Tune in to live Islamic radio from around the world, featuring Qur'an recitations, lectures, nasheeds, and spiritual reminders—streamed 24/7 in multiple languages.
                        </p>
                        <!-- <button class="form-control" onclick="window.location.href='/radio'"
                            style="background: #0b5d4b; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white;height: 38px;padding: 0.375rem 0.75rem;"
                            type="submit">
                            <span class="text-center w-100"><b>Explore Reciters</b></span>
                        </button>  -->
                        <button v-if="isAuthenticated && isSubscribed" class="form-control" @click="goTo('/radio')" type="button" style="background: #0b5d4b; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white; height: 38px; padding: 0.375rem 0.75rem;">
                            <span class="text-center w-100"><b>Explore Reciters</b></span>
                        </button>
                        <div v-else class="restricted-access text-center p-2" style=" border-radius: 5px; animation: borderPulse 2s infinite ease-in-out;">
                            <p class="mb-1 text-muted small">You must be subscribed to access</p>
                            <a href="/subscribe" class="text-decoration-none" style="color: #228B22; font-weight: bold;">Subscribe Now</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6 col-lg-4">
                <div class="card custom-card overflow-hidden rounded-4" >
                    <img src="/images/img_g.png" alt="Image Gallery" class="w-100" style="object-fit: contain;" />
                    <div class="p-3">
                        <h1 class="mb-2 fw-bold text-dark text-center">Image Gallery</h1>
                        <p class="card-text text-muted text-wrap text-center" style="overflow: hidden; text-overflow: ellipsis; max-height: 4.5em;">
                            Explore a beautiful collection of high-quality Islamic images capturing the essence of faith, culture, and tradition.
                        </p>
                        <button class="form-control" onclick="window.location.href='/gallery'"
                            style="background: #0b5d4b; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white;height: 38px;padding: 0.375rem 0.75rem;"
                            type="submit">
                            <span class="text-center w-100"><b>View Gallery</b></span>
                        </button>
                    </div>
                </div>
            </div>

            <div class="col-md-6 col-lg-4">
                <div class="card custom-card overflow-hidden rounded-4" >
                    <img src="/images/vide_g.png" alt="Video Gallery" class="w-100" style="object-fit: contain;" />
                    <div class="p-3">
                        <h1 class="mb-2 fw-bold text-dark text-center">Video Gallery</h1>
                        <p class="card-text text-muted text-wrap text-center" style="overflow: hidden; text-overflow: ellipsis; max-height: 4.5em;">
                            Explore a curated collection of short Islamic videos featuring reminders, duas, stories of the Prophets and Quranic reflections.
                        </p>
                        <!-- <button class="form-control" onclick="window.location.href='/video'"
                            style="background: #0b5d4b; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white;height: 38px;padding: 0.375rem 0.75rem;"
                            type="submit">
                            <span class="text-center w-100"><b>Watch Videos</b></span>
                        </button>   -->
                        <button v-if="isAuthenticated && isSubscribed" class="form-control" @click="goTo('/video')" type="button" style="background: #0b5d4b; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white; height: 38px; padding: 0.375rem 0.75rem;">
                            <span class="text-center w-100"><b>Watch Videos</b></span>
                        </button>
                        <div v-else class="restricted-access text-center p-2" style=" border-radius: 5px; animation: borderPulse 2s infinite ease-in-out;">
                            <p class="mb-1 text-muted small">You must be subscribed to access</p>
                            <a href="/subscribe" class="text-decoration-none" style="color: rgb(0, 107, 95); font-weight: bold;">Subscribe Now</a>
                        </div>
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
/* Design tokens */
:root {
    --brand-1: #1a5f7a;
    --brand-2: #0b5d4b;
    --accent: #00bfa6;
    --text-1: #2c3e50;
    --text-2: #6c757d;
    --surface: #ffffff;
    --surface-muted: #f8f9fa;
    --border: #e9ecef;
    --shadow-sm: 0 4px 14px rgba(0, 0, 0, 0.06);
    --shadow-md: 0 10px 24px rgba(0, 0, 0, 0.10);
}

/* Typography & spacing */
.container > h1.display-5 { letter-spacing: -0.01em; margin-bottom: 0.75rem; color: var(--text-1); }
.lead { color: var(--text-2); line-height: 1.75; margin-left: auto; margin-right: auto; }
.custom-card .display-6 { font-size: 1.4rem; font-weight: 800; color: var(--text-1); }
.card.custom-card .card-text { font-size: 0.95rem; line-height: 1.6; color: var(--text-2); }

@media (max-width: 768px) {
  .container > h1.display-5 { font-size: 2rem !important; }
  .custom-card .display-6 { font-size: 1.1rem; }
  .custom-card img { height: 160px; }
  .lead { font-size: 1rem; }
}

@media (min-width: 992px) {
  .custom-card img { height: 190px; }
}
.card.custom-card .card-text {
    max-height: 4.5em;
    text-overflow: ellipsis;
}

.card.custom-card button.form-control {
    background: #0b5d4b;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    color: #fff;
    height: 38px;
    padding: 0.375rem 0.75rem;
    border: none;
}
.card.custom-card button.form-control:focus-visible { outline: 3px solid rgba(0,191,166,0.45); outline-offset: 2px; }

.custom-card { border: none; border-radius: 16px; background: #fff; height: 100%; box-shadow: 0 6px 20px rgba(0,0,0,0.08); transition: transform 0.25s ease, box-shadow 0.25s ease; position: relative; overflow: hidden; }
.custom-card:hover { transform: translateY(-6px); box-shadow: 0 18px 45px rgba(0,0,0,0.16); }
.custom-card::before { content: ""; position: absolute; top: 0; left: 0; right: 0; height: 4px; background: linear-gradient(90deg, var(--brand-2), var(--brand-1)); transform: scaleX(0.4); transform-origin: left; transition: transform 0.3s ease; }
.custom-card:hover::before { transform: scaleX(1); }

.custom-card img { height: 180px; object-fit: contain; transition: transform 0.25s ease; border: none; }
.custom-card:hover img { transform: scale(1.05); }

@keyframes borderPulse {
    0% {
        border-color: #228B22;
        box-shadow: 0 0 5px rgba(0, 107, 95, 0.4);
    }
    50% {
        border-color: #00564c;
        box-shadow: 0 0 12px rgba(0, 86, 76, 0.7);
    }
    100% {
        border-color: #228B22;
        box-shadow: 0 0 5px rgba(0, 107, 95, 0.4);
    }
}

.card.custom-card { animation: none; }

.restricted-access { background: #28b66324; transition: background-color 0.2s ease, transform 0.2s ease; }
.restricted-access:hover { background: #28b66333; transform: translateY(-2px); }
.restricted-access a:hover { color: var(--brand-2); text-decoration: underline; }

@media (prefers-reduced-motion: reduce) {
    .custom-card, .custom-card img, .card.custom-card button.form-control { transition: none !important; }
}
</style>
