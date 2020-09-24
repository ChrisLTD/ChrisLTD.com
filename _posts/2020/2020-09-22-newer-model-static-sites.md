---
layout: post
title: Newer model static sites
---
Sites that are served statically (meaning they aren’t backed by a scripting language or a database) have big advantages in terms of speed, simplicity, and security. But as [Leon Paternoster notes](https://www.leonpaternoster.com/posts/static/), the definition of static sites is changing, and we’re losing speed and simplicity in the process.

> Under the traditional static model, the heavy lifting of building pages from includes and local or external data is done when the website is compiled into flat HTML files, whether that’s on a PC or a server. This happens out of view (hence [Jekyll](https://jekyllrb.com/), incidentally), completely separately from any user involvement. Javascript is used to enhance UI, perhaps through offering sorting or filtering functions. All the user does is download the HTML file and its assets.
>
> Under a newer model (which even has its own Netlify-created brand name of JAMstack) much of this heavy lifting is moved to the user’s browser. Websites are created as SPAs, where HTML, CSS, data and javascript are downloaded in one bundle and the javascript creates pages based on user interaction.

The issue with a “newer model” static site is that the JavaScript required to render a page is often so large and complex that it can take a significant amount of time to download and then execute on a device. That could be a recipe for frustration when visitors have spotty internet connections or are using relatively slow phones or laptops.