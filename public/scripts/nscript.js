$(function () {
  $(window).scroll(function () {
    if ($(this).scrollTop() > 0) {
      $('#top').show();
    } else {
      $('#top').hide();
    }
  });
  $('#top').click(function () {
    // $(window).scrollTop(0);
    $('html,body').animate({ scrollTop: 0 }, 400);
  });
  $('#top').hover(
    function () { $(this).css('opacity', 1); },
    function () { $(this).css('opacity', 0.5); }
  );
  CallHtml('', 'home/index', 'renderbody');
});

function CallHtml(urls, path, bodyid) {
  if (urls == '') { urls = '/get' };
  $.ajax({
    type: "POST",
    cache: false,
    url: urls,
    dataType: "json",
    data: { "data": path },
    traditional: true,
    beforeSend: function () {
    },
    success: function (res) {
      var status = false;
      var message = 'ดำเนินการไม่สำเร็จ';
      if (res != null && res != undefined) {
        status = res.status;
        message = res.message != '' ? res.message : message;
      }
      if (status == false) {
      } else {
        $('#' + bodyid).empty();
        $('#' + bodyid).append(res.message);
      }
    },
    error: function (xhr, ajaxOption, thrownError) {
    },
    complete: function () {
    },
  });
}
