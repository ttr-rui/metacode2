// 模拟职位列表数据
const jobList = [
    {
        title: "产品运营-鸣潮",
        location: "广州",
        category: "运营类",
        description: "1、跟进鸣潮的整体测试验证流程，组织多种形式的玩家测试、获取玩家反馈，最终输出优化建议和方案并跟进落地；2、负责各模块玩法设计相关的专题调查与研究，运用数据、调研等手段完成专题报告，配合策划跟进产品迭代；3、跟进游戏版本内容，为对应负责的游戏玩法、功能体验负责，并根据对应需求落实日常的具体运营工作；",
        tags: ["运营", "数据分析", "用户调研"]
    },
    {
        title: "游戏交互设计师-战双",
        location: "广州",
        category: "美术类",
        description: "1、负责游戏产品交互方案的原型、流程、概念设计工作，并为最终的体验和效果负责；2、与UI、策划和程序团队密切合作，提供优秀的交互设计方案，保证产品的易用性和情感体验；3、体验分析现有游戏，结合数据及用户反馈，持续优化并推动优化方案落地；4、制作临时界面，维护周版本运行。",
        tags: ["交互设计", "UI设计", "用户体验"]
    },
    {
        title: "数据运营-战双",
        location: "广州",
        category: "运营类",
        description: "1、搭建并完善游戏数据分析体系，为项目长线运营提供数据支持；2、负责游戏线上内容数据分析，为游戏迭代调优提供数据支持，包括但不限于：活动分析、玩家行为分析、游戏生态分析、商业化分析等；3、负责游戏数据平台搭建与优化，包括但不限于：数据监控分析体系、数据治理、用户画像搭建等。",
        tags: ["数据分析", "运营优化", "数据挖掘"]
    },
    {
        title: "英区游戏运营-鸣潮",
        location: "广州",
        category: "运营类",
        description: "1、负责协助鸣潮英语地区的海外运营工作，包括线上舆情监控、各渠道反馈整理提炼、发行内容审核等；2、负责运营团队与研发本地化团队对接，保证运营物料的本地化推进和基础的LQA；3、参与熟悉的海外区域的玩家动态跟踪，根据自己的理解提出海外区域的改进建议。",
        tags: ["海外运营", "本地化", "玩家关系"]
    },
    {
        title: "视频策划-战双",
        location: "广州",
        category: "视频类",
        description: "1、参与游戏版本内容推广、品宣视频等作品创意构思、文案撰写、落地跟进；2、深入理解负责项目的游戏设定、基础世界观，并配合完成物料脚本细化、素材整合。",
        tags: ["视频制作", "创意策划", "内容营销"]
    },
    {
        title: "德语社媒营销-鸣潮",
        location: "广州",
        category: "营销类",
        description: "1、协助项目在德语地区的社媒运营，能策划与落地德语地区的社媒宣传方案，协助处理团队内部德语翻译需求；2、对社媒矩阵的增长及维护负责，能够根据社区整体内容策略规划德语社区内容，并且根据数据变化调整内容产出策略；3、协助欧洲区和全球创作者生态建立及维护，保证良好的二创氛围和产出；4、协助其他全球性质的社媒内容。",
        tags: ["社交媒体", "内容营销", "德语"]
    },
    {
        title: "西语社媒营销-鸣潮",
        location: "广州",
        category: "营销类",
        description: "1、协助项目在西语地区的社媒运营，能策划与落地西语地区的社媒宣传方案，协助处理团队内部西语翻译需求；2、对社媒矩阵的增长及维护负责，能够根据社区整体内容策略规划西语社区内容，并且根据数据变化调整内容产出策略；3、协助欧洲区和全球创作者生态建立及维护，保证良好的二创氛围和产出；4、协助其他全球性质的社媒内容。",
        tags: ["社交媒体", "内容营销", "西语"]
    },
    {
        title: "韩国品牌营销-鸣潮",
        location: "广州",
        category: "营销类",
        description: "1、制定并执行韩国市场品牌营销活动，包括异业联动、展会、线下活动策划，PR沟通及KOL营销。负责韩国地区市场推广；2、协调内部跨部门沟通，确保推广与产品节奏一致；充分调动内部资源，保证高质量上线，并跟踪产品效果；3、实施韩国市场营销计划，监测效果指标并进行及时优化，对推广成果负责；4、开展深入竞品分析和市场调研，洞察行业趋势和用户需求，发掘潜在机会；5、独立创作韩语推广文案，包括但不限于产品描述、新闻稿等。",
        tags: ["品牌营销", "活动策划", "韩语"]
    },
    {
        title: "游戏技术美术工程师",
        location: "广州",
        category: "美术类",
        description: "1、将各种美术和策划要求的表现转换为技术方案，如开发角色管线、场景管线、后处理等材质；2、负责协调美术和程序的工作，沟通交流美术需求并跟进落地效果；3、参与美术制作管线开发，提高项目上限和产能；4、负责美术工作流程和标准制定，输出制作文档，提升美术工作效率。",
        tags: ["技术美术", "管线开发", "美术流程"]
    },
    {
        title: "游戏图形工程师",
        location: "广州",
        category: "技术类",
        description: "1、负责进行渲染管线层的改造与定制，负责多平台渲染效果的开发和性能优化；2、负责图形效果的开发和流程工具开发，提升项目美术表现品质和提升美术制作效率；3、负责每周版本的美术表现 bug 修复和性能分析，和 QA 一起维护效果和性能稳定；4、负责各平台机型的兼容性维护和平台 API 如 Metal 、 Vulkan 、 DX12 等功能开发。",
        tags: ["图形渲染", "性能优化", "跨平台开发"]
    }
];

// 渲染职位列表
function renderJobList() {
    const jobListContainer = document.getElementById('jobList');
    jobListContainer.innerHTML = '';

    jobList.forEach(job => {
        const jobItem = document.createElement('div');
        jobItem.className = 'job-item';

        const jobTags = job.tags.map(tag => `<span class="job-tag">${tag}</span>`).join('');

        jobItem.innerHTML = `
                    <div class="job-info">
                        <h3>${job.title}</h3>
                        <div class="job-meta">${job.location} | ${job.category}</div>
                        <div class="job-description">${job.description}</div>
                        <div class="job-tags">
                            ${jobTags}
                        </div>
                    </div>
                    <button class="job-action">查看详情</button>
                `;

        jobListContainer.appendChild(jobItem);
    });


    //  点击事件
    document.querySelectorAll('.job-action').forEach(btn => {
        btn.addEventListener('click', function () {
            window.location.href = '../HTML/job-detail.html';
            showLoginModal();
        });
    });
}

// 显示登录模态框
function showLoginModal() {
    document.getElementById('loginModal').style.display = 'flex';
}

// 隐藏登录模态框
function hideLoginModal() {
    document.getElementById('loginModal').style.display = 'none';
}

// 显示注册模态框
function showRegisterModal() {
    document.getElementById('registerModal').style.display = 'flex';
}

// 隐藏注册模态框
function hideRegisterModal() {
    document.getElementById('registerModal').style.display = 'none';
}

// 初始化页面
function initPage() {
    renderJobList();
    document.getElementById('loginBtn').addEventListener('click', showLoginModal);
    document.getElementById('closeModal').addEventListener('click', hideLoginModal);
    document.getElementById('closeRegisterModal').addEventListener('click', hideRegisterModal);
    document.getElementById('showRegisterLink').addEventListener('click', function (e) {
        e.preventDefault();
        hideLoginModal();
        showRegisterModal();
    });
    document.getElementById('showLoginLink').addEventListener('click', function (e) {
        e.preventDefault();
        hideRegisterModal();
        showLoginModal();
    });
}


// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', initPage);
