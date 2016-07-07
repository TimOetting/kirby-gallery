<div class="galleryField" 
data-field="gallery" 
data-sortable="true"
data-api="<?php __($field->url('sort')) ?>" 
>

  <div class="galleryField__items galleryField__items--sort">

    <div class="galleryField__sort">
      <?php if (count($field->value()) == 0): ?>
        <div class="galleryField__empty">
          <?= l('gallery.empty') ?>
        </div>
      <?php endif ?>
      <?php foreach ($field->value() as $listItemValue): ?>
        <?php if ($image = $page->image($listItemValue)): ?>
          <figure class="file galleryField__item" data-image-name="<?= $image->filename() ?>">
            <div class="galleryField__imgContainer"
            <?php if (!empty($field->aspectRatio)): ?>
              style="padding-top:<?= $field->calcAspectRatio($field->aspectRatio) * 100 ?>%"
            <?php endif ?>
            >
              <img class="galleryField__img" srcset="<?= $field->getImage($image, 300)->url() ?> 1x, <?= $field->getImage($image, 600)->url() ?> 2x" src="<?= $field->getImage($image, 300)->url() ?>" alt="">
            </div>
            <?php if ($field->displayFilename): ?>
              <figcaption class="file-info galleryField__itemCaption">
                <span class="file-name cut"><?= $image->filename() ?></span>
              </figcaption>
            <?php endif ?>
            <nav class="galleryField__itemControl">
              <a class="galleryField__itemBtn btn" href="<?= $image->url('edit') ?>">
                <i class="icon icon-left fa fa-pencil"></i>
              </a>
              <button data-modal="" class="galleryField__itemBtn btn galleryField__removeBtn">
                <i class="icon icon-left fa fa-remove"></i>
              </button>
            </nav>
            <input type="hidden" name="<?= $field->name() . '[]' ?>" value="<?= $listItemValue ?>">
          </figure>
        <?php endif ?>
      <?php endforeach ?>
    </div>
    <div class="galleryField__control">
      <button class="btn btn-rounded galleryField__addBtn"><?= _l('gallery.selectImages') ?></button>
    </div>
  </div>
  <div class="galleryField__items galleryField__items--select hidden">
    
  </div>
  <script class="galleryField__selectTemplate" type="text/template">
    <?php foreach ($page->images()->sortBy('sort', 'asc') as $image): ?>
      <figure class="file galleryField__item <?= in_array($image->filename(), $field->value()) ? 'galleryField__item--selected' : '' ?>" data-image-name="<?= $image->filename() ?>">
        <div class="galleryField__imgContainer"
        <?php if (!empty($field->aspectRatio)): ?>
          style="padding-top:<?= $field->calcAspectRatio($field->aspectRatio) * 100 ?>%"
        <?php endif ?>
        >
          <img class="galleryField__img" srcset="<?= $field->getImage($image, 300)->url() ?> 1x, <?= $field->getImage($image, 600)->url() ?> 2x" src="<?= $field->getImage($image, 300)->url() ?>" alt="">
        </div>
        <?php if ($field->displayFilename): ?>
          <figcaption class="galleryField__itemCaption">
            <span class="cut"><?= $image->filename() ?></span>
          </figcaption>
        <?php endif ?>
        <nav class="galleryField__itemControl">
          <div href='#' class="galleryField__itemBtn galleryField__itemBtn--single btn ">
            <i class="icon icon-left fa fa-check"></i>
          </div>
        </nav>
      </figure>
    <?php endforeach ?>
    <div class="galleryField__control">
      <button class="btn btn-rounded galleryField__saveSelectionBtn "><?= _l('ok') ?></button>
    </div>
  </script>
  <script class="galleryField__inputTemplate" type="text/template">
    <input type="hidden" name="<?= $field->name() . '[]' ?>" value="">
  </script>
</div>