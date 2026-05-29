const expression = document.querySelector(".expression");
const currentValue =  document.querySelector(".current-value");
const numbers = document.querySelectorAll(".number-btn");
const opreators = document.querySelectorAll(".operator-btn") ;
expression.textContent = "" ;
const clear = document.querySelector(".text-error") ;
const backSpace = document.querySelector(".text-primary") ;
const allBtns = document.querySelector(".keypad");
const allowedChars = [
  "0","1","2","3","4","5","6","7","8","9",
  "+","-","*","/","(",")",".","%"
];
function calculate(e){
    let target = e.target ;
    const isClick = e.type === "click";
    const isKey = e.type === "keydown";
    const endsWithNumber = /[0-9]$/.test(expression.textContent)

    let num;

    if (e.type === "click") {
        target = e.target.closest(".glass-button");

        if (!target) return;

        if (target.matches(".text-error")) {
            expression.textContent = "";
            currentValue.textContent = "0";
            return;
        }

        if (target.matches(".text-primary")) {
            expression.textContent = expression.textContent.slice(0, -1);
            currentValue.textContent = endsWithNumber ? math.evaluate(expression.textContent) : "0";
            return;
        }
        if(target.matches(".equals-btn")){
            return;        
        }

        num = target.dataset.value;
    }

    if (isKey) {
        if (e.key === "Backspace") {
            e.preventDefault();
            expression.textContent = expression.textContent.slice(0, -1);
            currentValue.textContent = math.evaluate(expression.textContent) || "0";
            return;
        }

        if (e.key === "Delete") {
            expression.textContent = "";
            currentValue.textContent = "0";
            return;
        }
        if(e.key ==="="){
            return;        
        }

        if (!allowedChars.includes(e.key)) return;

        num = e.key;
    }

    currentValue.textContent = num ;
    expression.textContent += num ;

    try {
        let result = math.evaluate(expression.textContent.trim());
        if(!result){
            result = 0 ;
            expression.textContent = ""
        }
        currentValue.textContent = result ;
    } catch {
        currentValue.textContent = expression.textContent || "0";
    }
}
allBtns.addEventListener("click" , calculate);
window.addEventListener("keydown" , calculate)
