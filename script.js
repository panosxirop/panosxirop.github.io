function downloadPDF() {
    var pdfURL = 'media/CV_XP.pdf';
    var anchor = document.createElement('a');
    anchor.href = pdfURL;
    anchor.download = 'Panagiotis_Xiropotamos_CV.pdf';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
}



const shapes = document.querySelectorAll('.shape');
const canvas = document.querySelector('#canvas');
const svgRect = canvas.getBoundingClientRect();
const shapesArr = [];

class Shape {
	constructor(el) {
          this.el = el;
          this.x = Math.random() * (svgRect.width - el.getBBox().width);
          this.y = Math.random() * (svgRect.height - el.getBBox().height);
          this.dx = Math.random() * 2 - 1;
          this.dy = Math.random() * 2 - 1;
          this.isDragging = false;
          this.mouseOffsetX = 0;
          this.mouseOffsetY = 0;
          this.updatePosition();
          this.setupEventListeners();
        }

        updatePosition() {
          this.el.setAttribute('transform', `translate(${this.x}, ${this.y})`);
        }

        move() {
          if (!this.isDragging) {
            this.x += this.dx;
            this.y += this.dy;
            if (this.x < 0 || this.x + this.el.getBBox().width > svgRect.width) {
              this.dx = -this.dx;
            }
            if (this.y < 0 || this.y + this.el.getBBox().height > svgRect.height) {
              this.dy = -this.dy;
            }

            this.updatePosition();
          }
        }

        setupEventListeners() {
          this.el.addEventListener('mousedown', (event) => this.onMouseDown(event));
          document.addEventListener('mousemove', (event) => this.onMouseMove(event));
          document.addEventListener('mouseup', () => this.onMouseUp());
        }

        onMouseDown(event) {
          this.isDragging = true;
          const svgRect = canvas.getBoundingClientRect();
          this.mouseOffsetX = event.clientX - svgRect.left - this.x;
          this.mouseOffsetY = event.clientY - svgRect.top - this.y;
          this.el.classList.add('dragging');
        }

        onMouseMove(event) {
          if (this.isDragging) {
            const svgRect = canvas.getBoundingClientRect();
            this.x = event.clientX - svgRect.left - this.mouseOffsetX;
            this.y = event.clientY - svgRect.top - this.mouseOffsetY;
            this.updatePosition();
          }
        }

        onMouseUp() {
          this.isDragging = false;
          this.el.classList.remove('dragging');

        
        
        }
}
shapes.forEach(shape => {
        const s = new Shape(shape);
        shapesArr.push(s);
});

setInterval(() => {
        shapesArr.forEach(shape => shape.move());
}, 10);
