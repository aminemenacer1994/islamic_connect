<template>
<section class="py-5 my-md-5">
	<div class="container">
		<div class="text-center">
			<div class="row justify-content-center">
				<div class="col-lg-8">
					<h2 class="display-5 fw-bold">Subscribe to our Mailing list</h2>
					<p class="lead">Sign up for our mailing list to receive the latest updates, content, and educational resources directly in your inbox. By joining, you'll be part of a growing community dedicated to understanding the Quran and Islam through accessible, high-quality content.</p>
					<div class="mx-auto mt-3">
						<form class="row g-3" @reset="reset" @submit.prevent="submitMail()">
							<div class="col-md-4">
								<input class="form-control bg-light" v-model="form.name" placeholder="Full name" type="text">
							</div>
							<div class="col-md-4">
								<input class="form-control bg-light" v-model="form.email" placeholder="Email address" type="text">
							</div>
							<div class="col-md-4">
								<div class="d-grid">
									<button class="form-control" style="background:#00BFA6; color:white" type="submit">Subscribe</button>
								</div>
							</div>
						</form>
					</div>
				</div>
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
   mailing: {},
   form: new Form({
    name: "",
    email: "",
   })
  }
 },
 methods: {
  submitMail() {
   Swal.fire({
    title: "Are you sure?",
    text: "You want to join the mailing list !",
    showCancelButton: true,
    confirmButtonColor: "green",
    cancelButtonColor: "#d33",
    confirmButtonText: "Submit",
   }).then((result) => {
    if (result.isConfirmed) {
     axios.post("/api/submit-mail", this.form)
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

<style scoped>
.button-631 {
  color: linear-gradient(144deg,#AF40FF, #5B42F3 50%,#00DDEB);
 }
 

</style>
