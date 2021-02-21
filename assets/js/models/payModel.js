class payModel{
    
    constructor(pay,Outstanding){
        this.pay = pay;
        this.Outstanding= Outstanding;
    }

    setPay(pay){
        this.pay = pay;
    }
    getPay(){
        return this.pay;
    }

    setOutstanding(Outstanding){
        this.Outstanding = Outstanding;
    }
    getOutstanding(){
        return this.Outstanding;
    }
}

export default payModel;