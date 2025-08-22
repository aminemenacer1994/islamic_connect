<template>
  <div id="app" class="py-5">
    <div class="container">
      <!-- Transparent Pricing Section -->
      <div class="text-center mb-5">
        <h1 class="display-4 fw-bold text-black">Transparent Pricing</h1>
        <p class="lead text-muted">
          Choose the plan that fits your healthcare management needs. All plans
          include 24/7 support and are free for the first 14 days.
        </p>
      </div>

      <!-- Pricing Toggle -->
      <div class="d-flex justify-content-center mb-5">
        <div class="btn-group pricing-toggle" role="group">
          <button
            type="button"
            class="btn btn-outline-dark"
            :class="{ active: !isAnnual }"
            @click="isAnnual = false"
          >
            Monthly
          </button>
          <button
            type="button"
            class="btn btn-outline-dark position-relative"
            :class="{ active: isAnnual }"
            @click="isAnnual = true"
          >
            Annual
            <span
              class="badge badge-popular position-absolute top-0 end-0 translate-middle-y"
              >20% off</span
            >
          </button>
        </div>
      </div>

      <!-- Pricing Cards -->
      <div class="row row-cols-1 row-cols-md-3 g-4 mb-5">
        <!-- Starter Card -->
        <div class="col">
          <div class="card h-100 pricing-card p-4 text-center">
            <h5 class="card-title text-muted text-uppercase">Starter</h5>
            <h2 class="card-text fw-bold my-3">
              ${{ isAnnual ? "0" : "0"
              }}<small class="text-muted fw-normal">/mo</small>
            </h2>
            <p class="card-text text-muted">All features included</p>
            <ul class="list-unstyled text-start my-4">
              <li>
                <i class="fas fa-check-circle text-custom-primary me-2"></i>Starter
                plan access
              </li>
              <li>
                <i class="fas fa-check-circle text-custom-primary me-2"></i>30-day
                records access
              </li>
              <li>
                <i class="fas fa-check-circle text-custom-primary me-2"></i>Reporting
                & Analytics
              </li>
            </ul>
            <a href="#" class="btn btn-secondary rounded-pill fw-bold"
              >Start with Free</a
            >
          </div>
        </div>

        <!-- Professional Card -->
        <div class="col">
          <div class="card h-100 pricing-card p-4 text-center">
            <h5 class="card-title text-muted text-uppercase">Professional</h5>
            <h2 class="card-text fw-bold my-3">
              ${{ isAnnual ? "15.20" : "19"
              }}<small class="text-muted fw-normal">/mo</small>
            </h2>
            <p class="card-text text-muted">All plan includes</p>
            <ul class="list-unstyled text-start my-4">
              <li>
                <i class="fas fa-check-circle text-custom-primary me-2"></i>Advanced
                plan included
              </li>
              <li>
                <i class="fas fa-check-circle text-custom-primary me-2"></i>5,000
                records access
              </li>
              <li>
                <i class="fas fa-check-circle text-custom-primary me-2"></i
                >Comprehensive analytics
              </li>
            </ul>
            <a href="#" class="btn btn-custom-primary rounded-pill fw-bold"
              >Start with Free</a
            >
          </div>
        </div>

        <!-- Advanced Custom Card (Featured) -->
        <div class="col">
          <div
            class="card h-100 featured-card pricing-card p-4 text-center"
          >
            <span class="badge-popular">Most Popular</span>
            <h5 class="card-title text-uppercase">Advanced</h5>
            <h2 class="card-text fw-bold my-3">
              Custom<small class="fw-normal text-white-50">/mo</small>
            </h2>
            <p class="card-text text-white-50">All plan includes</p>
            <ul class="list-unstyled text-start my-4">
              <li>
                <i class="fas fa-check-circle text-white me-2"></i>Custom plan
                included
              </li>
              <li>
                <i class="fas fa-check-circle text-white me-2"></i>Unlimited
                records access
              </li>
              <li>
                <i class="fas fa-check-circle text-white me-2"></i>Premium
                support
              </li>
            </ul>
            <a
              href="#"
              class="btn btn-light rounded-pill fw-bold text-dark"
              >Start with Free</a
            >
          </div>
        </div>
      </div>

      <!-- Brands Section -->
      <div class="text-center text-muted mb-5">
        <p>More than 100+ companies trusted us</p>
        <!-- Placeholder for brand logos -->
      </div>

      <!-- Comparison Table Section -->
      <div class="table-responsive mb-5">
        <table class="table align-middle new-compare-table">
          <thead>
            <tr>
              <th scope="col" class="text-start">Price</th>
              <th scope="col" class="text-center">Basic Plan</th>
              <th scope="col" class="text-center">Professional Plan</th>
              <th scope="col" class="text-center">Advanced Plan</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Basic features at no cost</th>
              <td class="text-center"><i class="fas fa-check"></i></td>
              <td class="text-center"><i class="fas fa-check"></i></td>
              <td class="text-center"><i class="fas fa-check"></i></td>
            </tr>
            <tr>
              <th scope="row">Access to limited code outputs</th>
              <td class="text-center"><i class="fas fa-check"></i></td>
              <td class="text-center"><i class="fas fa-check"></i></td>
              <td class="text-center"><i class="fas fa-check"></i></td>
            </tr>
            <tr>
              <th scope="row">Community support</th>
              <td class="text-center"><i class="fas fa-check"></i></td>
              <td class="text-center"><i class="fas fa-check"></i></td>
              <td class="text-center"><i class="fas fa-check"></i></td>
            </tr>
            <tr>
              <th scope="row">Basic AI-powered sketch</th>
              <td class="text-center"><i class="fas fa-check"></i></td>
              <td class="text-center"><i class="fas fa-check"></i></td>
              <td class="text-center"><i class="fas fa-check"></i></td>
            </tr>
            <tr>
              <th scope="row">Limited storage processing</th>
              <td class="text-center">100 GB</td>
              <td class="text-center">600 GB</td>
              <td class="text-center">1 TB</td>
            </tr>
            <tr>
              <th scope="row">Full access to all features</th>
              <td class="text-center">-</td>
              <td class="text-center"><i class="fas fa-check"></i></td>
              <td class="text-center"><i class="fas fa-check"></i></td>
            </tr>
            <tr>
              <th scope="row">Embedded files</th>
              <td class="text-center">-</td>
              <td class="text-center"><i class="fas fa-check"></i></td>
              <td class="text-center"><i class="fas fa-check"></i></td>
            </tr>
            <tr>
              <th scope="row">Real-time whiteboard collaboration</th>
              <td class="text-center">-</td>
              <td class="text-center"><i class="fas fa-check"></i></td>
              <td class="text-center"><i class="fas fa-check"></i></td>
            </tr>
            <tr>
              <th scope="row">Updates tab</th>
              <td class="text-center">-</td>
              <td class="text-center">Limited</td>
              <td class="text-center">Unlimited</td>
            </tr>
            <tr>
              <th scope="row">Zoom connectivity</th>
              <td class="text-center">-</td>
              <td class="text-center">Limited</td>
              <td class="text-center">Unlimited</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Features Section -->
      <div class="text-center mb-5">
        <h2 class="fw-bold text-black">Features to Elevate Your Operations</h2>
        <p class="lead text-muted">
          Designed with the tools and technology your healthcare organization
          needs to enhance your operations and make your life easier.
        </p>
      </div>
      <div class="row row-cols-1 row-cols-md-3 g-4 mb-5">
        <!-- Feature Card 1 -->
        <div class="col">
          <div class="card h-100 feature-card p-4">
            <div class="d-flex align-items-center mb-3">
              <div class="feature-icon-circle me-3">
                <i class="fas fa-chart-line fa-2x"></i>
              </div>
              <h5 class="card-title fw-bold m-0 text-black">
                Advanced Data Security & Compliance
              </h5>
            </div>
            <p class="card-text text-muted">
              We provide a secured platform for your health information,
              protected by the latest technology.
            </p>
          </div>
        </div>
        <!-- Feature Card 2 -->
        <div class="col">
          <div class="card h-100 feature-card p-4">
            <div class="d-flex align-items-center mb-3">
              <div class="feature-icon-circle me-3">
                <i class="fas fa-user-shield fa-2x"></i>
              </div>
              <h5 class="card-title fw-bold m-0 text-black">Patient Data Management</h5>
            </div>
            <p class="card-text text-muted">
              Manage patient records with a secured platform that enables you to
              share patient data seamlessly.
            </p>
          </div>
        </div>
        <!-- Feature Card 3 -->
        <div class="col">
          <div class="card h-100 feature-card p-4">
            <div class="d-flex align-items-center mb-3">
              <div class="feature-icon-circle me-3">
                <i class="fas fa-cogs fa-2x"></i>
              </div>
              <h5 class="card-title fw-bold m-0 text-black">
                Tools for Workflow Automation
              </h5>
            </div>
            <p class="card-text text-muted">
              Automate your medical practice with our powerful workflow tools to
              improve productivity.
            </p>
          </div>
        </div>
      </div>

      <!-- FAQ Section -->
      <div class="text-center mb-5">
        <h2 class="fw-bold text-black">Need Help? Start with our FAQ</h2>
        <p class="lead text-muted">
          Here are some of the most common questions we get from our customers.
          If you can't find your answer here, feel free to contact us.
        </p>
      </div>
      <div class="accordion mb-5" id="faqAccordion">
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingOne">
            <button
              class="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              Is the HRM Dashboard compliant with HIPAA regulations?
            </button>
          </h2>
          <div
            id="collapseOne"
            class="accordion-collapse collapse show"
            aria-labelledby="headingOne"
            data-bs-parent="#faqAccordion"
          >
            <div class="accordion-body">
              Yes, our HRM Dashboard is designed to be fully compliant with
              HIPAA regulations to ensure the security of your patient data.
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingTwo">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              What support is available if I encounter issues with the HRM
              Dashboard?
            </button>
          </h2>
          <div
            id="collapseTwo"
            class="accordion-collapse collapse"
            aria-labelledby="headingTwo"
            data-bs-parent="#faqAccordion"
          >
            <div class="accordion-body">
              We offer 24/7 support for all our plans. Our team is available to
              assist you with any issues you may encounter.
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingThree">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              Does the HRM Dashboard offer real-time analysis?
            </button>
          </h2>
          <div
            id="collapseThree"
            class="accordion-collapse collapse"
            aria-labelledby="headingThree"
            data-bs-parent="#faqAccordion"
          >
            <div class="accordion-body">
              Yes, our Advanced plan includes real-time analytics to give you
              immediate insights into your data.
            </div>
          </div>
        </div>
      </div>

      <!-- CTA Footer -->
      <div class="row align-items-center py-5 px-4 footer-cta">
        <div class="col-md-8 text-center text-md-start">
          <h2 class="fw-bold">Start Managing Healthcare with Us Today!</h2>
          <p class="lead">
            Sign up for a free 14-day trial and experience the difference our
            platform can make for your practice.
          </p>
        </div>
        <div class="col-md-4 text-center text-md-end mt-3 mt-md-0">
          <a
            href="#"
            class="btn btn-light rounded-pill px-5 fw-bold text-black"
            >Sign Up for Free</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const isAnnual = ref(false);
    return {
      isAnnual,
    };
  },
};
</script>

<style scoped>
body {
  font-family: 'Inter', sans-serif;
  background-color: #f8f9fa;
}
.pricing-card {
  border-radius: 1.5rem;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}
.pricing-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 20px rgba(0, 0, 0, 0.15);
}
.featured-card {
  background-color: black;
  color: white;
  position: relative;
  transform: scale(1.05);
  z-index: 10;
}
.featured-card:hover {
  transform: scale(1.08);
}
.badge-popular {
  position: absolute;
  top: -10px;
  right: -10px;
  background-color: #00bfa6;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  transform: rotate(10deg);
  font-size: 0.75rem;
}
.pricing-toggle .btn {
  border-radius: 2rem;
  padding: 0.75rem 2rem;
  font-weight: 600;
}
.pricing-toggle .btn.active {
  background-color: #00bfa6;
  color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.new-compare-table {
  width: 100%;
  border-collapse: collapse;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}
.new-compare-table thead {
  background-color: #333;
  color: white;
}
.new-compare-table th,
.new-compare-table td {
  padding: 1rem;
  vertical-align: middle;
  border-bottom: 1px solid #e0e0e0;
}
.new-compare-table th {
  font-weight: 600;
  color: #555;
  background-color: #f8f9fa;
}
.new-compare-table tbody tr:last-child th,
.new-compare-table tbody tr:last-child td {
  border-bottom: none;
}
.new-compare-table .fa-check {
  color: #ff8c00;
}
.feature-card {
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.feature-icon-circle {
  background-color: #e8f5e9;
  color: #00bfa6;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.footer-cta {
  background-color: black;
  border-radius: 1.5rem;
  color: white;
}
.btn-custom-primary {
  background-color: #00bfa6;
  border-color: #00bfa6;
  color: white;
}
.btn-custom-primary:hover {
  background-color: #00a68d;
  border-color: #00a68d;
}
.text-custom-primary {
  color: #00bfa6;
}
</style>
