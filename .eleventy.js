const yaml = require("js-yaml");

function slidePath(slide) {
  const number = String(slide.number).padStart(2, "0");
  return `/slides/${number}-${slide.slug}/`;
}

function slideAsset(slide) {
  const image = slide.image.endsWith(".webp")
    ? slide.image
    : slide.image.replace(/\.png$/i, ".webp");
  return `/assets/slides/${image}`;
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addDataExtension("yaml", (contents) => yaml.load(contents));
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

  eleventyConfig.addFilter("slidePath", slidePath);
  eleventyConfig.addFilter("slideAsset", slideAsset);
  eleventyConfig.addFilter("sourceEntries", (sources) =>
    Object.entries(sources || {}).map(([key, source]) => ({ key, ...source }))
  );
  eleventyConfig.addFilter("sourceGroups", (sources) => {
    const groups = new Map();
    for (const [key, source] of Object.entries(sources || {})) {
      const type = source.type || "reference";
      if (!groups.has(type)) {
        groups.set(type, []);
      }
      groups.get(type).push({ key, ...source });
    }
    return Array.from(groups, ([type, items]) => ({ type, items }));
  });
  eleventyConfig.addFilter("resolveSources", (keys, sources) =>
    (keys || []).map((key) => ({ key, ...(sources[key] || {}) }))
  );
  eleventyConfig.addFilter("paragraphs", (value) =>
    String(value || "")
      .split(/\n\s*\n/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean)
  );

  return {
    pathPrefix: "/pyconau-passkeys/",
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk"
  };
};
