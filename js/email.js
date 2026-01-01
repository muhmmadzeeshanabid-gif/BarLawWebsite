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
      alert("✅ Message sent successfully!");
      form.reset();
      btn.innerText = "SUBMIT";
      btn.disabled = false;
    },
    function (error) {
      alert("❌ Message send nahi hui");
      console.log(error);
      btn.innerText = "SUBMIT";
      btn.disabled = false;
    }
  );
});
