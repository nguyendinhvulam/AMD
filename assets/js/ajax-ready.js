$(document).ready(function() {
  $(function() {
    "use strict";
    if ($(".connectedSortable").length) {
      $(".connectedSortable").sortable({
        placeholder: "sort-highlight",
        connectWith: ".connectedSortable",
        handle: ".box-header, .nav-tabs",
        forcePlaceholderSize: true,
        zIndex: 999999
      });
      $(
        ".connectedSortable .box-header, .connectedSortable .nav-tabs-custom"
      ).css("cursor", "move");
    }

    if ($(".todo-list").length) {
      $(".todo-list").sortable({
        placeholder: "sort-highlight",
        handle: ".handle",
        forcePlaceholderSize: true,
        zIndex: 999999
      });
    }

    if ($(".daterange").length) {
      $(".daterange").daterangepicker(
        {
          ranges: {
            Today: [moment(), moment()],
            Yesterday: [
              moment().subtract(1, "days"),
              moment().subtract(1, "days")
            ],
            "Last 7 Days": [moment().subtract(6, "days"), moment()],
            "Last 30 Days": [moment().subtract(29, "days"), moment()],
            "This Month": [moment().startOf("month"), moment().endOf("month")],
            "Last Month": [
              moment()
                .subtract(1, "month")
                .startOf("month"),
              moment()
                .subtract(1, "month")
                .endOf("month")
            ]
          },
          startDate: moment().subtract(29, "days"),
          endDate: moment()
        },
        function(start, end) {
          window.alert(
            "You chose: " +
              start.format("MMMM D, YYYY") +
              " - " +
              end.format("MMMM D, YYYY")
          );
        }
      );
    }

    if ($(".knob").length) {
      $(".knob").knob();
    }
  });
  if ($(".no-search").length) {
    $(".no-search").chosen({
      disable_search: true
    });
  }

  if ($("select.form-control").length) {
    $("select.form-control").chosen({
      allow_single_deselect: true
    });
  }

  $(document).on("change", '.file-field input[type="file"]', function() {
    for (
      var e = $(this).closest(".file-field"),
        i = e.find("input.file-path"),
        n = $(this)[0].files,
        o = [],
        a = 0;
      a < n.length;
      a++
    )
      o.push(n[a].name);
    i.val(o.join(", ")), i.trigger("change");
  });
});


var copyText = function(text) {
  var copyFrom = document.createElement('textarea');
  copyFrom.setAttribute("style", "opacity:0;");
  copyFrom.value = text;
  document.body.appendChild(copyFrom);
  copyFrom.select();
  document.execCommand('copy');
  setTimeout(function() {
      document.body.removeChild(copyFrom);
  }, 1500);
};
