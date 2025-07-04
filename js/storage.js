class VotingSystem {
    constructor() {
        this.contestants = JSON.parse(localStorage.getItem('contestants')) || [];
        this.votes = JSON.parse(localStorage.getItem('votes')) || {};
        this.voterVotes = JSON.parse(localStorage.getItem('voterVotes')) || {};
    }

    // 添加参赛者
    addContestant(name, song) {
        const contestant = {
            id: Date.now().toString(),
            name: name,
            song: song,
            votes: 0
        };
        this.contestants.push(contestant);
        this.saveContestants();
        return contestant;
    }

    // 保存参赛者信息
    saveContestants() {
        localStorage.setItem('contestants', JSON.stringify(this.contestants));
    }

    // 获取所有参赛者
    getContestants() {
        return this.contestants;
    }

    // 投票
    vote(voterId, contestantId) {
        // 检查投票者是否已投过这个参赛者
        if (this.hasVotedFor(voterId, contestantId)) {
            throw new Error('您已经给这位选手投过票了！');
        }

        // 检查投票者是否还有剩余票数
        if (this.getRemainingVotes(voterId) <= 0) {
            throw new Error('您已经没有剩余票数了！');
        }

        // 初始化投票者的投票记录
        if (!this.voterVotes[voterId]) {
            this.voterVotes[voterId] = [];
        }

        // 记录投票
        this.voterVotes[voterId].push(contestantId);
        
        // 更新参赛者票数
        const contestant = this.contestants.find(c => c.id === contestantId);
        if (contestant) {
            contestant.votes = (contestant.votes || 0) + 1;
        }

        // 保存数据
        this.saveVotes();
        this.saveContestants();
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
    getResults() {
        return [...this.contestants].sort((a, b) => (b.votes || 0) - (a.votes || 0));
    }

    // 获取前三名
    getTopThree() {
        return this.getResults().slice(0, 3);
    }

    // 重置所有数据
    resetAll() {
        localStorage.removeItem('contestants');
        localStorage.removeItem('votes');
        localStorage.removeItem('voterVotes');
        this.contestants = [];
        this.votes = {};
        this.voterVotes = {};
    }
}

// 创建全局实例
const votingSystem = new VotingSystem(); 