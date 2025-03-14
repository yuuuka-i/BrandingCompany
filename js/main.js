// GSAPのプラグインを登録
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

// アニメーションの定義
gsap.to("#flower", {
    ease: 'none',
    scrollTrigger: {
        trigger: ".scroll-container",
        start: "top top",
        end: "bottom+=1000 bottom",
        scrub: true,
        // markers: true,
        onUpdate: self => {
            const flower = document.getElementById("flower");
            const sections = document.querySelectorAll(".section");
            const flowerRect = flower.getBoundingClientRect();
            const flowerCenterY = flowerRect.top + flowerRect.height / 2;

            sections.forEach(section => {
                const sectionRect = section.getBoundingClientRect();
                const sectionColor = section.dataset.color;

                // circle 要素が存在するか確認
                if (circle) {
                    // セクションの上端または下端にflowerの中心が重なる場合に色を変える
                    if (flowerCenterY >= sectionRect.top && flowerCenterY <= sectionRect.bottom) {
                        circle.style.fill = `#${sectionColor}`;
                    }
                }
            });
        }
    },
    motionPath: {
        path: "#motionPath",
        align: "#motionPath",
        autoRotate: true,
        alignOrigin: [0.5, 0.5]
    }
});
