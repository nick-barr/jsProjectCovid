import { resolveCollision } from "./collision.js"

export default function Sphere(x, y, dx, dy, radius, canvas) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = "lightgray";
    this.canvas =  canvas;
    this.mass = 1;

    this.draw = function() {
        const sphere = this.canvas.getContext("2d");
        sphere.beginPath();
        sphere.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
        sphere.fillStyle = this.color;
        sphere.fill();    
    }

    this.update = function(arr) {
        function distance(x1, y1, x2, y2) {
            const xDist = x2 - x1;
            const yDist = y2 - y1;

            return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
        }

        for (let i = 0; i < arr.length; i++) {
            if (this === arr[i]) continue;
            if (distance(this.x, this.y, arr[i].x, arr[i].y) - this.radius - arr[i].radius < 0) {
                // console.log("collision")
                // this.dx = -this.dx
                // this.dy = -this.dy
                resolveCollision(this, arr[i]);

                if (this.color === "firebrick" && arr[i].color !== "firebrick") {
                    this.color = "firebrick";
                    arr[i].color = "firebrick";
                }
                if (this.color === "blue" && arr[i].color !== "blue") {
                    this.color = "blue";
                    arr[i].color = "blue";
                }
            }

        }

        if (this.x + this.radius > this.canvas.width || this.x - this.radius < 0) this.dx = -this.dx;
        if (this.y + this.radius > this.canvas.height || this.y - this.radius < 0) this.dy = -this.dy;

        this.x += this.dx;
        this.y += this.dy;

        this.draw();
    }
}