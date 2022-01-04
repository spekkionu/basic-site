# 11ty Starter Template

Templating is done using the nunjucks templating language.

https://mozilla.github.io/nunjucks/templating.html

Styling is done using talwindcss.

https://tailwindcss.com/

### Creating a new page

Create a page by adding a `.njk` template file to the `src` directory.  

The urls for pages will match the filename of the template.  A `example.njk` file will be available at `/example/`.

#### Template Front Matter

Variable can be set be adding `front matter` to the top of the template files.

This can be done by adding the following to the top of a template file.

```
---
name: value
variable: value2
---

rest of template content
```

This template would have `{{ name }}` and `{{ variable }}` available in the template content and any included partials.

As a minimum a layout variable should be set to a layout template.

Generally a title and meta_description should also be set.
 
Other meta tags can be included by setting a meta_tags to a an array of tags with attributes for name, propery, and content.

Setting the `head` variable to a template file will include that file in the head.  This can be used to add custom tags to any page.

Setting the `scripts` variable to a template file will include that file at the bottom of the page before the closing body.  This can be used to add custom script tags to any page.

#### Page Layout

Site layouts are in `src/_includes/layouts`.

They can be changed for a page using the `layout` front matter variable.

By default there is a main layout that has the content contained and a full layout that fills the entire browser width.

Content in a full width page can be contained using the `container` class.

### Including template partials

Partials are stored in the `src/_includes` folder.

They can be included in any template using the include tag `{% include 'filename.njk' %}`.

Variables from the current page will still be available in the included template.

## Features

### Mobile Friendly Navigation

The main menu can be changed by editing `src/_data/menu.js`.

This file returns an array of links to include in the main menu.

Each link should include a `label` and a `href`.

Set the href to '#' for a hash link.

The menu currently does not support submenus.

### Page Header

The background for the page header can be changed on a page by setting a path to the image in a `header` variable in the page frontmatter.

The path should be relative from the `src` directory.

The page header can be disabled by setting a `hide_title` variable to true in the page front matter.

A `title_overlay` variable can be set to a rgb value to customize the overlay on the header image. 

```
header: _images/headers/header.jpg
title_overlay: rgba(0, 0, 0, 0.6)
```

### Call-To-Action

There is a default call to action displayed at the bottom of each page.

The call to action template can be changed by setting the `cta` front matter variable.  It defaults to `call-to-action.njk`.

The template should be in the `src/_includes` directory.

This can be disabled for a page by setting the variable to false.

It can be disabled site-wide by setting the variable to false in the layout template.

```
cta: call-to-action-template.njk
```

### Contact Form

Being a static site there are a few options for form processing.

#### Embedded Form

The simplest solution can be to use an embedded form from a service such a wufoo or google forms.

Any CRMs, help desk, or marketing software with an embeddable form can be used as well.

#### Netlify Forms

https://www.netlify.com/products/forms/

Netlify has built in functionality for processing form submissions.

This is a simple implementation that works if the person processing the form submissions has access to the netlify account.

The forms are filtered for SPAM using akismet.

The submissions are stored with the Netlify account and notifications can be configured using email, slack, or a webhook.

The webhook notification can be a netlify function to push the data elsewhere.

An example implementation can be found at `src/_includes/contact-form-netlify.njk`.

#### Netlify Function

https://www.netlify.com/products/functions/

A netlify serverless function can be used for custom processing of a form.

### Slider

A full-width slider can be created using the `{% slider %}` shortcode.

Each slide is added using a `<slide>` html tag inside the shortcode.

The slide should have an `image` attribute to set the slider image path relative from the `src` directory.

It can also have a `href` attribute to turn the slide into a link.

Any content inside the `<slide>` tag will be displayed on the slide in an overlay.

It is recommended to give any buttons in the content the classes `btn btn-slider` to style them nicely.

```
{% slider %}
    <slide image="_images/slider/slide1.jpg" href="/">
        hello this is slider content
    </slide>
    <slide image="_images/slider/slide2.jpg" >
        <div class="text-xl">Slide Header</div>
        <div>hello this is slider content</div>
        <div class="text-center mt-4"><a class="btn btn-slider" href="/">Click Me</a></div>
    </slide>
    <slide image="_images/slider/slide3.jpg" />
{% endslider %}
```

### Photo Gallery

A photo gallery can be created with the `{% gallery %}` shortcode.

The shortcode should contain a `<photo>` html tag for each image.

The photo can should include a `src` attribute with the path to the image relative from the `src` directory.

The alt tags and a caption can also be set in attributes.

The caption is shown in the lightbox popup.

```
{% gallery %}
    <photo src="_images/gallery/image1.jpg" alt="Alt tag" caption="Photo Caption" />
    <photo src="_images/gallery/image2.jpg" alt="Alt tag" caption="Photo Caption" />
    <photo src="_images/gallery/image3.jpg" alt="Alt tag" caption="Photo Caption" />
{% endgallery %}
```
    

### Social Media Links

The social media links can be configured in the `src/_data/social.js` file.

Each link should have the following structure:

```
{
    type: 'facebook',
    url: '#',
    label: 'Facebook',
    icon: 'facebook-f',
    color: '#3a589e',
}
```

The url should be set to the full url of the profile page on the platform.

The icon should be set to a font-awesome brand icon class without the `fa-` prefix.

The color should be set to the official brand color for the platform.

The label is used as the `aria-label` value for better accessibility and seo.

These links are also added to the organization schema.org data on the home page. 

### Google Tag Manager / Google Analytics

There is default integration with google tag manager.

The scripts will be included if the tag id is set.

By default this tag id is provided by the GTM_TAG_ID environment variable when building the site but can be changed in the `src/_data/site.js` data file.

Using google tag manager means many other tracking scripts can be included without having to include them in the templates.

This can also allow for a client to have more control without the site needed to be rebuild each time a script needs to be added.

### Image Processing / Responsive Images

Rather than just adding an `<img>` tag to a template using the `{% photo %}` shortcode will allow for automatic optimized responsive images.

The first parameter should be a path to the image relative to the `src` directory.

The second parameter can be an attributes object.  Any provided attributes with be added to the resulting `<img>` tag.  This is how the alt tag should be set.

Optionally a width can be set as a third parameter to resize the image to that width.  Setting a specific width will disable the responsive sizes.

#### Adding an image to a page

Include image with a `srcset` for each breakpoint. Breakpoints are 320, 640, 768, 1024, 1280, 2048.

Breakpoints larger than the original image size will not be included.

```
{% photo '_images/image-file.jpg', {alt:'image alt tag'} %}
```

Resize the image to 300px.

```
{% photo '_images/image-file.jpg', {alt:'image alt tag'}, 300 %}
```

#### Inlining svg images

SVG files can be inlined in content using the `{% svg %}` shortcode.

The first parameter is a path to the svg file relative from the src directory.

The second parameter is an alt tag that is set as the `aria-label` attribute.

The third parameter is an object with any other html attributes that should be added to the `<svg>` tag.  This can be used to set classes on the svg.

```
{% svg "_images/file.svg", "alt tag", {class: "extra-class"} %}
```

#### Adding a svg icon

Font Awesome icons can be added using the `{% icon %}` shortcode.

The first parameter should be the name of the font-awesome icon not including the `fa-` prefix.

The second parameter is the type of font-awesome icon (solid, regular, or brand).  It defaults to `solid`.

The third parameter is an object with any other html attributes that should be added to the `<svg>` tag.  This can be used to set classes on the svg.

```
{% icon 'facebook', 'brands', {class: 'extra-class'} %}
``` 

The icons will styled based on the font size and color.

### Organization Schema

Organization schema data is included on the home page.  The business name and address is pulled from the `src/_data/site.js` data file.

If further customization needs to be made the template can be edited directly at `src/_includes/schema/home.njk`.

#### Other Schema

Schema can be inluded in any page by setting a `schema` front matter variable and added a matching template in the `src/_includes/schema` directory.

This template should include a script tag with the json-ld content.

## Theming

Things like colors and backgrounds can be change in the `src/_data/site.js` data file.

This can be used for things like changing the background and text colors for the header, navigation menu, call-to-action, and footer.

The values should be tailwindcss classes.
