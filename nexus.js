// ===== NEXUS BUSINESS SUITE - MAIN JAVASCRIPT (SUPABASE REMOVED) =====
// TODO: Replace localStorage with real backend when ready

// ===== THEME MANAGEMENT =====
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const body = document.body;
    body.classList.remove('light-mode', 'dark-mode');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
    } else {
        body.classList.add('light-mode');
        localStorage.setItem('theme', 'light');
    }
}

function toggleTheme() {
    const body = document.body;
    if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    }
}

function setupThemeToggle() {
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', toggleTheme);
    }
}

// ===== MODAL FUNCTIONS =====
function showModal(title, contentHtml) {
    let modalContainer = document.getElementById('modalContainer');
    if (!modalContainer) {
        modalContainer = document.createElement('div');
        modalContainer.id = 'modalContainer';
        document.body.appendChild(modalContainer);
    }
    modalContainer.innerHTML = `
        <div class="modal show">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${title}</h3>
                    <span class="close-modal" onclick="closeModal()">&times;</span>
                </div>
                <div class="modal-body">${contentHtml}</div>
            </div>
        </div>
    `;
}

function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) modal.remove();
}

function formatCurrency(amount) {
    return 'KES ' + (amount || 0).toLocaleString();
}

function logout() {
    localStorage.removeItem('nexus_auth');
    window.location.href = 'login.html';
}

function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

// ===== LOCAL DATA HELPERS =====
// These use localStorage - replace with API calls when connecting backend

function getProducts() {
    return JSON.parse(localStorage.getItem('nexus_products') || '[]');
}

function saveProducts(products) {
    localStorage.setItem('nexus_products', JSON.stringify(products));
}

function getSales() {
    return JSON.parse(localStorage.getItem('nexus_sales') || '[]');
}

function saveSales(sales) {
    localStorage.setItem('nexus_sales', JSON.stringify(sales));
}

function getCustomers() {
    return JSON.parse(localStorage.getItem('nexus_customers') || '[]');
}

function saveCustomers(customers) {
    localStorage.setItem('nexus_customers', JSON.stringify(customers));
}

function getCyberSessions() {
    return JSON.parse(localStorage.getItem('nexus_cyber_sessions') || '[]');
}

function saveCyberSessions(sessions) {
    localStorage.setItem('nexus_cyber_sessions', JSON.stringify(sessions));
}

// ===== INITIALIZATION =====
function init() {
    initTheme();
    setupThemeToggle();
    console.log('✅ Nexus Suite initialized (localStorage mode)');
}

// Export functions for global access
window.formatCurrency = formatCurrency;
window.showModal = showModal;
window.closeModal = closeModal;
window.logout = logout;
window.toggleTheme = toggleTheme;
window.escapeHtml = escapeHtml;
window.getProducts = getProducts;
window.saveProducts = saveProducts;
window.getSales = getSales;
window.saveSales = saveSales;
window.getCustomers = getCustomers;
window.saveCustomers = saveCustomers;
window.getCyberSessions = getCyberSessions;
window.saveCyberSessions = saveCyberSessions;

// Auto-init when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}