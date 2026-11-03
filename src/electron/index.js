const { powerSaveBlocker } = require('electron');

let blockerId = null;

function isActive () {
    return blockerId !== null && powerSaveBlocker.isStarted(blockerId);
}

module.exports = {
    keepAwake: function () {
        if (!isActive()) {
            blockerId = powerSaveBlocker.start('prevent-display-sleep');
        }
        return 'OK';
    },

    allowSleepAgain: function () {
        if (isActive()) {
            powerSaveBlocker.stop(blockerId);
        }
        blockerId = null;
        return 'OK';
    }
};
