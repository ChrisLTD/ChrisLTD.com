# Title: Footnote Liquid Filter
# Author: Chris Johnson
# Description: Liquid filters to modify footnote markup. Useful for blog index
#     pages where the same footnote reference may be used multiple times as
#     articles are compiled. Also for rss feeds where footnote links won't work.
#
# Based on code from: Syeong Gan http://syeong.jcsg.com/2012/07/07/octopress-footnote-problem/
#
# Example Usage:
#   <div class="entry-content">{{ content | excerpt | remove_footnote_link }}</div>
#   <div class="entry-content">{{ content | excerpt | rename_footnote_link }}</div>

module FootnoteLiquidFilters
	# Appends a random integer to the footnote reference link
	def rename_footnote_link(input)
		random = rand(9999)
		input.gsub(/fn:/, '\0'+"#{random}-").gsub(/fnref:/, '\0-'+"#{random}-")
	end
	# Removes footnote hrefs entirely
	def remove_footnote_link(input)
		input.gsub(/ href='#(fn|fnref):\d+'/, '').gsub(/&#8617;/, '')
	end
end
	
Liquid::Template.register_filter FootnoteLiquidFilters

puts "Running FootnoteLiquidFilters Plugin"