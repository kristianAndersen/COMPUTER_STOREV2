const payfromwork = document.querySelector('#payfromwork');

class payView{
    constructor(){
        this.presenter = null;
    }

    registerWith(presenter){
        this.presenter = presenter;
    }

    displayError(){
        console.log("aaaaargh");
    }

    displayPayUpdate(value){
        payfromwork.innerHTML=value;
        
    }

    changePay(pay){
        this.presenter.changePay(pay);
    }

    transferPay(amount){
        this.presenter.transferPay(amount);
    }

}

export default payView;