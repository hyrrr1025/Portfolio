// 获取图片容器
const imageDeck = document.getElementById('image-deck');
// 获取所有的图片链接
const deckImages = document.querySelectorAll('.deck-image');
// 获取标题容器 (用来在散开时隐藏它)
const titleContainer = document.getElementById('title-container');

let isScattered = false;

// 1. 初始化时检查 URL 参数 (实现“返回即散开”)
const params = new URLSearchParams(window.location.search);

if (params.get('state') === 'scattered') {
    // 标记状态为已散开
    isScattered = true; 
    
    // 添加散开样式
    imageDeck.classList.add('scattered');
    
    // 隐藏标题
    if (titleContainer) {
        titleContainer.style.display = 'none';
    }

    // --- 关键：强制取消开场动画，让图片瞬间到位 ---
    deckImages.forEach(img => {
        // 1. 关掉入场动画
        img.style.animation = 'none';
        // 2. 强制显示 (因为原 CSS 里 opacity 是 0)
        img.style.opacity = '1';
        // 3. 关掉过渡 (防止图片从中间滑到两边)
        img.style.transition = 'none';
    });

    // --- 恢复过渡效果 ---
    // 为了让之后的鼠标悬停 (Hover) 还有呼吸感，
    // 需要延时一小会儿把 transition 加回来
    setTimeout(() => {
        deckImages.forEach(img => {
            img.style.transition = ''; // 清空内联样式，恢复 CSS 文件里的设置
        });
    }, 100);
}


// 2. 为每张图片单独添加点击逻辑
deckImages.forEach(img => {
    img.addEventListener('click', function(e) {
        if (!isScattered) {
            // 如果还没散开，阻止链接跳转
            e.preventDefault();
            // 点击事件会冒泡到 body，触发下面的散开逻辑
        } else {
            // 如果已经散开 (isScattered 为 true)，允许默认行为 (跳转)
        }
    });
});

// 3. 监听页面点击 (处理“散开”动作)
document.body.addEventListener('click', function() {
    if (!isScattered) {
        // 添加 scattered 类名触发 CSS 动画
        imageDeck.classList.add('scattered');
        isScattered = true;

        // 如果你是通过点击散开的，标题应该淡出而不是瞬间消失
        // 这里不需要写额外逻辑，因为 CSS 里图片散开会盖住标题，
        // 或者你可以选择在这里给标题加个 fade-out class
    }
});