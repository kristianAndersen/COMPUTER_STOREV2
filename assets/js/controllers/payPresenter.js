class payPresenter{
    constructor(view){
        this.view = view;
        this.model = null;
    }

    setModel(model){
        this.model= model;
    }

    getView(){
        return this.view;
    }

    changePay(pay){

            let curpay=this.model.getPay(); 
            this.model.setPay(pay+curpay); 
            this.view.displayPayUpdate(this.model.getPay());
        
    }

    transferPay(amount){

        let totransfer= this.model.getPay()-amount;
        this.model.setPay(totransfer); 
        this.view.displayPayUpdate(this.model.getPay());

    }
 
}
export default payPresenter;