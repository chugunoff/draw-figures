class Canvas {
    constructor(ctx, width, height) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;
    }

    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    setStyle(strokeStyle = 'black', fillStyle = 'rgba(255, 255, 255, 0)', lineWidth = 1, lineType = 'solid') {
        this.ctx.strokeStyle = strokeStyle;
        this.ctx.fillStyle = fillStyle;
        this.ctx.lineWidth = lineWidth;
        switch (lineType) {
            case 'solid':
                this.ctx.setLineDash([]);
                break;
            case 'dotted':
                this.ctx.setLineDash([1 * lineWidth, 1 * lineWidth]);
                break;
            case 'dashed':
                this.ctx.setLineDash([5 * lineWidth, 3 * lineWidth]);
                break;
            default:
                this.ctx.setLineDash([]);
                break;
        }
    }

    drawLine(x1, y1, x2, y2) {
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.stroke();
    }

    drawRect(x, y, width, height) {
        if (this.ctx.fillStyle != undefined) {
            this.ctx.fillRect(x, y, width, height);
        }
        this.ctx.strokeRect(x, y, width, height);
    }

    drawTri(x1, y1, x2, y2, x3, y3) {
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.lineTo(x3, y3);
        this.ctx.closePath();
        if (this.ctx.fillStyle != undefined) {
            this.ctx.fill();
        }
        this.ctx.stroke();
    }

    drawCircle(x, y, radius) {
        let startAngle = 0;
        let endAngle = (Math.PI / 180) * 360;
        let anticlockwise = false;
        
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);
        this.ctx.closePath();
        if (this.ctx.fillStyle != undefined) {
            this.ctx.fill();
        }
        this.ctx.stroke();
    }

    drawEllipse(x, y, radiusX, radiusY) {
        let rotation = 0;
        let startAngle = 0;
        let endAngle = (Math.PI / 180) * 360;
        let anticlockwise = false;

        this.ctx.beginPath();
        this.ctx.ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise);
        this.ctx.closePath();
        if (this.ctx.fillStyle != undefined) {
            this.ctx.fill();
        }
        this.ctx.stroke();
    }
}