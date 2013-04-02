---
# Feed setup to use Mint RSS Tracking http://haveamint.com/peppermill/pepper/11/bird_feeder/
layout: nil
---
<?php
define('BIRDFEED', 'Posts');
include('../../../chrisltd_mint/feeder/index.php');

header("Content-Type:text/xml"); 
echo '<?xml version="1.0" encoding="utf-8"?'.">\r";
?>
<feed xmlns="http://www.w3.org/2005/Atom">
 
 <title>Chris Johnson's Blog</title>
 <link href="{{ site.url }}/blog/feed/" rel="self"/>
 <link href="{{ site.url }}"/>
 <updated>{{ site.time | date_to_xmlschema }}</updated>
 <id>{{ site.url }}/</id>
 <author>
   <name>Chris Johnson</name>
 </author>

 {% for post in site.posts limit:15 %}
  {% unless post.draft %}
   <entry>
     <title>{{ post.title }}</title>
     <link href="<?php $BirdFeeder->seed('{{ post.title }}', '{{ site.url }}{{ post.url }}'); ?>"/>
     <updated>{{ post.date | date_to_xmlschema }}</updated>
     <id>{{ site.url }}{{ post.id }}</id>
     <content type="html">{{ post.content | remove_footnote_link | xml_escape }}</content>
   </entry>
  {% endunless %}
 {% endfor %}
 
</feed>