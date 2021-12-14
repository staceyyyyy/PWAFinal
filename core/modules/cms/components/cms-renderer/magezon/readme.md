**Magezon** is an extension  page builder from Magento to make content generators like Heading, Text, Button, and more.
Detail can be read in [Magezon Page Builder](https://www.magezon.com/magezon-page-builder-for-magento-2.html) 

## General
Magezon component can be rendered from conditional with cms renderer. If content cms between tag `[mgz_pagebuilder]` cms content will be rendered as Magezon Component.
Component magezon renderer can be shown in file
`core/modules/cms/components/cms-renderer/MagezonRenderer.js`

## List Element
- [Column](#column)
- [Row](#row)
- [Heading](#heading)
- [Button](#button)
- [Text](#text)
- [SingleImage](#singleimage)
- [Link](#link)
- [Raw HTML](#raw-html)


## Column
Column is element magezon for render column html like column from flexbox-grid.

Column has object can be rendered on SwiftPWA i.e
| Object        | Description   |
| ------------- |-------------|
| `elements`     | this object for render child element (all from list element magezon) |
|`base object` | all base object [list base object](#base-object) |
|`[device]_size`| `[device]` will be replace `(xs, sm, md, lg, xl)` example `sm_size`. And this object has value number, finally this value to render grid number, example `sm_size: 12` then can be rendered `col-sm-12`|
|`[device]_offsite_size`| `[device]` will be replace `(xs, sm, md, lg, xl)` example `sm_offsite_size`. And this object has value number, finally this value to render grid number, example `sm_size: 12` then can be rendered `col-sm-offset-12`|


## Row
Row is element magozon for render row to be child column element
Row has object can be rendered on SwiftPWA i.e
| Object        | Description   |
| ------------- |-------------|
| `elements`     | this object for render child element (all from list element magezon) |
|`base object` | all base object [list base object](#base-object) |


## Heading
Heding is element magezon for render Heading element `(h1, h2, h3, ..etc)`

Heading has object can be rendered on SwiftPWA i.e
| Object        | Description   |
| ------------- |-------------|
| `elements`     | this object for render child element (all from list element magezon) |
|`base object` | all base object [list base object](#base-object) |
|`heading_type` | type of heading enum from heading html `(h1, h2, h3, h4, h5, h6)` |
|`text`| value of text heading |
|`font_size`| custom styling font size heading `(px)`|
|`font_weight`| custom styling font wieght heading `(font weight css)` |
|`color`| custom styling font color heading|
| `link` | this value from render component/element magezon Link, detail ata [here](#link) |


## Button
Button is element magezon for render button component

Button has object can be rendered on SwiftPWA i.e
| Object        | Description   |
| ------------- |-------------|
| `elements`     | this object for render child element (all from list element magezon) |
|`base object` | all base object [list base object](#base-object) |
|`title`| value of text heading |
| `link` | this value from render component/element magezon Link, detail ata [here](#link) |

## Text
Text is element magezon for render all content from content editor magezon. This content can be used to render cms-renderer, so this component use component `WidgetRenderer` cms.

Text has object can be rendered on SwiftPWA i.e
| Object        | Description   |
| ------------- |-------------|
| `elements`     | this object for render child element (all from list element magezon) |
|`base object` | all base object [list base object](#base-object) |
|`content`| this value to render `WidgetRenderer` cms |

## SingleImage
Single Image is element magezon to render one image with any action or style.

SingleImage has object can be rendered on SwiftPWA i.e
| Object        | Description   |
| ------------- |-------------|
| `elements`     | this object for render child element (all from list element magezon) |
|`base object` | all base object [list base object](#base-object) |
| `source` | type source image `media_library` or custom source url |
| `custom_src` | source url image |
| `image` | name file for source image from `media_library` |
| `alt_tag` | alt tag image |
| `image_width` | style width image |
| ``image_height`` | style height image |
| `onclick` | type event click with value enum `(custom_link, magnific, pd, video_map)` |
| `custom_link` | this value from render component/element magezon Link, detail ata [here](#link). if condition `onclick` is `custom_link` |
| `title` | text title image |
| `description` | text description image |
| `image_style` | type of style image with value enum `(mgz-box-outline, mgz-box-shadow, mgz-box-shadow2, mgz-box-shadow-3d)` |
| `image_border_style` | to render style border image (all type border html) |
| `image_border_width` | to render style border width image |
| `image_border_radius` | to render style border radius image |
| `image_border_color` |to render style border color image|
| `title_font_size` | to render style text title image |
| `image_hover_effect` | type style hover effect image, with value enum `(zoomin, zoomout, liftup)` |
| `display_on_hover` | condition display content image |
| `content_position` | posisition for `title` and `description` |
| `content_align` | align style for `title` and `description`  |
| `popup_image` | image source for replace image if `onclick` type is `magnific` |
| `hover_image` | display image if hover (image secondary) |
| `content_background` | background color for content image (`title` and `description`)|
| `content_color` | font color for content image (`title` and `description`) |
| `title_font_weight` | style font weight for `title` image|
| `description_font_weight` | style font weight for `description` image |
| `description_font_size` | style font size for `description` image |
| `video_map` | source url to render iframe embed maps or video  |

## Link
Link is object string from magezone which will render component `MagezonLink` (code can be show at `core/modules/cms/components/cms-renderer/magezon/MagezonLink.js`


## Raw HTML
Raw Html is element magezon to render custom raw html component.
Raw Html has object can be rendered on SwiftPWA i.e
| Object        | Description   |
| ------------- |-------------|
| `elements`     | this object for render child element (all from list element magezon) |
|`base object` | all base object [list base object](#base-object) |
|`content`| this value to render raw string to html with `dangerouslySetInnerHTML` react|

## Base Object
Base object is list object  has on every element magezon.
here is a list of base object
- [css animation](#css-animation)
- [disable element](#disable-element)
- [hide on page load](#hide-on-page-load)
- [hide on screen](#hide-on-specific-screen)
- [element id](#element-id)
- [z index](#z-index)
- [element class attribute](#element-class-attribute)

## Css animation
css animation is setting for element magezon to add animation style. This animation using [`animate.css`](https://animate.style) by default.

Cass animation if has set on the element can add object response for element, i.e
| Object        | Description   |
| ------------- |-------------|
|`animation_in` | type of animate will be applicated.|
| `animation_infinite`| to make animate run infinite |
|`animation_delay` | to make delayed between run animate infinite (in a second)|
|`animation_duration` | duration time (in second) to run animate (if not infinite) |


## Disable Element
Disable element is setup element to disable (not showing/render)
This setting have object value
| Object        | Description   |
| ------------- |-------------|
|`disable_element`| boolean to condition hide or show element magezon |

## Hide on Page Load
Disable element on page load (SSR)
This setting has object value
| Object        | Description   |
| ------------- |-------------|
|`hidden_default`| boolean to condition hide or show element magezon on page load (SSR) |

## Hide on Specific Screen
this mean to setting element can be hidden on a specific  screen size
this setting has object values
| Object        | Description   |
| ------------- |-------------|
|`xs_hide` | to make condition hide on screen mobile (extra small) |
|`sm_hide` | to make condition hide on aupper mobile screen (table potrait) |
|`md_hide` | to make condition hide on screen tablet and small desktop |
|`lg_hide` | to make condition hide on screen desktop and upper |

## Element ID
this setup to add selector id into element magezon
this setting has object values
| Object        | Description   |
| ------------- |-------------|
|`el_id`| string selector id for element magezon| 
## Z-Index
this setup to make inline style zIndex into element magezon
this setting has object values
| Object        | Description   |
| ------------- |-------------|
|`z_index`| number of z index element magezon| 

## Element Class Attribute
this setup to add the class name into element magezon
this setting has object values
| Object        | Description   |
| ------------- |-------------|
|`el_class`| string class name selector element magezon |