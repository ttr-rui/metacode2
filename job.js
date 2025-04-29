document.addEventListener('DOMContentLoaded', function () {
    const jobListContainer = document.querySelector('.job-choose');
    const searchInput = document.querySelector('.atsx-input');
    const searchBtn = document.querySelector('button[type="button"]');
    const resetBtn = document.querySelector('input[type="reset"]');
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    // // 检查登录状态
    // if (!localStorage.getItem('token')) {
    //     alert('请先登录');
    //     window.location.href = 'landing.html';
    //     return;
    // }


    // 加载职位列表
    function loadJobs(filters = {}) {
        jobListContainer.innerHTML = '<h3>加载中...</h3>';

        const token = localStorage.getItem('token');



        Ajax.post('http://8.134.80.166:89/jobs/jobInfo/all', {
            'Authorization': `Bearer ${token}`
        })
            .then(response => {
                if (response.code === 200) {
                    renderJobs(response.data, filters);
                } else {
                    alert(response.msg || '获取职位列表失败');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('网络错误，请稍后重试');
            });
    }

    // // 调用API获取数据
    // fetch("http://8.134.80.166:89/jobs/jobInfo/all")
    //     .then(response => response.json())
    //     .then(data => {
    //         // 将数据渲染到网页
    //         document.getElementById("data-container").innerHTML =
    //             JSON.stringify(data, null, 2);
    //     });

    // 渲染职位列表
    function renderJobs(jobs, filters) {
        let filteredJobs = [...jobs];

        // 应用筛选条件
        if (filters.city) {
            filteredJobs = filteredJobs.filter(job => job.city === filters.city);
        }

        if (filters.category) {
            filteredJobs = filteredJobs.filter(job => job.category === filters.category);
        }

        if (filters.search) {
            const searchTerm = filters.search.toLowerCase();
            filteredJobs = filteredJobs.filter(job =>
                job.title.toLowerCase().includes(searchTerm) ||
                job.description.toLowerCase().includes(searchTerm)
            );
        }

        // 渲染到页面
        jobListContainer.innerHTML = `
            <h3>开启新的工作（${filteredJobs.length}）</h3>
            ${filteredJobs.map(job => `
                <div class="job-item">
                    <h4>${job.title}</h4>
                    <p>${job.city} | ${job.category}</p>
                    <div class="job-desc">
                        <h5>职位描述</h5>
                        <p>${job.description}</p>
                        <h5>职位要求</h5>
                        <p>${job.requirements}</p>
                    </div>
                    <a href="job-detail.html?id=${job.id}" class="apply-btn">立即申请</a>
                </div>
            `).join('')}
        `;
    }

    // 搜索功能
    searchBtn.addEventListener('click', function () {
        const searchTerm = searchInput.value.trim();
        loadJobs({ search: searchTerm });
    });

    // 筛选功能
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            const filters = {};

            // 城市筛选
            const cityCheckboxes = document.querySelectorAll('input[name="city"]:checked');
            if (cityCheckboxes.length > 0) {
                filters.city = cityCheckboxes[0].value;
            }

            // 分类筛选
            const categoryCheckboxes = document.querySelectorAll('input[name="category"]:checked');
            if (categoryCheckboxes.length > 0) {
                filters.category = categoryCheckboxes[0].value;
            }

            loadJobs(filters);
        });
    });

    // 重置筛选
    resetBtn.addEventListener('click', function () {
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
        loadJobs();
    });

    // 初始加载
    loadJobs();
});