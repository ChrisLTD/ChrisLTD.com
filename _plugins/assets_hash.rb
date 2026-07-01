# Compute a stable per-build hash of the SCSS source tree and expose it
# to Liquid as `site.assets_hash`. Templates append it as a query string
# (`?h={{ site.assets_hash }}`) so browsers refetch styles.css only when
# it actually changes, without any manual version bumping.
#
# Runs at priority :highest so the value is available to every layout /
# include that renders after it.

require "digest"

module AssetsHash
  class Generator < Jekyll::Generator
    priority :highest
    safe true

    HASH_SOURCES = ["scss/**/*.scss"].freeze
    HASH_LEN = 8

    def generate(site)
      digest = Digest::SHA1.new
      files_for(site).each { |path| digest.update(File.read(path)) }
      site.config["assets_hash"] = digest.hexdigest[0, HASH_LEN]
    end

    private

    def files_for(site)
      HASH_SOURCES.flat_map { |pattern| Dir.glob(File.join(site.source, pattern)) }.sort
    end
  end
end
