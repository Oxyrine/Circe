
// WebGL Drifting Nodes, Network Logic, and Gold Dust
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('constellationCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let width, height;
    let nodes = [];
    let dust = [];
    const LINK = 160; 
    const MAX_NODES = window.innerWidth < 768 ? 40 : 85;
    const MAX_DUST = 200;

    function resize() {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = Math.max(1, Math.floor(width * dpr));
        canvas.height = Math.max(1, Math.floor(height * dpr));
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.imageSmoothingEnabled = false;
    }
    
    window.addEventListener('resize', () => {
        resize();
        initNodes();
    });
    resize();

    function initNodes() {
        nodes = [];
        dust = [];
        for(let i=0; i<MAX_NODES; i++) {
            nodes.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                radius: Math.random() * 2.4 + 1.8
            });
        }

    }
    initNodes();

    function dist(a, b) {
        return Math.hypot(a.x - b.x, a.y - b.y);
    }

    function animateCanvas() {
        ctx.clearRect(0, 0, width, height);
        ctx.lineCap = 'butt';
        ctx.lineJoin = 'miter';
        
        // Draw Network Links
        ctx.strokeStyle = '#E6C879';
        ctx.lineWidth = 1;
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const d = dist(nodes[i], nodes[j]);
                if (d < LINK) {
                    ctx.globalAlpha = 0.22 + (1 - d/LINK) * 0.55;
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.stroke();
                }
            }
        }

        // Draw Network Nodes
        nodes.forEach(node => {
            node.x += node.vx;
            node.y += node.vy;
            if(node.x < 0 || node.x > width) node.vx *= -1;
            if(node.y < 0 || node.y > height) node.vy *= -1;
            
            const pulse = 0.78 + Math.sin(Date.now() * 0.001 + node.x) * 0.22;
            ctx.fillStyle = '#E6C879';
            ctx.globalAlpha = pulse * 0.28;
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius * 2.4, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = pulse;
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            ctx.fill();
        });



        ctx.globalAlpha = 1;
        if (document.getElementById('landing-page').style.visibility !== 'hidden') requestAnimationFrame(animateCanvas);
    }
    
    animateCanvas();

    const enterBtn = document.getElementById('enter-btn-new');
    if (enterBtn) {
        enterBtn.addEventListener('click', () => {
            const lp = document.getElementById('landing-page');
            const as = document.getElementById('app-shell');
            if (lp) {
                lp.style.opacity = '0';
                lp.style.visibility = 'hidden';
                lp.style.pointerEvents = 'none';
                setTimeout(() => {
                    lp.style.display = 'none';
                    if (as) {
                        as.classList.remove('hidden-app');
                        if (window.initializeOuroboros) window.initializeOuroboros();
                        if (window.initializeMap) window.initializeMap();
                    }
                }, 400);
            }
        });
    }
});
