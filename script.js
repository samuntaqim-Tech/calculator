// Get the display element
const display = document.getElementById('result');

// Append value to display
function appendToDisplay(value) {
    if (!validateInput(value)) {
        return;
    }
    display.value += value;
}

// Clear the display
function clearDisplay() {
    display.value = '';
}

// Delete last character
function deleteLast() {
    display.value = display.value.slice(0, -1);
}

// Calculate the result
function calculateResult() {
    try {
        // Replace × with * for calculation
        let expression = display.value.replace(/×/g, '*');
        
        // Safe calculation using Function (better than eval)
        const result = new Function('return ' + expression)();
        
        // Check if result is valid
        if (isNaN(result) || !isFinite(result)) {
            display.value = 'Error';
        } else {
            display.value = result;
        }
    } catch (error) {
        display.value = 'Error';
    }
}

// Input validation
function validateInput(value) {
    const currentDisplay = display.value;
    const lastChar = currentDisplay.slice(-1);
    const operators = ['+', '-', '*', '/', '.'];
    
    // Prevent multiple operators in sequence
    if (operators.includes(lastChar) && operators.includes(value)) {
        return false;
    }
    
    // Prevent multiple decimal points in same number
    if (value === '.') {
        const parts = currentDisplay.split(/[\+\-\*\/]/);
        const currentNumber = parts[parts.length - 1];
        if (currentNumber.includes('.')) {
            return false;
        }
    }
    
    return true;
}

// Keyboard support
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    if (key >= '0' && key <= '9') {
        appendToDisplay(key);
    } else if (['+', '-', '*', '/'].includes(key)) {
        appendToDisplay(key);
    } else if (key === '.') {
        appendToDisplay('.');
    } else if (key === 'Enter' || key === '=') {
        calculateResult();
    } else if (key === 'Escape' || key === 'c' || key === 'C') {
        clearDisplay();
    } else if (key === 'Backspace') {
        deleteLast();
    }
});
