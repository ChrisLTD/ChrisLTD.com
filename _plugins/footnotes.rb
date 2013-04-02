# Title: Footnote Liquid Filter
# Author: Syeong Gan
# Description: Liquid filters to modify footnote markup (useful for blog index
#     pages where the same footnote reference may be used multiple times as
#     articles are compiled)
#
# http://syeong.jcsg.com/2012/07/07/octopress-footnote-problem/
#
# Example Usage
# {% if index %}
#   {% capture excerpted %}{{ content | has_excerpt }}{% endcapture %}
#   {% if excerpted == 'true' %}
#   <div class="entry-content">{{ content | excerpt | remove_footnote_link }}</div>
#     <footer>
#       <a rel="full-article" href="{{ root_url }}{{ post.url }}">{{ site.excerpt_link }}</a>
#     </footer>
#   {% else %}
#   <div class="entry-content">{{ content | excerpt | rename_footnote_link }}</div>
#   {% endif %}
# {% else %}
# <div class="entry-content">{{ content }}</div>
# {% endif %}
module FootnoteLiquidFilters
	# Appends a random integer to the footnote reference link
	#     Note, this is a hackish workaround (not foolproof if the same random
	#     happens to be generated twice)
	def rename_footnote_link(input)
		random = rand(999)
		input.gsub(/fn:\d+/, '\0-'+"#{random}").gsub(/fnref:\d+/, '\0-'+"#{random}")
	end
	# Removes footnote links entirely
# 	def remove_footnote_link(input)
# 		input.gsub(/href\=\"#fn:\d+\"/, '').gsub(/href\=\"#fnref:\d+\"/, '')
# 	end
end
	
Liquid::Template.register_filter FootnoteLiquidFilters

puts "Running FootnoteLiquidFilters Plugin"