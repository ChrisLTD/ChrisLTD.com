require 'liquid'

module RSSFilters

    def relative_urls_to_absolute(content)
      # set your site's url
      url = @context.registers[:site].config['url'] + '/'
      
      # rewrite all src and href attributes that begin with /
      content
      .gsub(Regexp.quote("src='/"), "src='" + url)
      .gsub(Regexp.quote("href='/"), "href='" + url)
    end
    
    def remove_anchor_links(content)
    	content.gsub(/ href='#[^\s]*'/, '')
    end

end

Liquid::Template.register_filter(RSSFilters)
