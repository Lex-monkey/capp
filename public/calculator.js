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

    // 保持原有计算逻辑...
}