document.addEventListener('DOMContentLoaded', function () {

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

document.querySelectorAll('.apply-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        window.location.href = '../HTML/profile.html';
        // 检查登录状态
        if (!localStorage.getItem('token')) {
            alert('请先登录');
            window.location.href = 'landing.html';
            return;
        }
        showLoginModal();
    });
});
