<template>
  <b-modal id="idCardModal">
    <template #modal-header="{ close }">
      <h5 class="modal-title" id="idCardModalLabel">Upload your ID card</h5>
      <b-button
        class="btn-close"
        data-dismiss="modal"
        aria-label="Close"
        @click="close()"
        variant="hidden"
      >
      </b-button>
    </template>
    <form action="verify-step-3.html" class="identity-upload">
      <div class="identity-content">
        <span>(Driving License or Government ID card)</span>

        <p>
          Uploading your ID helps as ensure the safety and security of your
          founds
        </p>
      </div>

      <div class="form-group">
        <label class="me-sm-2">Upload Front ID </label>
        <span class="float-right">Maximum file size is 2mb</span>
        <div class="file-upload-wrapper" data-text="front.jpg">
          <input
            name="file-upload-field"
            type="file"
            class="file-upload-field"
          />
        </div>
      </div>
      <div class="form-group">
        <label class="me-sm-2">Upload Back ID </label>
        <span class="float-right">Maximum file size is 2mb</span>
        <div class="file-upload-wrapper" data-text="back.jpg">
          <input
            name="file-upload-field"
            type="file"
            class="file-upload-field"
          />
        </div>
      </div>
    </form>
    <template #modal-footer="{ ok }">
      <b-button v-b-modal.SuccessModal variant="success" @click="ok()">
        Submit
      </b-button>
    </template>
  </b-modal>
</template>

<script>
export default {
  name: "Upload",
};
</script>
