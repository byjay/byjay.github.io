/**
 * Web CAD Core Engine
 * Handles canvas setup, coordinate systems, and event loop.
 */

class WebCadCore {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width;
        this.height = this.canvas.height;

        // State
        this.activeCommand = null;
        this.entities = []; // List of drawn objects {type: 'line', x1, y1, x2, y2, ...}
        this.previewEntity = null; // Object currently being drawn (ghost)
        this.mouse = { x: 0, y: 0, down: false };
        this.commandHistory = [];

        // Coordinate System (Simple Pan/Zoom can be added later)
        this.offset = { x: 0, y: 0 };
        this.scale = 1;

        // Bind events
        this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
        this.canvas.addEventListener('mousedown', this.handleMouseDown.bind(this));
        this.canvas.addEventListener('mouseup', this.handleMouseUp.bind(this));
        document.addEventListener('keydown', this.handleKeyDown.bind(this));

        // Start Loop
        requestAnimationFrame(this.render.bind(this));
    }

    // --- Event Handlers ---
    handleMouseMove(e) {
        const rect = this.canvas.getBoundingClientRect();
        this.mouse.x = e.clientX - rect.left;
        this.mouse.y = e.clientY - rect.top;

        if (this.activeCommand && this.activeCommand.onMouseMove) {
            this.activeCommand.onMouseMove(this.mouse);
        }
    }

    handleMouseDown(e) {
        this.mouse.down = true;
        if (this.activeCommand && this.activeCommand.onMouseDown) {
            this.activeCommand.onMouseDown(this.mouse);
        }
    }

    handleMouseUp(e) {
        this.mouse.down = false;
        if (this.activeCommand && this.activeCommand.onMouseUp) {
            this.activeCommand.onMouseUp(this.mouse);
        }
    }

    handleKeyDown(e) {
        if (e.key === 'Escape') {
            this.cancelCommand();
        } else if (e.key === 'Enter') {
            if (this.activeCommand && this.activeCommand.onEnter) {
                this.activeCommand.onEnter();
            }
        }
    }

    // --- Command Management ---
    startCommand(commandName) {
        console.log(`Starting command: ${commandName}`);
        if (this.activeCommand) {
            this.cancelCommand();
        }

        // Dynamic loading or factory pattern could go here
        // For now, we assume commands are registered globally or passed in
        if (window.WebCadCommands && window.WebCadCommands[commandName]) {
            this.activeCommand = new window.WebCadCommands[commandName](this);
            this.commandHistory.push(commandName);
            // Trigger UI update if needed
        } else {
            console.warn(`Command ${commandName} not found.`);
        }
    }

    cancelCommand() {
        if (this.activeCommand) {
            console.log("Canceling command");
            if (this.activeCommand.onCancel) this.activeCommand.onCancel();
            this.activeCommand = null;
            this.previewEntity = null;
        }
    }

    finishCommand() {
        if (this.activeCommand) {
            console.log("Finishing command");
            if (this.activeCommand.onFinish) this.activeCommand.onFinish();
            this.activeCommand = null;
            this.previewEntity = null;
        }
    }

    // --- Drawing API ---
    addEntity(entity) {
        this.entities.push(entity);
    }

    setPreview(entity) {
        this.previewEntity = entity;
    }

    // --- Rendering ---
    render() {
        // Clear
        this.ctx.fillStyle = '#222'; // Dark CAD background
        this.ctx.fillRect(0, 0, this.width, this.height);

        // Grid (Optional)
        this.drawGrid();

        // Draw Entities
        this.ctx.strokeStyle = '#fff';
        this.ctx.lineWidth = 1;

        for (const ent of this.entities) {
            this.drawEntity(ent);
        }

        // Draw Preview
        if (this.previewEntity) {
            this.ctx.strokeStyle = '#aaa'; // Grey for ghost
            this.ctx.setLineDash([5, 5]);
            this.drawEntity(this.previewEntity);
            this.ctx.setLineDash([]);
        }

        // Draw Cursor
        this.drawCursor();

        requestAnimationFrame(this.render.bind(this));
    }

    drawEntity(ent) {
        this.ctx.beginPath();
        if (ent.type === 'line') {
            this.ctx.moveTo(ent.x1, ent.y1);
            this.ctx.lineTo(ent.x2, ent.y2);
        } else if (ent.type === 'circle') {
            this.ctx.arc(ent.cx, ent.cy, ent.r, 0, Math.PI * 2);
        }
        this.ctx.stroke();
    }

    drawCursor() {
        const x = this.mouse.x;
        const y = this.mouse.y;
        const size = 15;

        this.ctx.strokeStyle = '#fff';
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.moveTo(x - size, y);
        this.ctx.lineTo(x + size, y);
        this.ctx.moveTo(x, y - size);
        this.ctx.lineTo(x, y + size);
        this.ctx.stroke();

        // Pickbox
        const box = 3;
        this.ctx.strokeRect(x - box, y - box, box * 2, box * 2);
    }

    drawGrid() {
        this.ctx.strokeStyle = '#333';
        this.ctx.lineWidth = 0.5;
        const step = 50;

        this.ctx.beginPath();
        for (let x = 0; x <= this.width; x += step) {
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.height);
        }
        for (let y = 0; y <= this.height; y += step) {
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.width, y);
        }
        this.ctx.stroke();
    }
}

// Expose globally
window.WebCadCore = WebCadCore;
window.WebCadCommands = {};
