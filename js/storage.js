class VotingSystem {
    constructor() {
        this.contestants = [];
        this.votes = JSON.parse(localStorage.getItem('votes')) || {};
        this.voterVotes = JSON.parse(localStorage.getItem('voterVotes')) || {};
        this.loadContestants();
    }

    // 从song.txt加载选手信息
    async loadContestants() {
        try {
            const response = await fetch('song.txt');
            if (!response.ok) {
                throw new Error('无法加载选手名单文件');
            }
            const text = await response.text();
            this.contestants = text.split('\n')
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
            
            // 恢复已有的投票数
            this.contestants.forEach(contestant => {
                contestant.votes = this.getVotesForContestant(contestant.id);
            });
        } catch (error) {
            console.error('加载选手名单失败:', error);
            this.contestants = [];
        }
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

    // 获取选手的投票数
    getVotesForContestant(contestantId) {
        let votes = 0;
        Object.values(this.voterVotes).forEach(voterVotes => {
            votes += voterVotes.filter(id => id === contestantId).length;
        });
        return votes;
    }

    // 获取所有参赛者
    async getContestants() {
        if (this.contestants.length === 0) {
            await this.loadContestants();
        }
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
        await this.getContestants();
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
        
        // 更新参赛者票数
        contestant.votes = this.getVotesForContestant(contestantId);

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
        await this.getContestants();
        return [...this.contestants].sort((a, b) => b.votes - a.votes);
    }

    // 获取前三名
    async getTopThree() {
        const results = await this.getResults();
        return results.slice(0, 3);
    }

    // 重置所有投票数据
    resetVotes() {
        localStorage.removeItem('votes');
        localStorage.removeItem('voterVotes');
        this.votes = {};
        this.voterVotes = {};
        this.contestants.forEach(contestant => {
            contestant.votes = 0;
        });
    }
}

// 创建全局实例
const votingSystem = new VotingSystem(); 