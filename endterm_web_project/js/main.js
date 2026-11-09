// ===== Shared: scroll-to-top button and smooth scroll =====
$(window).scroll(function () {
  $("#toTop").toggle($(this).scrollTop() > 300);
});

$("#toTop").click(function () {
  $("html, body").stop().animate({ scrollTop: 0 }, 500);
});

$("a.smooth").on("click", function (e) {
  e.preventDefault();
  var top = $($(this).attr("href")).offset().top;
  $("html, body").stop().animate({ scrollTop: top }, 500);
});

// ===== Page 1: spot cards (only if #spotsList exists) =====
var currentDistrict = "all";

function updateStats() {
  var total = 0;
  var top = spots[0];
  for (var i = 0; i < spots.length; i++) {
    total += spots[i].count;
    if (spots[i].count > top.count) {
      top = spots[i];
    }
  }
  $("#statTotal").text(total);
  $("#statTop").text(top.name);
  $("#statPlaces").text(spots.length);
}

function renderSpots(list) {
  var box = $("#spotsList");
  box.empty();
  $("#found").text("Places found: " + list.length);

  if (list.length === 0) {
    $("#empty").show();
    return;
  }
  $("#empty").hide();

  for (var i = 0; i < list.length; i++) {
    var s = list[i];
    var card = $("<article></article>").addClass("spot-card comic-panel h-100");
    card.append($("<h3></h3>").text(s.name));
    card.append($("<p></p>").addClass("spot-area").text(s.district));
    card.append($("<p></p>").text(s.text));
    card.append($("<p></p>").html("Sightings: <strong>" + s.count + "</strong>"));
    card.append($("<button></button>").addClass("btn btn-web seen-btn").attr("data-id", s.id).text("I saw him too!"));
    box.append($("<div></div>").addClass("col").append(card));
  }
}

function applyFilters() {
  var query = $("#search").val().trim().toLowerCase();
  var result = [];
  for (var i = 0; i < spots.length; i++) {
    var s = spots[i];
    var okDistrict = currentDistrict === "all" || s.district === currentDistrict;
    var okSearch = s.name.toLowerCase().indexOf(query) !== -1;
    if (okDistrict && okSearch) {
      result.push(s);
    }
  }
  renderSpots(result);
}

if ($("#spotsList").length > 0) {
  updateStats();
  applyFilters();

  $("#search").on("input", applyFilters);

  $(".filter").click(function () {
    currentDistrict = $(this).data("district");
    $(".filter").removeClass("active");
    $(this).addClass("active");
    applyFilters();
  });

  $("#spotsList").on("click", ".seen-btn", function () {
    var id = $(this).data("id");
    for (var i = 0; i < spots.length; i++) {
      if (spots[i].id === id) {
        spots[i].count++;
      }
    }
    updateStats();
    applyFilters();
  });
}
