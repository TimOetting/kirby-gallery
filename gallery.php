<?php

class GalleryField extends BaseField {

  public $type = 'text';
  public $displayFilename = true;

  public function __construct(){
    // Build translation file path
    $baseDir = __DIR__ . DS . 'localization' . DS;
    $lang = panel()->language();
    if (file_exists($baseDir . $lang . '.php')) {
      require $baseDir . $lang . '.php';
    } else {
      require $baseDir . 'en.php';
    }
  }

  static public $assets = array(
    'js' => array(
      'gallery.js'
    ),
    'css' => array(
      'gallery.css'
    )
  );

  public function getImage($image, $width){
    if(!empty($this->aspectRatio)){
      return $image->crop($width, $width * $this->calcAspectRatio($this->aspectRatio));
    }
    return $image->width($width);
  }

  public function getRetinaImage($image){
    return $image->width($this->size);
  }

  public function calcAspectRatio($ratioString){
    $ratios = explode(':', $ratioString);
    return ((int) $ratios[1]) / ((int) $ratios[0]);
  }

  public function content() {
    return tpl::load(__DIR__ . DS . 'template.php', array('field' => $this, 'page' => $this->page));
  }

  public function result() {
    $result = parent::result();
    return yaml::encode($result);
  }

  public function value() {
    $value = parent::value();
    return yaml::decode($value);  
  }

}