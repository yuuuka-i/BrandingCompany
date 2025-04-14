// GSAPのプラグインを登録
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

// 共通の色変化ロジック
function setupColorChange() {
    const flower = document.getElementById("flower");
    const sections = document.querySelectorAll(".section");
    const flowerRect = flower.getBoundingClientRect();
    const flowerCenterY = flowerRect.top + flowerRect.height / 2;

    sections.forEach(section => {
        const sectionRect = section.getBoundingClientRect();
        const sectionColor = section.dataset.color;
        const circle = document.querySelector("#circle");

        if (circle && flowerCenterY >= sectionRect.top && flowerCenterY <= sectionRect.bottom) {
            circle.style.fill = `#${sectionColor}`;
        }
    });
}

// PC用アニメーション
function setupPCAnimation() {
    gsap.to("#flower", {
        ease: 'none',
        scrollTrigger: {
            trigger: ".scroll-container",
            start: "top top",
            end: "bottom+=1700 bottom",
            scrub: true,
            onUpdate: () => setupColorChange()
        },
        motionPath: {
            path: "#motionPath",
            align: "#motionPath",
            autoRotate: true,
            alignOrigin: [0.5, 0.5]
        }
    });
}

// SP用アニメーション
function setupSPAnimation() {
    gsap.to("#flowersp", {
        ease: 'none',
        scrollTrigger: {
            trigger: ".scroll-container-sp",
            start: "top top",
            end: "bottom-=500 bottom",
            scrub: true,
            onUpdate: () => setupColorChange()
        },
        motionPath: {
            path: "#motionPathSP",
            align: "#motionPathSP",
            autoRotate: true,
            alignOrigin: [0.5, 0.5]
        }
    });
}

// 初回読み込み時に実行
function init() {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    if (window.innerWidth >= 768) {
        setupPCAnimation();
    } else {
        setupSPAnimation();
    }
}

// 初期実行
init();

// リサイズ対応（必要に応じてdebounceしても◎）
window.addEventListener("resize", () => {
    init();
});
