// based on https://www.youtube.com/watch?v=oLiaUEKsRws

var video_w = 240,
    video_h = 180;

var capture;
var loops = {'a': [],
             's': []}
var recording = {};
var tick;
var diff;

function setup() {
    createCanvas(video_w*2, video_h*2);
    capture = createCapture(VIDEO);
    diff = createGraphics(video_w, video_h)
    capture.size(video_w, video_h);
    capture.hide();
    tick = 0;
}

function draw() {
    tick += 1;
    img = capture.get()
//    img.filter(GRAY);

    function check(key, x, y) {
        if (recording[key]) {
            loops[key].push(img);
            image(img, x, y, video_w, video_h);
        } else {
            if (loops[key].length) {
                image(loops[key][tick%loops[key].length], x, y, video_w, video_h);
            }
        }
    }

    check('a', 0, 0);
    check('s', video_w, 0);

    if (loops['a'].length) {
        diff.image(loops['a'][tick%loops['a'].length], 0, 0, video_w, video_h);
    }
    if (loops['s'].length) {
        diff.blend(loops['s'][tick%loops['s'].length], 0, 0, video_w, video_h, 0, 0, video_w, video_h, DIFFERENCE);
    }

    image(diff, video_w, video_h, video_w, video_h);

}

window.onkeypress = function(e) {
    if (!recording[e.key]) {
        recording[e.key] = true;
        loops[e.key] = [];
    }
}

window.onkeyup = function(e) {
    recording[e.key] = false;
}
