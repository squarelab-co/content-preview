let imgs;
let url;
let zip = new JSZip();
let count = 0;
let platform;
const key = '/content/';

function download(target) {
    platform = target;
    document.getElementById('download').disabled = true;
    imgs = document.querySelectorAll('img');
    downloadFile(count);
}

function downloadFile() {
    url = imgs[count].src;
    if (url.indexOf('.jpg') != -1) {
        if (url.indexOf('w_1080') == -1) {
            url = 'https://res.cloudinary.com/kyte/image/upload/w_1080' + url.substring(url.lastIndexOf(key));
        }
    }

    let li = document.createElement('li');
    li.innerHTML = url;
    document.getElementById('message').appendChild(li);

    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = "blob";
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            onDownloadComplete(xhr.response);
        }
    }
    xhr.send();
}

function onDownloadComplete(blobData) {
    blobToBase64(blobData, function (binaryData) {
        const fileName = 'images/' + url.substring(url.lastIndexOf(key) + key.length);
        imgs[count].src = fileName;
        zip.file(fileName, binaryData, {base64: true});
        count++;
        if (count < imgs.length) {
            downloadFile(count);
        } else {
            zip.file('index.html', new Blob([document.getElementById("container").innerHTML.trim()], {type: "text/html"}));
            zip.generateAsync({type: "blob"})
                .then(function (blob) {
                    saveAs(blob, title + '-' + platform + '.zip');
                });
        }
    });
}

function blobToBase64(blob, callback) {
    var reader = new FileReader();
    reader.onload = function () {
        var dataUrl = reader.result;
        var base64 = dataUrl.split(',')[1];
        callback(base64);
    };
    reader.readAsDataURL(blob);
}