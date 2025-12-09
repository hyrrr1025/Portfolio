const papers = [
    document.getElementById('paper-1'),
    document.getElementById('paper-2')
];

// 获取点击区域元素
const zoneLeft = document.getElementById('zone-left');
const zoneRight = document.getElementById('zone-right');

let currentPaperIndex = 0; 
let highestZ = 100; 

// --- 更新点击区域状态 ---
function updateClickZones() {
    // 第一页时，隐藏左侧翻页区
    if (currentPaperIndex === 0) {
        zoneLeft.style.display = 'none';
    } else {
        zoneLeft.style.display = 'block';
    }

    // 翻完所有可翻的纸张后（此时显示的是 Candle 页），隐藏右侧翻页区
    if (currentPaperIndex === papers.length) {
        zoneRight.style.display = 'none';
    } else {
        zoneRight.style.display = 'block';
    }
}

function goNext() {
    if (currentPaperIndex < papers.length) {
        const currentPaper = papers[currentPaperIndex];
        
        highestZ++;
        currentPaper.style.zIndex = highestZ;
        
        currentPaper.classList.add('flipped');
        currentPaperIndex++;

        updateClickZones();
    }
}

function goPrev() {
    if (currentPaperIndex > 0) {
        currentPaperIndex--;
        const currentPaper = papers[currentPaperIndex];
        
        highestZ++;
        currentPaper.style.zIndex = highestZ;
        
        currentPaper.classList.remove('flipped');

        updateClickZones();
    }
}

// 绑定交互
zoneRight.addEventListener('click', goNext);
zoneLeft.addEventListener('click', goPrev);

// 键盘支持
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') goNext();
    if (e.key === 'ArrowLeft') goPrev();
});

// --- 自动缩放适配 ---
function resizeApp() {
    const scaler = document.getElementById('scaler');
    const baseWidth = 1920;
    const baseHeight = 1080;
    const winWidth = window.innerWidth;
    const winHeight = window.innerHeight;
    const scale = Math.min(winWidth / baseWidth, winHeight / baseHeight);
    scaler.style.transform = `scale(${scale})`;
}
window.addEventListener('resize', resizeApp);

// 初始化
resizeApp();
updateClickZones();