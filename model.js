class Canvas {
    constructor(ctx, width, height) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;
    }

    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    drawLine(x1, y1, x2, y2) {
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.stroke();
    }

    drawRect(x, y, width, height) {
        this.ctx.strokeRect(x, y, width, height);
    }

    drawTri(x1, y1, x2, y2, x3, y3) {
        // Stroked triangle
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.lineTo(x3, y3);
        this.ctx.closePath();
        this.ctx.stroke();
    }

    drawCircle(x, y, radius) {
        let startAngle = 0;
        let endAngle = (Math.PI/180)*360;
        let anticlockwise = false;
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);
        this.ctx.stroke();
    }

    drawEllipse() {

    }
}