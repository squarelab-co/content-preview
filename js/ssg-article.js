//Get parameters
const parameters = getParameters();
const baseUrl = 'https://preview.contentful.com/spaces/' + parameters.space + '/entries?sys.id=';
let md;
require(['https://cdnjs.cloudflare.com/ajax/libs/remarkable/2.0.1/remarkable.min.js'], function (remarkable) {
    md = new remarkable.Remarkable({
        html: true,
        breaks: true,
    });
});

//Get entry
let title;
console.log(baseUrl + parameters.entry + '&access_token=' + parameters.access_token);
fetch(baseUrl + parameters.entry + '&access_token=' + parameters.access_token)
    .then(response => response.json())
    .then(function (entries) {
        const fields = entries.items[0].fields;
        let i;
        let html;

        //Get category
        let category;
        for (i = 0; i < entries.includes.Entry.length; i++) {
            if (fields.categoryRef.sys.id == entries.includes.Entry[i].sys.id) {
                category = entries.includes.Entry[i].fields.text;
            }
        }

        //title & image
        title = fields.title;
        $('.contVisual').html('<div class="txt">' +
            '<p>' + category + '</p>' +
            '<h1>' + title + '</h1>' +
            '<p>' + fields.description + '</p>' +
            '</div>' +
            '<img src="https://res.cloudinary.com/kyte/image/upload/w_1080,h_1320,e_sharpen:50,c_fill,g_auto/' + fields.image[0].public_id + '.jpg " alt="">');

        //content
        $('.travelCon').html(md.render(fields.content));

        //tags
        html = '<h3>여행 키워드</h3><div class="inner dp_flex">';
        for (i = 0; i < fields.tags.length; i++) {
            if (i < 5) {
                html += '<p>#' + fields.tags[i] + '</p>';
            }
        }
        $('.travelKeyword').html(html + '</div>');

        //image alt
        const imgs = document.querySelectorAll('img');
        for (i = 0; i < imgs.length; i++) {
            if (imgs[i].alt) {
                imgs[i].outerHTML += '<span class="alt">' + imgs[i].alt + '</span>'
            }
        }
    });