

(function($) {
  var Gallery = function(el) {
    var element   = $(el)
    var api       = element.data('api');
    var mainForm  = element.closest('form.form');
    var keepUrl   = mainForm.data('keep')
    var offsetFix = true;

    element.on('click', '.galleryField__removeBtn', function(e){
      $(this).closest('.galleryField__item').remove()
      keepState(app.content.reload);
    })

    element.on('click', '.galleryField__addBtn', function(e){
      e.preventDefault()
      var selectListContent = element.find('.galleryField__selectTemplate').html()
      element.find('.galleryField__items--select').html(selectListContent)
      element.find('.galleryField__items--select').removeClass('hidden');
      element.find('.galleryField__items--sort').addClass('hidden');
    })

    element.on('click', '.galleryField__saveSelectionBtn', function(e){
      e.preventDefault()
      var sortedItems = element.find('.galleryField__items--sort .galleryField__item')
      var selectedItems = element.find('.galleryField__items--select .galleryField__item--selected')
      var oldSelected = sortedItems.map(function(){
        return $(this).data('image-name')
      }).toArray()
      var newSelected = selectedItems.map(function(){
        return $(this).data('image-name')
      }).toArray()
      oldSelected.forEach(function(item, index){
        if ($.inArray(item, newSelected) == -1){
          element.find('.galleryField__items--sort [data-image-name="'+item+'"]').remove();
        }
      })
      newSelected.forEach(function(item, index){
        if ($.inArray(item, oldSelected) == -1){
          var inputElement = element.find('.galleryField__inputTemplate').html()
          inputElement = $(inputElement)
          inputElement.val(item)
          element.find('.galleryField__items--sort').append(inputElement)
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
      $.post(keepUrl+'?'+mainForm.serialize(), function( data ) {
        callback()
      });
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