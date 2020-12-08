// View
function draw() {
    var canvas = document.getElementById('my-canvas');

    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        new Line(ctx, 50, 50, 200, 200).draw();
    }
}