function parseTime(t) {
    var segments = t.split(':');
    var ms = parseInt(segments[2].split(',')[1]);
    var h = parseInt(segments[0]);
    var m = parseInt(segments[1]);
    var s = parseInt(segments[2]);
    return h * 60 * 60 * 1000 + m * 60 * 1000 + s * 1000 + ms;
}

function convertToMs(arr) {
    for (var i = 0; i < arr.length; i++) {
        arr[i].timeStart = parseTime(arr[i].timeStart);
        arr[i].timeEnd = parseTime(arr[i].timeEnd);
    }
    return arr;
}

function showSubtitles(arr, i) {
    setTimeout(function () {
        var elem = document.getElementById('subtitles');
        console.log(arr[i].mess);
        elem.innerHTML = arr[i].mess;
        setTimeout(function () {
            console.clear();
            elem.innerHTML = '';
        }, arr[i].timeEnd - arr[i].timeStart);
        i++;
        if (arr.length > i) {
            showSubtitles(arr, i);
        }
    }, i == 0 ? (arr[i].timeStart) : (arr[i].timeStart - arr[i - 1].timeStart));
}

var subtitles = [{
    id: '54',
    timeStart: "00:00:02,133",
    timeEnd: "00:00:12,855",
    mess: "How to Train Your Dragon 2"
},
{
    timeStart: "00:00:12,907",
    timeEnd: "00:00:24,224",
    mess: "Credit: ABC"
},
{
    timeStart: "00:00:24,500",
    timeEnd: "00:00:26,000",
    mess: "Hello"
},
{
    timeStart: "00:00:26,200",
    timeEnd: "00:00:29,000",
    mess: "This is toothless"
},
{
    timeStart: "00:00:30,000",
    timeEnd: "00:00:32,224",
    mess: "The end"
}];

subtitles = convertToMs(subtitles);
showSubtitles(subtitles, 0);