const Image = require("@11ty/eleventy-img");
const _ = require('lodash')
const JSDOM = require("jsdom").JSDOM;
const path = require('path')
const fs = require('fs')

const site = require('./src/_data/site');

function isFunction(functionToCheck) {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}

module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/assets");
    eleventyConfig.setTemplateFormats([
        "md", 'njk', 'html'
    ]);

    eleventyConfig.addShortcode("year", function () {
        return String((new Date()).getFullYear());
    });

    eleventyConfig.addFilter("digits", function (value) {
        return value.replace(/\D/g, '');
    });

    eleventyConfig.addFilter("date", function (value, format = 'local') {
        let date = new Date(value);
        if (format === 'localdate') {
            return date.toLocaleDateString(site.locale);
        }
        if (format === 'longdate') {
            return date.toLocaleDateString(site.locale, {
                year: 'numeric',
                month: 'long',
                day: '2-digit'
            });
        }
        if (format === 'localtime') {
            return date.toLocaleTimeString(site.locale);
        }
        if (format === 'local') {
            return date.toLocaleDateString(site.locale) + ' ' + date.toLocaleTimeString(site.locale);
        }
        if (format === 'iso') {
            return date.toISOString();
        }

        return value;
    });

    eleventyConfig.addPairedNunjucksAsyncShortcode("slider", async function (content) {
        const dom = JSDOM.fragment(content);
        let slides = [];
        dom.querySelectorAll('slide').forEach(slide => {
            slides.push({
                src: slide.getAttribute('image'),
                href: slide.getAttribute('href') || '',
                content: slide.innerHTML.trim() || '',
            })
        });

        let images = await (async function (slides) {
            return Promise.all(slides.map(async (slide, index) => {
                let stats = await Image(path.resolve(__dirname, 'src', slide.src), {
                    widths: [null],
                    formats: ['jpg'],
                    urlPath: "/assets/images/",
                    outputDir: path.resolve(__dirname, "_site/assets/images") + '/',
                });
                let open = slide.href ? `<a href="${slide.href}"` : '<div';
                let close = slide.href ? `</a>` : '</div>';
                let inner = slide.content ? `<div class="bg-black text-white bg-opacity-75 px-8 py-4">${slide.content}</div>` : '';

                return `${open} data-slide class="swiper-slide  no-underline hover:no-underline bg-no-repeat bg-center bg-cover flex justify-center items-center" style="background-image: url('${stats.jpg[0].url}')">${inner}${close}`;
            }))
        })(slides);
        return `<div data-slider class="slider--content swiper-container h-300px md:h-400px lg:h-500px w-full" >\n\n`
            + `<div class="swiper-wrapper">\n\n`
            + images.join("\n\n")
            + `\n\n</div>\n`
            + `<div class="swiper-pagination hidden sm:block"></div>\n`
            + `<div class="swiper-button-prev"></div>\n`
            + `<div class="swiper-button-next"></div>\n\n`
            + `</div>`;
    });

    eleventyConfig.addPairedNunjucksAsyncShortcode("gallery", async function (content, width = 300) {
        const dom = JSDOM.fragment(content);
        let photos = [];
        dom.querySelectorAll('photo').forEach(photo => {
            photos.push({
                src: photo.getAttribute('src'),
                alt: photo.getAttribute('alt') || '',
                title: photo.getAttribute('title') || '',
                description: photo.getAttribute('caption') || '',
            })
        });
        let id = Math.random().toString(36).substring(2, 15);
        let images = await (async function (photos) {
            return Promise.all(photos.map(async photo => {
                let stats = await Image(path.resolve(__dirname, 'src', photo.src), {
                    widths: [width, null],
                    formats: ['jpg'],
                    urlPath: "/assets/images/",
                    outputDir: path.resolve(__dirname, "_site/assets/images") + '/',
                });

                let caption = photo.description ? `<meta itemprop="caption" content="${photo.description}">` : '';
                return `<div itemprop="associatedMedia" itemscope itemtype="http://schema.org/ImageObject">
                            <a itemprop="contentURL" href="${stats.jpg[1].url}" class="inline-block" style="margin:10px;" data-gallery="${id}" data-title="${photo.title}" data-description="${photo.description}">
                                <img itemprop="thumbnailUrl" src="${stats.jpg[0].url}" alt="${photo.alt}" class="inline-block" loading="lazy">
                            </a>
                            ${caption}
                        </div>`;
            }))
        })(photos);

        return '<div data-photogallery class="flex justify-center sm:justify-start items-center sm:items-start flex-col sm:flex-row sm:flex-wrap" style="margin-left:-10px;margin-right:-10px;" itemscope itemtype="http://schema.org/ImageGallery">' + images.join("\n") + '</div>';
    });

    eleventyConfig.addPairedNunjucksAsyncShortcode("testimonials", async function (content) {
        const dom = JSDOM.fragment(content);
        let testimonials = [];
        dom.querySelectorAll('testimonial').forEach(testimonial => {
            let quote = testimonial.innerHTML.trim() || '';
            let cite = testimonial.getAttribute('cite');
            cite = cite ? `<footer class="block cite text-center font-bold text-lg not-italic mt-6"><cite>${cite}</cite></footer>` : '';
            let content = `<blockquote data-testimonial class="swiper-slide m-0 px-12 pt-6 pb-12 flex flex-col justify-center items-center block italic">${quote} ${cite}</blockquote>`;
            testimonials.push(content);
        });

        return `<div data-testimonials class="slider--testimonials swiper-container w-full">\n\n`
            + `<div class="swiper-wrapper">\n\n`
            + testimonials.join("\n\n")
            + `\n\n</div>\n`
            + `<div class="swiper-pagination hidden sm:block"></div>\n`
            + `<div class="swiper-button-prev"></div>\n`
            + `<div class="swiper-button-next"></div>\n\n`
            + `</div>`;
    });

    eleventyConfig.addNunjucksAsyncShortcode("photo", async function (src, attributes = {}, width = null) {
        let format = src.split('.').pop()
        let widths = [width];
        if (width === null) {
            widths = [320, 640, 768, 1024, 1280, 2048, null];
        }
        let stats = await Image(path.resolve(__dirname, 'src', src), {
            widths: widths,
            formats: [format],
            urlPath: "/assets/images/",
            outputDir: path.resolve(__dirname, "_site/assets/images") + '/',
        });

        let attrs = _.toPairs(attributes).map(attr => {
            return `${attr[0]}="${attr[1]}"`
        }).join(' ');

        if (widths.length === 1) {
            return `<img src="${stats[format][0].url}" width="${stats[format][0].width}" height="${stats[format][0].height}" ${attrs}>`;
        }
        let full = stats[format].pop();
        if (full.width < Math.max(widths)) {
            stats[format].push(full);
        }
        let srcset = stats[format].filter(image => image.width <= full.width).map(image => image.srcset).join(', ');

        return `<img src="${stats[format][0].url}" srcset="${srcset}" ${attrs} loading="lazy">`;
    });

    eleventyConfig.addNunjucksAsyncFilter("image", async function (src, width, callback) {
        if (isFunction(width)) {
            callback = width;
            width = null;
        }
        if(!width) width = null;
        let format = src.split('.').pop()
        try {
            let stats = await Image(path.resolve(__dirname, 'src', src), {
                widths: [width],
                formats: [format],
                urlPath: "/assets/images/",
                outputDir: path.resolve(__dirname, "_site/assets/images") + '/',
            });
            callback(null, stats[format][0].url + '?v=' + site.version);
        } catch (error) {
            callback(error);
        }
    });

    eleventyConfig.addNunjucksAsyncFilter("asset", async function (src) {
        let path = path.resolve(__dirname, 'src', src);
        let dest = path.join(__dirname, "_site", src);

        await fs.copyFile(path, dest);
        return path.join('/', src);
    });

    eleventyConfig.addNunjucksAsyncShortcode("svg", async function (src, alt = '', attributes = {}) {
        let file = path.resolve(_dirname, 'src', src)
        const dom = JSDOM.fragment(fs.readFileSync(file).toString());
        let svg = dom.querySelector('svg');

        if (alt) {
            svg.setAttribute('aria-label', alt);
        }

        _.toPairs(attributes).forEach(attr => {
            svg.setAttribute(attr[0], attr[1]);
        });

        return svg.outerHTML;
    });

    eleventyConfig.addNunjucksAsyncShortcode("icon", async function (icon, group = 'solid', attributes = {}) {
        let file = path.join(__dirname, 'node_modules/@fortawesome/fontawesome-free/svgs');
        switch (group) {
            case 'fab':
            case 'brands':
                file = path.join(file, 'brands')
                break;
            case 'far':
            case 'regular':
                file = path.join(file, 'regular')
                break;
            case 'fas':
            case 'solid':
            default:
                file = path.join(file, 'solid')
                break;
        }
        file = path.join(file, icon + '.svg');
        const dom = JSDOM.fragment(fs.readFileSync(file).toString());
        let svg = dom.querySelector('svg');
        svg.setAttribute('role', 'image');
        svg.setAttribute('class', 'icon');
        _.toPairs(attributes).forEach(attr => {
            if (attr[0] === 'class') {
                attr[1] = 'icon ' + attr[1];
            }
            svg.setAttribute(attr[0], attr[1]);
        });


        return svg.outerHTML;
    });

    return {
        dir: {input: 'src', output: '_site'}
    };
};
