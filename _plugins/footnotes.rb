# Title: Footnote Liquid Filter
# Author: Chris Johnson
# Description: Liquid filters to modify footnote markup. Used on the blog
#     index where the same footnote reference may appear in multiple
#     articles, and in the RSS feed where in-page anchor links don't work.

require 'digest'

module FootnoteLiquidFilters
	# Prefixes footnote ids/refs with a stable per-post token so multiple
	# posts on the same rendered page can't collide.
	def rename_footnote_link(input, token = nil)
		token ||= Digest::SHA1.hexdigest(input.to_s)[0, 8]
		input.gsub(/fn:/, "fn:#{token}-").gsub(/fnref:/, "fnref:-#{token}-")
	end

	# Strips footnote anchor links and back-arrows so they don't break
	# in environments without in-page anchors (e.g., feed readers).
	def remove_footnote_link(input)
		input.gsub(/ href=("|')#(fn|fnref):\S+\1/, '').gsub(/&#8617;/, '')
	end
end

Liquid::Template.register_filter FootnoteLiquidFilters
