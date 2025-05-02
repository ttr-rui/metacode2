document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.querySelector('.login-form');
    const phoneInput = document.getElementById('phone');
    const codeInput = document.getElementById('code');
    const getCodeBtn = document.querySelector('.button');
    const submitBtn = document.querySelector('button[type="submit"]');

    // 获取验证码功能
    getCodeBtn.addEventListener('click', function () {
        const phone = phoneInput.value.trim();

        // 验证手机号格式
        if (!phone || !/^1[3-9]\d{9}$/.test(phone)) {
            alert('请输入正确的手机号码');
            return;
        }

        // 发送验证码请求
        fetch('http://8.134.80.166:89/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ phone })
        })
            .then(response => response.json())
            .then(data => {
                if (data.code === 200) {
                    alert('验证码已发送');
                    // 开始倒计时
                    let countdown = 60;
                    getCodeBtn.disabled = true;
                    getCodeBtn.textContent = `${countdown}s`;

                    const timer = setInterval(() => {
                        countdown--;
                        getCodeBtn.textContent = `${countdown}s`;

                        if (countdown <= 0) {
                            clearInterval(timer);
                            getCodeBtn.disabled = false;
                            getCodeBtn.textContent = '获取验证码';
                        }
                    }, 1000);
                } else {
                    alert(data.msg || '验证码发送失败');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('网络错误，请稍后重试');
            });
    });

    // 登录表单提交
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const phone = phoneInput.value.trim();
        const code = codeInput.value.trim();

        // 表单验证
        if (!phone || !code) {
            alert('请输入手机号和验证码');
            return;
        }

        // 禁用提交按钮
        submitBtn.disabled = true;
        submitBtn.textContent = '登录中...';

        // 发送登录请求
        fetch('http://8.134.80.166:89/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ phone, code })
        })
            .then(response => response.json())
            .then(data => {
                if (data.code === 200) {
                    // 保存用户信息和token
                    localStorage.setItem('token', data.data.token);
                    localStorage.setItem('userInfo', JSON.stringify(data.data.userInfo));

                    alert('登录成功');
                    // 登录成功后跳转到职位详情页
                    window.location.href = '../HTML/job-detail.html';
                } else {
                    alert(data.msg || '登录失败');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('网络错误，请稍后重试');
            })
            .finally(() => {
                // 恢复提交按钮状态
                submitBtn.disabled = false;
                submitBtn.textContent = '登录';
            });
    });
});
