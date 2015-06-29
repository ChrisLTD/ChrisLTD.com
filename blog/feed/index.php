---
# Feed setup to use Mint RSS Tracking http://haveamint.com/peppermill/pepper/11/bird_feeder/
---
<?php
header("Content-Type:application/xml"); 
echo '<?xml version="1.0" encoding="utf-8"?'.">\r";

define('BIRDFEED', 'Posts');
include('../../../chrisltd_mint/feeder/index.php');
?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
	<channel>
		<title>Chris Johnson's Blog</title>
		<description></description>		
		<link>{{ site.url }}</link>
		<atom:link href="{{ site.url }}/blog/feed" rel="self" type="application/rss+xml" />
		{% for post in site.posts limit:8 %}
			<item>
				<title>{{ post.title | xml_escape }}</title>
				<description>{{ post.content | remove_footnote_link | relative_urls_to_absolute | xml_escape }}</description>
				<pubDate>{{ post.date | date: "%a, %d %b %Y 11:00:00 -0500" }}</pubDate>
				<link><?php $BirdFeeder->seed('{{ post.title }}', '{{ site.url }}{{ post.url }}'); ?></link>
				<guid isPermaLink="true">{{ site.url }}{{ post.url }}</guid>
			</item>
		{% endfor %}
	</channel>
</rss>