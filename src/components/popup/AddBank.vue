<template>
  <b-modal id="addBank">
    <template #modal-header="{ close }">
      <h5 class="modal-title" id="addBank">Add bank account</h5>
      <b-button
        class="btn-close"
        data-dismiss="modal"
        aria-label="Close"
        @click="close()"
        variant="hidden"
      >
      </b-button>
    </template>
    <form action="verify-step-6.html" class="identity-upload">
      <div class="row g-3">
        <div class="col-xl-12">
          <label class="form-label">Routing number </label>
          <input type="text" class="form-control" placeholder="25487" />
        </div>
        <div class="col-xl-12">
          <label class="form-label">Account number </label>
          <input type="text" class="form-control" placeholder="36475" />
        </div>
        <div class="col-xl-12">
          <label class="form-label">Full name </label>
          <input
            type="text"
            class="form-control"
            placeholder="Andrew Smith"
          />
        </div>
        <div class="col-xl-12">
          <img src="../../assets/images/routing.png" alt="" class="img-fluid" />
        </div>
      </div>
    </form>
    <template #modal-footer="{ ok }">
      <b-button v-b-modal.SuccessModal variant="primary" @click="ok()">
        Confirm
      </b-button>
    </template>
  </b-modal>
</template>

<script>
export default {
  name: "AddBank",
};
</script>
