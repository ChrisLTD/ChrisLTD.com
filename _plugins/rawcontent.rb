# https://stackoverflow.com/questions/13159286/how-can-i-access-un-rendered-markdown-content-in-jekyll-with-liquid-tags
# https://gist.github.com/matthewowen/4025507

module Jekyll

  class RawContent < Generator

    def generate(site)
      site.posts.each do |post|
        post.data['raw_content'] = post.content
      end
    end
  
  end

end