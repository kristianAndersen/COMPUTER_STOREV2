
import payModel from './models/payModel.js';
import payView from './views/payView.js'
import payPresenter from './controllers/payPresenter.js'
import bankModel from './models/bankModel.js'
import bankView from './views/bankView.js'
import bankPresenter from './controllers/bankPresenter.js'

document.addEventListener('DOMContentLoaded', function () {
    let dataObj={};
    let curlaptop=0;
    const laptoplist = document.getElementById('someList')
    const datafeat = document.querySelectorAll("[data-feat]");
    const features = document.getElementById("features");
    const selectLaptop = document.getElementById("laptops");
    
    const buyit = document.getElementById('buyit')
    
    //work
    const workBtn = document.getElementById('workbtn');
    const bankBtn = document.getElementById('bankbtn');
    const rploanBtn = document.getElementById('repayloanbtn');
    //bank
    const loanBtn = document.getElementById('loanbtn');

    //   
    buyit.addEventListener('click', buyLaptop, false)

    //work
    workBtn.addEventListener('click', getPayedForWork);
    bankBtn.addEventListener("click", transferToBank);
    rploanBtn.addEventListener("click", repayLoanToBank);

    //bank
    loanBtn.addEventListener("click", getLoan);
  



    const bModel = new bankModel(0, 0, 0)
    const bview = new bankView()
    const bpresenter = new bankPresenter(bview)
    bpresenter.setModel(bModel)
    bview.registerWith(bpresenter)


    const model = new payModel(0, 0)
    const view = new payView()
    const presenter = new payPresenter(view)
    presenter.setModel(model)
    view.registerWith(presenter)


    //laptop slider
    async function fetchMoviesJSON() {
        try {
        const response = await fetch('/assets/data/laptop.json');
        const data = await response.json();
        return data;
    } catch (e) {
        console.error(e);
    } finally {
        console.log('We do cleanup here');
    }
    }

    fetchMoviesJSON().then(data => {
        dataObj=data;
        laptopSlide(dataObj)
    });
   
    function laptopSlide(data) {

        for (let i = 0; i < data.length; i++) {


            let name = data[i].name;
            let feature = data[i].feature;
            let description = data[i].description;
            let price = data[i].price;
            let image = data[i].image;
            
            datafeat[i].setAttribute('data-feat', feature);

            let template = `<div class="item" id="laptop${i}">
                            <img src="/assets/images/${image}.png" class="imgc">
                            <h4 class="itemheading">${name}</h4>
                            <p class="itemdesc">${description}</p>
                            <p>Price:  <span id="laptopPrice">${price}</span> kr.</p>
                            </div>`

            laptoplist.innerHTML += template;
        }

        setFeatureDesc()
    }

    /**Select a laptop from the dropdown */
    selectLaptop.addEventListener("change", laptopitem, false);
    function laptopitem(e) {
        let num = e.currentTarget.value;g
        curlaptop=num;
        setFeatureDesc(num)
    }
  /**Set the feature text */
    function setFeatureDesc(num = 0) {
        features.innerHTML ="features : "+ datafeat[num].getAttribute('data-feat');
        document.querySelector('#laptop' + num).scrollIntoView({ behavior: 'smooth' });
    }

 







    function getPayedForWork() {
        const workPay = 100;
        presenter.getView().changePay(workPay)

    }

    function transferToBank() {

        let toTransfer = model.getPay();
        let transferTolan = (10 / 100) * toTransfer;

            //transfer all you got
        if (bModel.getLoan() == 0) {
            bpresenter.getView().changeBalance(toTransfer)
            presenter.getView().transferPay(toTransfer)
          
        }else{
            //you got a loan so you have to pay it back bit by bit
            bpresenter.getView().payOffLoan(clamp(bModel.getLoan()-transferTolan, 0, bModel.getLoan()) )
            bpresenter.getView().changeBalance(toTransfer - transferTolan)
            presenter.getView().transferPay(model.getPay())
   
        }
    }

    //repay the loan in full
    function repayLoanToBank() {
     
        //Do you even loan bro...
        if (bModel.getLoan() > 0) {
          
            if (model.getPay() > bModel.getLoan() ) {
          
                do {
                    
                    let toTransfer = model.getPay() - bModel.getLoan() ;
                    bpresenter.getView().payOffLoan(clamp(bModel.getLoan() - toTransfer, 0, bModel.getLoan()) )
                    presenter.getView().transferPay(toTransfer)
                                 
                    
                } while (bModel.getLoan() > 0);

            }

        }

    }


    function getLoan() {
        const currentBalance = bModel.getBalance();
        const maxLoanLimit = currentBalance * 2;

        //No bank lends you money if you do not got none
        if (currentBalance == 0) {
            alert("Sorry we do not lend money to poore people")
            return;
        }

        let promt = parseInt(prompt("How much would you like to loan?"), 0);

        //Put a cap on the credit line if user already has a loan
        if ((maxLoanLimit - maxLoanLimit / 2) < bModel.getLoan()) {
            let alertStr = "You already have a loan of " + bModel.getLoan() + "kr. any more would excites your line of credit"
            alert(alertStr);
            return null;
        }

        //if the loan request is to big we offer a loan that match users credit
        if (promt > maxLoanLimit) {
            let alertStr = `That is a bit steap we can only loan you ${maxLoanLimit}`;
            if (confirm(alertStr)) {

                bpresenter.getView().approveLoan(maxLoanLimit)

            }
            return null;
        }

        // if all is fine and dandy then process the loan
        if (currentBalance != 0 && promt <= maxLoanLimit) {
            bpresenter.getView().approveLoan(promt)
            return null;
        }


    }



//buy 
function buyLaptop() {
     
    const laptopPrice= dataObj[curlaptop].price
    console.log(laptopPrice+" "+bModel.getTotal())
    
    if(bModel.getTotal()>=laptopPrice){

        bpresenter.getView().minusBalance(laptopPrice )
              
        alert("The new "+dataObj[curlaptop].name+" is on its way to you")
      
        return;
    }

    alert("Sorry we do no conduct buiness with poore people")
    return;

   
}


   /**no bank ows a normal customer money so i better  
     * prevent the loan going nigative  
      */
    function clamp(val, min, max) {
        return val > max ? max : val < min ? min : val;
    }

})
