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

//Get airport name
function getAirportName(arrival) {
    switch (arrival) {
        case 'ICN':
            return 'ICN 인천 국제공항';

        case 'JFK':
            return 'JFK 존 F. 케네디 국제공항';

        case 'PRG':
            return 'PRG 바츨라프 하벨 국제공항';

        case 'IST':
            return 'IST 아타투르크 공항';
    }
}

//Get svg icon
function getSvgIcon(type) {
    switch (type) {
        case 'flight':
            return '<svg width="24" height="24" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.478 11.632L5.968 4.56l1.931-.518 6.951 6.42 5.262-1.41a1.5 1.5 0 11.776 2.898L5.916 15.96l-.776-2.898.241-.065 2.467 2.445-2.626.704a1 1 0 01-1.133-.48L1.466 10.94l1.449-.388 2.466 2.445 5.097-1.366v.001zM4 19h16v2H4v-2z" fill="currentColor"></path></svg>';

        case 'train':
            return '<svg width="24" height="24" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6 11h12V7H6v4zm6 6a2 2 0 11.001-4.001A2 2 0 0112 17zM7 5a2 2 0 00-2 2v11h14V7a2 2 0 00-2-2H7zm10.2 15l1.8 1.5v.5H5v-.5L6.8 20H5a2 2 0 01-2-2V7a4 4 0 014-4h10a4 4 0 014 4v11a2 2 0 01-2 2h-1.8z" fill="currentColor"></path></svg>';

        case 'bus':
            return '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M15 18h4v-2h-4v2zM5 18h4v-2H5v2zm0-4h14V5H5v9zm12 6H7v1a1 1 0 01-1 1H5a1 1 0 01-1-1v-1H3v-8H2V8h1V5a2 2 0 012-2h14a2 2 0 012 2v3h1v4h-1v8h-1v1a1 1 0 01-1 1h-1a1 1 0 01-1-1v-1z" fill="currentColor"></path></svg>';
    }
}

//Get date
function getDate(startMonth, startDay) {
    let date = startMonth + "월";
    if (startDay) {
        date += ' ' + startDay + '일';
    }
    return date;
}

//Get special date
function getSpecialDate(type) {
    switch (type) {
        case 'checkDate':
            return '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M5 22v-6h7l.724 1.447a1 1 0 00.894.553H20a1 1 0 001-1V6a1 1 0 00-1-1h-6l-.724-1.447A1 1 0 0012.382 3H3v19h2zm0-8V5h6.764l1 2H19v9h-4.764l-1-2H5z" fill="currentColor"></path></svg>' +
                '<span>참고시즌</span>';

        case 'event':
            return '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M15.515 16.929l1.413-1.414 4.243 4.242-1.415 1.415-4.24-4.243zm-.798-1.927l-2.213 4.65a.6.6 0 01-.976.155l-3.542-3.74a.6.6 0 00-.358-.181l-5.107-.668a.601.601 0 01-.448-.881l2.462-4.524a.605.605 0 00.062-.396l-.943-5.063a.6.6 0 01.7-.7l5.062.943a.603.603 0 00.396-.062l4.524-2.462a.6.6 0 01.881.45l.668 5.106c.02.136.083.262.183.357l3.74 3.542a.6.6 0 01-.156.977l-4.65 2.213a.603.603 0 00-.285.284zm-.024-5.563a2.598 2.598 0 01-.79-1.551L13.5 4.805 10.77 6.29a2.6 2.6 0 01-1.719.273l-3.056-.57.57 3.056c.11.587.013 1.195-.274 1.72L4.805 13.5l3.083.403a2.598 2.598 0 011.55.79l2.138 2.257 1.335-2.807a2.606 2.606 0 011.231-1.232l2.808-1.335-2.257-2.137z" fill="currentColor"></path></svg>' +
                '<span>이벤트</span>';

        case 'festival':
            return '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.452 2l5.394 1.824a.332.332 0 010 .63L11.452 6.28V2zm4.32 19.215h2.887l-.863-7.083C14.86 12.708 12.828 10.7 11.724 9.4c-1.104 1.301-3.138 3.313-6.078 4.736l-.907 7.08h2.94v-2.4a4.05 4.05 0 014.045-4.048 4.051 4.051 0 014.047 4.047v2.401zm-6.094 0h4.093v-2.4a2.049 2.049 0 00-2.047-2.048 2.049 2.049 0 00-2.046 2.047v2.401zm11.771-7.858l-.492 1.94a15.946 15.946 0 01-1.019-.302l1.067 8.17H2.445l1.066-8.17c-.333.108-.669.212-1.02.301l-.49-1.939c5.817-1.476 8.991-6.275 9.023-6.324h1.4v.001c.032.048 3.207 4.847 9.025 6.323z" fill="currentColor"></path></svg>' +
                '<span>페스티벌</span>';

    }
}

//Get entry
let title;
console.log(baseUrl + parameters.entry + '&access_token=' + parameters.access_token);
fetch(baseUrl + parameters.entry + '&access_token=' + parameters.access_token)
    .then(response => response.json())
    .then(function (entries) {
        const fields = entries.items[0].fields;
        let i;
        let html;

        //Get country
        let country;
        for (i = 0; i < entries.includes.Entry.length; i++) {
            if (fields.country.sys.id == entries.includes.Entry[i].sys.id) {
                country = entries.includes.Entry[i].fields.nameKo;
            }
        }

        //title & image
        title = fields.cityNameKo;
        $('.contVisual').html('<div class="txt">' +
            '<p>' + country + '</p>' +
            '<h1>' + title + '</h1>' +
            '</div>' +
            '<img src="https://res.cloudinary.com/kyte/image/upload/w_1080,h_1320,e_sharpen:50,c_fill,g_auto/' + fields.image[0].public_id + '.jpg " alt="">');

        //notice
        if (fields.notice.length) {
            $('.box').html(md.render(fields.notice));
        } else {
            $('.box').remove();
        }

        //tagline & intro
        $('.travelCon').html('<h2>' + fields.tagline + '</h2>' + md.render(fields.intro));

        //routes
        let arrival = 'ICN';
        let value;
        html = '<h3>한국에서 ' + title + '까지</h3><ul>';
        for (i = 0; i < fields.routes.length; i++) {
            if (fields.routes[i].publish == 'true') {
                value = fields.routes[i];
                html += '<li>' +
                    '<p>' + getAirportName(arrival) + '</p>' +
                    '<div>' + getSvgIcon(value.transportation) +
                    '<span>' + value.duration + '</span>' +
                    '</div>' +
                    '</li>';
                arrival = value.arrival;
            }
        }
        $('.travelRoute').html(html + '<li><p>' + arrival + '</p></li></ul>');

        //phrases
        html = '<h3>몇가지 알아둘 표현</h3><div class="inner">';
        for (i = 0; i < fields.phrases.length; i++) {
            value = fields.phrases[i];
            html += '<dl>' +
                '<dt>' + value.key + '</dt>' +
                '<dd>' + value.value + '</dd>' +
                '</dl>';
        }
        $('.talkTip').html(html + '</div>');

        //languages
        html = '<h3>' + title + ' 알아가기</h3>' +
            '<div class="inner dp_flex">' +
            '<dl><dt>' +
            '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">' +
            '<path fill-rule="evenodd" clip-rule="evenodd" d="M10 2v2h6v2h-1.968a18.222 18.222 0 01-3.62 6.301 14.866 14.866 0 002.336 1.707l-.751 1.878A17.013 17.013 0 019 13.725a16.677 16.677 0 01-6.201 3.548l-.536-1.929a14.7 14.7 0 005.327-3.042A18.079 18.079 0 014.767 8h2.24A16.032 16.032 0 009 10.877a16.165 16.165 0 002.91-4.876L2 6V4h6V2h2zm8.5 8l4.4 11h-2.155l-1.201-3h-4.09l-1.199 3h-2.154L16.5 10h2zm-2.247 6l1.247-3.115L18.745 16h-2.492z" fill="currentColor"></path>' +
            '</svg>' +
            '<span>' + fields.languages[0].mainText + '</span>' +
            '</dt><dd>' + fields.languages[0].subText + '</dd></dl>';

        //religions
        html += '<dl><dt>' +
            '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">' +
            '<path fill-rule="evenodd" clip-rule="evenodd" d="M11.536 3a2 2 0 10-.002 3.999A2 2 0 0011.536 3zm0-2c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4zm-4.95 11.392a2.003 2.003 0 000 2.829l4.95 4.949 4.95-4.949c.78-.781.78-2.048 0-2.829a2.002 2.002 0 00-2.83.002l-2.123 2.118-2.12-2.12a2.001 2.001 0 00-2.828 0zm11.313-1.412a4 4 0 010 5.656l-5.657 5.656a.999.999 0 01-1.414 0l-5.656-5.656a4 4 0 015.657-5.657l.705.707.708-.707a4 4 0 015.657 0v.001z" fill="currentColor"></path>' +
            '</svg>' +
            '<span>종교</span>' +
            '</dt><dd>' + fields.religions + '</dd></dl>';

        //currencies
        html += '<dl><dt>' +
            '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">' +
            '<path fill-rule="evenodd" clip-rule="evenodd" d="M8.5 14H14a.5.5 0 000-1h-4a2.5 2.5 0 110-5h1V6h2v2h2.5v2H10a.5.5 0 000 1h4a2.5 2.5 0 010 5h-1v2h-2v-2H8.5v-2zm3.5 6a8 8 0 100-16 8 8 0 000 16zm0 2C6.477 22 2 17.523 2 12 2 6.478 6.477 2 12 2s10 4.478 10 10c0 5.523-4.477 10-10 10z" fill="currentColor"></path>' +
            '</svg>' +
            '<span>통화</span>' +
            '</dt><dd>' + fields.currencies + '</dd></dl>';

        //electricity
        html += '<dl><dt>' +
            '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">' +
            '<path fill-rule="evenodd" clip-rule="evenodd" d="M12 14.5a1 1 0 110-2 1 1 0 010 2zM6 9h12V8H6v1zm2 7h8a2 2 0 002-2v-3H6v3a2 2 0 002 2zm5 2v2h6v2h-6a2 2 0 01-2-2v-2H8a4 4 0 01-4-4V7a1 1 0 011-1h3V2h2v4h4V2h2v4h3a1 1 0 011 1v7a4 4 0 01-4 4h-3z" fill="currentColor"></path>' +
            '</svg>' +
            '<span>전압</span>' +
            '</dt><dd>' + fields.electricity + '</dd></dl>';

        //tipping
        if (fields.tipping) {
            html += '<dl><dt>' +
                '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">' +
                '<path fill-rule="evenodd" clip-rule="evenodd" d="M11 5a1 1 0 100 2 1 1 0 000-2zm0-2a3 3 0 110 6 3 3 0 010-6zm7 5a1 1 0 100 2 1 1 0 000-2zm0-2a3 3 0 110 6 3 3 0 010-6zM3 19h1v-7H3v7zm3.001-6L6 18.022l.045.032C7.84 19.314 10.178 20 13 20c3.004 0 5.799-1.156 7.835-3.13l.133-.133-.12-.1a2.985 2.985 0 00-1.643-.63L19 16h-2.111c.072.322.111.656.111 1v1H8v-2l6.79-.001-.034-.079a2.505 2.505 0 00-2.092-1.416L12.5 14.5H9.57A4.986 4.986 0 006.002 13h-.001zM5 10a1 1 0 011 1 6.97 6.97 0 014.33 1.5h2.17c1.333 0 2.53.58 3.354 1.5H19a5 5 0 014.516 2.851C21.151 19.972 17.322 22 13 22c-2.79 0-5.15-.603-7.06-1.658A.998.998 0 015 21H2a1 1 0 01-1-1v-9a1 1 0 011-1h3z" fill="currentColor"></path>' +
                '</svg>' +
                '<span>팁 문화</span>' +
                '</dt><dd>' + fields.tipping + '</dd></dl>';
        }

        //visa
        html += '<dl><dt>' +
            '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">' +
            '<path fill-rule="evenodd" clip-rule="evenodd" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-2.29-2.333A17.9 17.9 0 018.027 13H4.062a8.008 8.008 0 005.648 6.667zm2.29.085A15.915 15.915 0 0110.03 13h3.94A15.906 15.906 0 0112 19.752zM19.938 13h-3.965a17.9 17.9 0 01-1.683 6.667A8.008 8.008 0 0019.938 13zM8.027 11H4.062A8.008 8.008 0 019.71 4.333 17.9 17.9 0 008.027 11zm5.942 0A15.904 15.904 0 0012 4.248 15.906 15.906 0 0010.03 11h3.939zm2.004 0a17.9 17.9 0 00-1.683-6.667A8.008 8.008 0 0119.938 11h-3.965z" fill="currentColor"></path>' +
            '</svg>' +
            '<span>' + fields.visa[0].mainText + '</span>' +
            '</dt><dd>' + fields.visa[0].subText + '</dd></dl>';

        //callingCode
        html += '<dl><dt>' +
            '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">' +
            '<path d="M21 16.42v3.536a1 1 0 01-.93.998c-.437.03-.794.046-1.07.046-8.837 0-16-7.163-16-16 0-.276.015-.633.046-1.07A1 1 0 014.044 3H7.58a.5.5 0 01.498.45c.023.23.044.413.064.552A13.9 13.9 0 009.35 8.003c.095.2.033.439-.147.567l-2.158 1.542a13.047 13.047 0 006.844 6.844l1.54-2.154a.462.462 0 01.573-.149 13.9 13.9 0 004 1.205c.139.02.322.042.55.064a.5.5 0 01.449.498H21z" fill="currentColor"></path>' +
            '</svg>' +
            '<span>지역번호</span>' +
            '</dt><dd>' + fields.callingCode + '</dd></dl>';

        //recommendedStayDuration
        html += '<dl><dt>' +
            '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">' +
            '<path fill-rule="evenodd" clip-rule="evenodd" d="M21 3h-4V1h-2v2H9V1H7v2H3a1 1 0 00-1 1v16a1 1 0 001 1h18a1 1 0 001-1V4a1 1 0 00-1-1zm-4 2h3v4H4V5h3v2h2V5h6v2h2V5zm3 6H4v8h16v-8zm-9 2H6v4h5v-4z" fill="currentColor"></path>' +
            '</svg>' +
            '<span>추천일정</span>' +
            '</dt><dd>' + fields.recommendedStayDuration[0].nights + '박 ' + fields.recommendedStayDuration[0].days + '일</dd></dl>';

        //travelTip
        $('.travelTip').html(html + '</div>');

        //specialDates
        html = '<h3>' + title + '의 스페셜데이</h3><div class="inner dp_flex">';
        for (i = 0; i < fields.specialDates.length; i++) {
            value = fields.specialDates[i];
            html += '<dl><dt>' +
                getSpecialDate(value.type) +
                '</dt><dd><strong>' + value.description + '</strong>' +
                '<span>' + getDate(value.startMonth, value.startDay) + '</span>' +
                '</dd></dl>';
        }
        $('.specialDay').html(html + '</div>');

        //columns
        html = '<h3>' + title + ' 언제갈까요?</h3><ul class="dp_flex">';
        for (i = 0; i < fields.columns.length; i++) {
            value = fields.columns[i];
            html += '<li>' +
                '<img src="' + value.imageUrl + '" alt="' + value.imageDescription + '">' +
                '<dl>' +
                '<dt>' + value.title + '</dt>' +
                '<dd>' + value.description + '</dd>' +
                '</dl>' +
                '</li>';
        }
        $('.whenGoing').html(html + '</ul>');

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