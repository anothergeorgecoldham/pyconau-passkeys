module.exports = {
  layout: "layouts/slide.njk",
  pagination: {
    data: "talk.slides",
    size: 1,
    alias: "slide"
  },
  permalink(data) {
    const slide = data.pagination.items[0];
    const number = String(slide.number).padStart(2, "0");
    return `/slides/${number}-${slide.slug}/`;
  },
  eleventyComputed: {
    title(data) {
      return data.pagination.items[0].title;
    },
    description(data) {
      return data.pagination.items[0].page_summary;
    }
  }
};
