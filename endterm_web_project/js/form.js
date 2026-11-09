// ===== Page 2: form, validation and accordion =====
var emailRule = /^\S+@\S+\.\S+$/;
var phoneRule = /^\+?[0-9]{10,12}$/;

// Returns an error message, or "" if the field is fine
function getError(field) {
  var id = $(field).attr("id");
  var value = $(field).val().trim();

  if (id === "nick") {
    if (value === "") return "Enter a nickname";
    if (value.length < 3) return "Nickname: at least 3 characters";
  }
  if (id === "email") {
    if (value === "") return "Enter your email";
    if (!emailRule.test(value)) return "Email must look like name@mail.com";
  }
  if (id === "phone") {
    if (value === "") return "Enter your phone number";
    if (!phoneRule.test(value)) return "Phone: 10 to 12 digits, a leading + is allowed";
  }
  if (id === "area" && value === "") return "Choose a borough";
  if (id === "place" && value === "") return "Enter the exact place";
  if (id === "when" && value === "") return "Choose date and time";
  if (id === "sure") {
    if (value === "") return "Enter confidence from 1 to 10";
    var n = Number(value);
    if (n < 1 || n > 10) return "Confidence: a number from 1 to 10";
  }
  if (id === "text") {
    if (value === "") return "Describe what you saw";
    if (value.length < 10) return "Description: at least 10 characters";
  }
  if (id === "promise" && !$(field).prop("checked")) {
    return "You must make this promise";
  }
  return "";
}

function checkField(field) {
  var message = getError(field);
  $(field).toggleClass("is-invalid", message !== "");
  $(field).closest(".mb-3").find(".error").text(message);
}

// The error appears when you leave a field and disappears when fixed
$("#form .check").on("blur change", function () {
  checkField(this);
});
$("#form .check").on("input", function () {
  if ($(this).hasClass("is-invalid")) {
    checkField(this);
  }
});

$("#form").submit(function (e) {
  e.preventDefault();
  $(this).find(".check").each(function () {
    checkField(this);
  });

  if ($(this).find(".is-invalid").length === 0) {
    $("#form")[0].reset();
    $("#success").stop(true, true).fadeIn(300).delay(3500).fadeOut(400);
  }
});

// Accordion: observer rules
$(".question").click(function () {
  var answer = $(this).next(".answer");
  $(".answer").not(answer).slideUp(300);
  $(".question").not(this).removeClass("open");
  answer.stop().slideToggle(300);
  $(this).toggleClass("open");
});
