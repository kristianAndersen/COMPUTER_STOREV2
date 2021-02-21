class bankModel{
    constructor(balance,loan,total){
        this.balance=balance;
        this.loan = loan;
        this.total= total;
    }

    setBalance(balance){
        this.balance = balance;
    }
    getBalance(){
        return this.balance;
    }

    setLoan(loan){
        this.loan = loan;
    }
    getLoan(){
        return this.loan;
    }

    setTotal(total){
        this.total = total;
    }
    getTotal(){
        return this.total;
    }
}

export default bankModel;