<template>
  <b-modal id="SuccessModal" hide-footer>
    <template #modal-header="{ close }">
      <h5 class="modal-title" id="idCardModalLabel">Success</h5>
      <b-button
        class="btn-close"
        data-dismiss="modal"
        aria-label="Close"
        @click="close()"
        variant="hidden"
      >
      </b-button>
    </template>
    <div class="auth-form">
      <div class="card-body">
        <form action="verify-step-2.html" class="identity-upload">
          <div class="identity-content">
            <span class="icon"><i class="icofont-email"></i></span>
            <h5>Identity Verified</h5>
            <p>
              Congrats! your identity has been successfully verified and your
              investment limit has been increased.
            </p>
          </div>
        </form>
      </div>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: "Success",
};
</script>
