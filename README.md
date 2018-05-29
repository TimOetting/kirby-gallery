# Gallery Field for Kirby CMS

This is a custom gallery field for [Kirby](http://getkirby.com). It lets you pick and order your image files inside the page panel

Here is a blueprint example:

    fields:
      ...
      pictures:
        label: Gallery
        type: gallery

This gives you a field like this:

![Sort Mode](https://raw.githubusercontent.com/TimOetting/documentation-images/master/kirby-gallery/sort_mode.jpg)

By clicking the "Select images" Button you enter a select mode where you can pick the files to include to you gallery.

![Select Mode](https://raw.githubusercontent.com/TimOetting/documentation-images/master/kirby-gallery/select_mode.jpg)

The content will be YAML-structured. Inside the template, the field therefore has to be decoded as an array using $page->gallery()->yaml().

    ----

    Gallery: 

    - kermit-the-fog.jpg
    - the-sea.jpg
    - mountains.jpg
    - road.jpg
    - forrest.jpg
    
## Download and Installation 

### Requirements

- PHP 5.4.0+
- Kirby 2.3.0+

### Using [Kirby CLI](https://github.com/getkirby/cli)
If you’re using the [Kirby CLI](https://github.com/getkirby/cli), you need to cd to the root directory of your Kirby installation and run the following command:

```
kirby plugin:install TimOetting/kirby-gallery
```
This will download and copy the Gallery Fieldtype.

### Using Git Submodule

To install this plugin as a git submodule, execute the following command from the root of your kirby project:

```
git submodule add https://github.com/TimOetting/kirby-gallery.git site/fields/gallery
```

### Using Copy and Paste

Download the contents of this repository as ZIP-file.
Rename the extracted folder to `gallery` and copy it into the site/fields/ directory in your Kirby project.


## Options

### Changing the aspect ratio of the thumbnails
By default, all images are displayed in their original aspect ratio. If you would like to force a custom aspect ratio, i.e. to show the thumbnails as squares, you can pass the option ``aspectRatio``to with the format ``width:height`` your field in the blueprint:

    fields:
      ...
      pictures:
        label: Gallery
        type: gallery
        aspectRatio: 1:1

![Aspect Ratio](https://raw.githubusercontent.com/TimOetting/documentation-images/master/kirby-gallery/1to1.jpg)

    fields:
      ...
      pictures:
        label: Gallery
        type: gallery
        aspectRatio: 4:3

![Aspect Ratio](https://raw.githubusercontent.com/TimOetting/documentation-images/master/kirby-gallery/4to3.jpg)

### Show and hide file name

You can hide the filename under the thumbnail by adding the option ``displayFilename: false``to the blueprint:

    fields:
      ...
      pictures:
        label: Gallery
        type: gallery
        displayFilename: false

![Aspect Ratio](https://raw.githubusercontent.com/TimOetting/documentation-images/master/kirby-gallery/no_filenames.jpg)

