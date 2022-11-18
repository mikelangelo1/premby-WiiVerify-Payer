<script
  type="application/javascript"
  src="https://cdn.seondf.com/js/v4/agent.js"
/>;

seon.config({
  host: "seondf.com",
  session_id: "_" + Math.random().toString(36).slice(2),
  audio_fingerprint: true,
  canvas_fingerprint: true,
  webgl_fingerprint: true,
  onSuccess: function (message) {
    console.log("success", message);
  },
  onError: function (message) {
    console.log("error", message);
  },
});

seon.getBase64Session(function (data) {
  if (data) {
    console.log("Session payload", data);
  } else {
    console.log("Failed to retrieve session data.");
  }
});
