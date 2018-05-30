

(function($) {
  var Gallery = function(el) {
    var element   = $(el)
    var api       = element.data('api');
    var mainForm  = element.closest('form.form');
    var keepUrl   = mainForm.data('keep');
    var offsetFix = true;

    element.on('click', '.galleryField__removeBtn', function(e){
      $(this).closest('.galleryField__item').remove();
      keepState(app.content.reload);
    })

    element.on('click', '.galleryField__addBtn', function(e){
      e.preventDefault()
      var selectListContent = element.find('.galleryField__selectTemplate').html();
      $('.galleryField__items--select', element).html(selectListContent);
      $('.galleryField__items--select', element).removeClass('hidden');
      $('.galleryField__items--sort', element).addClass('hidden');
    })

    element.on('click', '.galleryField__saveSelectionBtn', function(e){
      e.preventDefault();
      var sortedItems = $('.galleryField__items--sort .galleryField__item', element);
      var selectedItems = $('.galleryField__items--select .galleryField__item--selected', element);
      var oldSelected = sortedItems.map(function(){
        return $(this).data('image-name');
      }).toArray()
      var newSelected = selectedItems.map(function(){
        return $(this).data('image-name');
      }).toArray()
      oldSelected.forEach(function(item, index){
        if ($.inArray(item, newSelected) == -1){
          element.find('.galleryField__items--sort [data-image-name="'+item+'"]').remove();
        }
      })
      newSelected.forEach(function(item, index){
        if ($.inArray(item, oldSelected) == -1){
          var inputElement = $('.galleryField__inputTemplate', element).html()
          inputElement = $(inputElement);
          inputElement.val(item);
          $('.galleryField__items--sort').append(inputElement);
        }
      })
      keepState(app.content.reload);
    })

    element.on('click', '.galleryField__items--select .galleryField__item', function(e){
      $(this).toggleClass('galleryField__item--selected')
    })

    element.find('.galleryField__sort').sortable({
      start: function(e, ui){
        if(offsetFix){
          ui.item.css('margin-top', -$('.mainbar').scrollTop() );
        }
        element.find('.galleryField__sort .galleryField__item').height(Math.round($('.galleryField__sort .galleryField__item').height()))
      },
      change: function(e, ui){
        if(offsetFix){
          ui.item.css('margin-top', 0);
          offsetFix = false;
        }
      },
      stop: function(e, ui){

        if(offsetFix){
          offsetFix = false;
          ui.item.css('margin-top', 0);
        }
        element.find('.galleryField__sort .galleryField__item').height('')
      },
      update: function(){
        keepState(app.content.reload);
      }
    });

    var keepState = function(callback){
      if(typeof keepUrl === 'undefined') {
        // Compatibility with KirbyBuilder Plugin (https://github.com/TimOetting/kirby-builder)
        var kirbyBuilder = mainForm.closest('.builder-entry');

        if(kirbyBuilder) {
          var fieldID = mainForm.closest('.builder-entry').find('.builder-entry-quickform-container').data('quickform-container');
          var data = mainForm.serialize().split(fieldID + '-').join('');
          var url = mainForm.attr('action');
          var urlParamSeparator = (url.indexOf('?') > -1) ? '&' : '?'

          $.ajax({
            type: "POST",
            url: url + urlParamSeparator + data,
            success: function(){
              // don't relead as always, because we are now witihin the builder panel
            }
          });
        }
      } else {
        // default behaviour
        $.post(keepUrl+'?'+mainForm.serialize(), function( data ) {
          callback();
        });
      }
    }

    var showSelectList = function(e){

    }

  };

  $.fn.gallery = function() {
    return this.each(function() {

      if($(this).data('gallery')) {
        return $(this).data('gallery');
      } else {
        var gallery = new Gallery(this);
        $(this).data('gallery', gallery);
        return gallery;
      }

    });

  };

})(jQuery);