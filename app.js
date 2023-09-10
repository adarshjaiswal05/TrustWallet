
// import Web3Modal from "web3modal";
// import WalletConnectProvider from "@walletconnect/web3-provider";
// import WalletLink from "walletlink";

const Web3Modal = window.Web3Modal.default;
const WalletConnectProvider = window.WalletConnectProvider.default;
const EvmChains = window.EvmChains;
const Fortmatic = window.Fortmatic
let customProvoider;

const providerOptions = {

	binancechainwallet: {
		package: true
	},
	walletconnect: {
		package: WalletConnectProvider,
		options: {
			rpc: {
				137: "https://polygon-rpc.com",
				97: "https://data-seed-prebsc-1-s1.binance.org:8545/",
				56: "https://bsc-dataseed.binance.org/",
			},
			infuraId: "cd9840c963b54d63b5adaea7eb66d8ac"

		}
	},
};


let web3Modal = new Web3Modal({
	cacheProvider: false,	
	providerOptions,
	disableInjectedProvider: false
});

async function connectwallet() {

	try {
		console.log("Try block");
		let provider = await web3Modal.connect();
		customProvoider=provider;

	
		console.log(provider)
		

		var web3 = new Web3(provider);

		var accounts = await web3.eth.getAccounts();
		let account = accounts[0];
		console.log(account)

		 await web3.eth.getBalance(account).then(function(amount){
			console.log(amount)
			userBalance.innerText= ("conncted account balance is-> " +amount +" wei");

		});


		window.w3 = web3
		web3.eth.getChainId().then(function(Id){
			console.log(Id)
			userNetwork.innerText= ("conncted Network is-> " +Id);
			

		})

		
		userWallet.innerText = ("conncted account is-> " +account);

	}
	catch (error) {
		console.log(error);
		return;

	}



	// document.getElementById('wallet-address').textContent = account; 
	// contract = new web3.eth.Contract(ABI, ADDRESS);
}

async function disconnect () {
	try{
	await customProvoider.disconnect()}
	catch(error){
	  console.log(error)
	}
  }