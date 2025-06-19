async function calculate() {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    const operator = document.getElementById('operator').value;
    
    if(isNaN(num1) || isNaN(num2)) {
        document.getElementById('result').textContent = '请输入有效的数字';
        return;
    }

    try {
        const response = await fetch('/calculate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ num1, num2, operator })
        });
        
        const data = await response.json();
        
        if(data.success) {
            document.getElementById('result').textContent = `结果: ${data.result}`;
        } else {
            document.getElementById('result').textContent = `错误: ${data.error}`;
        }
    } catch (error) {
        document.getElementById('result').textContent = `请求失败: ${error.message}`;
    }
}