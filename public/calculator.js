let useButtons = true; // 新增输入方式标识

function toggleInputMode() {
    useButtons = !useButtons;
    const traditionalInputs = document.querySelectorAll('.input-group');
    const buttonGrid = document.querySelector('.button-grid');
    traditionalInputs.forEach(group => {
        group.style.display = useButtons ? 'none' : 'flex';
    });
    buttonGrid.style.display = useButtons ? 'grid' : 'none';
    
    if (!useButtons) {
        document.getElementById('num1').value = num1;
        document.getElementById('num2').value = num2;
        document.getElementById('operator').value = operator;
    }
}

// 新增动画工具函数
function rippleEffect(element) {
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    element.appendChild(ripple);
    
    const size = Math.max(element.offsetWidth, element.offsetHeight);
    ripple.style.width = ripple.style.height = size + 'px';
    
    ripple.style.left = '50%';
    ripple.style.top = '50%';
    
    ripple.addEventListener('animationend', () => {
        ripple.remove();
    });
}

// 修改按钮点击事件
document.querySelectorAll('.button-grid button').forEach(button => {
    button.addEventListener('click', () => {
        rippleEffect(button);
        if (button.classList.contains('number')) {
            appendNumber(button.textContent);
        } else if (button.classList.contains('operator')) {
            setOperator(button.textContent);
        } else if (button.classList.contains('equals')) {
            calculate();
        }
    });
});

// 修改appendNumber函数
function appendNumber(value) {
    if (!useButtons) return; // 非按钮模式禁止操作
    if (currentInput === 'num1') {
        num1 += value;
    } else if (currentInput === 'num2') {
        num2 += value;
    }
    updateDisplay();
}

// 修改setOperator函数
function setOperator(op) {
    if (!useButtons) return; // 非按钮模式禁止操作
    if (num1 === '') return;
    operator = op;
    currentInput = 'num2';
    updateDisplay();
}

// 新增显示效果控制函数
function updateResultDisplay(value) {
    const resultDiv = document.getElementById('result');
    resultDiv.textContent = `结果：${value}`;
    resultDiv.classList.remove('result');
    void resultDiv.offsetWidth; // 强制重绘以触发动画
    resultDiv.classList.add('result', 'animate');
}

// 修改calculate函数
async function calculate() {
    let n1, n2, op;
    if (useButtons) {
        n1 = num1;
        n2 = num2;
        op = operator;
    } else {
        n1 = document.getElementById('num1').value;
        n2 = document.getElementById('num2').value;
        op = document.getElementById('operator').value;
    }

    if (n1 === '' || n2 === '' || op === '') {
        document.getElementById('result').textContent = '请完整输入表达式';
        return;
    }

    const response = await fetch(`http://localhost:3000/calculate?num1=${n1}&num2=${n2}&operator=${op}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json());

    if (response.success) {
        updateResultDisplay(response.result);
    } else {
        document.getElementById('result').textContent = `错误：${response.error}`;
        document.getElementById('result').style.animation = 'shake 0.5s';
        setTimeout(() => {
            document.getElementById('result').style.animation = '';
        }, 500);
    }
}

// 新增初始化函数确保页面加载时正确设置输入模式
document.addEventListener('DOMContentLoaded', function() {
    toggleInputMode();
});
