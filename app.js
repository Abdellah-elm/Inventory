// ==========================================
// AUTHENTICATION MANAGER
// ==========================================
class AuthManager {
    constructor() {
        this.currentUser = null;
        this.loadSession();
    }

    loadSession() {
        const stored = localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser');
        if (stored) {
            try {
                const userData = JSON.parse(stored);
                if (userData && userData.username) {
                    this.currentUser = userData.username;
                }
            } catch (e) {
                localStorage.removeItem('currentUser');
                sessionStorage.removeItem('currentUser');
            }
        }
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
        sessionStorage.removeItem('currentUser');
    }

    isAuthenticated() {
        return !!this.currentUser;
    }

    getCurrentUser() {
        return this.currentUser || 'Admin';
    }
}

// ==========================================
// MOCK DATA SERVICE
// ==========================================
class MockService {
    constructor() {
        this.delay = 300;
        this.storageKey = 'inventoryAppData';
        this.initializeData();
    }

    initializeData() {
        const stored = localStorage.getItem(this.storageKey);
        if (stored) {
            this.data = JSON.parse(stored);
        } else {
            this.data = {
                products: [
                    { id: 1, name: 'Ordinateur Portable Dell', sku: 'DELL-001', quantity: 15, price: 899.99, category: 1, description: 'Ordinateur professionnel haute performance', status: 'active' },
                    { id: 2, name: 'Clavier Mécanique', sku: 'KEY-001', quantity: 45, price: 79.99, category: 2, description: 'Clavier gaming RGB', status: 'active' },
                    { id: 3, name: 'Souris Sans Fil', sku: 'MOU-001', quantity: 30, price: 29.99, category: 2, description: 'Souris ergonomique', status: 'active' },
                    { id: 4, name: 'Écran 27 pouces', sku: 'SCR-001', quantity: 12, price: 349.99, category: 1, description: 'Écran 4K UHD', status: 'active' },
                    { id: 5, name: 'Webcam HD', sku: 'CAM-001', quantity: 2, price: 59.99, category: 2, description: 'Webcam 1080p', status: 'active' },
                    { id: 6, name: 'Routeur WiFi 6', sku: 'NET-001', quantity: 8, price: 129.99, category: 3, description: 'Routeur haute performance', status: 'active' },
                    { id: 7, name: 'Switch Gigabit', sku: 'NET-002', quantity: 0, price: 89.99, category: 3, description: 'Switch 24 ports', status: 'active' },
                    { id: 8, name: 'Casque Audio', sku: 'ACC-001', quantity: 25, price: 49.99, category: 2, description: 'Casque Bluetooth 5.0', status: 'active' }
                ],
                suppliers: [
                    { id: 1, name: 'TechDistrib', contact: 'Ahmed Benali', email: 'ahmed@techdistrib.ma', phone: '+212-600-111-222', address: 'Casablanca, Maroc', status: 'active' },
                    { id: 2, name: 'GlobalIT', contact: 'Sarah Martin', email: 'sarah@globalit.com', phone: '+212-600-333-444', address: 'Rabat, Maroc', status: 'active' },
                    { id: 3, name: 'ElectroSupply', contact: 'Karim Ziani', email: 'karim@electro.ma', phone: '+212-600-555-666', address: 'Tanger, Maroc', status: 'active' }
                ],
                warehouses: [
                    { id: 1, name: 'Entrepôt Principal', location: 'Casablanca', capacity: 10000, manager: 'Hassan Alami', status: 'active' },
                    { id: 2, name: 'Entrepôt Nord', location: 'Tanger', capacity: 5000, manager: 'Fatima Zahra', status: 'active' },
                    { id: 3, name: 'Entrepôt Sud', location: 'Agadir', capacity: 3000, manager: 'Omar Idrissi', status: 'active' }
                ],
                orders: [
                    { id: 1, orderNumber: 'ORD-001', supplier: 1, product: 1, quantity: 50, date: '2024-11-15', status: 'completed' },
                    { id: 2, orderNumber: 'ORD-002', supplier: 2, product: 2, quantity: 100, date: '2024-12-01', status: 'completed' },
                    { id: 3, orderNumber: 'ORD-003', supplier: 1, product: 3, quantity: 75, date: '2024-12-15', status: 'processing' },
                    { id: 4, orderNumber: 'ORD-004', supplier: 3, product: 4, quantity: 20, date: '2024-12-20', status: 'pending' },
                    { id: 5, orderNumber: 'ORD-005', supplier: 2, product: 5, quantity: 30, date: '2024-12-22', status: 'pending' },
                    { id: 6, orderNumber: 'ORD-006', supplier: 1, product: 6, quantity: 15, date: '2024-12-25', status: 'completed' }
                ],
                categories: [
                    { id: 1, name: 'Informatique', description: 'Matériel informatique', status: 'active' },
                    { id: 2, name: 'Accessoires', description: 'Accessoires PC', status: 'active' },
                    { id: 3, name: 'Réseau', description: 'Équipement réseau', status: 'active' }
                ]
            };
            this.saveData();
        }
    }

    saveData() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.data));
    }

    async simulateDelay() {
        return new Promise(resolve => setTimeout(resolve, this.delay));
    }

    async get(entity) {
        await this.simulateDelay();
        return [...this.data[entity]];
    }

    async getById(entity, id) {
        await this.simulateDelay();
        return this.data[entity].find(item => item.id === id);
    }

    async create(entity, item) {
        await this.simulateDelay();
        const newId = this.data[entity].length > 0 
            ? Math.max(...this.data[entity].map(i => i.id)) + 1 
            : 1;
        const newItem = { id: newId, ...item };
        this.data[entity].push(newItem);
        this.saveData();
        return newItem;
    }

    async update(entity, id, updatedItem) {
        await this.simulateDelay();
        const index = this.data[entity].findIndex(item => item.id === id);
        if (index !== -1) {
            this.data[entity][index] = { id, ...updatedItem };
            this.saveData();
            return this.data[entity][index];
        }
        throw new Error('Item not found');
    }

    async delete(entity, id) {
        await this.simulateDelay();
        const index = this.data[entity].findIndex(item => item.id === id);
        if (index !== -1) {
            this.data[entity].splice(index, 1);
            this.saveData();
            return true;
        }
        throw new Error('Item not found');
    }
}
// ==========================================
// BASE ENTITY MANAGER
// ==========================================
class EntityManager {
    constructor(entityName, mockService, app) {
        this.entityName = entityName;
        this.mockService = mockService;
        this.app = app;
        this.searchTerm = '';
        this.filters = {};
        this.currentPage = 1;
        this.itemsPerPage = 10;
        this.sortField = null;
        this.sortDirection = 'asc';
    }

    async getFilteredItems() {
        let items = await this.mockService.get(this.entityName);
        
        if (this.searchTerm) {
            items = this.search(items, this.searchTerm);
        }
        
        items = this.applyFilters(items);
        
        if (this.sortField) {
            items = this.sortItems(items);
        }
        
        return items;
    }

    getPaginatedItems(items) {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        return items.slice(start, start + this.itemsPerPage);
    }

    sortItems(items) {
        return [...items].sort((a, b) => {
            const aVal = a[this.sortField];
            const bVal = b[this.sortField];
            
            if (typeof aVal === 'string') {
                return this.sortDirection === 'asc' 
                    ? aVal.localeCompare(bVal)
                    : bVal.localeCompare(aVal);
            }
            
            return this.sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
        });
    }

    sortBy(field) {
        if (this.sortField === field) {
            this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            this.sortField = field;
            this.sortDirection = 'asc';
        }
        this.updateSortIcons();
        this.render();
    }

    updateSortIcons() {
        document.querySelectorAll(`#${this.entityName}-table th[data-sortable]`).forEach(th => {
            th.classList.remove('sorted-asc', 'sorted-desc');
            if (th.dataset.field === this.sortField) {
                th.classList.add(`sorted-${this.sortDirection}`);
            }
        });
    }

    goToPage(page) {
        this.currentPage = page;
        this.render();
    }

    renderPagination(totalItems) {
        const totalPages = Math.ceil(totalItems / this.itemsPerPage);
        const container = document.getElementById(`${this.entityName}-pagination`);
        if (!container) return;
        
        if (totalPages <= 1) {
            container.innerHTML = '';
            return;
        }
        
        let html = '<button ' + (this.currentPage === 1 ? 'disabled' : '') + ' onclick="app.' + this.entityName + 'Manager.goToPage(' + (this.currentPage - 1) + ')">«</button>';
        
        const startPage = Math.max(1, this.currentPage - 2);
        const endPage = Math.min(totalPages, this.currentPage + 2);
        
        if (startPage > 1) {
            html += '<button onclick="app.' + this.entityName + 'Manager.goToPage(1)">1</button>';
            if (startPage > 2) html += '<span class="page-info">...</span>';
        }
        
        for (let i = startPage; i <= endPage; i++) {
            html += '<button class="' + (i === this.currentPage ? 'active' : '') + '" onclick="app.' + this.entityName + 'Manager.goToPage(' + i + ')">' + i + '</button>';
        }
        
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) html += '<span class="page-info">...</span>';
            html += '<button onclick="app.' + this.entityName + 'Manager.goToPage(' + totalPages + ')">' + totalPages + '</button>';
        }
        
        html += '<button ' + (this.currentPage === totalPages ? 'disabled' : '') + ' onclick="app.' + this.entityName + 'Manager.goToPage(' + (this.currentPage + 1) + ')">»</button>';
        html += '<span class="page-info">' + this.app.t('page') + ' ' + this.currentPage + ' / ' + totalPages + '</span>';
        
        container.innerHTML = html;
    }

    setupSortableHeaders() {
        document.querySelectorAll(`#${this.entityName}-table th[data-sortable]`).forEach(th => {
            th.style.cursor = 'pointer';
            th.addEventListener('click', () => {
                const field = th.dataset.field;
                this.sortBy(field);
            });
        });
    }

    search(items, term) {
        return items;
    }

    applyFilters(items) {
        return items;
    }

    async render() {
        throw new Error('render() must be implemented by subclass');
    }

    async exportToCSV() {
        const data = await this.getFilteredItems();
        if (data.length === 0) {
            alert(this.app.t('no_data_export'));
            return;
        }

        let categories = [];
        let suppliers = [];
        let products = [];
        
        if (this.entityName === 'products') {
            categories = await this.mockService.get('categories');
        } else if (this.entityName === 'orders') {
            suppliers = await this.mockService.get('suppliers');
            products = await this.mockService.get('products');
        }

        const headers = Object.keys(data[0]);
        
        const transformedData = data.map(row => {
            const newRow = { ...row };
            
            if (this.entityName === 'products' && newRow.category) {
                const cat = categories.find(c => c.id === newRow.category);
                newRow.category = cat ? cat.name : newRow.category;
            }
            
            if (this.entityName === 'orders') {
                if (newRow.supplier) {
                    const sup = suppliers.find(s => s.id === newRow.supplier);
                    newRow.supplier = sup ? sup.name : newRow.supplier;
                }
                if (newRow.product) {
                    const prod = products.find(p => p.id === newRow.product);
                    newRow.product = prod ? prod.name : newRow.product;
                }
            }
            
            return newRow;
        });

        const csvRows = [
            headers.join(';'),
            ...transformedData.map(row => 
                headers.map(field => {
                    let value = row[field];
                    if (typeof value === 'string' && (value.includes(',') || value.includes(';') || value.includes('"'))) {
                        value = '"' + value.replace(/"/g, '""') + '"';
                    }
                    return value;
                }).join(';')
            )
        ];

        const BOM = '\uFEFF';
        const csvContent = BOM + csvRows.join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${this.entityName}-${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    async viewDetails(id) {
        const item = await this.mockService.getById(this.entityName, id);
        if (!item) return;

        let relatedData = {};
        if (this.entityName === 'products') {
            const categories = await this.mockService.get('categories');
            const category = categories.find(c => c.id === item.category);
            relatedData.categoryName = category ? category.name : '-';
        } else if (this.entityName === 'orders') {
            const suppliers = await this.mockService.get('suppliers');
            const products = await this.mockService.get('products');
            const supplier = suppliers.find(s => s.id === item.supplier);
            const product = products.find(p => p.id === item.product);
            relatedData.supplierName = supplier ? supplier.name : '-';
            relatedData.productName = product ? product.name : '-';
        }

        const modal = document.getElementById('details-modal');
        const content = document.getElementById('details-content');
        
        let detailsHTML = `
            <div id="pdf-content" style="font-family: Arial, sans-serif; padding: 30px; background: white; color: #333;">
                <div style="text-align: center; margin-bottom: 30px; border-bottom: 3px solid #667eea; padding-bottom: 20px;">
                    <h1 style="color: #667eea; font-size: 28px; margin: 0;">FICHE DÉTAILLÉE</h1>
                    <h2 style="color: #555; font-size: 20px; margin: 10px 0 0 0;">${item.name || item.orderNumber || 'Détails'}</h2>
                    <p style="color: #888; font-size: 12px; margin: 5px 0 0 0;">Généré le ${new Date().toLocaleDateString('fr-FR')}</p>
                </div>
                <div style="margin-top: 30px;">
                    <table style="width: 100%; border-collapse: collapse;">
        `;

        const fields = Object.entries(item).filter(([key]) => key !== 'id');
        
        fields.forEach(([key, value]) => {
            let displayKey = this.app.t(key) || key;
            let displayValue = value;
            
            if (key === 'category' && relatedData.categoryName) {
                displayValue = relatedData.categoryName;
            } else if (key === 'supplier' && relatedData.supplierName) {
                displayValue = relatedData.supplierName;
            } else if (key === 'product' && relatedData.productName) {
                displayValue = relatedData.productName;
            } else if (key === 'price') {
                displayValue = `${Number(value).toFixed(2)} DH`;
            } else if (key === 'status') {
                displayValue = this.app.t(value);
            }
            
            detailsHTML += `
                <tr style="border-bottom: 1px solid #eee;">
                    <td style="padding: 15px 10px; font-weight: bold; color: #667eea; width: 40%;">${displayKey}</td>
                    <td style="padding: 15px 10px; color: #333;">${displayValue}</td>
                </tr>
            `;
        });
        
        detailsHTML += `
                    </table>
                </div>
                <div style="margin-top: 40px; text-align: center; color: #999; font-size: 11px; border-top: 1px solid #eee; padding-top: 20px;">
                    <p>Document confidentiel - Système de Gestion des Stocks</p>
                </div>
            </div>
            <div class="modal-actions" style="margin-top: 20px;">
                <button class="btn btn-secondary" onclick="app.closeDetailsModal()">
                    ${this.app.t('cancel')}
                </button>
                <button class="btn btn-primary" onclick="app.exportCurrentPDF()">
                    <i class="fas fa-file-pdf"></i>
                    ${this.app.t('export_pdf')}
                </button>
            </div>
        `;

        content.innerHTML = detailsHTML;
        modal.classList.add('active');
    }

    confirmDelete(id) {
        const modal = document.getElementById('confirm-modal');
        const message = document.getElementById('confirm-message');
        message.textContent = this.app.t('confirm_delete');
        modal.classList.add('active');

        document.getElementById('confirm-delete-btn').onclick = async () => {
            await this.deleteItem(id);
            this.app.closeConfirmModal();
        };
    }

    async deleteItem(id) {
        try {
            await this.mockService.delete(this.entityName, id);
            this.currentPage = 1;
            await this.render();
            if (this.app.currentSection === 'dashboard') {
                await this.app.loadDashboard();
            }
        } catch (error) {
            alert('Erreur: ' + error.message);
        }
    }
}
// ==========================================
// PRODUCT MANAGER
// ==========================================
class ProductManager extends EntityManager {
    constructor(mockService, app) {
        super('products', mockService, app);
    }

    search(items, term) {
        term = term.toLowerCase();
        return items.filter(item => 
            item.name.toLowerCase().includes(term) ||
            item.sku.toLowerCase().includes(term) ||
            item.description.toLowerCase().includes(term)
        );
    }

    applyFilters(items) {
        let filtered = items;
        
        const statusFilter = document.getElementById('products-status-filter')?.value;
        if (statusFilter) {
            filtered = filtered.filter(p => p.status === statusFilter);
        }
        
        const categoryFilter = document.getElementById('products-category-filter')?.value;
        if (categoryFilter) {
            filtered = filtered.filter(p => p.category == categoryFilter);
        }
        
        return filtered;
    }

    async render() {
        const allProducts = await this.getFilteredItems();
        const products = this.getPaginatedItems(allProducts);
        const categories = await this.mockService.get('categories');
        
        const categoryFilter = document.getElementById('products-category-filter');
        if (categoryFilter && categoryFilter.options.length === 1) {
            categories.forEach(cat => {
                const option = document.createElement('option');
                option.value = cat.id;
                option.textContent = cat.name;
                categoryFilter.appendChild(option);
            });
        }

        const tbody = document.getElementById('products-tbody');
        if (!tbody) return;
        
        tbody.innerHTML = products.map(product => {
            const category = categories.find(c => c.id === product.category);
            return `
                <tr>
                    <td>${product.name}</td>
                    <td>${product.sku}</td>
                    <td>${product.quantity}</td>
                    <td>${product.price.toFixed(2)} DH</td>
                    <td>${category ? category.name : '-'}</td>
                    <td><span class="badge badge-${product.status}">${this.app.t(product.status)}</span></td>
                    <td class="table-actions">
                        <button class="action-btn action-view" onclick="app.productManager.viewDetails(${product.id})">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="action-btn action-edit" onclick="app.productManager.editItem(${product.id})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-btn action-delete" onclick="app.productManager.confirmDelete(${product.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
        }).join('');

        this.renderPagination(allProducts.length);
        this.setupSortableHeaders();
    }

    showAddForm() {
        this.showForm(null);
    }

    async editItem(id) {
        const item = await this.mockService.getById(this.entityName, id);
        this.showForm(item);
    }

    async showForm(item = null) {
        const categories = await this.mockService.get('categories');
        const isEdit = item !== null;
        
        let formHTML = `
            <div class="modal-header">
                <h3>${isEdit ? this.app.t('edit') : this.app.t('add')} ${this.app.t('products')}</h3>
                <button class="close-btn" onclick="app.closeModal()">×</button>
            </div>
            <form id="entity-form">
                <div class="form-group">
                    <label>${this.app.t('name')}</label>
                    <input type="text" name="name" value="${item?.name || ''}" required>
                </div>
                <div class="form-group">
                    <label>${this.app.t('sku')}</label>
                    <input type="text" name="sku" value="${item?.sku || ''}" required>
                </div>
                <div class="form-group">
                    <label>${this.app.t('category')}</label>
                    <select name="category" required>
                        ${categories.map(cat => 
                            `<option value="${cat.id}" ${item?.category === cat.id ? 'selected' : ''}>${cat.name}</option>`
                        ).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label>${this.app.t('quantity')}</label>
                    <input type="number" name="quantity" value="${item?.quantity || 0}" required>
                </div>
                <div class="form-group">
                    <label>${this.app.t('price')}</label>
                    <input type="number" step="0.01" name="price" value="${item?.price || 0}" required>
                </div>
                <div class="form-group">
                    <label>${this.app.t('description')}</label>
                    <textarea name="description">${item?.description || ''}</textarea>
                </div>
                <div class="form-group">
                    <label>${this.app.t('status')}</label>
                    <select name="status">
                        <option value="active" ${item?.status === 'active' ? 'selected' : ''}>${this.app.t('active')}</option>
                        <option value="inactive" ${item?.status === 'inactive' ? 'selected' : ''}>${this.app.t('inactive')}</option>
                    </select>
                </div>
                <div class="modal-actions">
                    <button type="button" class="btn btn-secondary" onclick="app.closeModal()">${this.app.t('cancel')}</button>
                    <button type="submit" class="btn btn-primary">${this.app.t('save')}</button>
                </div>
            </form>
        `;

        document.getElementById('modal-content').innerHTML = formHTML;
        document.getElementById('modal-overlay').classList.add('active');

        document.getElementById('entity-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.handleFormSubmit(item?.id);
        });
    }

    async handleFormSubmit(id = null) {
        const form = document.getElementById('entity-form');
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        data.quantity = parseInt(data.quantity);
        data.price = parseFloat(data.price);
        data.category = parseInt(data.category);

        try {
            if (id) {
                await this.mockService.update(this.entityName, id, data);
            } else {
                await this.mockService.create(this.entityName, data);
            }
            this.app.closeModal();
            await this.render();
            await this.app.loadDashboard();
        } catch (error) {
            alert('Erreur: ' + error.message);
        }
    }
}

// ==========================================
// SUPPLIER MANAGER
// ==========================================
class SupplierManager extends EntityManager {
    constructor(mockService, app) {
        super('suppliers', mockService, app);
    }

    search(items, term) {
        term = term.toLowerCase();
        return items.filter(item => 
            item.name.toLowerCase().includes(term) ||
            item.contact.toLowerCase().includes(term) ||
            item.email.toLowerCase().includes(term) ||
            item.phone.toLowerCase().includes(term)
        );
    }

    applyFilters(items) {
        return items;
    }

    async render() {
        const allSuppliers = await this.getFilteredItems();
        const suppliers = this.getPaginatedItems(allSuppliers);
        const tbody = document.getElementById('suppliers-tbody');
        if (!tbody) return;
        
        tbody.innerHTML = suppliers.map(supplier => `
            <tr>
                <td>${supplier.name}</td>
                <td>${supplier.contact}</td>
                <td>${supplier.email}</td>
                <td>${supplier.phone}</td>
                <td><span class="badge badge-${supplier.status}">${this.app.t(supplier.status)}</span></td>
                <td class="table-actions">
                    <button class="action-btn action-view" onclick="app.supplierManager.viewDetails(${supplier.id})">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn action-edit" onclick="app.supplierManager.editItem(${supplier.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn action-delete" onclick="app.supplierManager.confirmDelete(${supplier.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `).join('');

        this.renderPagination(allSuppliers.length);
        this.setupSortableHeaders();
    }

    showAddForm() {
        this.showForm(null);
    }

    async editItem(id) {
        const item = await this.mockService.getById(this.entityName, id);
        this.showForm(item);
    }

    async showForm(item = null) {
        const isEdit = item !== null;
        
        let formHTML = `
            <div class="modal-header">
                <h3>${isEdit ? this.app.t('edit') : this.app.t('add')} ${this.app.t('suppliers')}</h3>
                <button class="close-btn" onclick="app.closeModal()">×</button>
            </div>
            <form id="entity-form">
                <div class="form-group">
                    <label>${this.app.t('name')}</label>
                    <input type="text" name="name" value="${item?.name || ''}" required>
                </div>
                <div class="form-group">
                    <label>${this.app.t('contact')}</label>
                    <input type="text" name="contact" value="${item?.contact || ''}" required>
                </div>
                <div class="form-group">
                    <label>${this.app.t('email')}</label>
                    <input type="email" name="email" value="${item?.email || ''}" required>
                </div>
                <div class="form-group">
                    <label>${this.app.t('phone')}</label>
                    <input type="text" name="phone" value="${item?.phone || ''}" required>
                </div>
                <div class="form-group">
                    <label>${this.app.t('address')}</label>
                    <textarea name="address">${item?.address || ''}</textarea>
                </div>
                <div class="form-group">
                    <label>${this.app.t('status')}</label>
                    <select name="status">
                        <option value="active" ${item?.status === 'active' ? 'selected' : ''}>${this.app.t('active')}</option>
                        <option value="inactive" ${item?.status === 'inactive' ? 'selected' : ''}>${this.app.t('inactive')}</option>
                    </select>
                </div>
                <div class="modal-actions">
                    <button type="button" class="btn btn-secondary" onclick="app.closeModal()">${this.app.t('cancel')}</button>
                    <button type="submit" class="btn btn-primary">${this.app.t('save')}</button>
                </div>
            </form>
        `;

        document.getElementById('modal-content').innerHTML = formHTML;
        document.getElementById('modal-overlay').classList.add('active');

        document.getElementById('entity-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.handleFormSubmit(item?.id);
        });
    }

    async handleFormSubmit(id = null) {
        const form = document.getElementById('entity-form');
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            if (id) {
                await this.mockService.update(this.entityName, id, data);
            } else {
                await this.mockService.create(this.entityName, data);
            }
            this.app.closeModal();
            await this.render();
            await this.app.loadDashboard();
        } catch (error) {
            alert('Erreur: ' + error.message);
        }
    }
}

// ==========================================
// WAREHOUSE MANAGER
// ==========================================
class WarehouseManager extends EntityManager {
    constructor(mockService, app) {
        super('warehouses', mockService, app);
    }

    search(items, term) {
        term = term.toLowerCase();
        return items.filter(item => 
            item.name.toLowerCase().includes(term) ||
            item.location.toLowerCase().includes(term) ||
            item.manager.toLowerCase().includes(term)
        );
    }

    applyFilters(items) {
        return items;
    }

    async render() {
        const allWarehouses = await this.getFilteredItems();
        const warehouses = this.getPaginatedItems(allWarehouses);
        const tbody = document.getElementById('warehouses-tbody');
        if (!tbody) return;
        
        tbody.innerHTML = warehouses.map(warehouse => `
            <tr>
                <td>${warehouse.name}</td>
                <td>${warehouse.location}</td>
                <td>${warehouse.capacity}</td>
                <td>${warehouse.manager}</td>
                <td><span class="badge badge-${warehouse.status}">${this.app.t(warehouse.status)}</span></td>
                <td class="table-actions">
                    <button class="action-btn action-view" onclick="app.warehouseManager.viewDetails(${warehouse.id})">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn action-edit" onclick="app.warehouseManager.editItem(${warehouse.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn action-delete" onclick="app.warehouseManager.confirmDelete(${warehouse.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `).join('');

        this.renderPagination(allWarehouses.length);
        this.setupSortableHeaders();
    }

    showAddForm() {
        this.showForm(null);
    }

    async editItem(id) {
        const item = await this.mockService.getById(this.entityName, id);
        this.showForm(item);
    }

    async showForm(item = null) {
        const isEdit = item !== null;
        
        let formHTML = `
            <div class="modal-header">
                <h3>${isEdit ? this.app.t('edit') : this.app.t('add')} ${this.app.t('warehouses')}</h3>
                <button class="close-btn" onclick="app.closeModal()">×</button>
            </div>
            <form id="entity-form">
                <div class="form-group">
                    <label>${this.app.t('name')}</label>
                    <input type="text" name="name" value="${item?.name || ''}" required>
                </div>
                <div class="form-group">
                    <label>${this.app.t('location')}</label>
                    <input type="text" name="location" value="${item?.location || ''}" required>
                </div>
                <div class="form-group">
                    <label>${this.app.t('capacity')}</label>
                    <input type="number" name="capacity" value="${item?.capacity || 0}" required>
                </div>
                <div class="form-group">
                    <label>${this.app.t('manager')}</label>
                    <input type="text" name="manager" value="${item?.manager || ''}" required>
                </div>
                <div class="form-group">
                    <label>${this.app.t('status')}</label>
                    <select name="status">
                        <option value="active" ${item?.status === 'active' ? 'selected' : ''}>${this.app.t('active')}</option>
                        <option value="inactive" ${item?.status === 'inactive' ? 'selected' : ''}>${this.app.t('inactive')}</option>
                    </select>
                </div>
                <div class="modal-actions">
                    <button type="button" class="btn btn-secondary" onclick="app.closeModal()">${this.app.t('cancel')}</button>
                    <button type="submit" class="btn btn-primary">${this.app.t('save')}</button>
                </div>
            </form>
        `;

        document.getElementById('modal-content').innerHTML = formHTML;
        document.getElementById('modal-overlay').classList.add('active');

        document.getElementById('entity-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.handleFormSubmit(item?.id);
        });
    }

    async handleFormSubmit(id = null) {
        const form = document.getElementById('entity-form');
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        data.capacity = parseInt(data.capacity);

        try {
            if (id) {
                await this.mockService.update(this.entityName, id, data);
            } else {
                await this.mockService.create(this.entityName, data);
            }
            this.app.closeModal();
            await this.render();
            await this.app.loadDashboard();
        } catch (error) {
            alert('Erreur: ' + error.message);
        }
    }
}

// ==========================================
// ORDER MANAGER
// ==========================================
class OrderManager extends EntityManager {
    constructor(mockService, app) {
        super('orders', mockService, app);
    }

    search(items, term) {
        term = term.toLowerCase();
        return items.filter(item => 
            item.orderNumber.toLowerCase().includes(term) ||
            item.date.toLowerCase().includes(term)
        );
    }

    applyFilters(items) {
        const statusFilter = document.getElementById('orders-status-filter')?.value;
        if (statusFilter) {
            return items.filter(o => o.status === statusFilter);
        }
        return items;
    }

    async render() {
        const allOrders = await this.getFilteredItems();
        const orders = this.getPaginatedItems(allOrders);
        const suppliers = await this.mockService.get('suppliers');
        const tbody = document.getElementById('orders-tbody');
        if (!tbody) return;
        
        tbody.innerHTML = orders.map(order => {
            const supplier = suppliers.find(s => s.id === order.supplier);
            return `
                <tr>
                    <td>${order.orderNumber}</td>
                    <td>${supplier ? supplier.name : '-'}</td>
                    <td>${order.quantity}</td>
                    <td>${order.date}</td>
                    <td><span class="badge badge-${order.status}">${this.app.t(order.status)}</span></td>
                    <td class="table-actions">
                        <button class="action-btn action-view" onclick="app.orderManager.viewDetails(${order.id})">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="action-btn action-edit" onclick="app.orderManager.editItem(${order.id})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-btn action-delete" onclick="app.orderManager.confirmDelete(${order.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
        }).join('');

        this.renderPagination(allOrders.length);
        this.setupSortableHeaders();
    }

    showAddForm() {
        this.showForm(null);
    }

    async editItem(id) {
        const item = await this.mockService.getById(this.entityName, id);
        this.showForm(item);
    }

    async showForm(item = null) {
        const suppliers = await this.mockService.get('suppliers');
        const products = await this.mockService.get('products');
        const isEdit = item !== null;
        
        let formHTML = `
            <div class="modal-header">
                <h3>${isEdit ? this.app.t('edit') : this.app.t('add')} ${this.app.t('orders')}</h3>
                <button class="close-btn" onclick="app.closeModal()">×</button>
            </div>
            <form id="entity-form">
                <div class="form-group">
                    <label>${this.app.t('order_number')}</label>
                    <input type="text" name="orderNumber" value="${item?.orderNumber || 'ORD-' + Date.now()}" required>
                </div>
                <div class="form-group">
                    <label>${this.app.t('supplier')}</label>
                    <select name="supplier" required>
                        ${suppliers.map(sup => 
                            `<option value="${sup.id}" ${item?.supplier === sup.id ? 'selected' : ''}>${sup.name}</option>`
                        ).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label>${this.app.t('product')}</label>
                    <select name="product" required>
                        ${products.map(prod => 
                            `<option value="${prod.id}" ${item?.product === prod.id ? 'selected' : ''}>${prod.name}</option>`
                        ).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label>${this.app.t('quantity')}</label>
                    <input type="number" name="quantity" value="${item?.quantity || 0}" required>
                </div>
                <div class="form-group">
                    <label>${this.app.t('date')}</label>
                    <input type="date" name="date" value="${item?.date || ''}" required>
                </div>
                <div class="form-group">
                    <label>${this.app.t('status')}</label>
                    <select name="status">
                        <option value="pending" ${item?.status === 'pending' ? 'selected' : ''}>${this.app.t('pending')}</option>
                        <option value="processing" ${item?.status === 'processing' ? 'selected' : ''}>${this.app.t('processing')}</option>
                        <option value="completed" ${item?.status === 'completed' ? 'selected' : ''}>${this.app.t('completed')}</option>
                        <option value="cancelled" ${item?.status === 'cancelled' ? 'selected' : ''}>${this.app.t('cancelled')}</option>
                    </select>
                </div>
                <div class="modal-actions">
                    <button type="button" class="btn btn-secondary" onclick="app.closeModal()">${this.app.t('cancel')}</button>
                    <button type="submit" class="btn btn-primary">${this.app.t('save')}</button>
                </div>
            </form>
        `;

        document.getElementById('modal-content').innerHTML = formHTML;
        document.getElementById('modal-overlay').classList.add('active');

        document.getElementById('entity-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.handleFormSubmit(item?.id);
        });
    }

    async handleFormSubmit(id = null) {
        const form = document.getElementById('entity-form');
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        data.quantity = parseInt(data.quantity);
        data.supplier = parseInt(data.supplier);
        data.product = parseInt(data.product);

        try {
            if (id) {
                await this.mockService.update(this.entityName, id, data);
            } else {
                await this.mockService.create(this.entityName, data);
            }
            this.app.closeModal();
            await this.render();
            await this.app.loadDashboard();
        } catch (error) {
            alert('Erreur: ' + error.message);
        }
    }
}

// ==========================================
// CATEGORY MANAGER
// ==========================================
class CategoryManager extends EntityManager {
    constructor(mockService, app) {
        super('categories', mockService, app);
    }

    search(items, term) {
        term = term.toLowerCase();
        return items.filter(item => 
            item.name.toLowerCase().includes(term) ||
            item.description.toLowerCase().includes(term)
        );
    }

    applyFilters(items) {
        return items;
    }

    async render() {
        const allCategories = await this.getFilteredItems();
        const categories = this.getPaginatedItems(allCategories);
        const products = await this.mockService.get('products');
        const tbody = document.getElementById('categories-tbody');
        if (!tbody) return;
        
        tbody.innerHTML = categories.map(category => {
            const productCount = products.filter(p => p.category === category.id).length;
            return `
                <tr>
                    <td>${category.name}</td>
                    <td>${category.description}</td>
                    <td>${productCount}</td>
                    <td><span class="badge badge-${category.status}">${this.app.t(category.status)}</span></td>
                    <td class="table-actions">
                        <button class="action-btn action-view" onclick="app.categoryManager.viewDetails(${category.id})">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="action-btn action-edit" onclick="app.categoryManager.editItem(${category.id})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-btn action-delete" onclick="app.categoryManager.confirmDelete(${category.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
        }).join('');

        this.renderPagination(allCategories.length);
        this.setupSortableHeaders();
    }

    showAddForm() {
        this.showForm(null);
    }

    async editItem(id) {
        const item = await this.mockService.getById(this.entityName, id);
        this.showForm(item);
    }

    async showForm(item = null) {
        const isEdit = item !== null;
        
        let formHTML = `
            <div class="modal-header">
                <h3>${isEdit ? this.app.t('edit') : this.app.t('add')} ${this.app.t('categories')}</h3>
                <button class="close-btn" onclick="app.closeModal()">×</button>
            </div>
            <form id="entity-form">
                <div class="form-group">
                    <label>${this.app.t('name')}</label>
                    <input type="text" name="name" value="${item?.name || ''}" required>
                </div>
                <div class="form-group">
                    <label>${this.app.t('description')}</label>
                    <textarea name="description">${item?.description || ''}</textarea>
                </div>
                <div class="form-group">
                    <label>${this.app.t('status')}</label>
                    <select name="status">
                        <option value="active" ${item?.status === 'active' ? 'selected' : ''}>${this.app.t('active')}</option>
                        <option value="inactive" ${item?.status === 'inactive' ? 'selected' : ''}>${this.app.t('inactive')}</option>
                    </select>
                </div>
                <div class="modal-actions">
                    <button type="button" class="btn btn-secondary" onclick="app.closeModal()">${this.app.t('cancel')}</button>
                    <button type="submit" class="btn btn-primary">${this.app.t('save')}</button>
                </div>
            </form>
        `;

        document.getElementById('modal-content').innerHTML = formHTML;
        document.getElementById('modal-overlay').classList.add('active');

        document.getElementById('entity-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.handleFormSubmit(item?.id);
        });
    }

    async handleFormSubmit(id = null) {
        const form = document.getElementById('entity-form');
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            if (id) {
                await this.mockService.update(this.entityName, id, data);
            } else {
                await this.mockService.create(this.entityName, data);
            }
            this.app.closeModal();
            await this.render();
            await this.app.loadDashboard();
        } catch (error) {
            alert('Erreur: ' + error.message);
        }
    }
}
// ==========================================
// I18N TRANSLATIONS
// ==========================================
const translations = {
    fr: {
        app_title: 'Système de Gestion des Stocks',
        dashboard: 'Tableau de Bord',
        products: 'Produits',
        suppliers: 'Fournisseurs',
        warehouses: 'Entrepôts',
        orders: 'Commandes',
        categories: 'Catégories',
        welcome_dashboard: 'Bienvenue au Tableau de Bord',
        total_products: 'Produits Totaux',
        add: 'Ajouter',
        edit: 'Modifier',
        delete: 'Supprimer',
        cancel: 'Annuler',
        save: 'Enregistrer',
        confirm: 'Confirmer',
        actions: 'Actions',
        name: 'Nom',
        sku: 'SKU',
        quantity: 'Quantité',
        price: 'Prix',
        category: 'Catégorie',
        status: 'État',
        active: 'Actif',
        inactive: 'Inactif',
        contact: 'Contact',
        email: 'Email',
        phone: 'Téléphone',
        location: 'Localisation',
        capacity: 'Capacité',
        manager: 'Responsable',
        order_number: 'Numéro',
        supplier: 'Fournisseur',
        product: 'Produit',
        date: 'Date',
        pending: 'En Attente',
        processing: 'En Cours',
        completed: 'Complétée',
        cancelled: 'Annulée',
        description: 'Description',
        product_count: 'Produits',
        all_status: 'Tous les États',
        all_categories: 'Toutes les Catégories',
        details: 'Détails',
        export_pdf: 'Export PDF',
        sales_bar_chart: 'Valeur Stock par Catégorie',
        stock_evolution_line: 'Évolution des Commandes',
        category_distribution_doughnut: 'Répartition Produits',
        supplier_performance_radar: 'Commandes par Fournisseur',
        warehouse_capacity_polar: 'Capacité des Entrepôts',
        confirm_delete: 'Êtes-vous sûr de vouloir supprimer cet élément?',
        search: 'Rechercher...',
        address: 'Adresse',
        logout: 'Déconnexion',
        welcome: 'Bienvenue',
        page: 'Page',
        filter_period: 'Période',
        no_data_export: 'Aucune donnée à exporter'
    },
    en: {
        app_title: 'Stock Management System',
        dashboard: 'Dashboard',
        products: 'Products',
        suppliers: 'Suppliers',
        warehouses: 'Warehouses',
        orders: 'Orders',
        categories: 'Categories',
        welcome_dashboard: 'Welcome to Dashboard',
        total_products: 'Total Products',
        add: 'Add',
        edit: 'Edit',
        delete: 'Delete',
        cancel: 'Cancel',
        save: 'Save',
        confirm: 'Confirm',
        actions: 'Actions',
        name: 'Name',
        sku: 'SKU',
        quantity: 'Quantity',
        price: 'Price',
        category: 'Category',
        status: 'Status',
        active: 'Active',
        inactive: 'Inactive',
        contact: 'Contact',
        email: 'Email',
        phone: 'Phone',
        location: 'Location',
        capacity: 'Capacity',
        manager: 'Manager',
        order_number: 'Number',
        supplier: 'Supplier',
        product: 'Product',
        date: 'Date',
        pending: 'Pending',
        processing: 'Processing',
        completed: 'Completed',
        cancelled: 'Cancelled',
        description: 'Description',
        product_count: 'Products',
        all_status: 'All Status',
        all_categories: 'All Categories',
        details: 'Details',
        export_pdf: 'Export PDF',
        sales_bar_chart: 'Stock Value by Category',
        stock_evolution_line: 'Order Evolution',
        category_distribution_doughnut: 'Products Distribution',
        supplier_performance_radar: 'Orders by Supplier',
        warehouse_capacity_polar: 'Warehouse Capacity',
        confirm_delete: 'Are you sure you want to delete this item?',
        search: 'Search...',
        address: 'Address',
        logout: 'Logout',
        welcome: 'Welcome',
        page: 'Page',
        filter_period: 'Period',
        no_data_export: 'No data to export'
    },
    ar: {
        app_title: 'نظام إدارة المخزون',
        dashboard: 'لوحة التحكم',
        products: 'المنتجات',
        suppliers: 'الموردون',
        warehouses: 'المستودعات',
        orders: 'الطلبات',
        categories: 'الفئات',
        welcome_dashboard: 'مرحبا بك في لوحة التحكم',
        total_products: 'إجمالي المنتجات',
        add: 'إضافة',
        edit: 'تعديل',
        delete: 'حذف',
        cancel: 'إلغاء',
        save: 'حفظ',
        confirm: 'تأكيد',
        actions: 'إجراءات',
        name: 'الاسم',
        sku: 'رمز المنتج',
        quantity: 'الكمية',
        price: 'السعر',
        category: 'الفئة',
        status: 'الحالة',
        active: 'نشط',
        inactive: 'غير نشط',
        contact: 'جهة الاتصال',
        email: 'البريد الإلكتروني',
        phone: 'الهاتف',
        location: 'الموقع',
        capacity: 'السعة',
        manager: 'المسؤول',
        order_number: 'الرقم',
        supplier: 'المورد',
        product: 'المنتج',
        date: 'التاريخ',
        pending: 'قيد الانتظار',
        processing: 'قيد المعالجة',
        completed: 'مكتمل',
        cancelled: 'ملغى',
        description: 'الوصف',
        product_count: 'المنتجات',
        all_status: 'جميع الحالات',
        all_categories: 'جميع الفئات',
        details: 'التفاصيل',
        export_pdf: 'تصدير PDF',
        sales_bar_chart: 'قيمة المخزون حسب الفئة',
        stock_evolution_line: 'تطور الطلبات',
        category_distribution_doughnut: 'توزيع المنتجات',
        supplier_performance_radar: 'الطلبات حسب المورد',
        warehouse_capacity_polar: 'سعة المستودعات',
        confirm_delete: 'هل أنت متأكد من حذف هذا العنصر؟',
        search: 'بحث...',
        address: 'العنوان',
        logout: 'تسجيل الخروج',
        welcome: 'مرحبا',
        page: 'صفحة',
        filter_period: 'الفترة',
        no_data_export: 'لا توجد بيانات للتصدير'
    }
};

// ==========================================
// MAIN APPLICATION CLASS
// ==========================================
class InventoryApp {
    constructor() {
        this.authManager = new AuthManager();
        this.mockService = new MockService();
        this.currentLanguage = localStorage.getItem('appLanguage') || 'fr';
        this.currentSection = 'dashboard';
        this.currentUser = null;
        this.charts = {};
        this.dashboardPeriod = 180;
        
        this.productManager = new ProductManager(this.mockService, this);
        this.supplierManager = new SupplierManager(this.mockService, this);
        this.warehouseManager = new WarehouseManager(this.mockService, this);
        this.orderManager = new OrderManager(this.mockService, this);
        this.categoryManager = new CategoryManager(this.mockService, this);
        
        this.init();
    }

    async init() {
        this.setLanguage(this.currentLanguage);
        
        if (!this.authManager.isAuthenticated()) {
            return;
        }
        
        this.showMainApp();
        this.setupEventListeners();
        await this.navigateToSection('dashboard');
    }

    showMainApp() {
        this.currentUser = this.authManager.getCurrentUser();
        document.getElementById('current-user-name').textContent = this.currentUser;
    }

    logout() {
        this.authManager.logout();
        window.location.href = './login.html';
    }

    setupEventListeners() {
        document.getElementById('language-select')?.addEventListener('change', (e) => {
            this.setLanguage(e.target.value);
        });

        document.querySelectorAll('.menu-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const section = item.getAttribute('data-section');
                this.navigateToSection(section);
            });
        });

        document.querySelectorAll('.stat-card.clickable').forEach(card => {
            card.addEventListener('click', (e) => {
                const section = card.getAttribute('data-navigate');
                if (section) {
                    this.navigateToSection(section);
                }
            });
        });

        document.getElementById('dashboard-period-filter')?.addEventListener('change', (e) => {
            this.dashboardPeriod = parseInt(e.target.value);
            this.loadDashboard();
        });

        this.setupSearchBar('products', this.productManager);
        this.setupSearchBar('suppliers', this.supplierManager);
        this.setupSearchBar('warehouses', this.warehouseManager);
        this.setupSearchBar('orders', this.orderManager);
        this.setupSearchBar('categories', this.categoryManager);

        document.getElementById('products-status-filter')?.addEventListener('change', () => this.productManager.render());
        document.getElementById('products-category-filter')?.addEventListener('change', () => this.productManager.render());
        document.getElementById('orders-status-filter')?.addEventListener('change', () => this.orderManager.render());

        document.getElementById('modal-overlay')?.addEventListener('click', (e) => {
            if (e.target.id === 'modal-overlay') this.closeModal();
        });
        document.getElementById('details-modal')?.addEventListener('click', (e) => {
            if (e.target.id === 'details-modal') this.closeDetailsModal();
        });
    }

    setupSearchBar(entity, manager) {
        const searchInput = document.getElementById(`${entity}-search`);
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                manager.searchTerm = e.target.value;
                manager.currentPage = 1;
                manager.render();
            });
        }
    }

    async navigateToSection(section) {
        this.currentSection = section;
        
        document.querySelectorAll('.menu-item').forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-section') === section) {
                item.classList.add('active');
            }
        });

        document.querySelectorAll('.content-section').forEach(sec => {
            sec.classList.remove('active');
        });
        document.getElementById(`${section}-section`)?.classList.add('active');

        await this.loadSectionData(section);
    }

    async loadSectionData(section) {
        switch(section) {
            case 'dashboard':
                await this.loadDashboard();
                break;
            case 'products':
                await this.productManager.render();
                break;
            case 'suppliers':
                await this.supplierManager.render();
                break;
            case 'warehouses':
                await this.warehouseManager.render();
                break;
            case 'orders':
                await this.orderManager.render();
                break;
            case 'categories':
                await this.categoryManager.render();
                break;
        }
    }

    async loadDashboard() {
        const products = await this.mockService.get('products');
        const suppliers = await this.mockService.get('suppliers');
        const warehouses = await this.mockService.get('warehouses');
        const orders = await this.mockService.get('orders');
        const categories = await this.mockService.get('categories');

        document.getElementById('stat-products').textContent = products.length;
        document.getElementById('stat-suppliers').textContent = suppliers.length;
        document.getElementById('stat-warehouses').textContent = warehouses.length;
        document.getElementById('stat-orders').textContent = orders.length;
        document.getElementById('stat-categories').textContent = categories.length;

        this.initializeCharts(products, suppliers, warehouses, orders, categories);
    }

    initializeCharts(products, suppliers, warehouses, orders, categories) {
        Object.values(this.charts).forEach(chart => chart?.destroy());
        this.charts = {};

        // BAR CHART - Stock Value by Category
        const barCtx = document.getElementById('barChart')?.getContext('2d');
        if (barCtx) {
            const categoryStockValue = categories.map(cat => {
                const categoryProducts = products.filter(p => p.category === cat.id);
                return categoryProducts.reduce((sum, p) => sum + (p.quantity * p.price), 0);
            });

            this.charts.bar = new Chart(barCtx, {
                type: 'bar',
                data: {
                    labels: categories.map(c => c.name),
                    datasets: [{
                        label: 'Valeur Stock (DH)',
                        data: categoryStockValue,
                        backgroundColor: ['rgba(102, 126, 234, 0.8)', 'rgba(16, 185, 129, 0.8)', 'rgba(245, 158, 11, 0.8)'],
                        borderColor: ['#667eea', '#10b981', '#f59e0b'],
                        borderWidth: 2,
                        borderRadius: 8
                    }]
                },
                options: { 
                    responsive: true, 
                    maintainAspectRatio: true,
                    plugins: { legend: { labels: { color: '#f1f5f9' } } },
                    scales: {
                        y: { 
                            beginAtZero: true,
                            ticks: { color: '#94a3b8' }, 
                            grid: { color: 'rgba(255,255,255,0.1)' } 
                        },
                        x: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.1)' } }
                    }
                }
            });
        }

        // LINE CHART - Order Evolution
        const lineCtx = document.getElementById('lineChart')?.getContext('2d');
        if (lineCtx) {
            const now = new Date();
            const periodDays = this.dashboardPeriod;
            const startDate = new Date(now.getTime() - periodDays * 24 * 60 * 60 * 1000);
            
            const filteredOrders = orders.filter(order => {
                const orderDate = new Date(order.date);
                return orderDate >= startDate && orderDate <= now;
            });

            const monthsCount = Math.ceil(periodDays / 30);
            const labels = [];
            const data = [];
            
            for (let i = monthsCount - 1; i >= 0; i--) {
                const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
                labels.push(date.toLocaleDateString('fr-FR', { month: 'short', year: '2-digit' }));
                
                const count = filteredOrders.filter(order => {
                    const orderDate = new Date(order.date);
                    return orderDate.getMonth() === date.getMonth() && 
                           orderDate.getFullYear() === date.getFullYear();
                }).length;
                
                data.push(count);
            }

            this.charts.line = new Chart(lineCtx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Nombre de Commandes',
                        data: data,
                        borderColor: '#10b981',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        tension: 0.4,
                        fill: true,
                        borderWidth: 3
                    }]
                },
                options: { 
                    responsive: true, 
                    maintainAspectRatio: true,
                    plugins: { legend: { labels: { color: '#f1f5f9' } } },
                    scales: {
                        y: { 
                            beginAtZero: true,
                            ticks: { color: '#94a3b8', stepSize: 1 }, 
                            grid: { color: 'rgba(255,255,255,0.1)' } 
                        },
                        x: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.1)' } }
                    }
                }
            });
        }

        // DOUGHNUT CHART - Product Distribution
        const doughnutCtx = document.getElementById('doughnutChart')?.getContext('2d');
        if (doughnutCtx) {
            const categoryProductCount = categories.map(cat => 
                products.filter(p => p.category === cat.id).length
            );

            this.charts.doughnut = new Chart(doughnutCtx, {
                type: 'doughnut',
                data: {
                    labels: categories.map(c => c.name),
                    datasets: [{
                        data: categoryProductCount,
                        backgroundColor: ['#667eea', '#10b981', '#f59e0b', '#f43f5e', '#06b6d4'],
                        borderWidth: 0
                    }]
                },
                options: { 
                    responsive: true, 
                    maintainAspectRatio: true,
                    plugins: { 
                        legend: { 
                            labels: { color: '#f1f5f9' },
                            position: 'bottom'
                        } 
                    }
                }
            });
        }

        // HORIZONTAL BAR CHART - Orders by Supplier
        const radarCtx = document.getElementById('radarChart')?.getContext('2d');
        if (radarCtx) {
            const supplierOrderCount = suppliers.map(sup => ({
                name: sup.name,
                count: orders.filter(o => o.supplier === sup.id).length
            }));

            this.charts.radar = new Chart(radarCtx, {
                type: 'bar',
                data: {
                    labels: supplierOrderCount.map(s => s.name),
                    datasets: [{
                        label: 'Nombre de Commandes',
                        data: supplierOrderCount.map(s => s.count),
                        backgroundColor: ['rgba(102, 126, 234, 0.8)', 'rgba(16, 185, 129, 0.8)', 'rgba(245, 158, 11, 0.8)'],
                        borderColor: ['#667eea', '#10b981', '#f59e0b'],
                        borderWidth: 2,
                        borderRadius: 6
                    }]
                },
                options: { 
                    indexAxis: 'y',
                    responsive: true, 
                    maintainAspectRatio: true,
                    plugins: { legend: { labels: { color: '#f1f5f9' } } },
                    scales: {
                        x: { 
                            beginAtZero: true,
                            ticks: { color: '#94a3b8', stepSize: 1 }, 
                            grid: { color: 'rgba(255,255,255,0.1)' }
                        },
                        y: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.1)' } }
                    }
                }
            });
        }

        // POLAR AREA CHART - Warehouse Capacity
        const polarCtx = document.getElementById('polarChart')?.getContext('2d');
        if (polarCtx) {
            this.charts.polar = new Chart(polarCtx, {
                type: 'polarArea',
                data: {
                    labels: warehouses.map(w => w.name),
                    datasets: [{
                        data: warehouses.map(w => w.capacity),
                        backgroundColor: [
                            'rgba(102, 126, 234, 0.7)', 
                            'rgba(16, 185, 129, 0.7)', 
                            'rgba(245, 158, 11, 0.7)'
                        ],
                        borderWidth: 0
                    }]
                },
                options: { 
                    responsive: true, 
                    maintainAspectRatio: true,
                    plugins: { 
                        legend: { 
                            labels: { color: '#f1f5f9' },
                            position: 'bottom'
                        } 
                    },
                    scales: {
                        r: { 
                            ticks: { color: '#94a3b8', backdropColor: 'transparent' }, 
                            grid: { color: 'rgba(255,255,255,0.1)' },
                            pointLabels: { color: '#f1f5f9' }
                        }
                    }
                }
            });
        }
    }

    closeModal() {
        document.getElementById('modal-overlay').classList.remove('active');
    }

    closeDetailsModal() {
        document.getElementById('details-modal').classList.remove('active');
    }

    closeConfirmModal() {
        document.getElementById('confirm-modal').classList.remove('active');
    }

    exportCurrentPDF() {
        const element = document.getElementById('pdf-content');
        const options = {
            margin: [10, 10, 10, 10],
            filename: `fiche-details-${Date.now()}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { 
                scale: 2,
                useCORS: true,
                logging: false
            },
            jsPDF: { 
                unit: 'mm', 
                format: 'a4', 
                orientation: 'portrait' 
            }
        };
        
        html2pdf().set(options).from(element).save();
    }

    setLanguage(lang) {
        this.currentLanguage = lang;
        localStorage.setItem('appLanguage', lang);
        document.getElementById('language-select').value = lang;

        if (lang === 'ar') {
            document.body.classList.add('rtl');
            document.documentElement.setAttribute('dir', 'rtl');
        } else {
            document.body.classList.remove('rtl');
            document.documentElement.setAttribute('dir', 'ltr');
        }

        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            element.textContent = this.t(key);
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            element.placeholder = this.t(key);
        });

        if (this.currentSection) {
            this.loadSectionData(this.currentSection);
        }
    }

    t(key) {
        return translations[this.currentLanguage]?.[key] || key;
    }
}

// ==========================================
// GLOBAL LOGOUT FUNCTION
// ==========================================
function logout() {
    localStorage.removeItem('currentUser');
    sessionStorage.removeItem('currentUser');
    window.location.href = './login.html';
}
