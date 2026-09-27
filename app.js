// LocalStorage Data State
let orders = JSON.parse(localStorage.getItem('hans_orders')) || [];
let finances = JSON.parse(localStorage.getItem('hans_finances')) || [];

// Set tanggal default untuk input
document.addEventListener('DOMContentLoaded', () => {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('date-in').value = today;
    document.getElementById('finance-date').value = today;
});

// Login Handler
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;

    // Kredensial Akses
    if(user === 'admin' && pass === '123') {
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('dashboard-section').style.display = 'block';
        document.body.style.alignItems = 'flex-start';
        renderAll();
    } else {
        alert('Username atau Password salah! (Gunakan: admin / 123)');
    }
});

function logout() {
    document.getElementById('dashboard-section').style.display = 'none';
    document.getElementById('login-section').style.display = 'block';
    document.body.style.alignItems = 'center';
}

// Tab Switcher
function switchTab(tabId, btn) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    
    document.getElementById(tabId).classList.add('active');
    btn.classList.add('active');
}

// Format Rupiah
function formatRp(amount) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(amount);
}

// Submit Order Masuk (Halaman Customer)
document.getElementById('order-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('cust-name').value;
    const dateIn = document.getElementById('date-in').value;
    const dateDeadline = document.getElementById('date-deadline').value;
    const dpAmount = parseFloat(document.getElementById('dp-amount').value);
    const imgFile = document.getElementById('cust-img').files[0];

    if (imgFile) {
        const reader = new FileReader();
        reader.onload = function(evt) {
            const newOrder = {
                id: Date.now(),
                name: name,
                dateIn: dateIn,
                dateDeadline: dateDeadline,
                dpAmount: dpAmount,
                imgBase64: evt.target.result,
                status: 'Proses'
            };
            orders.push(newOrder);

            // Otomatis catat DP Order ke Keuangan Harian Pemasukan
            finances.push({
                id: Date.now() + 1,
                date: dateIn,
                type: 'income',
                desc: `DP Order - ${name}`,
                amount: dpAmount
            });

            saveData();
            renderAll();
            document.getElementById('order-form').reset();
            document.getElementById('date-in').value = new Date().toISOString().split('T')[0];
        };
        reader.readAsDataURL(imgFile);
    }
});

// Submit Keuangan Harian
document.getElementById('finance-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const date = document.getElementById('finance-date').value;
    const type = document.getElementById('finance-type').value;
    const desc = document.getElementById('finance-desc').value;
    const amount = parseFloat(document.getElementById('finance-amount').value);

    const newFinance = {
        id: Date.now(),
        date: date,
        type: type,
        desc: desc,
        amount: amount
    };

    finances.push(newFinance);
    saveData();
    renderFinances();
    document.getElementById('finance-form').reset();
    document.getElementById('finance-date').value = new Date().toISOString().split('T')[0];
});

// Toggle Status Order
function toggleStatus(id) {
    orders = orders.map(o => {
        if(o.id === id) o.status = o.status === 'Proses' ? 'Selesai' : 'Proses';
        return o;
    });
    saveData();
    renderOrders();
}

// Hapus Data
function deleteOrder(id) {
    orders = orders.filter(o => o.id !== id);
    saveData();
    renderOrders();
}

function deleteFinance(id) {
    finances = finances.filter(f => f.id !== id);
    saveData();
    renderFinances();
}

function saveData() {
    localStorage.setItem('hans_orders', JSON.stringify(orders));
    localStorage.setItem('hans_finances', JSON.stringify(finances));
}

// Render Tabel Order
function renderOrders() {
    const tbody = document.getElementById('order-table-body');
    tbody.innerHTML = '';

    orders.forEach(order => {
        const badgeClass = order.status === 'Selesai' ? 'badge-done' : 'badge-pending';
        tbody.innerHTML += `
            <tr>
                <td><img src="${order.imgBase64}" class="img-preview" onclick="window.open('${order.imgBase64}')" title="Klik untuk memperbesar"></td>
                <td><strong>${order.name}</strong></td>
                <td>${order.dateIn}</td>
                <td>${order.dateDeadline}</td>
                <td style="color: var(--success); font-weight:600;">${formatRp(order.dpAmount)}</td>
                <td><span class="badge ${badgeClass}" onclick="toggleStatus(${order.id})">${order.status}</span></td>
                <td><button class="action-btn" onclick="deleteOrder(${order.id})"><i class="fa-solid fa-trash"></i></button></td>
            </tr>
        `;
    });
}

// Render Tabel Keuangan
function renderFinances() {
    const tbody = document.getElementById('finance-table-body');
    tbody.innerHTML = '';

    let totalIn = 0;
    let totalOut = 0;

    finances.forEach(f => {
        if(f.type === 'income') totalIn += f.amount;
        if(f.type === 'expense') totalOut += f.amount;

        const typeColor = f.type === 'income' ? 'var(--success)' : 'var(--danger)';
        const typeText = f.type === 'income' ? 'Pemasukan' : 'Pengeluaran';

        tbody.innerHTML += `
            <tr>
                <td>${f.date}</td>
                <td>${f.desc}</td>
                <td style="color: ${typeColor}">${typeText}</td>
                <td><strong>${formatRp(f.amount)}</strong></td>
                <td><button class="action-btn" onclick="deleteFinance(${f.id})"><i class="fa-solid fa-trash"></i></button></td>
            </tr>
        `;
    });

    document.getElementById('total-income').innerText = formatRp(totalIn);
    document.getElementById('total-expense').innerText = formatRp(totalOut);
    document.getElementById('total-balance').innerText = formatRp(totalIn - totalOut);
}

function renderAll() {
    renderOrders();
    renderFinances();
}