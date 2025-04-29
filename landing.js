// // landing.js
document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.querySelector('form');
    const phoneInput = document.getElementById('phone');
    const codeInput = document.getElementById('code');
    const getCodeBtn = document.querySelector('.button');
    const submitBtn = document.querySelector('button[type="submit"]');

    // 获取验证码
    getCodeBtn.addEventListener('click', function () {
        const phone = phoneInput.value.trim();

        if (!phone || !/^1[3-9]\d{9}$/.test(phone)) {
            alert('请输入正确的手机号码');
            return;
        }

        // 发送获取验证码请求
        Ajax.post('http://8.134.80.166:89/users/register', { phone })
            .then(response => {
                if (response.code === 200) {
                    alert('验证码已发送');
                    // 倒计时
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
                    alert(response.msg || '验证码发送失败');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('网络错误，请稍后重试');
            });
    });




    // 登录
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const phone = phoneInput.value.trim();
        const code = codeInput.value.trim();

        if (!phone || !code) {
            alert('请输入手机号和验证码');
            return;
        }

        submitBtn.disabled = true;
        submitBtn.textContent = '登录中...';

        // 发送登录请求
        Ajax.post('http://8.134.80.166:89/users/login', { phone, code })
            .then(response => {
                if (response.code === 200) {
                    // 保存token到localStorage
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('userInfo', JSON.stringify(response.data.userInfo));

                    alert('登录成功');
                    // 跳转到职位详情页
                    window.location.href = '../HTML/job-detail.html';
                } else {
                    alert(response.msg || '登录失败');
                    window.location.href = '../HTML/landing.html';
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('网络错误，请稍后重试');
            })
            .finally(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = '登录';
            });
    });
});


const token = localStorage.getItem('token')
if (token) {
    location.href = '../HTML/job-detail.html'
}


document.querySelector('.button').addEventListener('click', () => {
    const form = document.querySelector('.login.form')
    const data = serialize(form, { hash: true, empty: true }
    )
    console.log(data)
    axios({
        url: 'http://8.134.80.166:89/users/register',
        method: 'POST',
        data
    }).then(result => {
        // myAlert(true, '登陆成功')
        console.log(result)
        window.location.href = '../HTML/job-detail.html';
    }).catch(error => {
        // myAlert(false, error.response.data.message)
        console.dir(error.response.data.message)
    })
})


