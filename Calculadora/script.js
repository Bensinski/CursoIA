class Calculator {
    constructor() {
        this.previousOperand = '';
        this.currentOperand = '0';
        this.operation = undefined;
        this.shouldResetScreen = false;
        
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Event listeners para números
        document.querySelectorAll('.btn[data-number]').forEach(button => {
            button.addEventListener('click', () => {
                this.appendNumber(button.dataset.number);
                this.updateDisplay();
            });
        });

        // Event listeners para operadores
        document.querySelectorAll('.btn[data-action]').forEach(button => {
            button.addEventListener('click', () => {
                const action = button.dataset.action;
                
                switch(action) {
                    case 'add':
                        this.chooseOperation('+');
                        break;
                    case 'subtract':
                        this.chooseOperation('-');
                        break;
                    case 'multiply':
                        this.chooseOperation('×');
                        break;
                    case 'divide':
                        this.chooseOperation('÷');
                        break;
                    case 'equals':
                        this.compute();
                        break;
                    case 'clear':
                        this.clear();
                        break;
                    case 'delete':
                        this.delete();
                        break;
                    case 'percent':
                        this.percent();
                        break;
                }
                
                this.updateDisplay();
            });
        });

        // Event listener para teclado
        document.addEventListener('keydown', (e) => {
            this.handleKeyboard(e);
        });
    }

    appendNumber(number) {
        if (this.shouldResetScreen) {
            this.currentOperand = '';
            this.shouldResetScreen = false;
        }
        
        if (number === '.' && this.currentOperand.includes('.')) return;
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number;
        } else {
            this.currentOperand += number;
        }
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        
        if (isNaN(prev) || isNaN(current)) return;
        
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '×':
                computation = prev * current;
                break;
            case '÷':
                if (current === 0) {
                    alert('No se puede dividir por cero');
                    return;
                }
                computation = prev / current;
                break;
            default:
                return;
        }
        
        this.currentOperand = computation.toString();
        this.operation = undefined;
        this.previousOperand = '';
        this.shouldResetScreen = true;
    }

    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete() {
        if (this.currentOperand === '0') return;
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
        if (this.currentOperand === '') {
            this.currentOperand = '0';
        }
    }

    percent() {
        const current = parseFloat(this.currentOperand);
        if (isNaN(current)) return;
        this.currentOperand = (current / 100).toString();
    }

    formatDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('es-ES', {
                maximumFractionDigits: 0
            });
        }
        
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        document.getElementById('current-operand').textContent = this.formatDisplayNumber(this.currentOperand);
        
        if (this.operation != null) {
            document.getElementById('previous-operand').textContent = 
                `${this.formatDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
            document.getElementById('previous-operand').textContent = '';
        }
    }

    handleKeyboard(e) {
        const key = e.key;
        
        if (key >= '0' && key <= '9' || key === '.') {
            this.appendNumber(key);
        } else if (key === '+' || key === '-') {
            this.chooseOperation(key);
        } else if (key === '*') {
            this.chooseOperation('×');
        } else if (key === '/') {
            e.preventDefault();
            this.chooseOperation('÷');
        } else if (key === 'Enter' || key === '=') {
            this.compute();
        } else if (key === 'Backspace') {
            this.delete();
        } else if (key === 'Escape') {
            this.clear();
        }
        
        this.updateDisplay();
    }
}

// Inicializar la calculadora cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    new Calculator();
});
