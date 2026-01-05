// 🔹 EmailJS init
(function () {
  emailjs.init("HxqBHxXvBrs3dCDIN"); // 👈 yahan apni PUBLIC KEY dalo
})();

// 🔹 Form select
const form = document.querySelector("form");

// 🔹 Submit event
form.addEventListener("submit", function (e) {
  e.preventDefault();

  // 🔹 All inputs & textarea
  const name = document.getElementById("name").value.trim();
  const lastname = document.getElementById("lastname").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const message = document.getElementById("message").value.trim();

  // 🔹 Button
  const btn = form.querySelector("button");
  btn.innerText = "SENDING...";
  btn.disabled = true;

  // 🔹 Params (EmailJS template ke sath match)
  const params = {
    name: name + " " + lastname,
    email: email,
    phone: phone,
    message: message,
    time: new Date().toLocaleString(),
  };

  // 🔹 Send email
  emailjs.send("service_dh0z34j", "template_j3sh2o9", params).then(
    function () {
      showPopup(
        "Success!",
        "Your message has been sent successfully. We will get back to you shortly.",
        "success"
      );
      form.reset();
      btn.innerText = "SUBMIT";
      btn.disabled = false;
    },
    function (error) {
      showPopup(
        "Oops!",
        "Something went wrong while sending your message. Please try again later.",
        "error"
      );
      console.log(error);
      btn.innerText = "SUBMIT";
      btn.disabled = false;
    }
  );
});

function showPopup(title, message, type) {
  const overlay = document.getElementById("popup-overlay");
  const card = document.getElementById("popup-card");
  const titleEl = document.getElementById("popup-title");
  const messageEl = document.getElementById("popup-message");

  titleEl.innerText = title;
  messageEl.innerText = message;

  if (type === "success") {
    card.classList.remove("error-card");
  } else {
    card.classList.add("error-card");
  }

  overlay.classList.add("active");
}
