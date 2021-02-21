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

    changeBalance(balance){
      
        this.model.setBalance(this.model.getBalance()+balance); 
        this.model.setTotal(this.model.getBalance())
        this.view.displayBalanceUpdate(this.model.getBalance());
        this.view.displayTotalUpdate(this.model.getTotal())
        
    }

    minusBalance(balance){
      
        this.model.setBalance( this.model.getBalance()-balance ); 
        this.model.setTotal(this.model.getBalance())

        this.view.displayBalanceUpdate(this.model.getBalance());
        this.view.displayTotalUpdate(this.model.getTotal())
        
    }

    approveLoan(loanAmount){

        this.model.setLoan(loanAmount); 
        this.model.setTotal(this.model.getLoan()+this.model.getBalance())
        this.view.displayLoanUpdate(this.model.getLoan());
        this.view.displayTotalUpdate(this.model.getTotal())
    }

    payOffLoan(Amount){

        this.model.setLoan(Amount); 
        this.view.displayLoanUpdate(this.model.getLoan());
        this.view.displayTotalUpdate(Amount+this.model.getTotal())
    }
 
}
export default payPresenter;