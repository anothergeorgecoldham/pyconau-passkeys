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
    const groupDefinitions = [
      {
        label: "Start here",
        match: /developer reference|Australian government public guidance/i
      },
      {
        label: "Standards and security guidance",
        match: /standard|government guidance|application security/i
      },
      {
        label: "Implementation references",
        match: /developer documentation|hyperscaler developer/i
      },
      {
        label: "Enterprise deployment",
        match: /enterprise|industry body|identity platform/i
      },
      {
        label: "Site build",
        match: /SSG/i
      }
    ];
    const groups = new Map(groupDefinitions.map((group) => [group.label, []]));
    for (const [key, source] of Object.entries(sources || {})) {
      const type = source.type || "reference";
      const group = groupDefinitions.find((candidate) => candidate.match.test(type));
      groups.get(group ? group.label : "Other references").push({ key, ...source });
    }
    return Array.from(groups, ([type, items]) => ({ type, items })).filter((group) => group.items.length);
  });
  eleventyConfig.addFilter("audienceParagraphs", (value) => {
    const replacements = new Map([
      ["Good morning. I’m going to talk about passkeys, but I want to start by saying this is not really a talk about a new login feature. It is a talk about why authentication keeps failing, why we keep blaming the wrong thing, and why passkeys represent a genuinely different model.", "This is not really a talk about a new login feature. It is a talk about why authentication keeps failing, why we keep blaming the wrong thing, and why passkeys represent a genuinely different model."],
      ["Now, I want to be very clear: password managers are good. MFA is good.", "Password managers are good. MFA is good."],
      ["Now let’s look at the first major real-world failure mode: phishing.", "The first major real-world failure mode is phishing."],
      ["So where does this leave us?", "This leaves us with a different way to think about authentication."]
    ]);
    return String(value || "")
      .split(/\n\s*\n/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean)
      .map((paragraph) => replacements.get(paragraph) || paragraph);
  });
  eleventyConfig.addFilter("resolveSources", (keys, sources) =>
    (keys || []).map((key) => ({ key, ...(sources[key] || {}) }))
  );
  eleventyConfig.addFilter("publicNotes", (notes) =>
    (notes || [])
      .filter((note) => !/^(Presenter emphasis|Design note|Site note|Closing note|Future build note)$/i.test(note.title || ""))
      .map((note) => ({
        ...note,
        title: (note.title || "")
          .replace(/^Likely question$/i, "A question this answers")
          .replace(/^Possible page callout$/i, "Worth remembering")
          .replace(/^Origin-binding note$/i, "Origin binding")
          .replace(/^Key line$/i, "Key idea")
      }))
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
