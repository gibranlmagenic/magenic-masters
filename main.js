const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv

class Bank {
    constructor (loanamount, interestrate) {
      this.loanamount = loanamount;
      this.interestrate = interestrate;
    }

    getMonthlyInstallment (loanterm) {
      let totalrate = this.interestrate * loanterm;
      let totalinterest = (totalrate/100)*this.loanamount;
      let totalamount = totalinterest+this.loanamount;
      let monthlyinstall = totalamount/loanterm;

      return monthlyinstall;
    }
    
}

class Metrobank extends Bank{
    constructor (loanamount, interestrate) {
      super(loanamount, interestrate);
      this.interestrate = 1.5;
    }
}

class BPI extends Bank{
    constructor (loanamount, interestrate) {
      super(loanamount, interestrate);
      this.interestrate = 1.2;
    }
}

class BDO extends Bank{
    constructor (loanamount, interestrate) {
      super(loanamount, interestrate);
      this.interestrate = 1.7;
    }
}

class LoanCalculator{
    constructor(bankname, loanamount, loanterm) {
        this.bankname = bankname;
        this.loanamount = loanamount;
        this.loanterm = loanterm;
    }

    getBankclass (bankname) {
      if(typeof bankname === 'string' ) {
        if(bankname.toUpperCase() === 'METROBANK') {
          const metrobank = new Metrobank(this.loanamount);
          return metrobank;
        } else if(bankname.toUpperCase() === 'BPI') {
          const bpi = new BPI(this.loanamount);
          return bpi;
        } else if(bankname.toUpperCase() === 'BDO') {
          const bdo = new BDO(this.loanamount);
          return bdo;
        } else {
          console.log(`Invalid input. Re-run program.`);
        }
      }
    }

    getMonthlyInstallment () {

      let bankinput = this.getBankclass(this.bankname);

      let monthlyinstall = bankinput.getMonthlyInstallment(this.loanterm);

      console.log(`Monthly installment : ${monthlyinstall}`);
    }
    
}

const loan = new LoanCalculator(argv.bankName, argv.loanAmount, argv.loanTerm);

loan.getMonthlyInstallment(loan.loanterm);
