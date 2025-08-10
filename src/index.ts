// Classe para representar um nó da lista duplamente encadeada
export class ListNode<T> {
    public data: T;
    public next: ListNode<T> | null;
    public prev: ListNode<T> | null;

    constructor(data: T) {
        this.data = data;
        this.next = null;
        this.prev = null;
    }
}

// Classe para implementar a lista duplamente encadeada
export class DoublyLinkedList<T> {
    private head: ListNode<T> | null;
    private tail: ListNode<T> | null;
    private count: number;

    constructor() {
        this.head = null;
        this.tail = null;
        this.count = 0;
    }

    // 1. Inserção no início da lista
    insertAtStart(data: T): void {
        const newNode = new ListNode(data);
        
        if (this.isEmpty()) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head!.prev = newNode;
            this.head = newNode;
        }
        
        this.count++;
    }

    // 2. Inserção no fim da lista
    insertAtEnd(data: T): void {
        const newNode = new ListNode(data);
        
        if (this.isEmpty()) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail!.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }
        
        this.count++;
    }

    // 3. Inserção em uma posição qualquer da lista
    insertAtPosition(data: T, position: number): boolean {
        if (position < 0 || position > this.count) {
            return false;
        }

        if (position === 0) {
            this.insertAtStart(data);
            return true;
        }

        if (position === this.count) {
            this.insertAtEnd(data);
            return true;
        }

        const newNode = new ListNode(data);
        let current = this.head;
        
        for (let i = 0; i < position; i++) {
            current = current!.next;
        }

        newNode.next = current;
        newNode.prev = current!.prev;
        current!.prev!.next = newNode;
        current!.prev = newNode;
        
        this.count++;
        return true;
    }

    // 4. Remoção no início da lista
    removeFromStart(): T | null {
        if (this.isEmpty()) {
            return null;
        }

        const removedData = this.head!.data;

        if (this.count === 1) {
            this.head = null;
            this.tail = null;
        } else {
            this.head = this.head!.next;
            this.head!.prev = null;
        }

        this.count--;
        return removedData;
    }

    // 5. Remoção no fim da lista
    removeFromEnd(): T | null {
        if (this.isEmpty()) {
            return null;
        }

        const removedData = this.tail!.data;

        if (this.count === 1) {
            this.head = null;
            this.tail = null;
        } else {
            this.tail = this.tail!.prev;
            this.tail!.next = null;
        }

        this.count--;
        return removedData;
    }

    // 6. Remoção de uma posição qualquer da lista
    removeFromPosition(position: number): T | null {
        if (position < 0 || position >= this.count) {
            return null;
        }

        if (position === 0) {
            return this.removeFromStart();
        }

        if (position === this.count - 1) {
            return this.removeFromEnd();
        }

        let current = this.head;
        for (let i = 0; i < position; i++) {
            current = current!.next;
        }

        const removedData = current!.data;
        current!.prev!.next = current!.next;
        current!.next!.prev = current!.prev;

        this.count--;
        return removedData;
    }

    // 7. Exibição da lista na ordem normal
    displayNormal(): T[] {
        const result: T[] = [];
        let current = this.head;
        
        while (current !== null) {
            result.push(current.data);
            current = current.next;
        }
        
        return result;
    }

    // 8. Exibição da lista na ordem inversa
    displayReverse(): T[] {
        const result: T[] = [];
        let current = this.tail;
        
        while (current !== null) {
            result.push(current.data);
            current = current.prev;
        }
        
        return result;
    }

    // 9. Verificar se lista está vazia
    isEmpty(): boolean {
        return this.count === 0;
    }

    // 10. Esvaziar a lista
    clear(): void {
        this.head = null;
        this.tail = null;
        this.count = 0;
    }

    // 11. Exibir o tamanho da lista
    size(): number {
        return this.count;
    }
}
