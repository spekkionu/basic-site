module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: {
    content: ["_site/**/*.html", "resources/js/components/**/*.vue"],
    options: {
      safelist: [/^swiper-/, /^slider--/],
    },
  },
  theme: {
    extend: {
      colors: {
        'facebook': '#3a589e',
        'twitter': '#0084b4',
        'pinterest': '#bd081c',
        'youtube': '#ff0000',
        'linkedin': '#2867B2',
      },
      spacing: {
        '128': '32rem',
        '256': '64rem',
        '512': '128rem',
        '300px': '300px',
        '400px': '400px',
        '500px': '500px',

      },
      aspectRatio: {
        none: 0,
        square: [1, 1],
        "16/9": [16, 9],
        "4/3": [4, 3],
        "21/9": [21, 9]
      },
      container: {
        center: true,
        padding: '1rem'
      },
    },
  },
  variants: {
    aspectRatio: ['responsive']
  },
  plugins: [
    require('@tailwindcss/custom-forms'),
    require("tailwindcss-responsive-embed"),
    require("tailwindcss-aspect-ratio"),
  ],
};
