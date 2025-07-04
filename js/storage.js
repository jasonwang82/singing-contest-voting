class VotingSystem {
    constructor() {
        this.contestants = [];
        this.voterVotes = JSON.parse(localStorage.getItem('voterVotes')) || {};
        this.loadContestants();
        this.updateVoteCounts(); // 初始化时更新票数
    }

    // 加载选手信息
    async loadContestants() {
        // 参赛者名单
        const contestantsList = [
            "张三 我的中国心",
            "王五"  // 没有填写歌曲
        ];

        this.contestants = contestantsList
            .map(line => line.trim())
            .filter(line => line) // 过滤空行
            .map(line => {
                const parts = line.split(/\s+/);
                return {
                    id: this.generateId(parts[0]), // 使用名字生成固定ID
                    name: parts[0],
                    song: parts.slice(1).join(' ') || '未指定',
                    votes: 0
                };
            });
        
        this.updateVoteCounts(); // 加载选手后更新票数
    }

    // 更新所有选手的票数
    updateVoteCounts() {
        // 重置所有选手的票数
        this.contestants.forEach(contestant => {
            contestant.votes = 0;
        });

        // 重新计算每个选手的票数
        Object.values(this.voterVotes).forEach(votes => {
            votes.forEach(contestantId => {
                const contestant = this.contestants.find(c => c.id === contestantId);
                if (contestant) {
                    contestant.votes++;
                }
            });
        });
    }

    // 使用名字生成固定ID
    generateId(name) {
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            const char = name.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        return 'contestant_' + Math.abs(hash).toString(36);
    }

    // 获取所有参赛者
    async getContestants() {
        return this.contestants;
    }

    // 投票
    async vote(voterId, contestantId) {
        // 检查投票者是否已投过这个参赛者
        if (this.hasVotedFor(voterId, contestantId)) {
            throw new Error('您已经给这位选手投过票了！');
        }

        // 检查投票者是否还有剩余票数
        if (this.getRemainingVotes(voterId) <= 0) {
            throw new Error('您已经没有剩余票数了！');
        }

        // 检查选手是否存在
        const contestant = this.contestants.find(c => c.id === contestantId);
        if (!contestant) {
            throw new Error('选手不存在！');
        }

        // 初始化投票者的投票记录
        if (!this.voterVotes[voterId]) {
            this.voterVotes[voterId] = [];
        }

        // 记录投票
        this.voterVotes[voterId].push(contestantId);
        
        // 更新所有选手的票数
        this.updateVoteCounts();

        // 保存投票数据
        this.saveVotes();
    }

    // 检查是否投过某参赛者
    hasVotedFor(voterId, contestantId) {
        return this.voterVotes[voterId] && this.voterVotes[voterId].includes(contestantId);
    }

    // 获取剩余票数
    getRemainingVotes(voterId) {
        const maxVotes = 3;
        const usedVotes = this.voterVotes[voterId] ? this.voterVotes[voterId].length : 0;
        return maxVotes - usedVotes;
    }

    // 保存投票数据
    saveVotes() {
        localStorage.setItem('voterVotes', JSON.stringify(this.voterVotes));
    }

    // 获取排名结果
    async getResults() {
        return [...this.contestants].sort((a, b) => b.votes - a.votes);
    }

    // 获取前三名
    async getTopThree() {
        const results = await this.getResults();
        return results.slice(0, 3);
    }

    // 重置所有投票数据
    resetVotes() {
        localStorage.removeItem('voterVotes');
        this.voterVotes = {};
        this.updateVoteCounts(); // 重置后更新票数
    }
}

// 创建全局实例
const votingSystem = new VotingSystem(); 