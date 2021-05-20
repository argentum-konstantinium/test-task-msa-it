
class FocusVisible {
    constructor(params) {
        this.attribute = params.attribute;
        this.attributeValue = params.attributeValue || null;
        this.initFocusVisible();
    };
    checkKey(key) {
        if (
            key === "Tab" ||
            key === "ArrowDown" ||
            key === "ArrowUp" ||
            key === "ArrowLeft" ||
            key === "ArrowRight"
        ) {
            return true;
        };
    };
    focus() {
        const target = document.querySelector(":focus");
        if (target) target.setAttribute(this.attribute, this.attributeValue !== null ? this.attribute : '');
    };
    focusVisible(event) {
        if (this.checkKey(event.key)) {
            this.unFocus();
            setTimeout(this.focus.bind(this));
        };
    };
    unFocus() {
        let prevTarget = document.querySelector('[' + this.attribute + ']');
        if (prevTarget) prevTarget.removeAttribute(this.attribute);
    };
    initFocusVisible() {
        document.addEventListener("keydown", this.focusVisible.bind(this));
        document.addEventListener("click", this.unFocus.bind(this));
    };
    destroyFocusVisible() {
        document.removeEventListener('keydown', this.focusVisibleInit);
        document.removeEventListener('click', this.unFocus);
    };
};

export default FocusVisible;