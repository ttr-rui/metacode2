// job-detail.js
document.addEventListener('DOMContentLoaded', function () {
    // // 检查登录状态
    if (!localStorage.getItem('token')) {
        alert('请先登录');
        window.location.href = 'landing.html';
        return;
    }

    // 获取URL中的职位ID
    const urlParams = new URLSearchParams(window.location.search);
    const jobId = urlParams.get('id');

    if (!jobId) {
        alert('无效的职位ID');
        window.location.href = 'job.html';
        return;
    }

    const token = localStorage.getItem('token')
    if (!token) {
        location.href = '../HTML/job-detail.html'
    }

    // 加载职位详情
    loadJobDetail(jobId);

    // 申请职位按钮
    const applyBtn = document.getElementById('apply-btn');
    applyBtn.addEventListener('click', function () {
        applyForJob(jobId);
    });
});

function loadJobDetail(jobId) {
    const token = localStorage.getItem('token');

    Ajax.post(`http://8.134.80.166:89/jobs/jobInfo/1?id=${jobId}`, {
        'Authorization': `Bearer ${token}`
    })
        .then(response => {
            if (response.code === 200) {
                renderJobDetail(response.data);
            } else {
                alert(response.msg || '获取职位详情失败');
                window.location.href = 'job.html';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('网络错误，请稍后重试');
            window.location.href = 'job.html';
        });
}

function renderJobDetail(job) {
    document.getElementById('job-title').textContent = job.title;
    document.getElementById('detail-title').textContent = job.title;
    document.getElementById('detail-city').textContent = job.city;
    document.getElementById('detail-category').textContent = job.category;
    document.getElementById('detail-time').textContent = new Date(job.createTime).toLocaleDateString();
    document.getElementById('detail-description').innerHTML = job.description.replace(/\n/g, '<br>');
    document.getElementById('detail-requirements').innerHTML = job.requirements.replace(/\n/g, '<br>');
    document.getElementById('detail-location').textContent = job.location;
}

function applyForJob(jobId) {
    const token = localStorage.getItem('token');
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    if (!userInfo || !userInfo.resumeComplete) {
        if (confirm('您还没有完善简历信息，是否现在去完善？')) {
            window.location.href = '../HTML/profile.html';
        }
        return;
    }

    if (!confirm('确定要申请这个职位吗？')) {
        return;
    }

    const applyBtn = document.getElementById('apply-btn');
    applyBtn.disabled = true;
    applyBtn.textContent = '申请中...';

    Ajax.post('http://8.134.80.166:89/api/application/apply', { jobId }, {
        'Authorization': `Bearer ${token}`
    })
        .then(response => {
            if (response.code === 200) {
                alert('申请成功！');
                applyBtn.textContent = '已申请';
            } else {
                alert(response.msg || '申请失败');
                applyBtn.disabled = false;
                applyBtn.textContent = '立即申请';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('网络错误，请稍后重试');
            applyBtn.disabled = false;
            applyBtn.textContent = '立即申请';
        });
}