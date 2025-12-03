/**
 * Line Command Implementation
 */

class LineCommand {
    constructor(core) {
        this.core = core;
        this.step = 0; // 0: First point, 1: Next point
        this.startPoint = null;

        // Initial Prompt
        console.log("LINE: Specify first point:");
    }

    onMouseDown(mouse) {
        if (this.step === 0) {
            // Set Start Point
            this.startPoint = { x: mouse.x, y: mouse.y };
            this.step = 1;
            console.log("LINE: Specify next point:");
        } else if (this.step === 1) {
            // Finish Segment
            const endPoint = { x: mouse.x, y: mouse.y };

            // Add entity to core
            this.core.addEntity({
                type: 'line',
                x1: this.startPoint.x,
                y1: this.startPoint.y,
                x2: endPoint.x,
                y2: endPoint.y
            });

            // Continue chain (like real CAD)
            this.startPoint = endPoint;
        }
    }

    onMouseMove(mouse) {
        if (this.step === 1 && this.startPoint) {
            // Update Preview
            this.core.setPreview({
                type: 'line',
                x1: this.startPoint.x,
                y1: this.startPoint.y,
                x2: mouse.x,
                y2: mouse.y
            });
        }
    }

    onCancel() {
        console.log("LINE: Cancelled");
    }

    onFinish() {
        console.log("LINE: Finished");
    }

    onEnter() {
        // Enter to finish command if in step 1
        if (this.step === 1) {
            this.core.finishCommand();
        }
    }
}

// Register
if (!window.WebCadCommands) window.WebCadCommands = {};
window.WebCadCommands['LINE'] = LineCommand;
window.WebCadCommands['L'] = LineCommand; // Alias
