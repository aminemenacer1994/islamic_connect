<template>
    <div class="container py-4">
        <h1 class="text-center fw-bold display-5 mb-4">Media Center</h1>
        <p class="text-center mb-4 lead">
            The Media Center at Islamic Connect is a central hub for inspiring and
            educational Islamic content. It brings together voices, stories, and teachings from across the Muslim world,
            helping you stay connected, informed, and uplifted.
        </p>

        <!-- Loading spinner while fetching subscription status -->
        <div v-if="loading" class="text-center py-5">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <p class="mt-2">Loading subscription status...</p>
        </div>

        <div v-else class="row g-4">
            <!-- Audio Podcasts Card -->
            <div class="col-md-6 col-lg-4">
                <div class="card custom-card rounded-4 overflow-hidden" style="border: 1px solid grey;">
                    <span
                        class="badge rounded-pill bg-success text-white position-absolute top-0 start-0 m-2">New</span>
                    <img src="/images/ap.avif" alt="Audio Podcasts" class="w-90 mt-1"
                        style="object-fit: contain; padding: 20px;" />
                    <div class="p-3">
                        <h5 class="mb-2 fw-bold display-6 text-dark text-center">
                            Audio Podcasts
                            <span v-if="isLocked('/content')">🔒</span>
                        </h5>
                        <p class="card-text text-muted text-wrap text-center"
                            style="overflow: hidden; text-overflow: ellipsis; max-height: 4.5em;">
                            Islamic podcasts offer insightful discussions and teachings from speakers on various aspects
                            of Islamic
                            faith, history, and daily life.
                        </p>
                        <button v-if="!isLocked('/content')" class="form-control" @click="goTo('/content')"
                            style="background: #00bfa6; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white;height: 38px;padding: 0.375rem 0.75rem;"
                            type="button">
                            <span class="text-center w-100"><b>Stream Podcasts</b></span>
                        </button>
                        <button v-else class="form-control" @click="subscribe('/content')"
                            style="background: #00bfa6; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white;height: 38px;padding: 0.375rem 0.75rem;"
                            type="button">
                            <span class="text-center w-100"><b>Subscribe to Access</b></span>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Live Streaming Card -->
            <div class="col-md-6 col-lg-4">
                <div class="card custom-card shadow-sm rounded-4" style="border: 1px solid grey; background:whitesmoke">
                    <span class="badge rounded-pill bg-black text-white position-absolute top-0 start-0 m-2">Under
                        development</span>
                    <img src="/images/mtv2.png" alt="Watch Live" class="w-100" style="object-fit: contain;" />
                    <div class="p-3">
                        <h5 class="mb-2 fw-bold display-6 text-dark text-center">
                            Live Streaming
                            <span v-if="isLocked('/streaming')">🔒</span>
                        </h5>
                        <p class="card-text text-muted text-wrap text-center"
                            style="overflow: hidden; text-overflow: ellipsis; max-height: 4.5em;">
                            Watch Islamic TV channels and live lectures—stream events, khutbahs, educational programs,
                            and spiritual
                            content anytime.
                        </p>
                        <button v-if="!isLocked('/streaming')" class="form-control" @click="goTo('/streaming')"
                            style="background: #00bfa6; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white;height: 38px;padding: 0.375rem 0.75rem;"
                            type="button">
                            <span class="text-center w-100"><b>Watch Live</b></span>
                        </button>
                        <button v-else class="form-control" @click="subscribe('/streaming')"
                            style="background: #00bfa6; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white;height: 38px;padding: 0.375rem 0.75rem;"
                            type="button">
                            <span class="text-center w-100"><b>Subscribe to Access</b></span>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Reciters Stations Card -->
            <div class="col-md-6 col-lg-4">
                <div class="card custom-card rounded-4 overflow-hidden" style="border: 1px solid grey;">
                    <span
                        class="badge rounded-pill bg-success text-white position-absolute top-0 start-0 m-2">New</span>
                    <img src="/images/radio5.jpg" alt="Radio stations" class="w-100" style="object-fit: contain;" />
                    <div class="p-3">
                        <h5 class="mb-2 fw-bold display-6 text-dark text-center">Reciters Stations</h5>
                        <p class="card-text text-muted text-wrap text-center"
                            style="overflow: hidden; text-overflow: ellipsis; max-height: 4.5em;">
                            Tune in to live Islamic radio from around the world, featuring Qur'an recitations, lectures,
                            nasheeds, and
                            spiritual reminders—streamed 24/7 in multiple languages.
                        </p>
                        <button class="form-control" @click="goTo('/radio')"
                            style="background: #00bfa6; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white;height: 38px;padding: 0.375rem 0.75rem;"
                            type="button">
                            <span class="text-center w-100"><b>Explore Reciters</b></span>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Image Gallery Card -->
            <div class="col-md-6 col-lg-4">
                <div class="card custom-card shadow-sm rounded-4" style="border: 1px solid grey;">
                    <img src="/images/img_g.png" alt="Image Gallery" class="w-100" style="object-fit: contain;" />
                    <div class="p-3">
                        <h5 class="mb-2 fw-bold display-6 text-dark text-center">Image Gallery</h5>
                        <p class="card-text text-muted text-wrap text-center"
                            style="overflow: hidden; text-overflow: ellipsis; max-height: 4.5em;">
                            Explore a beautiful collection of high-quality Islamic images capturing the essence of
                            faith, culture, and
                            tradition.
                        </p>
                        <button class="form-control" @click="goTo('/gallery')"
                            style="background: #00bfa6; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white;height: 38px;padding: 0.375rem 0.75rem;"
                            type="button">
                            <span class="text-center w-100"><b>View Gallery</b></span>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Video Gallery Card -->
            <div class="col-md-6 col-lg-4">
                <div class="card custom-card shadow-sm rounded-4" style="border: 1px solid grey;">
                    <img src="/images/vide_g.png" alt="Video Gallery" class="w-100" style="object-fit: contain;" />
                    <div class="p-3">
                        <h5 class="mb-2 fw-bold display-6 text-dark text-center">Video Gallery</h5>
                        <p class="card-text text-muted text-wrap text-center"
                            style="overflow: hidden; text-overflow: ellipsis; max-height: 4.5em;">
                            Explore a curated collection of short Islamic videos featuring reminders, duas, stories of
                            the Prophets and
                            Quranic reflections.
                        </p>
                        <button class="form-control" @click="goTo('/video')"
                            style="background: #00bfa6; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white;height: 38px;padding: 0.375rem 0.75rem;"
                            type="button">
                            <span class="text-center w-100"><b>Watch Videos</b></span>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Subscribe Modal -->
        <div class="modal fade" id="subscribeModal" tabindex="-1" aria-labelledby="subscribeModalLabel"
            aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="subscribeModalLabel">Subscribe to Access Premium Content</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                            :disabled="checkoutLoading"></button>
                    </div>
                    <div class="modal-body">
                        <div class="text-center">
                            <i class="fas fa-lock fa-3x text-muted mb-3"></i>
                            <h6>Unlock Premium Islamic Content</h6>
                            <p class="mb-3">Get access to exclusive podcasts, live streaming, and premium Islamic
                                content.</p>
                            <div class="pricing-info">
                                <h4 class="text-primary">$9.99/month</h4>
                                <ul class="list-unstyled">
                                    <li>✓ Unlimited access to audio podcasts</li>
                                    <li>✓ Live streaming channels</li>
                                    <li>✓ Premium Islamic content</li>
                                    <li>✓ Ad-free experience</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer justify-content-center">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                            :disabled="checkoutLoading">
                            Maybe Later
                        </button>
                        <button type="button" class="btn btn-primary px-4" @click="checkout"
                            :disabled="checkoutLoading">
                            <span v-if="checkoutLoading">
                                <i class="fas fa-spinner fa-spin me-2"></i>Processing...
                            </span>
                            <span v-else>
                                <i class="fas fa-credit-card me-2"></i>Subscribe Now
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Success Message -->
        <div v-if="showSuccessMessage" class="alert alert-success text-center"
            style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 1050; width: 80%; max-width: 500px;">
            <h4>🎉 Congratulations!</h4>
            <p>You have subscribed successfully. Redirecting to your content...</p>
        </div>
    </div>
</template>

<script>
import subscriptionMixin from '../mixins/subscriptionMixin.js';

export default {
    name: 'MediaCenter',
    mixins: [subscriptionMixin],

    // The mixin handles all the initialization in mounted()
    // No need to override created() or mounted() here
};
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
    transition: all 0.3s ease;
}

.card.custom-card button.form-control:hover {
    background: #00a693;
    transform: translateY(-1px);
    box-shadow: rgba(100, 100, 111, 0.3) 0px 10px 35px 0px;
}

.custom-card:hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
    transition: all 0.3s ease;
}

.custom-card {
    height: 100%;
    transition: all 0.3s ease;
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
}

.modal-content {
    border-radius: 15px;
}

.pricing-info {
    background: #f8f9fa;
    padding: 20px;
    border-radius: 10px;
    margin: 15px 0;
}

.spinner-border {
    width: 3rem;
    height: 3rem;
}
</style>