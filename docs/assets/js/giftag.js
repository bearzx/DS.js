(function($){
    var gif = [];

    $('figure.animated_gif_frame img').each(function(i, n) {
        var data = $(n).attr('src').replace(/\.(png|jpg)$/,'.gif');
        gif.push(data);
        $(n).attr('data-source', data).data('alt', data).on('click', function() {
          var $img = $(this),
              imgSrc = $img.attr('src'),
              imgAlt = $img.attr('data-source'),
              imgExt = imgAlt.replace(/^.*?\.(\w+)$/,'$1');

          if(imgExt === 'gif') {
              $img.attr('src', $img.data('alt')).attr('data-source', imgSrc);
              $img.closest('.animated_gif_frame').addClass('playing');
          } else {
              $img.attr('src', imgAlt).attr('data-source', $img.data('alt'));
              $img.closest('.animated_gif_frame').removeClass('playing');
          }
        });
    });

    var image = [];

    $.each(gif, function(index) {
        image[index]     = new Image();
        image[index].src = gif[index];
    });
})(jQuery);