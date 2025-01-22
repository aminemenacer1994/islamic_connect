<template>
<section class="py-5">
	<div class="container-fluid">
		<div class="row justify-content-center text-center">
			<div class="col-lg-8 col-xxl-7">
				<h2 class="display-5 fw-bold mb-3">Contact Us</h2>
				<p class="lead">Have questions or need assistance? We're here to help! Reach out to Islamic Connect via email or social media for support, feedback, or inquiries about our content and services. Let us be your companion on your journey of learning.</p>
			</div>
		</div>
		<div class="row justify-content-center">
			<div class="col-md-10 col-lg-6 mt-2">
				<form @reset="reset" @submit.prevent="sendMessage()">
					<div class="row justify-content-center">
						<div class="col-md-6">
							<div class="mb-3">
								<input class="form-control bg-light" v-model="form.firstname" name="firstname" placeholder="First name" type="text">
							</div>
						</div>
						<div class="col-md-6">
							<div class="mb-3">
								<input class="form-control bg-light" v-model="form.lastname" name="lastname" placeholder="Last name" type="text">
							</div>
						</div>
            <div class="col-md-6">
							<div class="mb-3">
								<input class="form-control bg-light" v-model="form.email" name="email" placeholder="Email Adress" type="email">
							</div>
						</div>
            <div class="col-md-6">
							<div class="mb-3">
								<input class="form-control bg-light" v-model="form.subject" name="subject" placeholder="subject" type="text">
							</div>
						</div>
            <div class="col-md-6">
							<div class="mb-3">
								<input class="form-control bg-light" v-model="form.mobile" name="mobile" placeholder="Phone number" type="number">
							</div>
						</div>
						<div class="col-md-6">
							<div class="mb-3">
								<textarea class="form-control bg-light" v-model="form.message" name="message" placeholder="Your message" rows="4"></textarea>
							</div>
						</div>
						<div class="col-md-12">
							<div class="d-grid ">
								<button class="form-control" style="background:#00BFA6; color:white" type="submit">Send message</button>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</section>
</template>


<script defer>
import axios from 'axios';
export default {

 data() {
  return {
   feedback: {},
   form: new Form({
    firstname: "",
    lastname: "",
    email: "",
    subject: "",
    mobile: "",
    message: ""
   }),
  }
 },
 methods: {
  sendMessage() {
   Swal.fire({
    title: "Are you sure?",
    text: "You want to send the message !",
    showCancelButton: true,
    confirmButtonColor: "green",
    cancelButtonColor: "#d33",
    confirmButtonText: "Send message!",
   }).then((result) => {
    if (result.isConfirmed) {
     axios
      .post("/api/send-message", this.form)
      .then((res) => {
       if (!res.data.success) {
        Swal.fire({
         position: "top-end",

         icon: "success",
         title: "Message sent successfully ",
         showConfirmButton: false,
         timer: 1500,
        });
        this.form.reset();
        $("#addNew").hide();

       } else if (res.data.success) {
        Swal.fire(
         "Error!",
         "Unable to send message.",
         "error"
        );
        this.form.reset();
        self.close();
       }
      })
      .catch(function (err) {});
    }
   });
  },

 }
}
</script>
