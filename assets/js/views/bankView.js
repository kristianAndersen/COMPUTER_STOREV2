const bbalance = document.querySelector('#bankbalance');
const bLoan = document.querySelector('#bankLoan');
const bTotal = document.querySelector('#bankTotal');
const rploanBtn = document.getElementById('repayloanbtn');


class bankView{
    constructor(){
        this.presenter = null;
    }

    registerWith(presenter){
        this.presenter = presenter;
    }

    displayError(){
        console.log("aaaaargh");
    }

    displayBalanceUpdate(value){
        bbalance.innerHTML=value;
        
    }
    
    displayLoanUpdate(value){
        bLoan.innerHTML=value;

        if(value==0){

            rploanBtn.style="display: none"
         }else{
            rploanBtn.style="display: inline"
         }
        

         
     }

     displayTotalUpdate(value){
        bTotal.innerHTML=value;
         
     }

    changeBalance(balance){
        this.presenter.changeBalance(balance);
    }
    minusBalance(balance){
        this.presenter.minusBalance(balance);
    }

    approveLoan(loanAmount){
        this.presenter.approveLoan(loanAmount);
    }
    payOffLoan(Amount){
        this.presenter.payOffLoan(Amount);
    }
    

}

export default bankView;