// 闲物校园二手交易平台 - 主应用逻辑

class XianwuApp {
    constructor() {
        this.currentUser = null;
        this.currentChat = null;
        this.init();
    }

    // 初始化应用
    init() {
        this.initData();
        this.bindEvents();
        this.setupRatingSystem();
        this.setupScrollEffects();
        this.updateUI();
        this.loadItems();
    }

    // 初始化模拟数据
    initData() {
        // 如果本地存储中没有数据，则创建初始数据
        if (!localStorage.getItem('xianwu_users')) {
            const initialUsers = [
                {
                    user_id: 'user_001',
                    username: '张同学',
                    email: 'zhang@example.com',
                    campus_id: '2021001001',
                    phone: '13800138001',
                    avatar: 'https://via.placeholder.com/150/4f46e5/ffffff?text=张',
                    register_time: new Date('2024-01-01').toISOString(),
                    is_verified: true,
                    password: '123456' // 简化版，实际应该加密
                },
                {
                    user_id: 'user_002',
                    username: '李同学',
                    email: 'li@example.com',
                    campus_id: '2021001002',
                    phone: '13800138002',
                    avatar: 'https://via.placeholder.com/150/7c3aed/ffffff?text=李',
                    register_time: new Date('2024-01-02').toISOString(),
                    is_verified: true,
                    password: '123456'
                },
                {
                    user_id: 'user_003',
                    username: '王同学',
                    email: 'wang@example.com',
                    campus_id: '2021001003',
                    phone: '13800138003',
                    avatar: 'https://via.placeholder.com/150/10b981/ffffff?text=王',
                    register_time: new Date('2024-01-03').toISOString(),
                    is_verified: false,
                    password: '123456'
                }
            ];
            localStorage.setItem('xianwu_users', JSON.stringify(initialUsers));
        }

        if (!localStorage.getItem('xianwu_items')) {
            const initialItems = [
                {
                    item_id: 'item_001',
                    user_id: 'user_001',
                    title: '高等数学教材（第七版）',
                    description: '同济大学数学系编，高等教育出版社，九成新，无笔记无划线，适合大一新生使用。',
                    price: 35.00,
                    category: '书籍',
                    status: '待售',
                    image_url: 'https://via.placeholder.com/300x200/4f46e5/ffffff?text=高数教材',
                    create_time: new Date('2024-01-15').toISOString()
                },
                {
                    item_id: 'item_002',
                    user_id: 'user_002',
                    title: '小米蓝牙耳机',
                    description: '小米Air2 SE，使用半年，功能正常，音质清晰，续航良好，配件齐全。',
                    price: 120.00,
                    category: '电子产品',
                    status: '待售',
                    image_url: 'https://via.placeholder.com/300x200/7c3aed/ffffff?text=蓝牙耳机',
                    create_time: new Date('2024-01-16').toISOString()
                },
                {
                    item_id: 'item_003',
                    user_id: 'user_001',
                    title: '宿舍台灯',
                    description: '护眼LED台灯，三档调光，USB充电，适合宿舍使用，几乎全新。',
                    price: 45.00,
                    category: '生活用品',
                    status: '交易中',
                    image_url: 'https://via.placeholder.com/300x200/10b981/ffffff?text=台灯',
                    create_time: new Date('2024-01-17').toISOString()
                },
                {
                    item_id: 'item_004',
                    user_id: 'user_003',
                    title: '运动背包',
                    description: '耐克运动背包，容量大，有专门的运动鞋隔层，适合健身和运动。',
                    price: 80.00,
                    category: '服装鞋帽',
                    status: '待售',
                    image_url: 'https://via.placeholder.com/300x200/f59e0b/ffffff?text=运动背包',
                    create_time: new Date('2024-01-18').toISOString()
                },
                {
                    item_id: 'item_005',
                    user_id: 'user_002',
                    title: '吉他入门套装',
                    description: '41寸民谣吉他，适合初学者，赠送调音器、拨片、吉他包，音色不错。',
                    price: 280.00,
                    category: '乐器',
                    status: '已售',
                    image_url: 'https://via.placeholder.com/300x200/ef4444/ffffff?text=吉他',
                    create_time: new Date('2024-01-10').toISOString()
                }
            ];
            localStorage.setItem('xianwu_items', JSON.stringify(initialItems));
        }

        if (!localStorage.getItem('xianwu_transactions')) {
            const initialTransactions = [
                {
                    transaction_id: 'trans_001',
                    item_id: 'item_003',
                    buyer_id: 'user_002',
                    seller_id: 'user_001',
                    status: '交易中',
                    create_time: new Date('2024-01-20').toISOString(),
                    complete_time: null
                }
            ];
            localStorage.setItem('xianwu_transactions', JSON.stringify(initialTransactions));
        }

        if (!localStorage.getItem('xianwu_chats')) {
            const initialChats = [
                {
                    chat_id: 'chat_001',
                    transaction_id: 'trans_001',
                    sender_id: 'user_002',
                    receiver_id: 'user_001',
                    message: '你好，我对你的台灯很感兴趣，可以便宜点吗？',
                    send_time: new Date('2024-01-20T10:00:00').toISOString()
                },
                {
                    chat_id: 'chat_002',
                    transaction_id: 'trans_001',
                    sender_id: 'user_001',
                    receiver_id: 'user_002',
                    message: '可以的，最低40元，你看怎么样？',
                    send_time: new Date('2024-01-20T10:05:00').toISOString()
                }
            ];
            localStorage.setItem('xianwu_chats', JSON.stringify(initialChats));
        }

        if (!localStorage.getItem('xianwu_reviews')) {
            localStorage.setItem('xianwu_reviews', JSON.stringify([]));
        }
    }

    // 绑定事件
    bindEvents() {
        // 登录表单
        document.getElementById('loginForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });

        // 注册表单
        document.getElementById('registerForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleRegister();
        });

        // 校园身份验证表单
        document.getElementById('verifyForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleVerification();
        });

        // 发布物品表单
        document.getElementById('publishForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handlePublishItem();
        });

        // 搜索功能
        document.getElementById('searchKeyword')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.searchItems();
            }
        });

        // 消息输入
        document.getElementById('messageInput')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });

        // 设置评价系统
        this.setupRatingSystem();
    }

    // 用户管理功能
    handleLogin() {
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        console.log('尝试登录:', email, password);
        const users = JSON.parse(localStorage.getItem('xianwu_users') || '[]');
        console.log('用户列表:', users);
        const user = users.find(u => u.email === email && u.password === password);
        console.log('找到用户:', user);

        if (user) {
            this.currentUser = user;
            localStorage.setItem('xianwu_current_user', JSON.stringify(user));
            this.showToast('登录成功！', 'success');
            this.updateUI();
            this.closeModal('loginModal');
        } else {
            this.showToast('邮箱或密码错误！', 'danger');
        }
    }

    handleRegister() {
        const username = document.getElementById('registerUsername').value;
        const email = document.getElementById('registerEmail').value;
        const campusId = document.getElementById('registerCampusId').value;
        const password = document.getElementById('registerPassword').value;

        const users = JSON.parse(localStorage.getItem('xianwu_users') || '[]');
        
        if (users.find(u => u.email === email)) {
            this.showToast('该邮箱已注册！', 'danger');
            return;
        }

        if (users.find(u => u.campus_id === campusId)) {
            this.showToast('该学号已注册！', 'danger');
            return;
        }

        const newUser = {
            user_id: 'user_' + Date.now(),
            username,
            email,
            campus_id: campusId,
            phone: '',
            avatar: `https://via.placeholder.com/150/4f46e5/ffffff?text=${username.charAt(0)}`,
            register_time: new Date().toISOString(),
            is_verified: false,
            password
        };

        users.push(newUser);
        localStorage.setItem('xianwu_users', JSON.stringify(users));

        this.showToast('注册成功！请进行校园身份验证。', 'success');
        this.closeModal('registerModal');
        this.showVerificationModal();
    }

    handleVerification() {
        const campusId = document.getElementById('verifyCampusId').value;
        const email = document.getElementById('verifyEmail').value;

        // 模拟校园身份验证
        if (campusId && email.includes('@') && email.includes('edu')) {
            const users = JSON.parse(localStorage.getItem('xianwu_users') || '[]');
            const currentUser = JSON.parse(localStorage.getItem('xianwu_current_user'));
            
            const userIndex = users.findIndex(u => u.user_id === currentUser.user_id);
            if (userIndex !== -1) {
                users[userIndex].is_verified = true;
                users[userIndex].campus_id = campusId;
                users[userIndex].email = email;
                
                localStorage.setItem('xianwu_users', JSON.stringify(users));
                localStorage.setItem('xianwu_current_user', JSON.stringify(users[userIndex]));
                this.currentUser = users[userIndex];
                
                this.showToast('校园身份验证成功！', 'success');
                this.updateUI();
                this.closeModal('verifyModal');
            }
        } else {
            this.showToast('请填写正确的学号和学校邮箱！', 'danger');
        }
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('xianwu_current_user');
        this.updateUI();
        this.showToast('已退出登录！', 'info');
    }

    // 物品管理功能
    handlePublishItem() {
        if (!this.currentUser) {
            this.showToast('请先登录！', 'warning');
            this.showLoginModal();
            return;
        }

        if (!this.currentUser.is_verified) {
            this.showToast('请先完成校园身份验证！', 'warning');
            this.showVerificationModal();
            return;
        }

        const title = document.getElementById('itemTitle').value;
        const description = document.getElementById('itemDescription').value;
        const price = parseFloat(document.getElementById('itemPrice').value);
        const category = document.getElementById('itemCategory').value;
        const imageFile = document.getElementById('itemImage').files[0];

        if (!title || !description || !price || !category) {
            this.showToast('请填写完整的物品信息！', 'warning');
            return;
        }

        // 模拟图片上传
        const imageUrl = imageFile ? 
            URL.createObjectURL(imageFile) : 
            `https://via.placeholder.com/300x200/4f46e5/ffffff?text=${encodeURIComponent(title.substring(0, 4))}`;

        const newItem = {
            item_id: 'item_' + Date.now(),
            user_id: this.currentUser.user_id,
            title,
            description,
            price,
            category,
            status: '待售',
            image_url: imageUrl,
            create_time: new Date().toISOString()
        };

        const items = JSON.parse(localStorage.getItem('xianwu_items') || '[]');
        items.push(newItem);
        localStorage.setItem('xianwu_items', JSON.stringify(items));

        this.showToast('物品发布成功！', 'success');
        document.getElementById('publishForm').reset();
        this.showHome();
        this.loadItems();
    }

    searchItems() {
        const keyword = document.getElementById('searchKeyword').value.toLowerCase();
        const category = document.getElementById('categoryFilter').value;
        const priceRange = document.getElementById('priceFilter').value;

        const items = JSON.parse(localStorage.getItem('xianwu_items') || '[]');
        let filteredItems = items.filter(item => item.status === '待售');

        // 关键词搜索
        if (keyword) {
            filteredItems = filteredItems.filter(item => 
                item.title.toLowerCase().includes(keyword) || 
                item.description.toLowerCase().includes(keyword)
            );
        }

        // 类别筛选
        if (category) {
            filteredItems = filteredItems.filter(item => item.category === category);
        }

        // 价格筛选
        if (priceRange) {
            if (priceRange === '0-50') {
                filteredItems = filteredItems.filter(item => item.price >= 0 && item.price <= 50);
            } else if (priceRange === '50-100') {
                filteredItems = filteredItems.filter(item => item.price > 50 && item.price <= 100);
            } else if (priceRange === '100-200') {
                filteredItems = filteredItems.filter(item => item.price > 100 && item.price <= 200);
            } else if (priceRange === '200+') {
                filteredItems = filteredItems.filter(item => item.price > 200);
            }
        }

        this.displayItems(filteredItems);
    }

    loadItems() {
        const items = JSON.parse(localStorage.getItem('xianwu_items') || '[]');
        const availableItems = items.filter(item => item.status === '待售');
        this.displayItems(availableItems);
    }

    displayItems(items) {
        const container = document.getElementById('itemsList');
        if (!container) return;

        if (items.length === 0) {
            container.innerHTML = `
                <div class="col-12 text-center py-5">
                    <i class="bi bi-inbox display-1 text-muted"></i>
                    <h5 class="text-muted mt-3">暂无物品</h5>
                    <p class="text-muted">试试调整搜索条件或发布新物品</p>
                </div>
            `;
            return;
        }

        container.innerHTML = items.map(item => {
            const user = this.getUserById(item.user_id);
            return `
                <div class="col-md-6 col-lg-4 mb-4">
                    <div class="card item-card h-100 hover-lift">
                        <div class="position-relative">
                            <img src="${item.image_url}" class="card-img-top" alt="${item.title}">
                            <div class="item-price">¥${item.price.toFixed(2)}</div>
                            <div class="item-status status-${this.getStatusClass(item.status)}">${item.status}</div>
                        </div>
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title">${item.title}</h5>
                            <p class="card-text text-muted flex-grow-1">${item.description}</p>
                            <div class="d-flex justify-content-between align-items-center mb-3">
                                <span class="badge bg-primary">${item.category}</span>
                                <small class="text-muted">
                                    <i class="bi bi-person me-1"></i>${user?.username || '未知用户'}
                                </small>
                            </div>
                            <div class="d-grid gap-2">
                                <button class="btn btn-primary" onclick="app.showItemDetail('${item.item_id}')">
                                    <i class="bi bi-eye me-1"></i>查看详情
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    // 聊天功能
    showChat(transactionId, otherUserId) {
        this.currentChat = {
            transaction_id: transactionId,
            other_user_id: otherUserId
        };
        
        this.showPage('chatPage');
        this.loadChatMessages();
        this.loadChatList();
    }

    loadChatList() {
        if (!this.currentUser) return;

        const chats = JSON.parse(localStorage.getItem('xianwu_chats') || '[]');
        const transactions = JSON.parse(localStorage.getItem('xianwu_transactions') || '[]');
        
        // 获取当前用户相关的交易
        const userTransactions = transactions.filter(t => 
            t.buyer_id === this.currentUser.user_id || t.seller_id === this.currentUser.user_id
        );

        const chatList = document.getElementById('chatList');
        if (!chatList) return;

        if (userTransactions.length === 0) {
            chatList.innerHTML = `
                <div class="text-center py-4">
                    <i class="bi bi-chat-dots display-6 text-muted"></i>
                    <p class="text-muted mt-2">暂无聊天</p>
                </div>
            `;
            return;
        }

        chatList.innerHTML = userTransactions.map(transaction => {
            const otherUserId = transaction.buyer_id === this.currentUser.user_id ? 
                transaction.seller_id : transaction.buyer_id;
            const otherUser = this.getUserById(otherUserId);
            const item = this.getItemById(transaction.item_id);
            
            return `
                <a href="#" class="list-group-item list-group-item-action" 
                   onclick="app.showChat('${transaction.transaction_id}', '${otherUserId}')">
                    <div class="d-flex align-items-center">
                        <img src="${otherUser?.avatar}" class="user-avatar me-3" alt="${otherUser?.username}">
                        <div class="flex-grow-1">
                            <h6 class="mb-1">${otherUser?.username}</h6>
                            <p class="mb-1 small text-muted">${item?.title}</p>
                            <small class="text-muted">${this.getStatusText(transaction.status)}</small>
                        </div>
                    </div>
                </a>
            `;
        }).join('');
    }

    loadChatMessages() {
        if (!this.currentChat) return;

        const chats = JSON.parse(localStorage.getItem('xianwu_chats') || '[]');
        const messages = chats.filter(chat => 
            chat.transaction_id === this.currentChat.transaction_id
        ).sort((a, b) => new Date(a.send_time) - new Date(b.send_time));

        const container = document.getElementById('chatMessages');
        const otherUser = this.getUserById(this.currentChat.other_user_id);
        
        document.getElementById('currentChatTitle').textContent = 
            `与 ${otherUser?.username} 的聊天`;

        if (messages.length === 0) {
            container.innerHTML = `
                <div class="text-center py-5">
                    <i class="bi bi-chat-square-text display-6 text-muted"></i>
                    <p class="text-muted mt-2">开始你们的对话吧！</p>
                </div>
            `;
            return;
        }

        container.innerHTML = messages.map(message => {
            const isSent = message.sender_id === this.currentUser.user_id;
            return `
                <div class="chat-message ${isSent ? 'sent' : 'received'}">
                    <div>${message.message}</div>
                    <div class="chat-time">${this.formatTime(message.send_time)}</div>
                </div>
            `;
        }).join('');

        // 滚动到底部
        container.scrollTop = container.scrollHeight;
    }

    sendMessage() {
        if (!this.currentUser || !this.currentChat) return;

        const messageInput = document.getElementById('messageInput');
        const message = messageInput.value.trim();

        if (!message) return;

        const newMessage = {
            chat_id: 'chat_' + Date.now(),
            transaction_id: this.currentChat.transaction_id,
            sender_id: this.currentUser.user_id,
            receiver_id: this.currentChat.other_user_id,
            message: message,
            send_time: new Date().toISOString()
        };

        const chats = JSON.parse(localStorage.getItem('xianwu_chats') || '[]');
        chats.push(newMessage);
        localStorage.setItem('xianwu_chats', JSON.stringify(chats));

        messageInput.value = '';
        this.loadChatMessages();
    }

    // 交易管理功能
    createTransaction(itemId, sellerId) {
        if (!this.currentUser) {
            this.showToast('请先登录！', 'warning');
            return;
        }

        // 检查是否已存在交易
        const transactions = JSON.parse(localStorage.getItem('xianwu_transactions') || '[]');
        const existingTransaction = transactions.find(t => 
            t.item_id === itemId && t.buyer_id === this.currentUser.user_id
        );

        if (existingTransaction) {
            this.showChat(existingTransaction.transaction_id, sellerId);
            return;
        }

        // 创建新交易
        const newTransaction = {
            transaction_id: 'trans_' + Date.now(),
            item_id: itemId,
            buyer_id: this.currentUser.user_id,
            seller_id: sellerId,
            status: '待交易',
            create_time: new Date().toISOString(),
            complete_time: null
        };

        transactions.push(newTransaction);
        localStorage.setItem('xianwu_transactions', JSON.stringify(transactions));

        // 更新物品状态
        this.updateItemStatus(itemId, '交易中');

        this.showToast('交易已创建，开始聊天吧！', 'success');
        this.showChat(newTransaction.transaction_id, sellerId);
    }

    updateItemStatus(itemId, status) {
        const items = JSON.parse(localStorage.getItem('xianwu_items') || '[]');
        const itemIndex = items.findIndex(item => item.item_id === itemId);
        
        if (itemIndex !== -1) {
            items[itemIndex].status = status;
            localStorage.setItem('xianwu_items', JSON.stringify(items));
        }
    }

    // UI更新功能
    updateUI() {
        const userSection = document.getElementById('userSection');
        const currentUserData = localStorage.getItem('xianwu_current_user');
        
        if (currentUserData) {
            this.currentUser = JSON.parse(currentUserData);
            const user = this.currentUser;
            
            userSection.innerHTML = `
                <div class="dropdown">
                    <a href="#" class="d-flex align-items-center text-decoration-none dropdown-toggle" 
                       data-bs-toggle="dropdown">
                        <img src="${user.avatar}" class="user-avatar me-2" alt="${user.username}">
                        <span class="text-dark">${user.username}</span>
                        ${user.is_verified ? '<i class="bi bi-patch-check-fill text-primary ms-1"></i>' : ''}
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end">
                        <li><a class="dropdown-item" href="#" onclick="app.showProfile()">
                            <i class="bi bi-person me-2"></i>个人资料
                        </a></li>
                        ${!user.is_verified ? `
                        <li><a class="dropdown-item" href="#" onclick="app.showVerificationModal()">
                            <i class="bi bi-shield-check me-2"></i>校园验证
                        </a></li>
                        ` : ''}
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="#" onclick="app.logout()">
                            <i class="bi bi-box-arrow-right me-2"></i>退出登录
                        </a></li>
                    </ul>
                </div>
            `;
        } else {
            userSection.innerHTML = `
                <button class="btn btn-outline-primary me-2" onclick="app.showLoginModal()">登录</button>
                <button class="btn btn-primary" onclick="app.showRegisterModal()">注册</button>
            `;
        }
    }

    // 页面导航
    showHome() {
        this.showPage('homePage');
        this.loadItems();
    }

    showPublish() {
        if (!this.currentUser) {
            this.showToast('请先登录！', 'warning');
            this.showLoginModal();
            return;
        }
        
        if (!this.currentUser.is_verified) {
            this.showToast('请先完成校园身份验证！', 'warning');
            this.showVerificationModal();
            return;
        }
        
        this.showPage('publishPage');
    }

    showMyItems() {
        if (!this.currentUser) {
            this.showToast('请先登录！', 'warning');
            this.showLoginModal();
            return;
        }
        
        this.showPage('myItemsPage');
        this.loadMyItems();
    }

    showTransactions() {
        if (!this.currentUser) {
            this.showToast('请先登录！', 'warning');
            this.showLoginModal();
            return;
        }
        
        this.showPage('transactionsPage');
        this.loadTransactions();
    }

    showPage(pageId) {
        // 显示加载动画
        this.showLoading();
        
        // 延迟执行页面切换，增加用户体验
        setTimeout(() => {
            // 隐藏所有页面
            document.querySelectorAll('.page-content').forEach(page => {
                page.classList.add('d-none');
            });
            
            // 显示指定页面
            const page = document.getElementById(pageId);
            if (page) {
                page.classList.remove('d-none');
                page.classList.add('page-content');
            }
            
            // 隐藏加载动画
            this.hideLoading();
        }, 300);
    }

    // 显示加载动画
    showLoading() {
        const loadingHtml = `
            <div id="loadingOverlay" class="loading-overlay">
                <div class="text-center">
                    <div class="loading-spinner"></div>
                    <p class="mt-3 text-muted">加载中...</p>
                </div>
            </div>
        `;
        
        // 移除已存在的加载动画
        const existingLoading = document.getElementById('loadingOverlay');
        if (existingLoading) {
            existingLoading.remove();
        }
        
        document.body.insertAdjacentHTML('beforeend', loadingHtml);
    }

    // 隐藏加载动画
    hideLoading() {
        const loadingOverlay = document.getElementById('loadingOverlay');
        if (loadingOverlay) {
            loadingOverlay.style.opacity = '0';
            setTimeout(() => {
                loadingOverlay.remove();
            }, 300);
        }
    }

    // 模态框控制
    showLoginModal() {
        const modal = new bootstrap.Modal(document.getElementById('loginModal'));
        modal.show();
    }

    showRegisterModal() {
        const modal = new bootstrap.Modal(document.getElementById('registerModal'));
        modal.show();
    }

    showVerificationModal() {
        const modal = new bootstrap.Modal(document.getElementById('verifyModal'));
        modal.show();
    }

    closeModal(modalId) {
        const modal = bootstrap.Modal.getInstance(document.getElementById(modalId));
        if (modal) {
            modal.hide();
        }
    }

    // 辅助功能
    showItemDetail(itemId) {
        const items = JSON.parse(localStorage.getItem('xianwu_items') || '[]');
        const item = items.find(i => i.item_id === itemId);
        
        if (!item) return;

        const user = this.getUserById(item.user_id);
        const modal = new bootstrap.Modal(document.getElementById('itemDetailModal'));
        
        document.getElementById('itemDetailTitle').textContent = item.title;
        document.getElementById('itemDetailContent').innerHTML = `
            <div class="row">
                <div class="col-md-6">
                    <img src="${item.image_url}" class="img-fluid rounded mb-3" alt="${item.title}">
                </div>
                <div class="col-md-6">
                    <h4>${item.title}</h4>
                    <div class="mb-3">
                        <span class="badge bg-primary me-2">${item.category}</span>
                        <span class="badge bg-${this.getStatusColor(item.status)}">${item.status}</span>
                    </div>
                    <h3 class="text-primary mb-3">¥${item.price.toFixed(2)}</h3>
                    <p class="mb-4">${item.description}</p>
                    <div class="d-flex align-items-center mb-3">
                        <img src="${user?.avatar}" class="user-avatar me-3" alt="${user?.username}">
                        <div>
                            <h6 class="mb-0">${user?.username}</h6>
                            <small class="text-muted">
                                ${user?.is_verified ? '<i class="bi bi-patch-check-fill text-primary me-1"></i>已验证' : '未验证'}
                            </small>
                        </div>
                    </div>
                    ${this.currentUser && this.currentUser.user_id !== item.user_id ? `
                    <div class="d-grid gap-2">
                        <button class="btn btn-primary" onclick="app.createTransaction('${item.item_id}', '${item.user_id}')">
                            <i class="bi bi-chat-dots me-2"></i>联系卖家
                        </button>
                    </div>
                    ` : ''}
                </div>
            </div>
        `;
        
        modal.show();
    }

    loadMyItems() {
        if (!this.currentUser) return;

        const items = JSON.parse(localStorage.getItem('xianwu_items') || '[]');
        const myItems = items.filter(item => item.user_id === this.currentUser.user_id);
        
        const container = document.getElementById('myItemsList');
        if (!container) return;

        if (myItems.length === 0) {
            container.innerHTML = `
                <div class="col-12 text-center py-5">
                    <i class="bi bi-box-seam display-1 text-muted"></i>
                    <h5 class="text-muted mt-3">您还没有发布任何物品</h5>
                    <p class="text-muted">点击"发布物品"来出售您的闲置物品</p>
                    <button class="btn btn-primary" onclick="app.showPublish()">
                        <i class="bi bi-plus-circle me-2"></i>发布物品
                    </button>
                </div>
            `;
            return;
        }

        container.innerHTML = myItems.map(item => `
            <div class="col-md-6 col-lg-4 mb-4">
                <div class="card h-100">
                    <div class="position-relative">
                        <img src="${item.image_url}" class="card-img-top" alt="${item.title}" style="height: 200px; object-fit: cover;">
                        <div class="item-status status-${this.getStatusClass(item.status)}">${item.status}</div>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">${item.title}</h5>
                        <p class="card-text text-muted">${item.description}</p>
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <span class="badge bg-primary">${item.category}</span>
                            <strong class="text-primary">¥${item.price.toFixed(2)}</strong>
                        </div>
                        <div class="d-grid gap-2">
                            <button class="btn btn-outline-primary btn-sm" onclick="app.editItem('${item.item_id}')">
                                <i class="bi bi-pencil me-1"></i>编辑
                            </button>
                            ${item.status === '待售' ? `
                            <button class="btn btn-outline-danger btn-sm" onclick="app.deleteItem('${item.item_id}')">
                                <i class="bi bi-trash me-1"></i>下架
                            </button>
                            ` : ''}
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    loadTransactions() {
        if (!this.currentUser) return;

        const transactions = JSON.parse(localStorage.getItem('xianwu_transactions') || '[]');
        
        // 我购买的
        const buyingTransactions = transactions.filter(t => t.buyer_id === this.currentUser.user_id);
        this.displayBuyingTransactions(buyingTransactions);
        
        // 我出售的
        const sellingTransactions = transactions.filter(t => t.seller_id === this.currentUser.user_id);
        this.displaySellingTransactions(sellingTransactions);
    }

    displayBuyingTransactions(transactions) {
        const container = document.getElementById('buyingTransactions');
        if (!container) return;

        if (transactions.length === 0) {
            container.innerHTML = `
                <div class="text-center py-5">
                    <i class="bi bi-cart display-1 text-muted"></i>
                    <h5 class="text-muted mt-3">暂无购买记录</h5>
                </div>
            `;
            return;
        }

        container.innerHTML = transactions.map(transaction => {
            const item = this.getItemById(transaction.item_id);
            const seller = this.getUserById(transaction.seller_id);
            return `
                <div class="card transaction-card mb-3">
                    <div class="card-body">
                        <div class="row align-items-center">
                            <div class="col-md-2">
                                <img src="${item?.image_url}" class="img-fluid rounded" alt="${item?.title}">
                            </div>
                            <div class="col-md-6">
                                <h5>${item?.title}</h5>
                                <p class="text-muted mb-1">卖家：${seller?.username}</p>
                                <p class="text-muted mb-0">创建时间：${this.formatTime(transaction.create_time)}</p>
                            </div>
                            <div class="col-md-2 text-center">
                                <strong class="text-primary">¥${item?.price.toFixed(2)}</strong>
                            </div>
                            <div class="col-md-2 text-end">
                                <span class="transaction-status bg-${this.getTransactionStatusColor(transaction.status)}">
                                    ${transaction.status}
                                </span>
                                ${transaction.status === '交易中' ? `
                                <button class="btn btn-sm btn-primary mt-2" onclick="app.showChat('${transaction.transaction_id}', '${seller?.user_id}')">
                                    <i class="bi bi-chat me-1"></i>聊天
                                </button>
                                ` : ''}
                                ${transaction.status === '已完成' && !transaction.is_rated ? `
                                <button class="btn btn-sm btn-warning mt-2" onclick="app.showRatingModal('${transaction.transaction_id}', '${seller?.user_id}')">
                                    <i class="bi bi-star me-1"></i>评价
                                </button>
                                ` : ''}
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    displaySellingTransactions(transactions) {
        const container = document.getElementById('sellingTransactions');
        if (!container) return;

        if (transactions.length === 0) {
            container.innerHTML = `
                <div class="text-center py-5">
                    <i class="bi bi-shop display-1 text-muted"></i>
                    <h5 class="text-muted mt-3">暂无出售记录</h5>
                </div>
            `;
            return;
        }

        container.innerHTML = transactions.map(transaction => {
            const item = this.getItemById(transaction.item_id);
            const buyer = this.getUserById(transaction.buyer_id);
            return `
                <div class="card transaction-card mb-3">
                    <div class="card-body">
                        <div class="row align-items-center">
                            <div class="col-md-2">
                                <img src="${item?.image_url}" class="img-fluid rounded" alt="${item?.title}">
                            </div>
                            <div class="col-md-6">
                                <h5>${item?.title}</h5>
                                <p class="text-muted mb-1">买家：${buyer?.username}</p>
                                <p class="text-muted mb-0">创建时间：${this.formatTime(transaction.create_time)}</p>
                            </div>
                            <div class="col-md-2 text-center">
                                <strong class="text-primary">¥${item?.price.toFixed(2)}</strong>
                            </div>
                            <div class="col-md-2 text-end">
                                <span class="transaction-status bg-${this.getTransactionStatusColor(transaction.status)}">
                                    ${transaction.status}
                                </span>
                                ${transaction.status === '交易中' ? `
                                <button class="btn btn-sm btn-success mt-2" onclick="app.completeTransaction('${transaction.transaction_id}')">
                                    <i class="bi bi-check-circle me-1"></i>完成交易
                                </button>
                                ` : ''}
                                ${transaction.status === '已完成' && !transaction.is_rated ? `
                                <button class="btn btn-sm btn-warning mt-2" onclick="app.showRatingModal('${transaction.transaction_id}', '${buyer?.user_id}')">
                                    <i class="bi bi-star me-1"></i>评价
                                </button>
                                ` : ''}
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    completeTransaction(transactionId) {
        const transactions = JSON.parse(localStorage.getItem('xianwu_transactions') || '[]');
        const transactionIndex = transactions.findIndex(t => t.transaction_id === transactionId);
        
        if (transactionIndex !== -1) {
            transactions[transactionIndex].status = '已完成';
            transactions[transactionIndex].complete_time = new Date().toISOString();
            
            // 更新物品状态
            this.updateItemStatus(transactions[transactionIndex].item_id, '已售');
            
            localStorage.setItem('xianwu_transactions', JSON.stringify(transactions));
            this.showToast('交易已完成！', 'success');
            this.loadTransactions();
        }
    }

    // 数据获取辅助函数
    getUserById(userId) {
        const users = JSON.parse(localStorage.getItem('xianwu_users') || '[]');
        return users.find(user => user.user_id === userId);
    }

    getItemById(itemId) {
        const items = JSON.parse(localStorage.getItem('xianwu_items') || '[]');
        return items.find(item => item.item_id === itemId);
    }

    // 工具函数
    getStatusClass(status) {
        const statusMap = {
            '待售': 'available',
            '交易中': 'selling',
            '已售': 'sold',
            '已取消': 'cancelled'
        };
        return statusMap[status] || 'available';
    }

    getStatusColor(status) {
        const colorMap = {
            '待售': 'success',
            '交易中': 'warning',
            '已售': 'danger',
            '已取消': 'secondary'
        };
        return colorMap[status] || 'primary';
    }

    getTransactionStatusColor(status) {
        const colorMap = {
            '待交易': 'warning',
            '交易中': 'primary',
            '已完成': 'success',
            '已取消': 'danger'
        };
        return colorMap[status] || 'primary';
    }

    getStatusText(status) {
        const statusMap = {
            '待交易': '等待卖家确认',
            '交易中': '交易进行中',
            '已完成': '交易已完成',
            '已取消': '交易已取消'
        };
        return statusMap[status] || status;
    }

    formatTime(timeString) {
        const date = new Date(timeString);
        const now = new Date();
        const diff = now - date;
        
        if (diff < 60000) return '刚刚';
        if (diff < 3600000) return Math.floor(diff / 60000) + '分钟前';
        if (diff < 86400000) return Math.floor(diff / 3600000) + '小时前';
        if (diff < 604800000) return Math.floor(diff / 86400000) + '天前';
        
        return date.toLocaleDateString('zh-CN');
    }

    showToast(message, type = 'info') {
        // 创建toast元素
        const toastHtml = `
            <div class="toast align-items-center text-white bg-${type} border-0" role="alert">
                <div class="d-flex">
                    <div class="toast-body">
                        ${message}
                    </div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
                </div>
            </div>
        `;
        
        // 创建toast容器（如果不存在）
        let toastContainer = document.getElementById('toastContainer');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.id = 'toastContainer';
            toastContainer.className = 'toast-container position-fixed top-0 end-0 p-3';
            toastContainer.style.zIndex = '1055';
            document.body.appendChild(toastContainer);
        }
        
        // 添加toast到容器
        const toastElement = document.createElement('div');
        toastElement.innerHTML = toastHtml;
        toastContainer.appendChild(toastElement.firstElementChild);
        
        // 显示toast
        const toast = new bootstrap.Toast(toastElement.firstElementChild);
        toast.show();
        
        // 自动移除
        setTimeout(() => {
            if (toastElement.firstElementChild) {
                toastElement.firstElementChild.remove();
            }
        }, 3000);
    }

    // 显示评价模态框
    showRatingModal(transactionId, targetUserId) {
        const ratingModal = new bootstrap.Modal(document.getElementById('ratingModal'));
        document.getElementById('ratingTransactionId').value = transactionId;
        document.getElementById('ratingValue').value = '0';
        document.getElementById('ratingComment').value = '';
        this.updateStarDisplay(0);
        
        // 存储目标用户ID
        document.getElementById('ratingModal').dataset.targetUserId = targetUserId;
        ratingModal.show();
    }

    // 更新星星显示
    updateStarDisplay(rating) {
        const stars = document.querySelectorAll('#ratingStars .star');
        stars.forEach((star, index) => {
            star.textContent = index < rating ? '★' : '☆';
        });
    }

    // 设置评价系统
    setupRatingSystem() {
        // 评价星级点击事件
        document.querySelectorAll('.rating-star').forEach(star => {
            star.addEventListener('click', (e) => {
                const rating = parseInt(e.target.dataset.rating);
                document.getElementById('ratingValue').value = rating;
                
                // 更新星星显示
                document.querySelectorAll('.rating-star').forEach((s, index) => {
                    if (index < rating) {
                        s.classList.add('active');
                    } else {
                        s.classList.remove('active');
                    }
                });
            });
            
            star.addEventListener('mouseenter', (e) => {
                const rating = parseInt(e.target.dataset.rating);
                document.querySelectorAll('.rating-star').forEach((s, index) => {
                    if (index < rating) {
                        s.classList.add('hover');
                    } else {
                        s.classList.remove('hover');
                    }
                });
            });
        });
        
        // 鼠标离开时恢复原状
        document.querySelector('.rating-container')?.addEventListener('mouseleave', () => {
            const currentRating = parseInt(document.getElementById('ratingValue').value);
            document.querySelectorAll('.rating-star').forEach((s, index) => {
                s.classList.remove('hover');
                if (index < currentRating) {
                    s.classList.add('active');
                } else {
                    s.classList.remove('active');
                }
            });
        });
    }

    // 设置滚动效果
    setupScrollEffects() {
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // 显示Toast消息
    showToast(message, type = 'info', duration = 3000) {
        const toastId = 'toast-' + Date.now();
        const toastHtml = `
            <div id="${toastId}" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header">
                    <i class="bi bi-${this.getToastIcon(type)} text-${type} me-2"></i>
                    <strong class="me-auto">提示</strong>
                    <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
                </div>
                <div class="toast-body">
                    ${message}
                </div>
            </div>
        `;
        
        // 创建toast容器（如果不存在）
        let toastContainer = document.getElementById('toastContainer');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.id = 'toastContainer';
            toastContainer.className = 'toast-container position-fixed top-0 end-0 p-3';
            document.body.appendChild(toastContainer);
        }
        
        toastContainer.insertAdjacentHTML('beforeend', toastHtml);
        
        const toast = new bootstrap.Toast(document.getElementById(toastId), {
            autohide: true,
            delay: duration
        });
        
        toast.show();
        
        // 自动清理
        setTimeout(() => {
            const toastElement = document.getElementById(toastId);
            if (toastElement) {
                toastElement.remove();
            }
        }, duration + 500);
    }

    // 获取Toast图标
    getToastIcon(type) {
        const icons = {
            'success': 'check-circle-fill',
            'danger': 'exclamation-triangle-fill',
            'warning': 'exclamation-triangle-fill',
            'info': 'info-circle-fill'
        };
        return icons[type] || 'info-circle-fill';
    }

    // 提交评价
    submitRating() {
        const rating = parseInt(document.getElementById('ratingValue').value);
        const comment = document.getElementById('ratingComment').value.trim();
        const transactionId = document.getElementById('ratingTransactionId').value;
        const targetUserId = document.getElementById('ratingModal').dataset.targetUserId;

        if (rating === 0) {
            alert('请选择评分！');
            return;
        }

        if (!comment) {
            alert('请输入评价内容！');
            return;
        }

        const newRating = {
            rating_id: Date.now().toString(),
            transaction_id: transactionId,
            reviewer_id: this.currentUser.user_id,
            target_user_id: targetUserId,
            rating: rating,
            comment: comment,
            created_at: new Date().toISOString()
        };

        // 获取现有评价
        const ratings = JSON.parse(localStorage.getItem('xianwu_ratings') || '[]');
        ratings.push(newRating);
        localStorage.setItem('xianwu_ratings', JSON.stringify(ratings));

        // 关闭模态框
        const ratingModal = bootstrap.Modal.getInstance(document.getElementById('ratingModal'));
        ratingModal.hide();

        // 显示成功消息
        this.showToast('评价提交成功！', 'success');

        // 更新相关交易的评价状态
        const transactions = JSON.parse(localStorage.getItem('xianwu_transactions') || '[]');
        const transaction = transactions.find(t => t.transaction_id === transactionId);
        if (transaction) {
            transaction.is_rated = true;
            localStorage.setItem('xianwu_transactions', JSON.stringify(transactions));
        }

        // 刷新当前页面
        this.showTransactions();
    }

    showProfile(userId) {
        const users = JSON.parse(localStorage.getItem('xianwu_users') || '[]');
        const user = userId ? users.find(u => u.user_id === userId) : this.currentUser;
        if (!user) return;

        const profileModal = new bootstrap.Modal(document.getElementById('profileModal'));
        const modalBody = document.querySelector('#profileModal .modal-body');
        
        const reviews = JSON.parse(localStorage.getItem('xianwu_reviews') || '[]');
        const userReviews = reviews.filter(r => r.target_user_id === user.user_id);
        const avgRating = userReviews.length > 0 ? 
            (userReviews.reduce((sum, r) => sum + r.rating, 0) / userReviews.length).toFixed(1) : '0.0';
        
        modalBody.innerHTML = `
          <div class="profile-header">
            <img src="${user.avatar || 'https://via.placeholder.com/100'}" alt="头像" class="profile-avatar">
            <div>
              <h5>${user.username}</h5>
              <p class="text-muted">${user.campus_id || '未认证校园身份'}</p>
              <div class="profile-stats">
                <div class="stat-item">
                  <span class="stat-number">${this.getUserItemsCount(user.user_id)}</span>
                  <span class="stat-label">发布物品</span>
                </div>
                <div class="stat-item">
                  <span class="stat-number">${this.getUserTransactionsCount(user.user_id)}</span>
                  <span class="stat-label">完成交易</span>
                </div>
                <div class="stat-item">
                  <span class="stat-number">${avgRating}</span>
                  <span class="stat-label">评分</span>
                </div>
              </div>
            </div>
          </div>
          ${userReviews.length > 0 ? this.renderUserRatings(userReviews) : '<p class="text-muted text-center mt-3">暂无评价</p>'}
        `;
        
        profileModal.show();
    }

    renderUserRatings(ratings) {
        const users = JSON.parse(localStorage.getItem('xianwu_users') || '[]');
        return `
          <div class="mt-4">
            <h6>用户评价 (${ratings.length})</h6>
            ${ratings.map(rating => {
              const reviewer = users.find(u => u.user_id === rating.reviewer_id);
              return `
                <div class="review-item">
                  <div class="review-header">
                    <img src="${reviewer?.avatar || 'https://via.placeholder.com/50'}" alt="${reviewer?.username}" class="review-avatar">
                    <div class="review-info">
                      <div class="review-name">${reviewer?.username || '匿名用户'}</div>
                      <div class="review-date">${new Date(rating.created_at).toLocaleDateString()}</div>
                    </div>
                    <div class="review-rating">${'★'.repeat(rating.rating)}${'☆'.repeat(5 - rating.rating)}</div>
                  </div>
                  <div class="review-content">${rating.comment}</div>
                </div>
              `;
            }).join('')}
          </div>
        `;
    }

    editItem(itemId) {
        const items = JSON.parse(localStorage.getItem('xianwu_items') || '[]');
        const item = items.find(i => i.item_id === itemId);
        
        if (!item) return;
        
        // 简单的编辑功能（使用prompt）
        const newTitle = prompt('修改物品标题：', item.title);
        if (newTitle && newTitle !== item.title) {
            const newDescription = prompt('修改物品描述：', item.description);
            const newPrice = prompt('修改价格：', item.price);
            
            if (newTitle && newDescription && newPrice) {
                const itemIndex = items.findIndex(i => i.item_id === itemId);
                if (itemIndex !== -1) {
                    items[itemIndex].title = newTitle;
                    items[itemIndex].description = newDescription;
                    items[itemIndex].price = parseFloat(newPrice);
                    
                    localStorage.setItem('xianwu_items', JSON.stringify(items));
                    this.showToast('物品信息已更新！', 'success');
                    this.loadMyItems();
                }
            }
        }
    }

    deleteItem(itemId) {
        if (confirm('确定要下架这个物品吗？')) {
            const items = JSON.parse(localStorage.getItem('xianwu_items') || '[]');
            const itemIndex = items.findIndex(i => i.item_id === itemId);
            
            if (itemIndex !== -1) {
                items[itemIndex].status = '已取消';
                localStorage.setItem('xianwu_items', JSON.stringify(items));
                this.showToast('物品已下架！', 'success');
                this.loadMyItems();
            }
        }
    }
}

// 全局函数（供HTML调用）
function showHome() { app.showHome(); }
function showPublish() { app.showPublish(); }
function showMyItems() { app.showMyItems(); }
function showTransactions() { app.showTransactions(); }
function searchItems() { app.searchItems(); }
function sendMessage() { app.sendMessage(); }
function showLoginModal() { app.showLoginModal(); }
function showRegisterModal() { app.showRegisterModal(); }
function showVerificationModal() { app.showVerificationModal(); }
function showProfile(userId) { app.showProfile(userId); }
function closeChat() { app.showHome(); }
function submitRating() { app.submitRating(); }

// 模态框相关函数
function showLogin() {
    bootstrap.Modal.getInstance(document.getElementById('registerModal'))?.hide();
    app.showLoginModal();
}

function showRegister() {
    bootstrap.Modal.getInstance(document.getElementById('loginModal'))?.hide();
    app.showRegisterModal();
}

// 初始化应用
const app = new XianwuApp();