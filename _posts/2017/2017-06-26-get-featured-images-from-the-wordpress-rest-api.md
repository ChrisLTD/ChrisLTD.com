---
layout: post
title: Get Featured Images from the WordPress REST API
categories: dev
---
WordPress has a REST API. Really! There is even a pretty good [official handbook](https://developer.wordpress.org/rest-api/) on how to use it.

It’s a much cleaner and straightforward solution to dealing with WordPress content from JavaScript than the old [Admin AJAX](https://codex.wordpress.org/AJAX_in_Plugins) functionality. But there can be a few gotchas. One I recently ran into was having to make a separate query to get the source URL for a post’s [Featured Image](https://codex.wordpress.org/Post_Thumbnails) [^thumbnail].

## Standard request

Let’s look at a normal post endpoint. For our example, we’re going to retrieve information about a post with the ID 521 [^retrievepost].

``` bash
GET /wp-json/wp/v2/posts/521
```

In return you’ll get a JSON object with the data from your post.

```json
{
  "id": 521,
  "link": "http:\/\/chrisltd.com\/demo-post-3",
  "title": {
    "rendered": "Demo post 3"
  },
  "featured_media": 507,
  "_links": {
    "wp:featuredmedia": [
      {
        "embeddable": true,
        "href": "http:\/\/chrisltd.com\/wp-json\/wp\/v2\/media\/507"
      }
    ],
  }
  ...
}
```

All you get back is the ID of the Featured Media and a href where you can get more information. Now, you can use that href to find the URL of the image, but that requires firing off another request for each and every post you pull. But there is a better way.

## _embed to the rescue

Simply add `?embed` to the endpoint and WordPress will include the Featured Media object inside of your post object.

``` bash
GET /wp-json/wp/v2/posts/521?_embed
```

Now, you’ll get all the information you might need about your Featured Image, including URLs for each size.

```json
{
  "id": 521,
  "link": "http:\/\/chrisltd.com\/demo-post-3",
  "title": {
    "rendered": "Demo post 3"
  },
  "featured_media": 507,
  "_links": {
    "wp:featuredmedia": [
      {
        "embeddable": true,
        "href": "http:\/\/chrisltd.com\/wp-json\/wp\/v2\/media\/507"
      }
    ],
  },
  "_embedded": {
    "wp:featuredmedia": [
      {
        "id": 507,
        "date": "2017-05-31T14:51:05",
        "slug": "my-featured-image",
        "type": "attachment",
        "link": "http:\/\/chrisltd.com\/test-image",
        "title": {
          "rendered": "my-featured-image"
        },
        "author": 1,
        "caption": {
          "rendered": ""
        },
        "alt_text": "",
        "media_type": "image",
        "mime_type": "image\/jpeg",
        "media_details": {
          "width": 1624,
          "height": 1080,
          "file": "2017\/06\/my-featured-image.jpg",
          "sizes": {
            "thumbnail": {
              "file": "my-featured-image-150x150.jpg",
              "width": 150,
              "height": 150,
              "mime_type": "image\/jpeg",
              "source_url": "http:\/\/chrisltd.com\/wp-content\/uploads\/2017\/06\/my-featured-image-150x150.jpg"
            },
            "large": {
              "file": "my-featured-image-1024x681.jpg",
              "width": 1024,
              "height": 681,
              "mime_type": "image\/jpeg",
              "source_url": "http:\/\/chrisltd.com\/wp-content\/uploads\/2017\/06\/my-featured-image-1024x681.jpg"
            },
            "full": {
              "file": "my-featured-image.jpg",
              "width": 1624,
              "height": 1080,
              "mime_type": "image\/jpeg",
              "source_url": "http:\/\/chrisltd.com\/wp-content\/uploads\/2017\/06\/my-featured-image.jpg"
            }
          },
          "image_meta": {
            "aperture": "11",
            "credit": "Chris Johnson",
            "camera": "NIKON D3200",
            ...
          }
        },
        "source_url": "http:\/\/chrisltd.com\/wp-content\/uploads\/2017\/06\/my-featured-image.jpg",
      }
    ],
  },
  ...
}
```

[^thumbnail]: WordPress veterans might remember that Featured Images used to be called Post Thumbnails.

[^retrievepost]: The WordPress handbook has [more information on the endpoint](https://developer.wordpress.org/rest-api/reference/posts/#retrieve-a-post) for retrieving a post.