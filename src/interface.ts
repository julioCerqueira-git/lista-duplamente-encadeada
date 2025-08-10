import { DoublyLinkedList } from './index';

// Declaração global para acessar a lista no console
declare global {
    interface Window {
        doublyLinkedList: DoublyLinkedList<number>;
    }
}

// Instância global da lista duplamente encadeada
window.doublyLinkedList = new DoublyLinkedList<number>();

// Funções para controlar a interface HTML

// Atualizar a visualização da lista
function updateListDisplay(): void {
    const listDisplay = document.getElementById('listDisplay');
    if (!listDisplay) return;

    if (window.doublyLinkedList.isEmpty()) {
        listDisplay.innerHTML = '<p>Lista vazia</p>';
    } else {
        const items = window.doublyLinkedList.displayNormal();
        const displayText = items.map(item => `<span class="list-item">${item}</span>`).join(' ↔ ');
        listDisplay.innerHTML = `<p>${displayText}</p>`;
    }
}

// Adicionar mensagem de saída
function addOutputMessage(message: string, type: 'success' | 'error' | 'info' = 'info'): void {
    const output = document.getElementById('output');
    if (!output) return;

    const timestamp = new Date().toLocaleTimeString();
    const messageElement = document.createElement('p');
    messageElement.className = `message ${type}`;
    messageElement.textContent = `[${timestamp}] ${message}`;
    
    output.appendChild(messageElement);
    output.scrollTop = output.scrollHeight;
}

// Obter valor do campo de entrada
function getValue(): number | null {
    const valueInput = document.getElementById('valueInput') as HTMLInputElement;
    if (!valueInput || valueInput.value === '') {
        addOutputMessage('Por favor, digite um valor!', 'error');
        return null;
    }
    
    const value = parseInt(valueInput.value);
    if (isNaN(value) || value < 0) {
        addOutputMessage('Por favor, digite um valor numérico válido!', 'error');
        return null;
    }
    
    return value;
}

// Obter posição do campo de entrada
function getPosition(): number | null {
    const positionInput = document.getElementById('positionInput') as HTMLInputElement;
    if (!positionInput || positionInput.value === '') {
        return null;
    }
    
    const position = parseInt(positionInput.value);
    if (isNaN(position) || position < 0) {
        addOutputMessage('Por favor, digite uma posição válida!', 'error');
        return null;
    }
    
    return position;
}

// Limpar campos de entrada
function clearInputs(): void {
    const valueInput = document.getElementById('valueInput') as HTMLInputElement;
    const positionInput = document.getElementById('positionInput') as HTMLInputElement;
    
    if (valueInput) valueInput.value = '';
    if (positionInput) positionInput.value = '';
}

// Event listeners para os botões de inserção
document.getElementById('insertStart')?.addEventListener('click', () => {
    const value = getValue();
    if (value !== null) {
        window.doublyLinkedList.insertAtStart(value);
        addOutputMessage(`Valor ${value} inserido no início da lista`, 'success');
        updateListDisplay();
        clearInputs();
    }
});

document.getElementById('insertEnd')?.addEventListener('click', () => {
    const value = getValue();
    if (value !== null) {
        window.doublyLinkedList.insertAtEnd(value);
        addOutputMessage(`Valor ${value} inserido no fim da lista`, 'success');
        updateListDisplay();
        clearInputs();
    }
});

document.getElementById('insertPosition')?.addEventListener('click', () => {
    const value = getValue();
    const position = getPosition();
    
    if (value !== null) {
        if (position === null) {
            addOutputMessage('Por favor, digite uma posição!', 'error');
            return;
        }
        
        if (window.doublyLinkedList.insertAtPosition(value, position)) {
            addOutputMessage(`Valor ${value} inserido na posição ${position}`, 'success');
        } else {
            addOutputMessage(`Posição ${position} inválida!`, 'error');
        }
        updateListDisplay();
        clearInputs();
    }
});

// Event listeners para os botões de remoção
document.getElementById('removeStart')?.addEventListener('click', () => {
    const removedValue = window.doublyLinkedList.removeFromStart();
    if (removedValue !== null) {
        addOutputMessage(`Valor ${removedValue} removido do início da lista`, 'success');
    } else {
        addOutputMessage('Lista está vazia!', 'error');
    }
    updateListDisplay();
});

document.getElementById('removeEnd')?.addEventListener('click', () => {
    const removedValue = window.doublyLinkedList.removeFromEnd();
    if (removedValue !== null) {
        addOutputMessage(`Valor ${removedValue} removido do fim da lista`, 'success');
    } else {
        addOutputMessage('Lista está vazia!', 'error');
    }
    updateListDisplay();
});

document.getElementById('removePosition')?.addEventListener('click', () => {
    const position = getPosition();
    if (position === null) {
        addOutputMessage('Por favor, digite uma posição!', 'error');
        return;
    }
    
    const removedValue = window.doublyLinkedList.removeFromPosition(position);
    if (removedValue !== null) {
        addOutputMessage(`Valor ${removedValue} removido da posição ${position}`, 'success');
    } else {
        addOutputMessage(`Posição ${position} inválida ou lista vazia!`, 'error');
    }
    updateListDisplay();
    clearInputs();
});

// Event listeners para os botões de visualização
document.getElementById('displayNormal')?.addEventListener('click', () => {
    const items = window.doublyLinkedList.displayNormal();
    if (items.length === 0) {
        addOutputMessage('Lista está vazia!', 'info');
    } else {
        addOutputMessage(`Lista (ordem normal): [${items.join(', ')}]`, 'info');
    }
});

document.getElementById('displayReverse')?.addEventListener('click', () => {
    const items = window.doublyLinkedList.displayReverse();
    if (items.length === 0) {
        addOutputMessage('Lista está vazia!', 'info');
    } else {
        addOutputMessage(`Lista (ordem reversa): [${items.join(', ')}]`, 'info');
    }
});

// Event listeners para os botões utilitários
document.getElementById('isEmpty')?.addEventListener('click', () => {
    const isEmpty = window.doublyLinkedList.isEmpty();
    addOutputMessage(`Lista está ${isEmpty ? 'vazia' : 'não vazia'}`, 'info');
});

document.getElementById('clear')?.addEventListener('click', () => {
    window.doublyLinkedList.clear();
    addOutputMessage('Lista esvaziada com sucesso!', 'success');
    updateListDisplay();
});

document.getElementById('size')?.addEventListener('click', () => {
    const size = window.doublyLinkedList.size();
    addOutputMessage(`Tamanho da lista: ${size} elemento(s)`, 'info');
});

// Inicializar a interface
updateListDisplay();
addOutputMessage('Aplicação iniciada. Use os botões para interagir com a lista.', 'info');
