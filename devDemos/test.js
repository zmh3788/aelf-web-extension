/**
 * @file test.js
 * @author huangzongzhe
 */
/* globals NightElf */
console.log(Date.now());

let nightElfInstance = null;
class NightElfCheck {
    constructor() {
        let resovleTemp = null;
        this.check = new Promise((resolve, reject) => {
            if (window.NightElf) {
                resolve(true);
            }
            setTimeout(() => {
                reject({
                    error: 200001,
                    message: 'timeout'
                });
            }, 3000);
            resovleTemp = resolve;
        });
        document.addEventListener('NightElf', result => {
            resovleTemp(true);
        });
    }
    static getInstance() {
        if (!nightElfInstance) {
            nightElfInstance = new NightElfCheck();
            return nightElfInstance;
        }
        return nightElfInstance;
    }
}
const a = NightElfCheck.getInstance();
const b = NightElfCheck.getInstance();
console.log(a === b);
a.check.then(item => {
    console.log('aci: ', item, 'NightElf is Ready!');
}).catch(error => {
    console.log('actc: ', error, 'loading NightElf timeout');
});
b.check.then(item => {
    console.log('bci: ', item);
}).catch(error => {
    console.log('bctc: ', error);
});
// function nightElfCheck() {
//     this.listener = null;
//     const resovleTemp = null;
//     const nightElfCheck = new Promise((resolve, reject) => {
//         if (window.NightElf) {
//             resolve(true);
//         }
//         setTimeout(() => {
//             reject({
//                 error: 200001,
//                 message: 'timeout'
//             });
//         }, 3000);
//         resovleTemp = resolve;
//     });

//     this.listener = document.addEventListener('NightElf', result => {
//         resovleTemp(true);
//     });
// }


// const httpProvider = 'http://localhost:1234/chain';
const httpProvider = 'http://192.168.197.70:8001/chain';
console.log('window.NightElf: ', window.NightElf);
document.addEventListener('NightElf', result => {

    console.log(Date.now());

    console.log('NightElf test.html: ', result);
    const connectChainBtn = document.getElementById('connect-chain');
    const callAelfChainBtn = document.getElementById('call-aelf-chain');
    const openPrompt = document.getElementById('open-prompt');
    const initAelfContract = document.getElementById('init-aelf-contract');
    const callAelfContract = document.getElementById('call-aelf-contract');
    const checkPermissionDefault = document.getElementById('check-permission-default');
    const checkPermissionAddress = document.getElementById('check-permission-address');
    const checkPermissionContractAddress = document.getElementById('check-permission-contract');
    const getAddress = document.getElementById('get-address');

    const checkContent = document.getElementById('check-content');
    checkContent.onclick = function () {
        NightElf.api({
            appName: 'hzzTest',
            method: 'CHECK_CONTENT'
        }).then(result => {
            console.log('>>>>>>>>>>>>>>>>>>>', result);
        });
    };

    connectChainBtn.onclick = function () {
        NightElf.api({
            appName: 'hzzTest',
            method: 'CONNECT_AELF_CHAIN',
            hostname: 'aelf.io', // TODO: 这个需要content.js 主动获取
            payload: {
                httpProvider
            }
        }).then(result => {
            console.log('>>>>>>>>>>>>>>>>>>>', result);
        });
    };

    callAelfChainBtn.onclick = function () {
        NightElf.api({
            appName: 'hzzTest',
            method: 'CALL_AELF_CHAIN',
            chainId: 'AELF',
            payload: {
                method: 'getTxResult',
                params: ['5feb4d3175b4144e54f5f4d0a12b19559633a2aede0e87dc42322efe1aac12c9']
            }
        }).then(result => {
            console.log('>>>>>>>>>>>>>>>>>>>', result);
        });
    };

    const getBlockInfo = document.getElementById('get-block-info');
    getBlockInfo.onclick = function () {
        NightElf.api({
            appName: 'hzzTest',
            method: 'CALL_AELF_CHAIN',
            chainId: 'AELF',
            payload: {
                method: 'getBlockInfo',
                params: [233, true]
                // This one will throw error.
                // params: [233]
            }
        }).then(result => {
            console.log('>>>>>>>>>>>>>>>>>>>', result);
        });
    };

    // 如果定义了需要N个参数，那么需要传入N个参数，没有的必须传入默认值。
    // If you define N params, must input N params.
    const getBlockInfoFail = document.getElementById('get-block-info-fail');
    getBlockInfoFail.onclick = function () {
        NightElf.api({
            appName: 'hzzTest',
            method: 'CALL_AELF_CHAIN',
            chainId: 'AELF',
            payload: {
                method: 'getBlockInfo',
                params: [233]
            }
        }).then(result => {
            console.log('>>>>>>>>>>>>>>>>>>>', result);
        });
    };

    const sendTransaction = document.getElementById('send-transation');
    sendTransaction.onclick = function () {
        NightElf.api({
            appName: 'hzzTest',
            method: 'CALL_AELF_CHAIN',
            chainId: 'AELF',
            payload: {
                method: 'sendTransaction',
                params: [{}]
                // This one will throw error.
                // params: [233]
            }
        }).then(result => {
            console.log('>>>>>>>>>>>>>>>>>>>', result);
        });
    };

    openPrompt.onclick = function () {
        NightElf.api({
            appName: 'hzzTest',
            method: 'OPEN_PROMPT',
            chainId: 'AELF',
            hostname: 'aelf.io',
            payload: {
                method: 'SET_PERMISSION',
                // 在中间层会补齐
                // appName: 'hzzTest',
                // method 使用payload的
                // chainId: 'AELF',
                // hostname: 'aelf.io',
                payload: {
                    // appName: message.appName,
                    // domain: message.hostname
                    address: 'ELF_4yCJfobjm2YAdxGrwACQihpa3TMz1prDTdYiWTvFTvefQFs',
                    contracts: [{
                        chainId: 'AELF',
                        contractAddress: 'ELF_4Qna4KWEr9XyxewGNHku1gwUvqtfsARSHcwjd3WXBpLw9Yx',
                        contractName: 'token',
                        description: 'token contract'
                    }, {
                        chainId: 'AELF TEST',
                        contractAddress: 'TEST contractAddress',
                        contractName: 'TEST contractName',
                        description: 'contract description'
                    }]
                }
            }
        }).then(result => {
            console.log('>>>>>>>>>>>>>>>>>>>', result);
        });
    };

    initAelfContract.onclick = function () {
        NightElf.api({
            appName: 'hzzTest',
            method: 'INIT_AELF_CONTRACT',
            // hostname: 'aelf.io',
            chainId: 'AELF',
            payload: {
                address: 'ELF_4WBgSL2fSem9ABD4LLZBpwP8eEymVSS1AyTBCqXjt5cfxXK',
                contractName: 'token',
                contractAddress: 'ELF_4Qna4KWEr9XyxewGNHku1gwUvqtfsARSHcwjd3WXBpLw9Yx'
            }
        }).then(result => {
            console.log('>>>>>>>>>>>>>>>>>>>', result);
        });
    };

    callAelfContract.onclick = function () {
        NightElf.api({
            appName: 'hzzTest',
            method: 'CALL_AELF_CONTRACT',
            hostname: 'aelf.io',
            chainId: 'AELF',
            payload: {
                contractName: 'token',
                method: 'BalanceOf',
                params: ['ELF_2rAp1aiE3VMwR6SEx5dJYR2Sh8NHsJ2euJoxNaT7uF7XfeB']
            }
        }).then(result => {
            console.log('>>>>>>>>>>>>>>>>>>>', result);
        });
    };

    checkPermissionDefault.onclick = function () {
        NightElf.api({
            appName: 'hzzTest',
            method: 'CHECK_PERMISSION',
            address: 'ELF_4WBgSL2fSem9ABD4LLZBpwP8eEymVSS1AyTBCqXjt5cfxXK'
        }).then(result => {
            console.log('>>>>>>>>>>>>>>>>>>>', result);
        });
    };

    checkPermissionAddress.onclick = function () {
        NightElf.api({
            appName: 'hzzTest',
            method: 'CHECK_PERMISSION',
            type: 'address', // if you did not set type, it aways get by domain.
            address: 'ELF_4WBgSL2fSem9ABD4LLZBpwP8eEymVSS1AyTBCqXjt5cfxXK'
        }).then(result => {
            console.log('>>>>>>>>>>>>>>>>>>>', result);
        });
    };

    checkPermissionContractAddress.onclick = function () {
        NightElf.api({
            appName: 'hzzTest',
            method: 'CHECK_PERMISSION',
            type: 'contract', // if you did not set type, it aways get by domain.
            contractAddress: 'ELF_4Qna4KWEr9XyxewGNHku1gwUvqtfsARSHcwjd3WXBpLw9Yx'
        }).then(result => {
            console.log('>>>>>>>>>>>>>>>>>>>', result);
        });
    };

    getAddress.onclick = function () {
        NightElf.api({
            appName: 'hzzTest',
            method: 'GET_ADDRESS'
        }).then(result => {
            console.log('>>>>>>>>>>>>>>>>>>>', result);
        });
    };

    const illegalMethod = document.getElementById('error-illegal-method');
    illegalMethod.onclick = function () {
        NightElf.api({
            appName: 'hzzTest',
            method: 'GET_ADDRESS233'
        }).then(result => {
            console.log('>>>>>>>>>>>>>>>>>>>', result);
        });
    };

    const tokenMissingParam = document.getElementById('error-token-missing-param');
    tokenMissingParam.onclick = function () {
        NightElf.api({
            appName: 'hzzTest',
            method: 'CALL_AELF_CONTRACT',
            chainId: 'AELF',
            payload: {
                contractName: 'token',
                method: 'BalanceOf',
                params: []
            }
        }).then(result => {
            console.log('>>>>>>>>>>>>>>>>>>>', result);
        });
    };
});