// ====The Whole form is selected to grab submit action when performed in it by button==== 
const transectionFormEle = document.querySelector(".MainForm");


// ==================Global Important Things =================
const state = {
 
  // Dummy object  in transections array for practise 
  transections: [
    {
      id :4,
      text:"EXample",
      amount:10,
      type:"credit",
    },

  ],
}
// ================Update handled by these variables ==========
let isUpdate=false;
let tid;

// ==================To rander transections on screen ==================
const renderTransections = () => {
  const AllTransections = state.transections;//we have all transections from transections array in state 


  // =======================Selectors to be updated  ==================== 
  const BalanceEle = document.querySelector(".secondary-Heading");
  const earnButtonEle=document.querySelector("#earnButton");
  const expenseButton=document.querySelector("#expenseButton");
  const transectionsEle = document.querySelector(".transections");

  // ===========Global variables that is updating when new transection is added or removed
  let earning = 0;
  let expense = 0;
  let net = 0;
  // =====================Very important first clear all previous transections =========
  transectionsEle.innerHTML="";

  // for each loop on all transections to grab each transection value and display on screen

  AllTransections.forEach((transaction) => {

    // ==========destructering of elements of  each transaction============
    const { id, amount, text, type } = transaction;

    // ===================to differ btw debi and credit type =============
    const iSCredit = type === "credit" ? true : false;
    const sign = iSCredit ? "+" : "-";


    // ===============and on the basis of the data we have rander transections with available data on screens ====================

    // ===============onclick=showEdit(id) func is to display the lower section by toggle action ===================handleEdit(id) and handleDelete(id) is used to delete and edit transection added in html later ================

    const transactionTemplate = 
     `<div class="transection" id="${id}">        
      <div class="upperTransectionSection" onclick=showEdit(${id})>
        <p class="paragraph">${text}</p>
        <div class="status">
          <p class="paragraph">${sign} $ ${amount}</p>
          <p class="${iSCredit ? "credit" : "debit"}" id="statusCredit">${iSCredit ? "C" : "D"}</p>

      </div>

      </div>

      <div class="lowerTransectionSection">
        <div class="iconContainer">
          <div class ="PenIcon" onclick= "handleEdit(${id})">
          <img  id="penIcon" src="images/pen.svg" alt="Pen Icon" >
          </div>
          <div class ="DeleteIcon" onclick= "handleDelete(${id})">
            <img id="trashIcon" src="images/trash.svg" alt="Trash Icon">
            </div>

        </div>    
      </div>


    </div>`


    // ============updating the values acc to the earning and expense action ======
    earning += iSCredit ? amount : 0;//earn
    expense += !iSCredit ? amount : 0;//expense
    net = earning - expense;

    // =====================this function is to add at beginning not at end=======
    transectionsEle.insertAdjacentHTML("afterbegin", transactionTemplate);
  });
  
  // ==================rendering updated values on screen =================
  BalanceEle.innerHTML = `$ ${net}` 
  expenseButton.innerHTML =`$ ${expense} \nExpense`
  earnButtonEle.innerHTML =`$ ${earning} \nEarning` 
}
 

// ===============this function basically grabing data from input fields of form and make an object of transectcion to add in array transactions that is in state=============== 

const transectionHandler = (e) => {
  e.preventDefault();

  // to check earn button is clicked or expense button is clicked =============
  const isEarn = e.submitter.id === "earnButton" ? true : false;

  const formData = new FormData(transectionFormEle);
  const tData = {};

  formData.forEach((value, key) => {
    tData[key] = value;
  })

  const { text, amount } = tData;

  const transection = {
    // ==============very important if transection updated then id must not be random ===
    id: isUpdate ? tid:Math.floor(Math.random() * 1000),
    text: text,
    amount: +amount,  //imp to convert into integer
    type: isEarn ? "credit" : "debit",
  }

  //  agr update true ho means usko edit krna hai aur phir usko array man overwrite krdena hai nhi to simply push krdena hai array man ===============
  if(isUpdate){
    const editableEleIndex=state.transections.findIndex(trans => trans.id === tid);
    state.transections[editableEleIndex] = transection;
    
    
    tid=null;  //local variable will null not main id 
    isUpdate=false;

    
  }
  else{
    state.transections.push(transection);
  }
  // ================ver imp to rander bcz jab update ho uska bad dobara render krwana lazmi hai ================
  renderTransections();
}


// =========================3rd Part ===========================showEdit Edit and delete functions 
const showEdit=(id)=>{
  const selectedTransection=document.getElementById(id);

  const lowerEle=selectedTransection.querySelector(".lowerTransectionSection");

  // Very important it gives values of true false means when true it show our lower section and when click again it hide bcz now value is false of toggle
  lowerEle.classList.toggle("showTransection");

}

const handleEdit = (id)=>{

  const editEle=state.transections.find(trans=> trans.id === id);

  const {text , amount} = editEle
  
  const textEle=document.querySelector("#TextInput");
  const numEle=document.querySelector("#NumInput");

  textEle.value=text;
  numEle.value=amount;

  tid=id;
  isUpdate=true;
  

}
const handleDelete = (id)=>{

  const filteredTransactions=state.transections.filter(trans => trans.id !== id );

  state.transections=filteredTransactions;

  renderTransections();

}

transectionFormEle.addEventListener("submit", transectionHandler);
